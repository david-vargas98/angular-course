import {signal, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, Inject, InjectionToken, Injector, OnInit, QueryList, ViewChild, ViewChildren, computed} from '@angular/core';
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

  // computed() API allows you to define a signal that is derived from one or more source signals
  derivedCounter = computed(() => { // read only signal (cannot be modified)

    const counter = this.counter();  // source (value of counter)

    return counter * 10; // returning value of the derived signal

  });

  course = signal({
    id: 1,
    title: "Angular For Beginners"
  })

  courses = signal([
    "Angular For Beginners",
    "Reactive Angular Course"
  ])

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

    // THIS IS WRONG, sice we're mutating their values directly, this bypasses the whole signal mechanism
    // when we mutate a property in a signal directly, there's no way for angular to know that the value has been mutated. AVOID IT!
    // Instead, you need to use either update() or set() methods
    // this.course().title = "Hellow world";

    // this.courses().push("Angular Core Deep Dive");

    // By doing this way, the course signal is going to be able to inform any interest consumers that the new value is available
    // that's the whole point of signals

    // THE RIGHT WAY!!!
    this.course.set({
      id: 1,
      title: "Hellow world"
    });

    this.courses.update(courses => [...courses, "Angular Core Deep Dive"])
  }

}
