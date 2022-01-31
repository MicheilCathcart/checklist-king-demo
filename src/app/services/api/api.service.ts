import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Injectable()
export class ApiService {

    batch: firestore.WriteBatch;

    constructor(private db: AngularFirestore) {
        this.batch = db.firestore.batch();
    }

}
