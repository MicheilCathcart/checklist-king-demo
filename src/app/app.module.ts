import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';

// Angularfire
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Services
import { AuthService } from './services/auth/auth.service';
import { LoadingService } from './services/loading/loading.service';
import { LoginModule } from './components/login/login.module';
import { SettingsModule } from './components/settings/settings.module';
import { ChecklistsModule } from './components/checklists/checklists.module';
import { InProgressModule } from './components/in-progress/in-progress.module';
import { CustomersModule } from './components/customers/customers.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { ChecklistModule } from './components/checklists/checklist/checklist.module';
import { UserService } from './services/user/user.service';
import { TeamService } from './services/team/team.service';
import { ApiModule } from './services/api/api.module';
import { ReportService } from './services/report/report.service';
import { InviteService } from './services/invite/invite.service';
import { PlansModule } from './components/plans/plans.module';
import { StripeService } from './services/stripe/stripe.service';
import { PathsService } from './services/paths/paths.service';
import { PermissionGuardService } from './services/permission-guard/permission-guard.service';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FooterModule } from './components/footer/footer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FooterModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    LoginModule,
    SettingsModule,
    InProgressModule,
    CustomersModule,
    ChecklistsModule,
    ChecklistModule,
    PlansModule,
    ApiModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    PathsService,
    AuthService,
    AuthGuardService,
    PermissionGuardService,
    LoadingService,
    UserService,
    TeamService,
    ReportService,
    StripeService,
    InviteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
