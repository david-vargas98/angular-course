import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
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


    // constructor
    constructor(){

    }

    onToggle(isHighLighted: boolean){
        
        console.log(isHighLighted)
    }

    ngAfterViewInit() {
        console.log(this.highlighted)
    }

    onCoursesEdited(){
        this.courses.push(
            {
                id: 1,
                description: "Angular core deep dive",
                iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png',
                longDescription: "A detailed walk-through of the most important part of Angular - the Core and Common modules",
                category: 'INTERMEDIATE',
                lessonsCount: 10
            }
        );
    }

    onCourseSelected(course:Course){
        
    }
    // tracking function  
    trackCourse(index: number, course:Course){
        return course.id // returns a unique identifier gor each object
    }


}
