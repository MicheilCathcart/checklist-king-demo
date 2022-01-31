import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Team } from '../model';
import { LoadingService } from '../../../loading/loading.service';
import { Document as TeamDocument } from '../document';
import * as lodash from 'lodash';
import { Report } from 'app/services/report/model';
import { Observable } from 'rxjs';
import { TeamService } from 'app/services/team/team.service';

import { tap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class Collection {

    collection: AngularFirestoreCollection<Report>;
    query: Observable<Report[] | {}>;

    constructor(
        private db: AngularFirestore,
        private teamDocument: TeamDocument,
        private teamService: TeamService,
        private loadingService: LoadingService) {

        this.query = this.teamService._id.pipe(
            tap(id => console.log('Subscribed to Complete Collection')),
            tap(id => this.collection = this.db.doc<Team>('teams/' + id).collection<Report>('completed')),
            mergeMap(id => this.db.doc<Team>('teams/' + id).collection<Report>('completed').valueChanges()),
        );

    }

    add(report: Report) {

        this.loadingService.loading = true;

        // Convert array data to object
        // Turn into an object
        report.checklist.checklist = lodash(lodash.cloneDeep(report.checklist.checklist))
        .keyBy('index')
        .mapValues((group: any) => {
            group.tasks = lodash.keyBy(group.tasks, 'index');
            return group;
        })
        .value();

        this.collection.add(Object.assign({}, report))
        .then((result) => {
            this.loadingService.loading = false;
        })
        .catch((err) => {
            console.log('Could not add checklist to completed', err);
            this.loadingService.loading = false;
        });
    }


}
