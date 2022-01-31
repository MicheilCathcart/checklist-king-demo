import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document as InProgressDocument } from '../../../../services/api/teams/in-progress/document';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Checklist } from 'app/services/api/teams/checklists/model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent {

  inProgressDocument: InProgressDocument;
  checklistId: string;
  inProgressQuery: Observable<Checklist>;

  constructor(inProgressDocument: InProgressDocument,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.inProgressDocument = inProgressDocument;

    this.inProgressQuery = this.activatedRoute.paramMap.pipe(
      switchMap((paramMap) => {
        this.checklistId = paramMap.get('id');
        return this.inProgressDocument.get(paramMap.get('id'));
      }
    ));

  }

  check(step: any, groupIndex, taskIndex) {

    if (step.state) {
      step.state = !step.state;
    } else {
      step.state = true;
    }

    this.inProgressDocument.updateState(step.state, groupIndex, taskIndex);

  }

  back() {
    this.router.navigate(['/in-progress']);
  }

  finish() {
    this.router.navigate(['/checklists/checklist/' + this.checklistId + '/complete']);
  }

  deleteInProgress() {
    this.inProgressDocument.delete();
  }


}
