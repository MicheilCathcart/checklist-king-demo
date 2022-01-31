import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collection as TeamCustomerCollection } from '../../../services/api/teams/customers/collection';

@Component({
  selector: 'app-create',
  templateUrl: './customer.create.component.html',
  styleUrls: ['./customer.create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  name: string;
  email: string;
  address: string;

  constructor(private router: Router, private teamCustomerCollection: TeamCustomerCollection) { }

  ngOnInit() {
  }

  add() {
    this.teamCustomerCollection.add({
      name: this.name,
      email: this.email,
      address: this.address ? this.address : ''
    });
  }

  back() {
    this.router.navigate(['customers']);
  }

}
