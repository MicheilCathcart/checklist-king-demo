import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamNameComponent } from './team-name/team-name.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TeamNameComponent],
  exports: [
    TeamNameComponent
  ]
})
export class HeaderModule { }
