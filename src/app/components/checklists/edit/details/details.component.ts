import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Document as ChecklistDocument } from '../../../../services/api/teams/checklists/document';
import { Subscription } from 'rxjs';
import { Checklist } from '../../../../services/api/teams/checklists/model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class ChecklistEditDetailsComponent {

  checklistId: string;
  checklist: Checklist = new Checklist;
  checklistQuery: Observable<Checklist>;

  constructor(
    private router: Router,
    private checklistDocument: ChecklistDocument,
    private activatedRoute: ActivatedRoute) {

    this.checklistDocument = checklistDocument;

    this.checklistQuery = this.activatedRoute.paramMap.pipe(
      switchMap((paramMap) => {
        this.checklistId = paramMap.get('id');
        return this.checklistDocument.get(paramMap.get('id'));
      }
    ));

  }

  back() {
    this.router.navigate(['checklists']);
  }

  edit() {
    this.checklistDocument.update(this.checklist);
  }

  editTasks() {
    this.router.navigate(['checklists/checklist/' + this.checklistId + '/edittasks']);
  }

}
