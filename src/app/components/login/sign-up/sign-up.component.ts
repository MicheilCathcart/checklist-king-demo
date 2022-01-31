import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firestore } from 'firebase';
import { ApiService } from '../../../services/api/api.service';
import { Collection as teamsCollection } from '../../../services/api/teams/collection';
import { Collection as usersCollection } from '../../../services/api/users/collection';
import { AuthService } from '../../../services/auth/auth.service';
import { LoadingService } from '../../../services/loading/loading.service';
import { TeamService } from '../../../services/team/team.service';
import { UserService } from '../../../services/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  email: string;
  name: string;
  teamName: string;
  password: string;
  confirmPassword: string;
  private paramsSub: any;

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private usersCollection: usersCollection,
    private teamsCollection: teamsCollection,
    private userService: UserService,
    private teamService: TeamService,
    private api: ApiService) {
  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.email = params['email'];
    });
  }

  ngOnDestroy() {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
  }

  // TODO: Sign Up - Do I need to batch the auth sign up with the rest of the sets? What happens if the batch within the then fails?
  signUp() {

    // Sign Up
    this.authService.signUp(this.email, this.password).then((response: any) => {

      const batch = this.api.batch;

      const id = this.afs.createId();

      // return this.teamsCollection.collection.doc(teamRef.id).collection<TeamUser>('users').doc(userRef.id).ref;

      // Get the refs
      const userRef: firestore.DocumentReference = this.usersCollection.collection.doc(response.user.uid).ref;
      
      const teamRef: firestore.DocumentReference = this.teamsCollection.collection.ref.doc();

      const teamClientRef: firestore.DocumentReference = this.teamsCollection.collection
      .doc(teamRef.id).collection<any>('customers').ref.doc();
      const teamUserRef: firestore.DocumentReference = this.teamsCollection.collection
      .doc(teamRef.id).collection<any>('users').doc(userRef.id).ref;
      const userTeamRef: firestore.DocumentReference = this.usersCollection.collection
      .doc(userRef.id).collection<any>('teams').doc(teamRef.id).ref;

      // Add the user to the users collection
      batch.set(userRef, {
        name: this.name,
        email: this.email,
        activeTeam: teamRef.id,
        subscribed: false,
        userCount: 1
      })
      .set(teamRef, {
        name: this.teamName,
        onCompleteEmail: this.email,
        replyToEmail: this.email,
        emailHeader: 'Please see below what we completed for you today. ',
        emailFooter: 'Thanks very much for your business, <br>' + this.teamName,
        emailHighlightColour: '#0081DE',
        emailTextColour: '#3c3c3c',
        emailTickColour: '#53c300',
        emailHeadingTextColour: '#5a5a5a',
        emailHeadingBackgroundColour: '#ececec',
        emailBodyBackgroundColour: '#fbfbfb'
      })
      .set(teamClientRef, {
        name: this.teamName + ' (Test Customer)',
        email: this.email
      })
      .set(teamUserRef, {
        name: this.name,
        email: this.email,
        role: 'Owner'
      })
      .set(userTeamRef, {
        name: this.teamName,
        role: 'Owner'
      });

      // Commit all
      batch.commit().then((result) => {

        console.log('batch', result);

        // Initialize team and user info
        this.authService.initialise();

        this.router.navigate(['checklists']);
        this.loadingService.stopLoading();

      }).catch((error) => {
        console.log('Could not create new user details', error);
      });

    }).catch(error => {
      console.log('Could not create new user', error);
      this.loadingService.stopLoading();
    });

  }

  back() {
    this.router.navigate(['login']);
  }

}
