import { Directive } from '@angular/core';

@Directive({
  selector: '[highlighted]',
  standalone: false
})
export class HighlightedDirective {

  constructor() {
    
    console.log("Directive created.")
   
  }

}