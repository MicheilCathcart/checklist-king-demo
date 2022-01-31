import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChecklistsComponent } from './checklists.component';
import { DetailsComponent } from './create/details/details.component';
import { TasksComponent } from './create/tasks/tasks.component';
import { AuthGuardService } from '../../services/auth/auth-guard.service';
import { InitialiseComponent } from './checklist/initialise/initialise.component';
import { CheckComponent } from './checklist/check/check.component';
import { CompleteComponent } from './checklist/complete/complete.component';
import { ChecklistEditDetailsComponent } from './edit/details/details.component';
import { ChecklistEditTasksComponent } from './edit/tasks/tasks.component';
import { PermissionGuardService } from 'app/services/permission-guard/permission-guard.service';

const routes: Routes = [
  {
    path: 'checklists',
    component: ChecklistsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'checklists/create',
    component: DetailsComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  },
  {
    path: 'checklists/checklist/:id/editdetails',
    component: ChecklistEditDetailsComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  },
  {
    path: 'checklists/checklist/:id/edittasks',
    component: ChecklistEditTasksComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  },
  {
    path: 'checklists/create/tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  },
  {
    path: 'checklists/checklist/:id/initialise',
    component: InitialiseComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'checklists/checklist/:id/check',
    component: CheckComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'checklists/checklist/:id/complete',
    component: CompleteComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistsRoutingModule { }
