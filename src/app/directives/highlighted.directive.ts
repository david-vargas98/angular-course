import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[highlighted]',
  standalone: false
})
export class HighlightedDirective {

  @Input('highlighted')
  isHighLighted = false

  constructor() {
    
    console.log("Directive created.")
   
  }

  @HostBinding('class.highlighted') // we'll modify the className property, and we use it as a getter method as we do with Js
  get cssClasses(){
    return this.isHighLighted;
  }

}