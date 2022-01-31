import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Team } from '../model';
import { LoadingService } from '../../../loading/loading.service';
import { Router } from '@angular/router';
import { Customer } from './model';
import * as lodash from 'lodash';
import { TeamService } from 'app/services/team/team.service';

import { Observable, Subscription } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { each } from 'lodash';
import { first } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class Collection implements OnDestroy {

    collection: AngularFirestoreCollection<Customer>;
    query: Observable<Customer[] | {}>;
    query$: ReplaySubject<Customer[] | {}> = new ReplaySubject(2);
    sub: Subscription;

    selectQuery$ = new Observable<Customer[]>();

    constructor(
        private db: AngularFirestore,
        private teamService: TeamService,
        private loadingService: LoadingService,
        private router: Router) {

        this.query = this.teamService._id.pipe(
            tap(id => console.log('Subscribed to Customers Collection')),
            tap(id => this.collection = this.db.doc<Team>('teams/' + id).collection<Customer>('customers')),
            mergeMap(id => this.db.doc<Team>('teams/' + id).collection<Customer>('customers').snapshotChanges()),
            map((result: any) => {
                return lodash(result).map((o) => {
                    const data = o.payload.doc.data();
                    return {
                        id: o.payload.doc.id,
                        name: data.name,
                        email: data.email,
                        address: data.address,
                        firstChar: data.name.charAt(0),
                    };
                }).orderBy('name').groupBy((o) => { return o.name.charAt(0); }).values().value();
            }),
            catchError(err => err)
        );

        this.sub = this.teamService._id.pipe(
            first(),
            switchMap(id => this.db.doc<Team>('teams/' + id).collection<Customer>('customers').valueChanges()),
            tap(customers => this.query$.next(customers))
        ).subscribe();

    }

    add(customer: Customer) {

        this.loadingService.startLoading();

        this.collection.add(customer).then((result) => {
            this.loadingService.stopLoading();
            this.router.navigate(['customers']);
        })
        .catch((error) => {
            this.loadingService.stopLoading();
            // TODO: Add robust error handling. Error logging, UI notification, retries etc.
            console.log('Customer could not be created at this time', error);
        });
    }

    import(customers: Customer[]) {

    this.collection = this.db.doc<Team>('teams/' + this.teamService.id).collection<Customer>('customers');

    this.loadingService.startLoading();

    const batch = this.db.firestore.batch();

    each(customers, (customer) => {

        const customerRef = this.collection.doc(this.db.createId()).ref;

        if (customer.name && customer.email) {
            batch.set(customerRef, {
                name: customer.name,
                email: customer.email,
                address: customer.address || ''
            });
        }
    });

      // Commit all
      batch.commit().then(() => {

        this.router.navigate(['customers']);
        this.loadingService.stopLoading();

      }).catch((error) => {
        console.log('Could not create customers', error);
        this.loadingService.stopLoading();
      });

    }

    delete(id: string) {
        this.collection.doc(id).delete().then((result) => {
            this.router.navigate(['customers']);
            this.loadingService.loading = false;
        })
        .catch((err) => {
            console.log('Cannot delete customer', err);
            this.loadingService.loading = false;
        });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
