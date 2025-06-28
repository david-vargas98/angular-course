import { Component, Input, EventEmitter, Output, input } from '@angular/core';
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

  @Input({required: true})
  index: number

  @Input({required: true})
  cardIndex : number
  
  //this creates the event here, in the child component and it says that will emit an event
  @Output('courseSelected') // we can assign another name for the output if we want to: @Output('another), in html:(another)="onCourseSelected($event)" or just leave it empty and it will take the variable name
  //custom event emitter: we pass an optional type parameter which define what type of values are getting emitted 
  courseEmitter = new EventEmitter<Course>() // Event creation, event which will be emitted from the child (that's why of @output)

  onCourseViewed(){
    console.log("HELLLOOO on course-card")

    this.courseEmitter.emit(this.course) //this is gonna emmit the event 'courseSelected' and sends 'this.course' as data
  }

  isImageVisible(){
    return this.course && this.course.iconUrl;
  }
  // this function is used for the ngClass directive
  cardClasses(){
    if(this.course.category == 'BEGINNER')
      return 'beginner'
    else if(this.course.category == 'INTERMEDIATE')
      return 'intermediate'
    else{
      return 'advanced'
    }
  }

  // this function is used for ngStyle directive
  cardStyles(){
    return {'background-image': 'url(' + this.course.iconUrl + ')'};
  }
}
