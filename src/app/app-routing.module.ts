import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistsComponent } from './components/checklists/checklists.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
// TODO: Add a route guard for authentication
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
