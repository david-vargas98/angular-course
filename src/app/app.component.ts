import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, Inject, InjectionToken, Injector, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
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

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit, DoCheck {

  courses: Course[] = COURSES;

  loaded = false;

  coursesTotal = this.courses.length;  // total number of courses available in the course array.

  // we need to specify the "CONFIG_TOKEN" token, since the interface doesn't exist at runtime, it's a compile time construct
  constructor(private coursesService: CoursesService, 
              @Inject(CONFIG_TOKEN) private config: AppConfig, 
              private changeDetector: ChangeDetectorRef, // change detector for this component
              private injector: Injector) { 
  }

  // this method is going to be called every time that angular is running change detection in a given component
  // if you want to do custom change detection, this is the write lifecycle hook to use
  ngDoCheck() {
    console.log("ngDoCheck")
    if(this.loaded){
      this.changeDetector.markForCheck(); // this says to angular: "This component should be checked for changes!"
      console.log("called cd.markForCheck() ")
      this.loaded = undefined;
    }
  }

  ngOnInit() {
    
    // Instantiation of angular component
    // Converts a angular component into a browser's standard custom element (web component)
    // its second parameter is mandatory, since the component can use injectable services; angular needs to know how to solve 
    // those dependencies internally, that's why we're passing the current module's injector:
    const htmlElement = createCustomElement(CourseTitleComponent, {injector: this.injector});
    
    // This registers the new element from above into the browser, so now:
    // course-title will be reognize as a valid HTML element, so now <course-title></course-title> could be use in any place 
    // of the DOM (even outside from angular, maybe in React, Vue or pure HTML)
    // A custom element could be registered only once, that's sometimes we do: 
    // if (!customElements.get('course-title')) { customElements.define('course-title', htmlElement); }
    customElements.define('course-title', htmlElement)
  }

  onEditCourse(){

    this.courses[1].category = "ADVANCED"; // if we click on edit button this will change, however the pipeline won't be applied
                                            // so, mutating the input data of the pipe durectly will not cause this type of pipe
                                            // to be retriggered on every change detection cycle, angular does this as optimization
                                            // this is because a calculation of a pipe is potencially an expensive operation
                                            // and angular wants to perform this operation a minimal number of times
                                            // so the pipe will be called only if the input of the pipe changes
                                            // THIS IS A PURE PIPE, the type that gets called only if the input data changes


  }

  save(course: Course){
      
    this.coursesService.saveCourse(course)
    .subscribe(
      () => console.log("Course saved!")
    );
  }

}
