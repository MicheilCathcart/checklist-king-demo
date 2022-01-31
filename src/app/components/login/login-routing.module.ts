import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login.component';
import { JoinYourTeamComponent } from './join-your-team/join-your-team.component';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/sign-in/:email',
    component: SignInComponent
  },
  {
    path: 'login/sign-up/:email',
    component: SignUpComponent
  },
  {
    path: 'join-your-team',
    component: JoinYourTeamComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      loginRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {}
