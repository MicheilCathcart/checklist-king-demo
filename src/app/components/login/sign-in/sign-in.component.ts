import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { LoadingService } from '../../../services/loading/loading.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  submitCount: number;
  email: string;
  password: string;
  errorMessage: string = null;
  private paramsSub: any;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute) { }

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

  resetPassword() {
    this.authService.resetPassword(this.email);
  }

  signIn() {

    // Up the submit count
    this.submitCount++;

    // Sign In
    this.authService.signIn(this.email, this.password).then(response => {

      this.errorMessage = null;

      // Initialize team and user info
      this.authService.initialise();

      this.loadingService.stopLoading();
      this.router.navigate(['checklists']);

    }).catch(error => {
      this.loadingService.stopLoading();
      if (error) {
        this.errorMessage = 'Retry Password';
        this.password = null;
      }
    });
  }

  back() {
    this.router.navigate(['login']);
  }

}
