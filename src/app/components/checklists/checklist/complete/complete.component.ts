import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, sumBy } from 'lodash';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Checklist } from '../../../../services/api/teams/checklists/model';
import { Document as InProgressDocument } from '../../../../services/api/teams/in-progress/document';
import { Report } from '../../../../services/report/model';
import { ReportService } from '../../../../services/report/report.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

  inProgressDocument: InProgressDocument;
  checklistId: string;
  report: Report = new Report;
  summary: any = [];
  inProgressQuery: Observable<Checklist>;

  constructor(inProgressDocument: InProgressDocument,
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService,
    private router: Router) {

    this.inProgressDocument = inProgressDocument;

    this.inProgressQuery = this.activatedRoute.paramMap.pipe(
      switchMap((paramMap) => {
        this.checklistId = paramMap.get('id');
        if (paramMap.get('id')) {
  
          return this.inProgressDocument.get(paramMap.get('id')).pipe(
            tap((checklist: Checklist) => {
  
              if (checklist) {
  
              this.report.checklist = checklist;
  
              // Create the summary
              this.summary = map(checklist.checklist, (group: any) => {
                return {
                  areaName: group.groupName.toUpperCase(),
                  totalSteps: group.tasks.length,
                  stepsCompleted: sumBy(group.tasks, (task: any) => { return task.state === true ? 1 : 0; })
                };
              });
  
            }
            })
          );
  
          }
  
      }
    ));

  }

  back() {
    this.router.navigate(['/checklists/checklist/' + this.checklistId + '/check']);
  }

  ngOnInit() {

    // Set the date
    this.report.completionTime = new Date();

    // Initialise the notes
    this.report.notes = '';

  }

  sendReport() {
    this.reportService.sendReport(this.report);
    console.log(this.report);
  }

}
