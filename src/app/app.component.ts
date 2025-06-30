import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {COURSES} from '../db-data';
import { Course } from './model/course';
import { CourseCardComponent } from './course-card/course-card.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements AfterViewInit {

    courses = COURSES; //it contains the list of all courses

    // @ViewChildren(CourseCardComponent)
    // cards: QueryList<CourseCardComponent>; // we use QueryList for a list of elements and '<>' for its type

    @ViewChildren(CourseCardComponent, {read: ElementRef}) // we can also pass an auxiliary conf element to get the DOM ElementRef for each matching result
    cards: QueryList<ElementRef>; // the type also changes

    // constructor
    constructor(){

    }

    // the earliest possible moment where all the references pupulated by ViewChild are available, and it is called by the framework itself 
    ngAfterViewInit(): void {

        console.log(this.cards)

        // this.cards.changes.subscribe(
        //     cards => console.log(cards)
        // ); // emits multiple values over time as the collection gets modified, i.e. its state gets changed

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
