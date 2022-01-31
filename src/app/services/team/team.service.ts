import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Team } from '../api/teams/model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class TeamService implements OnDestroy {

    _id = new BehaviorSubject<string>(null);
    id: string;
    teamSettings: Team;
    id$ = new ReplaySubject();
    teamSub: Subscription;

    constructor(private db: AngularFirestore) {
    }

    setCurrentTeam(id: string) {

        this._id.next(id);
        this.id$.next(id);
        this.id = id;

        // Get the team info
        this.teamSub = this.db.doc<Team>('teams/' + id).valueChanges().subscribe((result) => {
            this.teamSettings = result;
        });
    }

    ngOnDestroy(): void {
        if (this.teamSub) { this.teamSub.unsubscribe(); }
    }

}
