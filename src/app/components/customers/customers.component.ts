import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Collection as TeamCustomerCollection } from '../../services/api/teams/customers/collection';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnDestroy {

  customers: TeamCustomerCollection;
  subscription: Subscription;

  constructor(private router: Router, teamCustomerCollection: TeamCustomerCollection) {
    this.subscription = teamCustomerCollection.query.subscribe((result: any) => {
      this.customers = result;
    });
  }

  import() {
    this.router.navigate(['customers/csv-import']);
  }

  create() {
    this.router.navigate(['customers/create']);
  }

  initialiseCustomer(customer) {
    this.router.navigate(['customers/' + customer.id + '/edit']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
