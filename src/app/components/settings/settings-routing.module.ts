import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AuthGuardService } from '../../services/auth/auth-guard.service';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AddComponent } from './user-settings/add/add.component';
import { EditComponent } from './user-settings/edit/edit.component';
import { PermissionGuardService } from 'app/services/permission-guard/permission-guard.service';

const settingsRoutes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings/general',
    component: GeneralSettingsComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  },
  {
    path: 'settings/users',
    component: UserSettingsComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  },
  {
    path: 'settings/users/add',
    component: AddComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  },
  {
    path: 'settings/users/:id/edit',
    component: EditComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
