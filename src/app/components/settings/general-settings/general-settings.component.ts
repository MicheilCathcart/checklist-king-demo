import { Component, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription, Observable, of } from 'rxjs';
import { Router } from '../../../../../node_modules/@angular/router';
import { Document as TeamDocument } from '../../../services/api/teams/document';
import { Team } from '../../../services/api/teams/model';
import { LoadingService } from '../../../services/loading/loading.service';
import { finalize, first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnDestroy {

  team: Team = new Team;
  teamSubscription: Subscription;
  logoPath: Observable<any>;

  constructor(
  private teamDocument: TeamDocument,
  private storage: AngularFireStorage,
  private loadingService: LoadingService,
  private router: Router) {
    this.teamSubscription = this.teamDocument.query.subscribe((team) => {
      this.team = team;
    });

  }

  back() {
    this.router.navigate(['settings']);
  }

  update() {
    this.teamDocument.update(this.team);
    this.router.navigate(['settings']);
  }

  fileChanged($event) {

    this.loadingService.loading = true;

    const file = $event.target.files[0];

    const filePath = '/client_logos/' + file.name;
    const storageRef = this.storage.ref(filePath);

    // Create the file metadata
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Upload the file
    const uploadTask = storageRef.put(file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        console.log('Finalise');
        storageRef.getDownloadURL().pipe(
          first(),
          tap((result) => {
            console.log('result', result);
            this.teamDocument.updateLogoPath(result);
          })
        ).subscribe();
        this.loadingService.loading = false;
      })
    ).subscribe();

  }

  ngOnDestroy() {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
  }

}
