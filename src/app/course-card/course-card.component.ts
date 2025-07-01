import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output, QueryList, TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {COURSES} from '../../db-data';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    encapsulation: ViewEncapsulation.Emulated, // there exists ShadowDom, None and Emulated (default) encapsulations for element components and its CSS
    standalone: false //we have to explicitly specify that is a standalone component, otherwise, a compilation error will persist
})
export class CourseCardComponent implements AfterViewInit {
  // //we need to import the Input on top
  // @Input() //we annote the variable with the input decorator, we're sayin' "hey, here goes a property from outside!"
  // title:string //we use this member variable

  //now, instead of the above, we are going to "import" the complete object defined on 'src\app\model\course.ts'
  @Input({
    required: true //this feature allows us to make an input required, this one. by default is set to false 
  })
  course:Course

  @Input()
  index: number

  @Input()
  cardIndex : number

  @Input()
  noImageTemplate: TemplateRef<any>;
  
  //this creates the event here, in the child component and it says that will emit an event
  @Output('courseSelected') // we can assign another name for the output if we want to: @Output('another), in html:(another)="onCourseSelected($event)" or just leave it empty and it will take the variable name
  //custom event emitter: we pass an optional type parameter which define what type of values are getting emitted 
  courseEmitter = new EventEmitter<Course>() // Event creation, event which will be emitted from the child (that's why of @output)

  // we can't use ViewChild since it can only view the content of the own component, that's why we use 'ContentChild', works for ng-content
  // @ContentChild(CourseImageComponent) // we can pass a template reference 'container' or the type 'CourseImageComponent'
  // courseImg: CourseCardComponent;

  // @ContentChild(CourseImageComponent, {read: ElementRef}) // we can get the native DOM element instead of the component instance
  // courseImg: ElementRef;

  // @ContentChildren(CourseImageComponent) // for several objects
  // courseImages: QueryList<CourseImageComponent>

  @ContentChildren(CourseImageComponent, {read: ElementRef}) // for several objects
  courseImages: QueryList<ElementRef>

  // @ContentChild(CourseImageComponent, {read: ElementRef}) // we can get the native DOM element instead of the component instance
  // courseImg: ElementRef;

  ngAfterViewInit(): void {

  }

  ngAfterContentInit(): void {
    console.log(this.courseImages);
  }

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
