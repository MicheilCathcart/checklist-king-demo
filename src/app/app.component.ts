import { Component } from '@angular/core';
import { LoadingService } from './services/loading/loading.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loader: LoadingService;

  constructor(loader: LoadingService, afs: AngularFirestore, private auth: AuthService) {
    this.loader = loader;
    this.auth.initialise();
  }

}
