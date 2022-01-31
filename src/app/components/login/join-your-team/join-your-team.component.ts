import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { firestore } from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../../../services/api/api.service';
import { Document as TeamDocument } from '../../../services/api/teams/document';
import { Team } from '../../../services/api/teams/model';
import { Document as UserDocument } from '../../../services/api/teams/users/document';
import { User } from '../../../services/api/teams/users/model';
import { Collection as UsersCollection } from '../../../services/api/users/collection';
import { AuthService } from '../../../services/auth/auth.service';
import { LoadingService } from '../../../services/loading/loading.service';
import { TeamService } from '../../../services/team/team.service';
import { FirebaseAuth } from '@angular/fire';

@Component({
  selector: 'app-join-your-team',
  templateUrl: './join-your-team.component.html',
  styleUrls: ['./join-your-team.component.scss']
})
export class JoinYourTeamComponent implements OnDestroy {

  team: Team = new Team();
  user: User = new User();
  password: string;
  params: any;
  teamId: string;
  oldUserID: string;

  userQuery: Observable<User>;
  teamQuery: Observable<Team>;

  routeSubscription: Subscription;
  userDocSubscription: Subscription;

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private authService: AuthService,
    private teamDocument: TeamDocument,
    private teamService: TeamService,
    private userDocument: UserDocument,
    private usersCollection: UsersCollection,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private loadingService: LoadingService) {

      this.routeSubscription = this.activatedRoute.queryParams.pipe(
        tap((queryParams: any) => {
          this.teamService.setCurrentTeam(queryParams.t);
          this.teamId = queryParams.t;
          this.oldUserID = queryParams.u;
          this.teamQuery = this.teamDocument.query;
          this.userQuery = this.userDocument.get(queryParams.u);
          this.userDocSubscription = this.userQuery.subscribe(user => {
            this.user = user;
          });
        })
      ).subscribe();


  }

  join() {

    this.loadingService.stopLoading();

    this.authService.signUp(this.user.email, this.password).then((response: any) => {

      const batch = this.api.batch;

      // Get the refs
      const userRef: firestore.DocumentReference = this.db.collection<User>('users').doc(response.uid).ref;
      const userTeamRef: firestore.DocumentReference = this.db.collection<User>('users')
      .doc(userRef.id).collection<any>('teams').doc(this.teamId).ref;

      // Get this reference to delete placeholder/existing team member of this name, before adding the new one with correct details
      const oldTeamUserRef: firestore.DocumentReference = this.db.collection<Team>('teams')
      .doc(this.teamId).collection<any>('users').doc(this.oldUserID).ref;

      const newTeamUserRef: firestore.DocumentReference = this.db.collection<Team>('teams')
      .doc(this.teamId).collection<any>('users').doc(response.uid).ref;


      // Add the user to the users collection
      batch.set(userRef, {
        name: this.user.name,
        email: this.user.email,
        activeTeam: this.teamId
      })
      .set(userTeamRef, {
        name: this.teamService.teamSettings.name,
        role: this.user.role
      })
      .delete(oldTeamUserRef)
      .set(newTeamUserRef, {
        name: this.user.name,
        email: this.user.email,
        role: this.user.role
      });

      // Commit all
      batch.commit().then(() => {

        // Initialize team and user info
        this.authService.initialise();

        this.router.navigate(['checklists']);
        this.loadingService.stopLoading();

      }).catch((error) => {
        console.log('Could not join team and create new user details', error);
      });


    }).catch((err) => {
      console.log('Could not join team at this time', err);
    });
  }

  ngOnDestroy(): void {
    if (this.userDocSubscription) { this.userDocSubscription.unsubscribe() };
    if (this.routeSubscription) { this.routeSubscription.unsubscribe() };
  }

}
