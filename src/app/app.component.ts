import {signal, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, Inject, InjectionToken, Injector, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './courses/course-card/course-card.component';
import {HighlightedDirective} from './courses/directives/highlighted.directive';
import {Observable} from 'rxjs';
import { CoursesService } from './courses/courses.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from './config';
import { CourseTitleComponent } from './course-title/course-title.component';
import { createCustomElement } from '@angular/elements';
import { CourseImageComponent } from './courses/course-image/course-image.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true, // chnaged to true
    imports: [
      
    ]
})
export class AppComponent {
  // if you want angular to be notified that your data is being changed via signals, then you need to make sure that all 
  // your data is inside a signal

  // so we turn "counter" into a signal using the angular signal API
  counter = signal(0); // this is a WritableSignal<number> (it can be changed)

  // we need to specify the "CONFIG_TOKEN" token, since the interface doesn't exist at runtime, it's a compile time construct
  constructor() {

    const readOnlySignal = this.counter.asReadonly(); // this is a Signal<number> (it can't be changed)

  }

  increment(){
    // what's the advantage of putting all your data inside a signal? The signal makes it extremely easy for angular to detect
    // that your data has changed and update it in a efficient way instead of using the default change detection, since 
    // now angular won't compare the values of the expressions of the whole component tree before and after an event (click)

    // several alternatives for modifying the signal value
    
    // 1. the set API takes a parameter as value, in this case the same value + 1 
    //this.counter.set(this.counter() + 1)

    // 2. the update API takes a function whose first argument is the current value of the signal
    this.counter.update(val => val + 1);

    
  }

}
