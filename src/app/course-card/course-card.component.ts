import { Component, Input } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  standalone: false  //we have to explicitly specify that is a standalone component, otherwise, a compilation error will persist
})
export class CourseCardComponent {
  // //we need to import the Input on top
  // @Input() //we annote the variable with the input decorator, we're sayin' "hey, here goes a property from outside!"
  // title:string //we use this member variable

  //now, instead of the above, we are going to "import" the complete object defined on 'src\app\model\course.ts'
  @Input({
    required: true //this feature allows us to make an input required, this one. by default is set to false 
  })
  course:Course

    
}
