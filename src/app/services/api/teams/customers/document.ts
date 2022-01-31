import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Customer } from './model';
import { Collection as Customers } from './collection';
import { LoadingService } from '../../../loading/loading.service';
import { Router } from '@angular/router';
import { TeamService } from 'app/services/team/team.service';

import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable()
export class Document {

    doc: AngularFirestoreDocument<{}>;

    constructor(
        private db: AngularFirestore,
        private customers: Customers,
        private teamService: TeamService,
        private loadingService: LoadingService,
        private router: Router) {
    }

    get(customerId: string): Observable<any> {
        return this.teamService._id.pipe(
            tap(id => this.doc = this.db.doc<Customer>('teams/' + id).collection<Customer>('customers').doc(customerId)),
            mergeMap(id => this.db.doc<Customer>('teams/' + id).collection<Customer>('customers').doc(customerId).valueChanges()),
        );
    }

    update(customer: Customer) {
        console.log(customer);
        this.loadingService.loading = true;
        this.doc.update(Object.assign({}, customer)).then((result) => {
            this.router.navigate(['customers']);
            this.loadingService.loading = false;
        })
        .catch((err) => {
            console.log('Cannot edit customer', err);
            this.loadingService.loading = false;
        });
    }

    delete() {
        this.loadingService.loading = true;
        this.doc.delete().then((result) => {
            this.router.navigate(['customers']);
            this.loadingService.loading = false;
        })
        .catch((err) => {
            console.log('Cannot delete customer', err);
            this.loadingService.loading = false;
        });
    }

}