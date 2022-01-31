import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'app/services/user/user.service';
import { Document } from 'app/services/api/teams/users/document';
import { Subscription } from 'rxjs';
import { User } from 'app/services/api/teams/users/model';
import { first } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Directive({
  selector: '[authCheck]'
})
export class AuthCheckDirective implements OnDestroy, OnInit {

  userRoleSubscription: Subscription;
  teamUser: User;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService,
    private teamUserDocumentService: Document,
  ) {

  }

  ngOnInit() {
    this.userRoleSubscription = this.teamUserDocumentService.doc$
    .pipe(
      first(),
      tap((result: User) => {
        if (result && result.role === 'Owner' || result && result.role === 'manager') {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      })
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe();
    }
  }

}
