import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Collection as TeamsChecklistsCollection } from '../api/teams/checklists/collection';
import { Checklist } from '../api/teams/checklists/model';
import { Collection as TeamsCollection } from '../api/teams/collection';
import { Collection as TeamsInProgressCollection } from '../api/teams/in-progress/collection';
import { Team } from '../api/teams/model';
import { Collection as UsersCollection } from '../api/users/collection';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';


@Injectable()
export class PathsService implements OnDestroy {

    sub: Subscription;

    constructor(
        private db: AngularFirestore,
        private teamService: TeamService,
        private userService: UserService,
        private teamsCollection: TeamsCollection,
        private usersCollection: UsersCollection,
        private teamsChecklistsCollection: TeamsChecklistsCollection,
        private teamsInProgressCollection: TeamsInProgressCollection) {
    }

    initializePaths() {

        // Subscribe to team paths
        this.sub = this.teamService._id.subscribe((id) => {

            this.teamsChecklistsCollection.collection = this.db.doc<Team>('teams/' + id).collection<Checklist>('checklists');

        });

    }

    ngOnDestroy(): void {
        if (this.sub) { this.sub.unsubscribe(); }
    }

}