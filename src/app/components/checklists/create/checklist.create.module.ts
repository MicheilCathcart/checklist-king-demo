import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { ChecklistCreateService } from './checklist.create.service';
import { IndustryTermsService } from '../../../services/industry-terms/industry-terms.service';
import { ContenteditableModule } from '@ng-stack/contenteditable';


@NgModule({
  imports: [
    CommonModule,
    ContenteditableModule,
    FormsModule
  ],
  declarations: [DetailsComponent, TasksComponent],
  providers: [ChecklistCreateService, IndustryTermsService]
})
export class ChecklistCreateModule { }
