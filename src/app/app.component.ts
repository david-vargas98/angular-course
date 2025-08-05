import {signal, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, Inject, InjectionToken, Injector, OnInit, QueryList, ViewChild, ViewChildren, computed, effect, EffectRef, Input, Output, EventEmitter} from '@angular/core';
import { CounterService } from './services/counter.service';
import { Course } from './model/course';
import { COURSES } from 'src/db-data';
import { CourseImageComponent } from './courses/course-image/course-image.component';
import { CourseCardComponent } from './courses/course-card/course-card.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true, // chnaged to true
    imports: [
      CourseImageComponent,
      CourseCardComponent
    ]
})
export class AppComponent implements OnInit {
  
  @Input()
  course: Course;

  courses: Course[] = COURSES;

  @Output('courseChanged')
  courseEmitter = new EventEmitter<Course>();

  ngOnInit() {
    
  }

  onTitleChanged(newTitle: string){

    this.course.description = newTitle;

  }

  constructor(){
  }

}
