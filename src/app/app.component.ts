import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {COURSES} from '../db-data';
import { Course } from './model/course';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements AfterViewInit {

    courses = COURSES; //it contains the list of all courses


    // constructor
    constructor(){

    }

    // the earliest possible moment where all the references pupulated by ViewChild are available, and it is called by the framework itself 
    ngAfterViewInit(): void {
        
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
