import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from 'app/app.module';
import { environment } from 'environments/environment';
import * as fastClick from 'fastclick';

if (environment.production) {

  fastClick.attach(document.body);
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
