import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Document as CustomerDocument } from '../../../services/api/teams/customers/document';
import { Subscription } from 'rxjs';
import { Customer } from '../../../services/api/teams/customers/model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './customer.edit.component.html',
  styleUrls: ['./customer.edit.component.scss']
})
export class CustomerEditComponent {

  customer: Customer = new Customer;
  customerQuery: Observable<Customer>;

  constructor(
    private router: Router,
    private customerDocument: CustomerDocument,
    private activatedRoute: ActivatedRoute) {

    this.customerQuery = this.activatedRoute.paramMap.pipe(
      switchMap((paramMap) => {
        return this.customerDocument.get(paramMap.get('id'));
      })
    );

  }

  back() {
    this.router.navigate(['customers']);
  }

  delete() {
    this.customerDocument.delete();
  }

  edit() {
    this.customerDocument.update(this.customer);
  }

}
