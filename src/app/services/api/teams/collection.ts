import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Team } from './model';

@Injectable()
export class Collection {

    collection: AngularFirestoreCollection<Team>;
    query$: Observable<Team[]>;

    constructor(private db: AngularFirestore) {
        this.collection = db.collection<Team>('teams');
        this.query$ = this.collection.valueChanges();
    }

}
