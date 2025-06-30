import { Component, ElementRef, ViewChild } from '@angular/core';
import {COURSES} from '../db-data';
import { Course } from './model/course';
import { CourseCardComponent } from './course-card/course-card.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {

    courses = COURSES; //it contains the list of all courses

    startDate = new Date(2000, 0, 1)

    title = COURSES[0].description;

    price = 9.99;

    rate = 0.67

    course = COURSES[0];

    // viewchild lesson
    @ViewChild('cardRef1', { read: ElementRef }) // instead of the componente name "CourseCardComponent", we can pass a template reference such as 'cardRef1'
    card1: CourseCardComponent;

    @ViewChild('cardRef2')
    card2: CourseCardComponent;

    // querying plain html elements
    @ViewChild('container')
    containerDiv: ElementRef;

    onCourseSelected(course:Course){
        console.log("containerDiv", this.card1) //instead of console.log each element we can take the whole container
    }
    // tracking function  
    trackCourse(index: number, course:Course){
        return course.id // returns a unique identifier gor each object
    }

}
