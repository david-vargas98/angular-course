import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

// Bootstraping in angular: Here we tell to angular "Hey! This is my root component, you need to load it first!"

// This is the traditional approach ranging from angular 2 to angular 14, here we define everything in the AppModule:
// Components, Pipes, Services, Root component (bootstrap: [AppComponent]) 
// angular takes the "AppModule", analyzes and then loads the root component that we've indicated 

// Modules based:
// - bootstrapModule(), we pass the "AppModule":

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));

//This is the new approach, that needs to be used for standalone applications without getting use of NgModule, so that, to run the 
// standalone root component, not the module, hence, we need to use "bootstrapApplication(AppComponent)" and convert 
// "AppComponent" into standalone (for this case), without modules

// Here "AppComponent" becomes completely indipendent (standalone: true)
// all what we need is imported and configured directly into the component
// it's lighter, more flexible and more modern, buuuuut, WE TAKE CARE of importing everythin: directives such as NgIf, pipes, 
// services, etc., because there is no longer a module which take care of it for you.

// Standalone:
// - bootstrapApplication(), we pass the "AppComponent":
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule), // DOM functionalities (ngIf, ngFor, bindings, etc); Directives such as NgIf, NgForOf
    provideAnimations(), // Support animations for angular, necessary for Angular Material or directives such as [@fade]
    provideHttpClient(withInterceptorsFromDi()) // this enables HttpClient for injection, is mandatory if we run from "bootstrapApplication"
                                              // using withInterceptorsFromDi() enables interceptors such as 
                                              // @Injectable({ providedIn: 'root' }), it's the recommended if we came from a modular app
                                               
  ]
})
  .catch(err => console.error(err));
