// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// Publishable API keys are meant solely to identify your account with Stripe,
// they aren’t secret. In other words, they can safely be published in places like your Stripe.js
// JavaScript code, or in an Android or iPhone app. Publishable keys only have the power to create tokens.

// Secret API keys should be kept confidential and only stored on your own servers. 
// Your account’s secret API key can perform any API request to Stripe without restriction.

export const environment = {
  production: false,
  sparkPostApi: '83261be6b6a76803562b815e64a0e80fe01ac4d9',
  planId: 'plan_EikmMb5MCJWm1E',
  emailRequest: 'http://localhost:5000/process-app-b3331/us-central1/sendSparkpostEmail',
  chargeNewCustomer: 'http://localhost:5000/process-app-b3331/us-central1/chargeNewCustomer',
  updateCustomerPlan: 'http://localhost:5000/process-app-b3331/us-central1/updateCustomerPlan',
  appLink: 'http://localhost:4200',
  // Stripe Publishable Key
  stripeKey: 'pk_test_58ltYe7DqZR0WkFUanlDQwt7',
  firebase: {
    apiKey: 'AIzaSyBbc01A3_C7OTy0E048J_ROV-pjV7HxxP4',
    authDomain: 'process-app-b3331.firebaseapp.com',
    databaseURL: 'https://process-app-b3331.firebaseio.com',
    projectId: 'process-app-b3331',
    storageBucket: 'process-app-b3331.appspot.com',
    messagingSenderId: '1082060046341'
  },
  couponCodes: {
    FiftyPercentLifetime: {
      id: 'd1099smM',
      name: 'Lifetime 50% Discount',
      percentage: 0.5
    }
  }
}
