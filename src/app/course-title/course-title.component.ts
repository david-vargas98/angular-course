import { Component, Input } from '@angular/core';

@Component({
  selector: 'course-title',
  imports: [],
  templateUrl: './course-title.component.html',
  styleUrl: './course-title.component.css'
})
export class CourseTitleComponent {

  @Input()
  title:string;

}
