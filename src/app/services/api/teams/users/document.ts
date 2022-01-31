import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, zip } from 'rxjs';
import { User } from './model';
import { Observable } from 'rxjs';
import { Collection as Users } from './collection';
import { LoadingService } from '../../../loading/loading.service';
import { Router } from '@angular/router';
import { TeamService } from 'app/services/team/team.service';
import { tap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../../../user/user.service';
import { Subscription } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class Document implements OnDestroy {

    doc: AngularFirestoreDocument<{}>;

    // Get the current logged in user, as they are stored in the same place (Probably shouldn't be)
    doc$ = new ReplaySubject<User>(2);
    teamUserDocumentSubscription: Subscription;

    constructor(
        private db: AngularFirestore,
        private teamService: TeamService,
        private userService: UserService,
        private loadingService: LoadingService,
        private router: Router) {

            this.teamUserDocumentSubscription = zip(this.teamService.id$, this.userService.id$,
                (teamId: string, userId: string) => ({ teamId, userId })).pipe(
                mergeMap((zip: { teamId: string, userId: string }) => {
                    return this.db.doc<User>('teams/' + zip.teamId).collection<User>('users').doc(zip.userId).valueChanges();
                }),
                tap((result: User) => {
                    this.doc$.next(result);
                })
              ).subscribe();
    }

    get(userId: string): Observable<any> {
        return this.teamService._id.pipe(
            tap(id => this.doc = this.db.doc<User>('teams/' + id).collection<User>('users').doc(userId)),
            mergeMap(id => this.db.doc<User>('teams/' + id).collection<User>('users').doc(userId).valueChanges()),
        );
    }


    update(user: User) {
        this.loadingService.loading = true;
        this.doc.update(Object.assign({}, user)).then((result) => {
            this.router.navigate(['settings/users']);
            this.loadingService.loading = false;
        })
        .catch((err) => {
            this.loadingService.loading = false;
        });
    }

    delete() {
        this.loadingService.loading = true;
        this.doc.delete().then((result) => {
            this.router.navigate(['settings/users']);
            this.loadingService.loading = false;
        })
        .catch((err) => {
            this.loadingService.loading = false;
        });
    }

    ngOnDestroy(): void {
        if (this.teamUserDocumentSubscription) {
            this.teamUserDocumentSubscription.unsubscribe();
        }
    }


}
