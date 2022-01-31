import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './user-settings/add/add.component';
import { EditComponent } from './user-settings/edit/edit.component';
import { LoadingModule } from '../loading/loading.module';
import { DirectivesModule } from '../../directives/directives.module';
import { ContenteditableModule } from '@ng-stack/contenteditable';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    LoadingModule,
    HeaderModule,
    FormsModule,
    ContenteditableModule,
    DirectivesModule,
    SettingsRoutingModule
  ],
  declarations: [SettingsComponent, GeneralSettingsComponent, UserSettingsComponent, AddComponent, EditComponent]
})
export class SettingsModule { }
