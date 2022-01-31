import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../services/auth/auth-guard.service';
import { PlansComponent } from './plans.component';
import { PermissionGuardService } from 'app/services/permission-guard/permission-guard.service';

const routes: Routes = [
  {
    path: 'plans',
    component: PlansComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
