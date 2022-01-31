import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '../../../../../node_modules/@angular/router';
import { LoadingService } from '../../loading/loading.service';
import { TeamService } from '../../team/team.service';
import { Team } from './model';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { tap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable()
export class Document {

    query: Observable<Team>;
    inviteQuery: Observable<any>;
    doc: AngularFirestoreDocument<Team>;

    // Temporarily here if required
    _doc: BehaviorSubject<AngularFirestoreDocument<Team>> = new BehaviorSubject(null);

    constructor(
        private db: AngularFirestore,
        private teamService: TeamService,
        private loadingService: LoadingService,
        private router: Router) {

        // Create the query
        this.query = this.teamService._id.pipe(
            tap(id => this.doc = this.db.doc<Team>('teams/' + id)),
            mergeMap(id => this.db.doc<Team>('teams/' + id).valueChanges())
        );

        // Create the invite query
        this.inviteQuery = this.teamService._id.pipe(
            mergeMap(id => this.db.doc<Team>('teams/' + id).snapshotChanges()),
            map((result: any) => {
                return {
                    id: result.payload.id,
                    name: result.payload.data().name,
                    replyToEmail: result.payload.data().replyToEmail
                };
            }),
            catchError(err => err)
        );

    }

    update(team: Team | {}) {

        this.loadingService.loading = true;

        this.doc.update(Object.assign({}, team)).then((result) => {
            this.loadingService.loading = false;
        })
        .catch((err) => {
            console.log('Cannot edit team', err);
            this.loadingService.loading = false;
        });
    }

    updateLogoPath(path: string) {
        this.doc.update(Object.assign({}, { logoPath: path })).then((result) => {
            this.loadingService.loading = false;
        })
        .catch((err) => {
            console.log('Cannot edit logo path', err);
            this.loadingService.loading = false;
        });
    }

}
