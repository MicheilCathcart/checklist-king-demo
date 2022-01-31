import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../api/users/model';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class UserService implements OnDestroy {

    _id = new Subject<string>();
    id: string;
    stripeId: string;
    email: string;
    role: string;
    user$ = new Subject<User>();
    id$ = new ReplaySubject<string>(2);
    userSubscription: Subscription;

    constructor(private db: AngularFirestore) {
    }


    setCurrentUser(id: string, email: string) {
        this.id = id;
        this.email = email;
        this._id.next(id);
        this.id$.next(id);

        this.userSubscription = this.db.collection<User>('users').doc(id).valueChanges().pipe(
            tap((user: User) => user.stripeId ? this.stripeId = user.stripeId : this.stripeId = null),
            tap((user: User) => this.user$.next(user)),
        ).subscribe();
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }

}
