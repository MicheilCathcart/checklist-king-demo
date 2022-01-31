import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { TeamService } from 'app/services/team/team.service';
import * as lodash from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { LoadingService } from '../../../loading/loading.service';
import { UserService } from '../../../user/user.service';
import { Checklist } from '../checklists/model';
import { Document as TeamDocument } from '../document';
import { Team } from '../model';


@Injectable()
export class Collection {

    collection: AngularFirestoreCollection<Checklist>;
    query: Observable<Checklist[] | {}>;

    constructor(
        private db: AngularFirestore,
        private teamService: TeamService,
        private teamDocument: TeamDocument,
        private loadingService: LoadingService,
        private router: Router,
        private userService: UserService) {

        this.query = this.teamService._id.pipe(
            tap(id => this.collection = this.db.doc<Team>('teams/' + id).collection<Checklist>('inprogress')),
            mergeMap(id => this.db.doc<Team>('teams/' + id).collection<Checklist>('inprogress').snapshotChanges()),
            map((result: any) => {
                return lodash(result).map((o) => {
                    const data = o.payload.doc.data();
                    return {
                        id: o.payload.doc.id,
                        category: data.category,
                        clientName: data.clientName,
                        date: moment.unix(data.date.seconds).toDate(),
                        checklist: data.checklist,
                        name: data.name,
                        uid: data.uid,
                        owner: data.uid === userService.id ? true : false
                    };
                }).orderBy('date', 'desc').groupBy('owner').values().value();
            }),
            catchError(err => err)
        )

    }

    add(data: Checklist) {

        this.loadingService.loading = true;

        // Convert array data to object
        // Turn into an object
        data.checklist = lodash(lodash.cloneDeep(data.checklist))
        .keyBy('index')
        .mapValues((group: any) => {
            group.tasks = lodash.keyBy(group.tasks, 'index');
            return group;
        })
        .value();

        this.collection.add(data)
        .then((result) => {
            // Navigate to the newly created checklist
            this.router.navigate(['checklists/checklist/' + result.id + '/check']);
            this.loadingService.loading = false;
        })
        .catch((err) => {
            console.log('Could not add checklist to in progress', err);
            this.loadingService.loading = false;
        });
    }


}
