import {AfterViewInit, Component, ElementRef, Inject, InjectionToken, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { CoursesService } from './services/courses.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from './config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false,
    providers: [
      //{provide: CONFIG_TOKEN, useFactory: () => APP_CONFIG} // executes a function to get "APP_CONFIG" (if you want more logic) 
      {provide: CONFIG_TOKEN, useValue: APP_CONFIG} // we can also use "useValue" which injects the actual "APP_CONFIG" object
    ]
})
export class AppComponent implements OnInit {

  courses$ : Observable<Course[]>;

  // we need to specify the "CONFIG_TOKEN" token, since the interface doesn't exist at runtime, it's a compile time construct
  constructor(private coursesService: CoursesService, @Inject(CONFIG_TOKEN) private config: AppConfig) {
    
    console.log(config);
  }

  ngOnInit() {   
    
    this.courses$ = this.coursesService.loadCourses();
    
  }

  save(course: Course){
      
    this.coursesService.saveCourse(course)
    .subscribe(
      () => console.log("Course saved!")
    );
  }

}
