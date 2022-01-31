/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/* Declare Stripe as it is not known to Typescript */
declare var StripeCheckout:any;