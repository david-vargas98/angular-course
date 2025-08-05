import {signal, Component, OnInit, Output, EventEmitter, input} from '@angular/core';
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
  
  // instead of @Input decorator, we can use the angular input signal primitive
  course = input<Course>();

  courses: Course[] = COURSES;

  @Output('courseChanged')
  courseEmitter = new EventEmitter<Course>();

  ngOnInit() {
    
  }

  onTitleChanged(newTitle: string){

    this.course().description = newTitle;

  }

  onSaveClicked(description: string){
    this.courseEmitter.emit({...this.course(), description});
  }

}
