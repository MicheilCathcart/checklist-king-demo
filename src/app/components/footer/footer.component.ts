import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  currentRoute: string;
  routeSubscription: Subscription;

  constructor(
    private router: Router) {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      tap((event: any) => this.currentRoute = event.url)
      ).subscribe();
  }

  ngOnInit() {
    // Update current route
    this.currentRoute = this.router.url;
  }

  goToRoute(route: string) {
    this.router.navigate([route]);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
