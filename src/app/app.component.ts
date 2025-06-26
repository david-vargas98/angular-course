import { Component } from '@angular/core';
import {COURSES} from '../db-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {

    coreCourse = COURSES[0]; // we get the data from ../db-data for the coreCourse
    rxJsCourse = COURSES[1]; //and the same for these two
    ngrxCourse = COURSES[2]; //this is done to get this info at the level of the template file 'app.component.html'


}
