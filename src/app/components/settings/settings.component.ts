import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LoadingService } from '../../services/loading/loading.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private loadingService: LoadingService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }

  goToGeneralSettings() {
    this.router.navigate(['settings/general']);
  }

  goToUserSettings() {
    this.router.navigate(['settings/users']);
  }

  goToPlanSettings() {
    this.router.navigate(['plans']);
  }

  resetPassword() {
      this.authService.resetPassword(this.userService.email);
  }

}
