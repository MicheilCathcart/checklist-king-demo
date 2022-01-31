import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Checklist } from '../checklists/model';
import { Observable } from 'rxjs';
import { Collection as InProgress } from './collection';
import { LoadingService } from '../../../loading/loading.service';
import { Router } from '@angular/router';
import * as lodash from 'lodash';
import { TeamService } from 'app/services/team/team.service';
import { map } from 'rxjs/operators';
import { values, each } from 'lodash';
import { mergeMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Team } from '../model';

@Injectable()
export class Document {

    doc: AngularFirestoreDocument<{}>;

    constructor(
        private db: AngularFirestore,
        private teamService: TeamService,
        private inProgress: InProgress,
        private loadingService: LoadingService,
        private router: Router) {
    }

    get(checklistId: string): Observable<any> {
        return this.teamService._id.pipe(
            tap(id => this.doc = this.db.doc<Team>('teams/' + id).collection<Checklist>('inprogress').doc(checklistId)),
            mergeMap(id => this.db.doc<Team>('teams/' + id).collection<Checklist>('inprogress').doc(checklistId).valueChanges()),
            map((checklist: Checklist) => {
                if (checklist) {
                    checklist.checklist = values(checklist.checklist);

                    each(checklist.checklist, (o: any) => {
                        o.tasks = values(o.tasks);
                    });

                    return checklist;

                }
            })
        );
    }

    set(data) {

    }

    delete() {
        this.loadingService.loading = true;
        this.doc.delete().then((result) => {
            this.router.navigate(['in-progress']);
            this.loadingService.loading = false;
        })
        .catch((err) => {
            console.log('Cannot delete in progress', err);
            this.loadingService.loading = false;
        });
    }

    updateState(state, groupIndex, taskIndex) {

        const stateUpdate = {};
        stateUpdate[`checklist.${groupIndex}.tasks.${taskIndex}.state`] = state;

        console.log('state, groupIndex, taskIndex', state, groupIndex, taskIndex);

        this.doc.update(stateUpdate);

    }

    sendReport(id: string) {;
        // Send email here using whatever...

        // Then delete from collection
        this.delete();
    }

}
