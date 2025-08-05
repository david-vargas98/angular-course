import { Injectable, signal } from "@angular/core";

// 1- By doing this no other part of the application can freely modify this signal without this class allowing it

// 2- We want to inject the counter service in multiple parts of our application and access the value of the signal but not modify it

@Injectable({
    providedIn: 'root'
})
export class CounterService{

    private counterSignal = signal(0); // 1- only this class can access it and its set and update methods

    readonly counter = this.counterSignal.asReadonly(); // 2- We don't want other parts of the application to modify this counter
    
    // we need to expose some sort of public API to this service to allow any other interested parties in the app to modify the
    // signal, but in a controlled way.
    increment(){
        //some validation that only need to be written once for the whole application
        if(this.counter() > 10){
            throw new Error("Maximium value reached!");
        }

        this.counterSignal.update(val => val + 1); // the advantag of doing this is that the counter signal cannot be accessed by
                                                    // other parts of the application

    }


}