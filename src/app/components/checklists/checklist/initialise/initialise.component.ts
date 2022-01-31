import { Component, OnDestroy } from '@angular/core';

import { Collection as InProgressCollection } from '../../../../services/api/teams/in-progress/collection';
import { Collection as TeamCustomersCollection } from '../../../../services/api/teams/customers/collection';
import { Router, ActivatedRoute } from '@angular/router';
import { Document as ChecklistsDocument } from '../../../../services/api/teams/checklists/document';
import { UserService } from '../../../../services/user/user.service';
import { ChecklistService } from '../checklist.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { TeamService } from '../../../../services/team/team.service';
import { Team } from 'app/services/api/teams/model';
import { Checklist } from 'app/services/api/teams/checklists/model';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-initialise',
  templateUrl: './initialise.component.html',
  styleUrls: ['./initialise.component.scss']
})
export class InitialiseComponent implements OnDestroy {

  checklistService: ChecklistService;
  customers: TeamCustomersCollection;
  checklistId: string;
  routeSubscription: Subscription;

  constructor(
    private db: AngularFirestore,
    private teamService: TeamService,
    checklistService: ChecklistService,
    teamCustomersCollection: TeamCustomersCollection,
    private inProgressCollection: InProgressCollection,
    private checklistsDocument: ChecklistsDocument,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {

    this.checklistService = checklistService;
    this.customers = teamCustomersCollection;

    // Get the checklist for this route
    this.routeSubscription = this.route.params.pipe(
      tap((result) => this.checklistId = result.id),
      switchMap((result) => this.checklistsDocument.get(result.id))
    ).subscribe(checklist => {
        if (checklist) {
          this.checklistService.selected = checklist;
          this.checklistService.selected.clientName = null;
        }
    });

  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  isSelected(customer) {
    return this.checklistService.selected.clientName === customer.name && this.checklistService.selected.onFinishEmail === customer.email;
  }

  selectCustomer(customer) {
    // Set as selected
    customer.selected = true;

    // Add client Name
    this.checklistService.selected.clientName = customer.name;

    // Add client Address
    this.checklistService.selected.address = customer.address ? customer.address : null;

    // Add client email
    this.checklistService.selected.onFinishEmail = customer.email;
  }

  // Navigate to checklist check
  startChecklist() {

      // Add notes
      this.checklistService.selected.notes = '';

      // Add UID
      this.checklistService.selected.uid = this.userService.id;

      // Add date
      this.checklistService.selected.date = new Date();

      // Add to in progress, set the collection up in case it has not been tapped yet
      if (!this.inProgressCollection.collection)  {
        this.inProgressCollection.collection = this.db.doc<Team>('teams/' + this.teamService.id).collection<Checklist>('inprogress');
      }

      this.inProgressCollection.add(
        Object.assign({}, this.checklistService.selected)
      );

  }

  back() {
    this.router.navigate(['checklists']);
  }

  // TODO: Wrap auth roles around this
  editChecklist() {
    this.router.navigate(['checklists/checklist/' + this.checklistId + '/editdetails']);
  }

  // TODO: Wrap auth roles around this
  deleteChecklist() {
    this.checklistsDocument.delete();
  }

}
