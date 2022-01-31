import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EqualValidator } from '../../validators/equal-validator/equal-validator.validator';
import { ValidatorsModule } from '../../validators/validator.module';
import { JoinYourTeamComponent } from './join-your-team/join-your-team.component';
import { HeaderModule } from '../header/header.module';


@NgModule({
  declarations: [
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    JoinYourTeamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ValidatorsModule,
    HeaderModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
