import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Document as UserDocument } from '../../../../services/api/teams/users/document';
import { User } from '../../../../services/api/teams/users/model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  userQuery: Observable<User>;
  user: User = new User;

  constructor(
    private router: Router,
    private userDocument: UserDocument,
    private activatedRoute: ActivatedRoute) {

    this.userDocument = userDocument;

    this.userQuery = this.activatedRoute.paramMap.pipe(
      switchMap((paramMap) => {
        return this.userDocument.get(paramMap.get('id'));
      })
    );

  }

  back() {
    this.router.navigate(['settings/users']);
  }

  delete() {
    this.userDocument.delete();
  }

  edit() {
    this.userDocument.update(this.user);
  }

}
