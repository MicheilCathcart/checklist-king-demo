import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { LoadingService } from '../../../loading/loading.service';
import { TeamService } from '../../../team/team.service';
import { Team } from '../model';
import { Checklist } from './model';
import { map } from 'rxjs/operators';
import { values, each } from 'lodash';

@Injectable()
export class Document {

    doc: AngularFirestoreDocument<any>;

    constructor(
        private db: AngularFirestore,
        private teamService: TeamService,
        private loadingService: LoadingService,
        private router: Router) {
    }

    get(checklistId: string): Observable<any> {
        return this.teamService._id.pipe(
            tap(id => this.doc = this.db.doc<Team>('teams/' + id).collection<Checklist>('checklists').doc(checklistId)),
            mergeMap(id => this.db.doc<Team>('teams/' + id).collection<Checklist>('checklists').doc(checklistId).valueChanges()),
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

    update(checklist: Checklist) {

        this.loadingService.loading = true;

        this.doc.update(Object.assign({}, checklist)).then((result) => {
            this.router.navigate(['checklists']);
            this.loadingService.loading = false;
        })
        .catch((err) => {
            console.log('Cannot edit checklist', err);
            this.loadingService.loading = false;
        });
    }

    delete() {
        this.loadingService.loading = true;
        this.doc.delete().then((result) => {
            this.router.navigate(['checklists']);
            this.loadingService.loading = false;
        })
        .catch((err) => {
            console.log('Cannot delete checklist', err);
            this.loadingService.loading = false;
        });
    }

}