import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
  public allowed: boolean;

  constructor(private af: AngularFireAuth, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.af.authState.pipe(
      first(),
      map((auth) =>  {
        if (auth == null) {
          this.router.navigate(['login']);
          return false;
        } else {
          return true;
        }
      })
    )
  }
}
