import {AfterViewInit, Component, ElementRef, Inject, InjectionToken, OnInit, Optional, QueryList, ViewChild, ViewChildren} from '@angular/core';
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
    standalone: false
})
export class AppComponent implements OnInit {

  courses$ : Observable<Course[]>;

  // we need to specify the "CONFIG_TOKEN" token, since the interface doesn't exist at runtime, it's a compile time construct
  constructor(@Optional() private coursesService: CoursesService, @Inject(CONFIG_TOKEN) private config: AppConfig) {
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
