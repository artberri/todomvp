import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { TodoLocalStorageService } from './services';
import { bootstrap } from '../../app/src';

if (environment.production) {
  enableProdMode();
}

bootstrap(TodoLocalStorageService);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
