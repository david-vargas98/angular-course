import {
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
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Self,
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
export class CourseCardComponent implements OnInit, OnDestroy {

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

    // if the component has any initialization logic, this is the correct place to put that logic  
    ngOnInit() {
        console.log("ngOnInit", this.course) // otherwise, the "course" omponent input (variable) is now initialized
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
