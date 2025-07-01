import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngxUnless]',
  standalone: false
})
export class NgxUnlessDirective {

  visible = false;

  /*
    params:
    - templateRef: it represents the template's content, i.e. represents what's inside of <ng-template> (<course-image>)
    - viewContainer: it is the place it goes on the DOM where Angular can whether insert or take off that content 
  */ 
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {

  }

  @Input()
  set ngxUnless(condition: boolean){
    if (!condition && !this.visible){
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.visible = true;

    } else if (condition && this.visible) {
      this.viewContainer.clear();
      this.visible = false;
    }
  }

}
