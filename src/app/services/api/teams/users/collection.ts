import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { TeamService } from 'app/services/team/team.service';
import * as lodash from 'lodash';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { InviteService } from '../../../invite/invite.service';
import { LoadingService } from '../../../loading/loading.service';
import { Team } from '../model';
import { User } from './model';

@Injectable()
export class Collection {

    collection: AngularFirestoreCollection<User>;
    query: Observable<User[] | {}>;

    constructor(
        private db: AngularFirestore,
        private teamService: TeamService,
        private loadingService: LoadingService,
        private inviteService: InviteService,
        private router: Router) {

            this.query = this.teamService._id.pipe(
                tap(id => console.log('Subscribed to Team Users Collection')),
                tap(id => this.collection = this.db.doc<Team>('teams/' + id).collection<User>('users')),
                mergeMap(id => this.db.doc<Team>('teams/' + id).collection<User>('users').snapshotChanges()),
                map((result: any) => {
                    return lodash(result).map((o) => {
                        const data = o.payload.doc.data();
                        return {
                            id: o.payload.doc.id,
                            name: data.name,
                            role: data.role
                        };
                    }).groupBy('role').orderBy('name').values().value();
                }),
                catchError(err => err)
            );

    }



    /* tslint:disable:no-bitwise whitespace */

    createGuid() {
        const lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
        const d0 = Math.random()*0xffffffff|0;
        const d1 = Math.random()*0xffffffff|0;
        const d2 = Math.random()*0xffffffff|0;
        const d3 = Math.random()*0xffffffff|0;
        return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
            lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
            lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
            lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
    }

    /* tslint:enable */

    add(user: User) {

        this.loadingService.startLoading();

        // user.inviteGuid = this.createGuid();

        this.collection.add(user).then((result) => {
            user.id = result.id;
            this.inviteService.sendInvite(user);
        })
        .catch((error) => {
            this.loadingService.stopLoading();
            // TODO: Add robust error handling. Error logging, UI notification, retries etc.
            console.log('User could not be added at this time');
        });
    }

    delete(id: string) {
        this.collection.doc(id).delete().then((result) => {
            this.router.navigate(['settings/users']);
            this.loadingService.loading = false;
        })
        .catch((err) => {
            console.log('Cannot delete user', err);
            this.loadingService.loading = false;
        });
    }



}
