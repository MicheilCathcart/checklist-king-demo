import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer.component';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    BrowserModule,
    DirectivesModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
