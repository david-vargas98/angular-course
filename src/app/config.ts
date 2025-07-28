import { InjectionToken } from "@angular/core";

// Object type: what the application configuration contains
export interface AppConfig{
    apiUrl: string; // backend API url
    courseCacheSize: number; // caching for ceratin amount of course
}
// instance of 'Appconfig' type
export const APP_CONFIG:AppConfig = {
    apiUrl: 'http://localhost:9000',
    courseCacheSize: 10
}
// injection token, by making the plain Js object above injectable
export const CONFIG_TOKEN = new InjectionToken<AppConfig>(
    'CONFIG_TOKEN', 
    { 
        providedIn: 'root', // token avaiable to global scope
        factory: () => APP_CONFIG // this is how we get the value and "APP_CONFIG" will be included only if it's really NECESSARY
    }
)