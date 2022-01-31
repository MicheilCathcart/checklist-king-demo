import { Injectable } from '@angular/core';
import { Checklist } from '../../../services/api/teams/checklists/model';
import { Customer } from '../../../services/api/teams/customers/model';

@Injectable()
export class ChecklistService {

  customer: Customer = new Customer();
  selected: Checklist = new Checklist();

  constructor() { }

}
