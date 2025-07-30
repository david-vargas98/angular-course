import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));

// We need to use standalone app without NgModule to run the standalone root component, not the module, so,
// we need to use "bootstrapApplication(AppComponent)" and convert "AppComponent" into standalone, without modules  
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient() // this enables HttpClient for injection, is mandatory if we run from "bootstrapApplication"
  ]
})
  .catch(err => console.error(err));
