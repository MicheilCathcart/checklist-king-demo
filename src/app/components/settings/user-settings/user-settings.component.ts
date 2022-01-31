import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Document as UserDocument } from 'app/services/api/users/document';
import { flatten } from 'lodash';
import { combineLatest } from 'rxjs/operators';
import { Collection as TeamUserCollection } from '../../../services/api/teams/users/collection';
import { LoadingService } from '../../../services/loading/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnDestroy {

  users: TeamUserCollection;
  paidUserCount: number;
  userCount: number;
  jointSubscription: Subscription;

  constructor(private router: Router, private loadingService: LoadingService, teamUsersCollection: TeamUserCollection, private userDocument: UserDocument) {

    this.users = teamUsersCollection;
    this.userDocument = userDocument;

    this.jointSubscription = this.userDocument.doc$.pipe(
      combineLatest(teamUsersCollection.query)
    ).subscribe((result: any) => {
      this.paidUserCount = result[0].userCount;
      if (result[1]) {
        this.userCount = flatten(<any>result[1]).length;
      }
    });

  }

  back() {
    this.router.navigate(['settings']);
  }

  add() {
    this.router.navigate(['settings/users/add']);
  }

  initialiseUser(user) {
    this.router.navigate(['settings/users/' + user.id + '/edit']);
  }

  ngOnDestroy() {
    if (this.jointSubscription) {
      this.jointSubscription.unsubscribe();
    }
  }

  upgradePlan() {
    this.router.navigate(['plans']);
  }

}
