import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[highlighted]',
  standalone: false
})
export class HighlightedDirective {

  @Input('highlighted')
  isHighLighted = false

  // custom event
  @Output()
  toggleHighLight = new EventEmitter();

  constructor() {
    
    console.log("Directive created.")
   
  }

  @HostBinding('class.highlighted') // we'll modify the className property, and we use it as a getter method as we do with Js
  get cssClasses(){
    return this.isHighLighted;
  }

  @HostListener('mouseover', ['$event']) // if we need the event object we can gt it like this with ['$event']
  mouseOver($event){
    console.log($event)
    this.isHighLighted = true;
    this.toggleHighLight.emit(this.isHighLighted);
  }

  @HostListener('mouseleave')
  mouseLeave(){
    this.isHighLighted = false;
    this.toggleHighLight.emit(this.isHighLighted);
  }

}