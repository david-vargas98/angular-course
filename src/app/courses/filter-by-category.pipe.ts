import { Pipe, PipeTransform } from "@angular/core";
import { Course } from "../model/course";

@Pipe({
    name: 'filterByCategory',
    standalone: false,
    pure: false // if we want to make this pipe get executed for example, when a property value changes, just add pure property
                // so this way, the inpure pipe is going to get called in every angular change detection cycle  
})
export class FilterByCategoryPipe implements PipeTransform {

    // logic paste in here needs to be very lightweight in order to prevent any performance issue if possible, it's always better 
    // to make our pipes PURE and only resort to impure pipes if we absolutely need to.
    
    //The problem with impure pipes is that if we do here some sort of expensive computation that might cause the whole user 
    // experience to degrade as the user interface become very slow
    
    transform(courses: Course[], category: string) {

        console.log("Called transform()");

        return courses.filter(course => course.category === category)        
    }
}