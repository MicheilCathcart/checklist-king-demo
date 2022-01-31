import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterModule } from '../footer/footer.module';
import { ChecklistsComponent } from './checklists.component';
import { ChecklistsRoutingModule } from './checklists-routing.module';
import { HeaderModule } from '../header/header.module';
import { ChecklistCreateModule } from './create/checklist.create.module';

// Providers
import { Document } from '../../services/api/teams/document';
import { Collection } from '../../services/api/teams/checklists/collection';
import { ChecklistEditModule } from './edit/edit.module';
import { LoadingModule } from '../loading/loading.module';
import { DirectivesModule } from 'app/directives/directives.module';


@NgModule({
  declarations: [
    ChecklistsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FooterModule,
    HeaderModule,
    ChecklistCreateModule,
    ChecklistEditModule,
    LoadingModule,
    DirectivesModule,
    ChecklistsRoutingModule
  ],
  providers: [
    Collection,
    Document
  ]
})
export class ChecklistsModule { }
