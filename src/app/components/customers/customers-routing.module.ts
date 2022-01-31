import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { AuthGuardService } from '../../services/auth/auth-guard.service';
import { CustomerCreateComponent } from './create/customer.create.component';
import { CustomerEditComponent } from './edit/customer.edit.component';
import { PermissionGuardService } from 'app/services/permission-guard/permission-guard.service';
import { CsvImportComponent } from './csv-import/csv-import.component';

const routes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  },
  {
    path: 'customers/create',
    component: CustomerCreateComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  },
  {
    path: 'customers/csv-import',
    component: CsvImportComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  },
  {
    path: 'customers/:id/edit',
    component: CustomerEditComponent,
    canActivate: [AuthGuardService, PermissionGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
