import { Injectable } from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

const httpOptions = {
  headers: new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Expose-Headers', 'accept, authorization, content-type, x-requested-with, jwt')
};

@Injectable()
export class StripeService  {

    constructor(
      private loadingService: LoadingService,
      private http: HttpClient) {
    }

    /**
     * Charges a new customer with Stripe
     */
    chargeNewCustomer(payment: any, userCount: number, userId: string, sourceId: string, couponId?: string) {

        this.loadingService.loading = true;

        const devEndPoint = environment.chargeNewCustomer;

        if (payment) {
            const req = {
              payment: payment,
              userCount: userCount,
              userId: userId,
              sourceId: sourceId,
              planId: environment.planId,
              couponId: couponId
            };

            // Return the promise
            return this.http.post<any>(devEndPoint, req, httpOptions)
            .toPromise();
        }

    }

    /**
     * Updates a customers current subscription
     */
    updateCustomerPlan(payment: any, userCount: number, userId: string, stripeId: string, sourceId: string, couponId?: string) {

      this.loadingService.loading = true;

      const devEndPoint = environment.updateCustomerPlan;

      if (payment) {
          const req = {
            userCount: userCount,
            userId: userId,
            stripeCustomerId: stripeId,
            planId: environment.planId,
            couponId: couponId
          };

          // Return the promise
          return this.http.post<any>(devEndPoint, req, httpOptions)
          .toPromise();
      }

  }
}