import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, Inject, InjectionToken, Injector, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './courses/course-card/course-card.component';
import {HighlightedDirective} from './courses/directives/highlighted.directive';
import {Observable} from 'rxjs';
import { CoursesService } from './courses/courses.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from './config';
import { CourseTitleComponent } from './course-title/course-title.component';
import { createCustomElement } from '@angular/elements';
import { CourseImageComponent } from './courses/course-image/course-image.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true, // chnaged to true
    imports: [
      
    ]
})
export class AppComponent {

  counter: number = 0;

  // we need to specify the "CONFIG_TOKEN" token, since the interface doesn't exist at runtime, it's a compile time construct
  constructor() { 
  }

  increment(){
    this.counter++;
  }

}
