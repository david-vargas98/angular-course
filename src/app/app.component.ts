import {signal, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, Inject, InjectionToken, Injector, OnInit, QueryList, ViewChild, ViewChildren, computed, effect, EffectRef} from '@angular/core';
import { CounterService } from './services/counter.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true, // chnaged to true
    imports: [
      
    ]
})
export class AppComponent {
  // if you want angular to be notified that your data is being changed via signals, then you need to make sure that all 
  // your data is inside a signal

  // computed() API allows you to define a signal that is derived from one or more source signals
  derivedCounter = computed(() => { // read only signal (cannot be modified)
    
    const counter = this.counterService.counter();  // source (value of counter)
    
    return counter * 10; // returning value of the derived signal

  });

  constructor(public counterService: CounterService) { // injecting the "CounterService" service

  }

  increment(){
  
    this.counterService.increment(); // caling the increment method from the service (computed gets executed)

  }

}
