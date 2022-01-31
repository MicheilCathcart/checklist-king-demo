import { Injectable } from '@angular/core';
import { TaskGroups } from '../../../services/api/teams/checklists/model';

@Injectable()
export class ChecklistCreateService {

  checklistName: string;
  checklistCategory: string;
  checklistTasks: TaskGroups[] = [];

  constructor() { }

  reset() {
    this.checklistName = '';
    this.checklistCategory = '';
    this.checklistTasks = [];
  }

}
