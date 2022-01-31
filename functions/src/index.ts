import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initiliaze app with Stripe config. Probably put sparkpost config in here too
// admin.initializeApp(functions.config().firebase);

const serviceAccount = require("../key/admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://process-app-b3331.firebaseio.com"
});

// Load the key (This only worked  in prod because functions.config() is only available within the Cloud Functions runtime.)
// const stripe = require('stripe')(functions.config().stripe.testkey)

// Load the key outside of config for quick testing (Using test secret Key)
const stripe = require('stripe')('sk_test_3eGNRww0VMtqyQ2m4alC83Tn');

// CORS Express middleware to enable CORS Requests. 
// Pretty insecure, use express and configure requiring auth for this. 
// Otherwise CORS is pointless and this end point can still be accesed server => server
const cors = require('cors')({
    origin: ["https://app.checklistking.com", "http://localhost:4200"],
});

const SparkPost = require('sparkpost');
const client = new SparkPost('83261be6b6a76803562b815e64a0e80fe01ac4d9');

// Send Email Using SparkPost
exports.sendSparkpostEmail = functions.https.onRequest((req, res) => {

    return cors(req, res, () => {
        return client.transmissions.send({
            content: {
                from: req.body.from,
                subject: req.body.subject,
                reply_to: req.body.replyTo,
                html: req.body.html
            },
            recipients: req.body.recipients
        })
            .then(data => {
                console.log('Email sent');
                res.status(200).send(data);
            })
            .catch(err => {
                console.log('Email failed');
                res.status(200).send(err);
            });

    });

});

// Remove a customer from stripe on account deletion
exports.deleteStripeCustomer = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        // stripe.customers.del(customer.customer_id);
        res.status(200).send({ message: 'Customer Deleted' });
    })
})

// Change a customers subscription
exports.updateCustomerPlan = functions.https.onRequest((req, res) => {

    return cors(req, res, async () => {

        // Get the body details
        const userId = req.body.userId;
        const stripeCustomerId = req.body.stripeCustomerId;
        const userCount = req.body.userCount;
        const planId = req.body.planId;
        const couponId = req.body.couponId || null;

        console.log(couponId);

        const subscription = await stripe.customers.retrieve(stripeCustomerId);

        stripe.subscriptions.update(subscription.subscriptions.data[0].id, {
            coupon: couponId,
            items: [{
                id: subscription.subscriptions.data[0].items.data[0].id,
                plan: planId,
                quantity: userCount
            }],
            prorate: false,
        })
            // Save the subscription details and stripe customer id to the database
            .then((result) => {

                admin.firestore().doc(`/users/${userId}`).update({ userCount: userCount }).then(() => {
                    res.status(200).send({ message: 'Subscription Updated', result: result });
                }).catch(err => {
                    return res.status(500).send({ error: err });
                })

            })
            .catch(err => {
                return res.status(500).send({ error: err });
            });
    })
})

// Add a customer to a stripe subscription
exports.chargeNewCustomer = functions.https.onRequest((req, res) => {

    return cors(req, res, () => {

        const payment = req.body.payment;
        const userId = req.body.userId;
        const userCount = req.body.userCount;
        const sourceId = req.body.sourceId;
        const couponId = req.body.couponId || null;

        console.log(couponId);

        // Currently referencing the flexible plan ($20 per 10 users per month)
        const planId = req.body.planId;

        // checks if payment exists or if it has already been charged
        if (!payment || payment.charge)
            return null;

            console.log('admin', admin.firestore());

        // First return the customer details
        return admin.firestore()
            .doc(`/users/${userId}`).get()

            .then(snapshot => {
                console.log('Not in here');
                return snapshot.data();
            })

            // Then charge the card (this is the actual Stripe Charge)
            .then(customer => {


                // Create the customer in stripe2
                stripe.customers.create({
                    email: customer.email,
                    source: sourceId,
                })

                    // Add the customer to the subscription (And a coupon id if applicable)
                    .then((stripeCustomer) => {

                        stripe.subscriptions.create({
                            customer: stripeCustomer.id,
                            coupon: couponId,
                            items: [{
                                plan: planId,
                                quantity: userCount
                            }]
                        })

                            // Save the subscription details and stripe customer id to the database
                            .then((subscription) => {

                                const customerId = subscription.customer;

                                admin.firestore().doc(`/users/${userId}`).update({ stripeId: customerId, planId: planId, userCount: userCount, subscribed: true })
                                .then(() => {
                                    res.status(200).send({ message: 'Customer added to plan' });
                                }).catch(err => {
                                    return res.status(500).send({ error: err, message: 'Update Firestore with sub details failed' });
                                })

                            }).catch(err => {
                                return res.status(500).send({ error: err, message: 'Create subscription failed' });
                            });;

                    }).catch(err => {
                        return res.status(500).send({ error: err, message: 'Create customer failed' });
                    });;

            })

            .catch(err => {
                console.log(err);
                return res.status(500).send({ error: err,  message: 'Return snapshot data failed' });
            });

    })


});
