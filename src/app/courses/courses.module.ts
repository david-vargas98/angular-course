import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
import { CoursesService } from './courses.service';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';
import { FilterByCategoryPipe } from './filter-by-category.pipe';


// we get rid of declarations and exports array contents since they will be standalone

@NgModule({
  declarations: [

  ],
  providers:[

  ],
  imports: [
  // we get rid of CommonModule, this is already imported in the pertinent components (or better separated components one by one)
  ],
  exports: [

  ]
})
export class CoursesModule { }
