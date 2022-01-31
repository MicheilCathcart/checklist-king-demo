import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Document as UserDocument } from 'app/services/api/users/document';
import { Subscription } from 'rxjs';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit, OnDestroy {

  userCount = 1;
  user: UserDocument;
  planOptions: number[] = [];
  subscription: Subscription;
  oldUserCount = 1;
  couponCode: string;
  validCode: boolean;
  coupon: any;

  constructor(private router: Router, private userDocument: UserDocument) { 

    this.subscription = this.userDocument.doc$.subscribe((result: any) => {
      this.user = result;
      this.oldUserCount = result.userCount;
      this.userCount = result.userCount === 1 ? 10 : result.userCount + 10;
    });

    this.planOptions.push(1);

    for (let x = 1; x < 31; x++) {
      this.planOptions.push(x * 10);
    }

  }

  ngOnInit() {
  }

  checkAndApplyCode(event) {
    if(environment.couponCodes[event]) {
      this.validCode = true;
      this.coupon = environment.couponCodes[event];
    } else {
      this.validCode = false;
      this.coupon = null;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isSelected(plan) {
    return plan === this.userCount;
  }

  selectPlan(plan) {
    this.userCount = plan;
  }

  back() {
    this.router.navigate(['settings']);
  }

}
