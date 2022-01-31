import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistEditDetailsComponent } from './details/details.component';
import { ChecklistEditTasksComponent } from './tasks/tasks.component';
import { FormsModule } from '../../../../../node_modules/@angular/forms';
import { ContenteditableModule } from '@ng-stack/contenteditable';

@NgModule({
  imports: [
    CommonModule,
    ContenteditableModule,
    FormsModule
  ],
  declarations: [ChecklistEditDetailsComponent, ChecklistEditTasksComponent]
})
export class ChecklistEditModule { }
