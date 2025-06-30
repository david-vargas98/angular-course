import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import { HighlightedDirective } from './directives/highlighted.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements AfterViewInit {

    courses = COURSES;

    // a direct way to get the 'HighlightedDirective' directive from the element of 'CourseCardComponent' type
    @ViewChild(CourseCardComponent, { read: HighlightedDirective})
    highlighted: HighlightedDirective;


    @ViewChildren(CourseCardComponent, {read: ElementRef})
    cards : QueryList<ElementRef>;


    constructor() {

    }

    onToggle(isHighLighted: boolean){
        
        console.log(isHighLighted)
    }

    ngAfterViewInit() {
        console.log(this.highlighted)
    }

    onCourseSelected(course:Course) {

    }

}
