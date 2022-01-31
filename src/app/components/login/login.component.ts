import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingService } from '../../services/loading/loading.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string;
  newUser: boolean;
  invalidEmail: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private loadingService: LoadingService,
    private router: Router
  ) {
  }

  checkEmail() {

    this.loadingService.startLoading();

    this.afAuth.auth.fetchSignInMethodsForEmail(this.email).then((result) => {

      this.loadingService.stopLoading();

      if (result[0] === 'password') {
        // Existing User
        this.router.navigate(['login/sign-in', this.email]);
      } else {
        // New User
        this.router.navigate(['login/sign-up', this.email]);
      }

    }).catch((err) => {
      this.invalidEmail = true;
      this.loadingService.stopLoading();
    });
  }

}
