import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistService } from './checklist.service';
import { InitialiseComponent } from './initialise/initialise.component';
import { CheckComponent } from './check/check.component';
import { CompleteComponent } from './complete/complete.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DirectivesModule } from '../../../directives/directives.module';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { LoadingModule } from '../../loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    LoadingModule,
    ContenteditableModule,
    BrowserModule
  ],
  declarations: [InitialiseComponent, CheckComponent, CompleteComponent],
  providers: [ChecklistService]
})
export class ChecklistModule { }
