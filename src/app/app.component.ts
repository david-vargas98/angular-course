import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, Inject, InjectionToken, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, DoCheck {

  courses: Course[] = COURSES;

  loaded = false;

  // we need to specify the "CONFIG_TOKEN" token, since the interface doesn't exist at runtime, it's a compile time construct
  constructor(private coursesService: CoursesService, 
              @Inject(CONFIG_TOKEN) private config: AppConfig, 
              private changeDetector: ChangeDetectorRef) { // change detector for this component
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
    
    
  }

  onEditCourse(){

    //this.courses[0].description = "ngOnChanges"; // this is not detected by angular as a change, only @Input properties are

    const course = this.courses[0]; // we get the first course "[0]"

    const newCourse = {  // we create the new object
      ...course,
      description: "ngOnChanges"
    };

    this.courses[0] = newCourse; // we assign the new object, angular will detect a change since it's a different obj reference

  }

  save(course: Course){
      
    this.coursesService.saveCourse(course)
    .subscribe(
      () => console.log("Course saved!")
    );
  }

}
