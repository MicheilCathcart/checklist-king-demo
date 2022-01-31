import { Component, OnInit, HostListener, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Collection } from '../../../services/api/users/payments/collection';
import { Payment } from '../../../services/api/users/payments/model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnChanges, OnInit {

  handler: any;
  amount: number;

  @Input('userCount')
  userCount: number;

  @Input('coupon')
  coupon: any;

  @Input('oldUserCount')
  oldUserCount: number;

  @Input('subscribed')
  subscribed = false;

  constructor(private UserPayment: Collection, private userService: UserService ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.coupon && !changes.userCount) {
      this.coupon = changes.coupon.currentValue;
      this.amount = Math.ceil(this.userCount / 10 ) * 20 * ( this.coupon ? this.coupon.percentage : 1 );
    }

    if (changes.userCount) {
      this.userCount = changes.userCount.currentValue;
      this.amount = Math.ceil(this.userCount / 10 ) * 20 * ( this.coupon ? this.coupon.percentage : 1 );
    }


    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      source: source => {

        const payment: Payment = {
          source: source,
          amount: this.amount * 100,
        };

        let couponId = this.coupon ? this.coupon.id : null

        // Add use payment
        this.UserPayment.add(payment, this.userCount, this.subscribed, couponId);
      }
    });

  }

  handlePayment() {
    this.handler.open({
      locale: 'auto',
      allowRememberMe: true,
      name: `Flexible Plan ${ this.coupon ? '- Discounted' : ''}`,
      description: `${this.userCount} users - ${ this.coupon ? this.coupon.name : ''}`,
      amount: this.amount * 100,
      panelLabel: 'Subscribe',
      email: this.userService.email
    });
  }

  @HostListener('window:popstate')
    onPopstate() {
      this.handler.close();
    }

}