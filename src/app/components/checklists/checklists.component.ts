import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Collection as TeamsChecklistsCollection } from '../../services/api/teams/checklists/collection';
import { Checklist } from 'app/services/api/teams/checklists/model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-checklists',
  templateUrl: './checklists.component.html',
  styleUrls: ['./checklists.component.scss']
})
export class ChecklistsComponent implements OnDestroy {

  checklists: Checklist[];
  subscription: Subscription;

  constructor(private router: Router, private teamChecklistCollection: TeamsChecklistsCollection) {
    this.subscription = teamChecklistCollection.query.subscribe((result: any) => {
      this.checklists = result;
    });
  }

  createChecklist() {
    this.router.navigate(['checklists/create']);
  }

  initialiseChecklist(checklist) {
    this.router.navigate(['checklists/checklist/' + checklist.id + '/initialise']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
