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
export const CONFIG_TOKEN = new InjectionToken<AppConfig>('CONFIG_TOKEN')