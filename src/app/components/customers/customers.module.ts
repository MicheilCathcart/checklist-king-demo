import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { CustomerCreateComponent } from './create/customer.create.component';
import { FormsModule } from '@angular/forms';
import { CustomerEditComponent } from './edit/customer.edit.component';
import { LoadingModule } from '../loading/loading.module';
import { CsvImportComponent } from './csv-import/csv-import.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FooterModule,
    HeaderModule,
    LoadingModule,
    CustomersRoutingModule,
  ],
  declarations: [CustomersComponent, CustomerCreateComponent, CustomerEditComponent, CsvImportComponent]
})
export class CustomersModule { }
