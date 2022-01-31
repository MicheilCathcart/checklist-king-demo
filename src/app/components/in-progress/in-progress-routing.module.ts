import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InProgressComponent } from './in-progress.component';
import { AuthGuardService } from '../../services/auth/auth-guard.service';
import { PermissionGuardService } from 'app/services/permission-guard/permission-guard.service';

const routes: Routes = [
  {
    path: 'in-progress',
    component: InProgressComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InProgressRoutingModule { }
