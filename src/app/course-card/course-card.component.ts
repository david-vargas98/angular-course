import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Self,
    SimpleChanges,
    SkipSelf,
    ViewEncapsulation
} from '@angular/core';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush // avoids using default behaviour, so, angular won't try to detect changes  
})
export class CourseCardComponent implements OnInit, OnDestroy, OnChanges, AfterContentChecked {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();

    // constructor should only be used for taking dependencies and save them in member variables (component variables) 
    constructor(private coursesService: CoursesService, 
        @Attribute('type') private type: string) {
            console.log("constructor", this.course) // component inputs such as "course" are not initiliazed yet
    }

    // this lifecycle hook is called by angular whenever something occurs in the component lifecycle
    // this method is not meant for us to call it directly, also takes an argument, the "changes argument"
    ngOnChanges(changes) {
        console.log("ngOnChanges", changes)
    }

    // if the component has any initialization logic, this is the correct place to put that logic  
    ngOnInit() {
        console.log("ngOnInit", this.course) // otherwise, the "course" omponent input (variable) is now initialized
    }

    //this lifecycle hook is called whenever angular checks the content part of this component, which is between "ng-content"
    // so, this method is gonna be called with EVERY EVENT that angular is handling
    // if logic is implemented here we need to be careful, since we perform high-cost operations, performance will decrease
    // If you are looking for a place to modify some data last secondafter each change detection cycle, this is the place to do it
    // but, be aware you won't be able to modufy properties that are part of the content/part of the component
    ngAfterContentChecked() {

        console.log("ngAfterContentChecked")

        this.course.description = "ngAfterContentChecked";

        this.course.category = "ADVANCED";

        //this.course.iconUrl = ""; // this is not allowed, since, this property is used in the content part of the course, ERROR
        
    }

    // this lifecycle hook is called whenever the component gets destroyed, is a great place for relesing any resources such as
    // long running observables, also this is the reight place to unsuscribe from connections if you want to
    ngOnDestroy() {
        console.log("ngOnDestroy")
    }

    onTitleChanged(newTitle: string){
        
        this.course.description = newTitle;
    }

    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }




}
