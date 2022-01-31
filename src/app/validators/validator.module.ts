import { NgModule } from '@angular/core';
import { EqualValidator } from './equal-validator/equal-validator.validator';


@NgModule({
  declarations: [
    EqualValidator
  ],
  imports: [

  ],
  exports: [
    EqualValidator
  ]
})
export class ValidatorsModule { }
