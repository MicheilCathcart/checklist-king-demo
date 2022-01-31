import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingService } from '../loading/loading.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { TeamService } from '../team/team.service';
import { Document as UserDocument } from '../api/users/document';

import { Location } from '@angular/common';
import { tap } from 'rxjs/operators';
import { PathsService } from '../paths/paths.service';
import { Subscription } from 'rxjs';


@Injectable()
export class AuthService implements OnDestroy {

  sub: Subscription;
  userDocSub: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private loadingService: LoadingService,
    private router: Router,
    private pathsService: PathsService,
    private userService: UserService,
    private teamService: TeamService,
    private userDoc: UserDocument,
    private location: Location
  ) {
  }

  // Initialize Startup
  initialise() {

    this.loadingService.loading = true;

    // Set Current User
    this.sub = this.afAuth.authState.subscribe((user) => {

      if (user) {

        this.userService.setCurrentUser(user.uid, user.email);

        // Initialize the current active team
        this.userDocSub = this.userDoc.doc$.pipe(
          tap((dbUser: any) => this.teamService.setCurrentTeam(dbUser.activeTeam))
        ).subscribe();

        // Initialize Paths
        // this.pathsService.initializePaths();

        // Route to checklists or current page
        if (this.location.path().substr(1, 5) !== 'login') {
        this.router.navigate([this.location.path()]);
        this.loadingService.loading = false;
        } else {
          this.router.navigate(['checklists']);
          this.loadingService.loading = false;
        }

      } else {
        // If coming to join a team, route to the provided link otherwise route to login
        if (this.router.url.indexOf('/join-your-team') === -1) {
          this.router.navigate(['/login']);
        }

        this.loadingService.loading = false;
      }

    });

  }

  // Sign Up
  signUp(email, password) {
    this.loadingService.startLoading();
    return this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  // Sign In
  signIn(email: string, password: string): Promise<any> {
    this.loadingService.startLoading();
    return this.afAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
  }

  // Sign Out
  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  // TODO: Add in custom domain www.checklistking.com for email templates
  // https://console.firebase.google.com/u/1/project/process-app-b3331/authentication/emails
  resetPassword(email: string) {
    this.loadingService.startLoading();
    this.afAuth.auth.sendPasswordResetEmail(email)
        .then(
          (resp) => {
            this.loadingService.stopLoading();
          }
        )
        .catch( (error) => {
          this.loadingService.stopLoading();
        });
  }

  ngOnDestroy(): void {
    if (this.sub) { this.sub.unsubscribe(); }
    if (this.userDocSub) { this.userDocSub.unsubscribe(); }
  }

}
