import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../../node_modules/@angular/router';
import { Collection as UserCollection } from '../../../../services/api/teams/users/collection';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  name: string;
  email: string;
  role = 'user';

  constructor(private router: Router, private usersCollection: UserCollection) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['settings/users']);
  }

  add() {
    this.usersCollection.add(
      {
        name: this.name,
        email: this.email,
        role: this.role
      }
    );
  }
}
