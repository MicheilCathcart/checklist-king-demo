import { Component, OnInit } from '@angular/core';
import { ChecklistCreateService } from '../checklist.create.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  createService: ChecklistCreateService;

  constructor(createService: ChecklistCreateService, private router: Router) { 
    this.createService = createService;
  }

  ngOnInit() {
  }

  back() {
      this.router.navigate(['checklists']);
  }

  addTasks() {
    this.router.navigate(['checklists/create/tasks']);
  }

}
