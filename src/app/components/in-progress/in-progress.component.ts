import { Component, OnInit } from '@angular/core';
import { Collection as InProgressCollection } from '../../services/api/teams/in-progress/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss']
})
export class InProgressComponent {

  inProgressCollection: InProgressCollection;

  constructor(inProgressCollection: InProgressCollection, private router: Router) {
    this.inProgressCollection = inProgressCollection;
  }

  gotToChecklist(id: string) {
    this.router.navigate(['checklists/checklist/' + id + '/check']);
  }

}
