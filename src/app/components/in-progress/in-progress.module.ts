import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InProgressRoutingModule } from './in-progress-routing.module';
import { InProgressComponent } from './in-progress.component';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    LoadingModule,
    HeaderModule,
    InProgressRoutingModule,
  ],
  declarations: [InProgressComponent]
})
export class InProgressModule { }
