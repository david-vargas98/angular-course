import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
import { CoursesService } from './courses.service';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';



@NgModule({
  declarations: [
    CourseCardComponent, // this component now is part of the courses module
    CourseImageComponent,
    HighlightedDirective,
    NgxUnlessDirective
  ],
  providers:[
    CoursesService
  ],
  imports: [
    CommonModule // this contains the common directives such as ngFor, ngIf, etc.
  ],
  exports: [
    CourseCardComponent,
    CourseImageComponent
  ]
})
export class CoursesModule { }
