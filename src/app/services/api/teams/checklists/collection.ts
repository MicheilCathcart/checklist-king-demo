import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as lodash from 'lodash';
import { LoadingService } from '../../../loading/loading.service';
import { TeamService } from '../../../team/team.service';
import { Team } from '../model';
import { Checklist } from './model';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


@Injectable()
export class Collection implements OnDestroy {

    collection: AngularFirestoreCollection<Checklist>;
    query: Observable<Checklist[] | {}>;
    collectionSub: Subscription;

    constructor(
        private db: AngularFirestore,
        private teamService: TeamService,
        private loadingService: LoadingService,
        private router: Router) {

        this.query = this.teamService._id.pipe(
            mergeMap(id => this.db.doc<Team>('teams/' + id).collection<Checklist>('checklists').snapshotChanges()),
            map((result: any) => {
                return lodash(result).map((o) => {
                    const data = o.payload.doc.data();
                    return {
                        id: o.payload.doc.id,
                        category: data.category,
                        checklist: data.checklist,
                        name: data.name
                    };
                }).groupBy('category').values().value();
            }),
            catchError(err => err)
        );

        this.collectionSub = this.teamService._id.pipe(
            tap(id => this.collection = this.db.doc<Team>('teams/' + id).collection<Checklist>('checklists'))
        ).subscribe();

    }

    add(checklist: Checklist) {

        this.loadingService.startLoading();

        this.collection.add(checklist).then((result) => {
            this.loadingService.stopLoading();
            this.router.navigate(['checklists']);
        })
        .catch((error) => {
            this.loadingService.stopLoading();
            // TODO: Add robust error handling. Error logging, UI notification, retries etc.
            console.log('Checklist could not be created at this time');
        });
    }

    delete(id: string) {
        this.collection.doc(id).delete().then((result) => {
            this.router.navigate(['checklists']);
            this.loadingService.loading = false;
        })
        .catch((err) => {
            console.log('Cannot delete checklist', err);
            this.loadingService.loading = false;
        });
    }

    ngOnDestroy(): void {
        if (this.collectionSub) {
            this.collectionSub.unsubscribe();
        }
    }



}
