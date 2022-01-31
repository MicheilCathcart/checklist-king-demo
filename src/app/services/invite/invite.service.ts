import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { Document as TeamDocument } from '../api/teams/document';
import { TeamInvite } from '../api/teams/model';
import { User } from '../api/teams/users/model';
import { LoadingService } from '../loading/loading.service';
import { TeamService } from '../team/team.service';


const httpOptions = {
  headers: new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Expose-Headers', 'accept, authorization, content-type, x-requested-with, jwt')
};

@Injectable()
export class InviteService implements OnDestroy {

    teamSubscription: Subscription;

    constructor(
      private loadingService: LoadingService,
      private http: HttpClient,
      private teamService: TeamService,
      private router: Router,
      private teamDocument: TeamDocument) {

    }

    /**
     * Sends an invite with a code to whoever needs it
     */
    sendInvite(user: User) {

        const devEndPoint = environment.emailRequest;

        // Add team to this
        const signUpLink = `${ environment.appLink }/join-your-team?t=${ this.teamService.id }&u=${ user.id }`;

        if (this.teamService && this.teamService.id) {
            const req = {
              subject: `You have been invited by ${ this.teamService.teamSettings.name } to join Checklist King`,
              html: `
              Hi ${ user.name },<br><br>
              
              You have been invited by ${ this.teamService.teamSettings.name } to become a member of their team.<br>
              Please follow the link below to create your account and join.

              <strong><a href="${ signUpLink }">Join here</a><strong> - 
              
              Thanks, 
              Micheil - <a href="www.checklistking.com">Checklist King</a>`,
              from: 'messenger@mail.checklistking.com',
              replyTo: this.teamService.teamSettings.replyToEmail,
              recipients: [
                {
                  address: user.email
                }
              ]
            };

            this.http.post<any>(devEndPoint, req, httpOptions)
            .toPromise()
            .then((result) => {
              this.loadingService.loading = false;
                this.router.navigate(['settings/users']);
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

}
