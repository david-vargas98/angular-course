import { Component } from '@angular/core';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  standalone: false  //we have to explicitly specify that is a standalone component, otherwise, a compilation error will persist
})
export class CourseCardComponent {

}
