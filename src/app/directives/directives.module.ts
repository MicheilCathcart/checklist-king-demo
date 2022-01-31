import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCheckDirective } from './auth-check/auth-check.directive';
import { Document as TeamsUsersDocument } from './../services/api/teams/users/document';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuthCheckDirective],
  providers: [
    TeamsUsersDocument,
  ],
  exports: [
    AuthCheckDirective
  ]
})
export class DirectivesModule { }
