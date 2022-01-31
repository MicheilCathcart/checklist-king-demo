import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from 'app/services/api/teams/users/model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Document } from '../api/teams/users/document';
import { of } from 'rxjs';

@Injectable()
export class PermissionGuardService implements CanActivate {

  userRoleSubscription: Subscription;
  teamUser: User;

  constructor(
    private router: Router,
    private teamUserDocument: Document) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.teamUserDocument.doc$.pipe(
      switchMap((result: any) => {
        if (result && result.role === 'Owner' || result && result.role === 'manager') {
          return of(true);
        } else {
          this.router.navigateByUrl('/checklists');
          return of(false);
        }
      })
    );

  }

}
