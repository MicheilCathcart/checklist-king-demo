import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ReplaySubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../user/user.service';
import { User } from './model';

@Injectable()
export class Document implements OnDestroy {

    doc: AngularFirestoreDocument<User>;
    doc$ = new ReplaySubject<User>(2);
    sub: Subscription;

    constructor(private db: AngularFirestore, private userService: UserService) {

        // Using Tap
        this.sub = this.userService._id.pipe(
            switchMap(id => this.db.doc<User>('users/' + id).valueChanges())
        ).subscribe((result) => this.doc$.next(result));

    }

    set(data: User) {
        this.doc.set(data);
    }

    delete() {
        this.doc.delete();
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
