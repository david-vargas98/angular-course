import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    ContentChildren,
    DoCheck,
    effect,
    ElementRef,
    EventEmitter,
    Inject,
    input,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Self,
    SimpleChanges,
    SkipSelf,
    ViewEncapsulation
} from '@angular/core';
import {Course} from '../../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';
import { CoursesService } from '../courses.service';
import { CommonModule, NgIf } from '@angular/common';
import { CourseTitleComponent } from 'src/app/course-title/course-title.component';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    standalone: true,
    imports: [/*CommonModule*/ NgIf, CourseTitleComponent] // CommonModule includes ngIf, ngSwith for standalone components, but in this instance the
                            // ngIf used to show the cards in course-card.component.html
})
export class CourseCardComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewChecked, 
    AfterContentInit, AfterViewInit, DoCheck {

    course = input<Course>(null, {
        alias: "tutorial" // this alias property allows us to define an alternative name for the input
        //transform: // we can also use transform
    });

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();

    // constructor should only be used for taking dependencies and save them in member variables (component variables)
    // we DON'T initialize anythin in here
    constructor(private coursesService: CoursesService, 
        @Attribute('type') private type: string) {
            effect(() => { // dependency between "course" variable and "effect" signal

                console.log("New course value:", this.course())

            });
    }

    // if the component has any initialization logic, this is the correct place to put that logic
    // also this is the right place to implement initialization logic, instead of putting it inside the constructor
    ngOnInit() {
        console.log("ngOnInit", this.course()) // otherwise, the "course" omponent input (variable) is now initialized

        const description = computed(() => {
            console.log("Computed log.")
            const course = this.course();

            return course.description + `( ${course.category} )`;
        });
    }
    
    // best place to implement any custom change detection logic that we might need: this should occur only in rare occasions but 
    // but if we need it, this is the correct lifecycle hook to call.

    // ----- Is called every time that there is a change detection run in our application ----- //
    ngDoCheck() {
        console.log("ngDoCheck");
    }

    // Here, angular is going to initialize the content part of the component: so if you're doing here any content, child or 
    // content children queries at the level of our component, this is the best place to put any initialization logic that might 
    // need variables that are populated using content shell, or content children
    ngAfterContentInit() {
        console.log("ngAfterContentInit");
    }

    // in a similar way, if we do any queires in our component to the template itself using, for example the @ViewChild decorator, 
    // then, any initialization logic that needs variables populated by view child should be put here in ngAfterViewInit.

    // So, all of these methods: ngOnInit, ngAfterContentInit and ngAfterViewInit are each going to be called once during the 
    // whole life cycle of the component and in this order: ngOnInit -> ngAfterContentInit -> ngAfterViewInit
    ngAfterViewInit() {
        console.log("ngAfterViewInit");
    }

    //this lifecycle hook is called whenever angular checks the content part of this component, which is between "ng-content"
    // so, this method is gonna be called with EVERY EVENT that angular is handling
    // if logic is implemented here we need to be careful, since we perform high-cost operations, performance will decrease
    // If you are looking for a place to modify some data last secondafter each change detection cycle, this is the place to do it
    // but, be aware you won't be able to modufy properties that are part of the content/part of the component

    // ----- Is called every time that there is a change detection run in our application ----- //
    ngAfterContentChecked() {

        console.log("ngAfterContentChecked")

        // this.course.description = "ngAfterContentChecked";

        // this.course.category = "ADVANCED";

        //this.course.iconUrl = ""; // this is not allowed, since, this property is used in the content part of the course, ERROR
        
    }

    // in this lifecycle hook, the component "<course-card>" executes "ngAfterViewChecked()", occurs after rendering the component 
    // template, i.e. after ngAfterViewInit(). Agter each change detection on the view component, on each detection cycle, while 
    // pressing a button or making an input change. 
    // we can't modify the data displayed by the component, since the DOM has already been rendered and checked

    // it could be useful while implementing a scroll logic for a list of cards, cause' at this point the new elements have been 
    // already applied by angular to the DOM, so if we call scroll at that moment in time, then we will efectively see some 
    // scrolling on the screen

    // as had been said, this method could be useful to perform common DOM operations, such as scrolling to the bottom of a list 
    // setting the focus of a given element etc, elements that were not present in the beginning of the change detection execution 
    // The code that we'll put in here must be very lighweight. Heavy operations will slow down the application performance

    // ----- Is called every time that there is a change detection run in our application ----- //
    ngAfterViewChecked() {
        console.log("ngAfterViewChecked");

        //this.course.description = "ngAfterViewChecked"; // a NG0100 error will be thrown if angular finds something that has changed 
                                                        // between the first and second verification whithin the same cycle.
    }

    // this lifecycle hook is called whenever the component gets destroyed, is a great place for relesing any resources such as
    // long running observables (sync pipe is better, though), also this is the right place to unsuscribe from connections 
    // if you want to
    ngOnDestroy() {
        console.log("ngOnDestroy");
    }

    onTitleChanged(newTitle: string){
        
        this.course().description = newTitle;
    }

    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course(), description});

    }




}
