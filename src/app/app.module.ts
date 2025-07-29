// node imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// components and directives that are part of the application
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

/**
 * Angular module: is an organizational unit where we can put together components, directives and services that are tighly related 
 *                 (as well as Pipes). For example, many of the components and directives that we have been building so far in 
 *                 this course, are tighly related. 
 * We might want to group all of these components, directives, pipes and services into a common module that we can publish 
 * independently of our application and make it available for third party applications, so that is a module.
 */

// @NgModule converts a class (imports) into an anguler module.
// declarations: here goes all of that this module "knows" and manages directly.
// Bootstrap: Here we indicate which component is the main entry point for the application.
// Imports: BrowserModule-> allows angular to work on the browser; BrowserAnimationsModule -> necessary if you use animations
// Providers: Global services are defined in here, available throughout the app.
@NgModule({ declarations: [
        AppComponent,
        CourseCardComponent,
        CourseImageComponent,
        HighlightedDirective,
        NgxUnlessDirective
    ],
    bootstrap: [AppComponent], imports: [BrowserModule, 
        BrowserAnimationsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
