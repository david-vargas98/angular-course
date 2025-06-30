import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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

    // viewchild lesson
    @ViewChild('cardRef1', { read: ElementRef }) // instead of the componente name "CourseCardComponent", we can pass a template reference such as 'cardRef1'
    card1: CourseCardComponent;

    @ViewChild('cardRef2')
    card2: CourseCardComponent;

    // querying plain html elements
    @ViewChild('courseImage') //it's not possible since the 'courseImage' is inside the child component "ng-container"
    courseImage: ElementRef;

    // constructor
    constructor(){

    }

    // the earliest possible moment where all the references pupulated by ViewChild are available, and it is called by the framework itself 
    ngAfterViewInit(): void {
        console.log("courseImage:", this.courseImage) // here is renderized, so it's available to access

        this.courses[0].description = 'test';
    }

    onCourseSelected(course:Course){
        
    }
    // tracking function  
    trackCourse(index: number, course:Course){
        return course.id // returns a unique identifier gor each object
    }


}
