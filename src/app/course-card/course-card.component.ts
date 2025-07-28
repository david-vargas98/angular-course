import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
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
    providers: [
        CoursesService // this is needed to create multiple instances,  however, the provider/dependency is still loaded, 
                       // since the child component asks to its multiple parent components for the dependency
    ]
})
export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();

    // @Self overrides the default behaviour of dependency injection: this forces "CoursesService" dependency 
    // to not come from a parent component, but ONLY from the component itself.

    // @SkipSelf overrides the default behaviour of dependency injection: this forces "CoursesService" dependency 
    // to ONLY come from a parent component, and not from the current component. So, the instance will not be searched from 
    // using the local provider "providers:[]".
    constructor(@SkipSelf() private coursesService: CoursesService) {

    }

    ngOnInit() {

    }


    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }




}
