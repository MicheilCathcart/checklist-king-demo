import { Injectable, OnDestroy } from '@angular/core';
import { Document } from '../api/teams/in-progress/document';
import { LoadingService } from '../loading/loading.service';
import { Report } from './model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document as TeamDocument } from '../api/teams/document';
import { Team } from '../api/teams/model';
import { getTemplate } from './template';
import { Subscription } from 'rxjs';
import { environment } from 'environments/environment';
import { Collection as CompletedCollection } from '../api/teams/completed/collection';
import { TeamService } from '../team/team.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as lodash from 'lodash';


const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Expose-Headers', 'accept, authorization, content-type, x-requested-with, jwt')
};

@Injectable()
export class ReportService implements OnDestroy {

  teamSubscription: Subscription;
  teamId: string;

  constructor(
    private inProgressDocument: Document,
    private loadingService: LoadingService,
    private db: AngularFirestore,
    private http: HttpClient,
    private teamService: TeamService) {

  }

  /**
   * Sends the report to whomever needs to get it
   */
  sendReport(report: Report) {

    console.log('Send Report');

    this.loadingService.loading = true;

    const devEndPoint = environment.emailRequest;

    if (this.teamService.teamSettings && this.teamService.teamSettings.name) {

      // Get logo path

      const req = {
        subject: 'Your clean has been completed',
        html: getTemplate(report, this.teamService.teamSettings),
        from: 'messenger@mail.checklistking.com',
        replyTo: this.teamService.teamSettings.replyToEmail,
        recipients: [
          {
            address: report.checklist.onFinishEmail
          },
          {
            address: this.teamService.teamSettings.onCompleteEmail
          }
        ]
      };

      this.http.post<any>(devEndPoint, req, httpOptions)
        .toPromise()
        .then((result) => {

          this.loadingService.loading = false;

          // Convert array data to object
          // Turn into an object
          report.checklist.checklist = lodash(lodash.cloneDeep(report.checklist.checklist))
            .keyBy('index')
            .mapValues((group: any) => {
              group.tasks = lodash.keyBy(group.tasks, 'index');
              return group;
            })
            .value();

          // Add to completed
          this.db.doc<Team>('teams/' + this.teamService.id).collection<Report>('completed').add(Object.assign({}, report));

          // Then delete from collection
          // TODO: Batch these operations
          this.inProgressDocument.delete();

        })
        .catch((error) => {
          console.log('error', error);
          this.loadingService.loading = false;
        });


    }

  }

  ngOnDestroy() {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
  }

  compileHtml(report: Report) {
    return 'This is a test';
  }
}
