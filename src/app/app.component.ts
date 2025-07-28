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
    standalone: false
})
export class AppComponent implements OnInit {

  courses = COURSES;

  courses$ : Observable<Course[]>;

  // we need to specify the "CONFIG_TOKEN" token, since the interface doesn't exist at runtime, it's a compile time construct
  constructor(private coursesService: CoursesService, @Inject(CONFIG_TOKEN) private config: AppConfig) {

  }

  ngOnInit() {   
        
  }

  onEditCourse(){

    const course = this.courses[0]; // we create a "course", and we get the "courses[0]" object

    const newCourse: any = {...course} // copy of "course" using spread operator: allow us to create a new reference, this is needed 
                                       // since "OnPush" doesn't detect the changes if we don't change the obj reference

    newCourse.description = 'New Value'; // we assign the new value to the new reference

    this.courses[0] = newCourse; // we assing the new reference object to the original object

  }

  save(course: Course){
      
    this.coursesService.saveCourse(course)
    .subscribe(
      () => console.log("Course saved!")
    );
  }

}
