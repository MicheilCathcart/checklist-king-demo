import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './model';
import { LoadingService } from '../../loading/loading.service';
import { Router } from '@angular/router';

@Injectable()
export class Collection {

    collection: AngularFirestoreCollection<User>;
    query$: Observable<User[]>;

    constructor(private db: AngularFirestore, private loadingService: LoadingService, private router: Router) {
        this.collection = db.collection<User>('users');
        this.query$ = this.collection.valueChanges();
    }

    add(user: User) {

        this.loadingService.startLoading();

        this.collection.add(user).then((result) => {
            this.loadingService.stopLoading();
            this.router.navigate(['checklists']);
        })
        .catch((error) => {
            this.loadingService.stopLoading();
            // TODO: Add robust error handling. Error logging, UI notification, retries etc.
            console.log('User could not be created at this time');
        });
    }

}
