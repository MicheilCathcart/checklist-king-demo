import { Injectable } from '@angular/core';
import { Payment } from './model';
import { LoadingService } from '../../../loading/loading.service';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Document as UserDocument } from '../document';
import { User } from '../model';
import { StripeService } from '../../../stripe/stripe.service';
import { UserService } from '../../../user/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class Collection {

    collection: AngularFirestoreCollection<Payment>;
    _collection = new BehaviorSubject<AngularFirestoreCollection<Payment>>(null);
    query$: Observable<Payment[]>;

    constructor(
        private db: AngularFirestore,
        private userDocument: UserDocument,
        private userService: UserService,
        private loadingService: LoadingService,
        private stripeService: StripeService,
        private router: Router) {

        this.collection = db.collection<User>('users').doc(this.userService.id).collection<Payment>('payments');
        this.query$ = this.collection.valueChanges();

    }

    add(payment: Payment, userCount: number, existing: boolean, couponId: string = null) {

        this.loadingService.startLoading();

        // Add the payment for record keeping
        this.collection.add(payment).then((result: any) => {
            this.loadingService.stopLoading();

            console.log('this.userService.id', this.userService.id)

            // If the client is new, create the stripe customer and add them to the subscription
            if (!existing) {
                this.stripeService.chargeNewCustomer(payment, userCount, this.userService.id, payment.source.id, couponId)
                .then((stripeServiceResult) => {
                    console.log('Payment made!', stripeServiceResult);
                    this.loadingService.stopLoading();
                })
                .catch(err => {
                    console.log('Charge could not be made at this time', err);
                    this.loadingService.stopLoading();
                });
            }

            // Since they already exist, change their plan and charge accordingly 
            if (existing) {
                this.stripeService.updateCustomerPlan(payment, userCount, this.userService.id, this.userService.stripeId, payment.source.id, couponId).then((stripeServiceResult) => {
                    console.log('Payment made!', stripeServiceResult);
                    this.loadingService.stopLoading();
                });
            }

            // On Fail, remove payment details or try again?

        })
        .catch((error) => {
            this.loadingService.stopLoading();
            // TODO: Add robust error handling. Error logging, UI notification, retries etc.
            console.log('Payment could not be created at this time');
        });
    }

}


