import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { Collection as TeamsCollection } from './teams/collection';
import { Document as TeamsDocument } from './teams/document';
import { Collection as UsersCollection } from './users/collection';
import { Document as UsersDocument } from './users/document';
import { Collection as TeamsChecklistsCollection } from './teams/checklists/collection';
import { Document as TeamsChecklistsDocument } from './teams/checklists/document';
import { Collection as TeamsInProgressCollection } from './teams/in-progress/collection';
import { Document as TeamsInProgressDocument } from './teams/in-progress/document';
import { Collection as TeamsUsersCollection } from './teams/users/collection';
import { Document as TeamsUsersDocument } from './teams/users/document';
import { Collection as TeamsCustomersCollection } from './teams/customers/collection';
import { Document as TeamsCustomersDocument } from './teams/customers/document';
import { Collection as TeamsCompletedCollection } from './teams/completed/collection';
import { Collection as UsersPaymentsCollection } from './users/payments/collection';


@NgModule({
  providers: [
    ApiService,
    TeamsCollection,
    TeamsDocument,
    UsersCollection,
    UsersDocument,
    TeamsChecklistsCollection,
    TeamsChecklistsDocument,
    TeamsInProgressCollection,
    TeamsInProgressDocument,
    TeamsUsersCollection,
    TeamsUsersDocument,
    TeamsCustomersCollection,
    TeamsCustomersDocument,
    TeamsCompletedCollection,
    UsersPaymentsCollection
  ]
})
export class ApiModule { }
