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
    constructor(private coursesService: CoursesService, 
        @Attribute('type') private type: string,
        private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit() {
        console.log(this.type)
    }

    onTitleChanged(newTitle: string){
        
        this.course.description = newTitle;
    }

    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }




}
