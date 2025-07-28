import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

let counter = 0;

// @Injectable({ // this is a manual provider function for our CousesService dependency
//   providedIn: 'root', // mandatory property which says where should be this service instantiated, this case, the application root
//   useFactory: (http) => new CoursesService(http),  // instantiation of the CoursesService object
//   deps: [HttpClient] // dependency for the factory function (useFactory)
// })
// @Injectable({ // manual provider function for our CousesService dependency but using "useClass", whitout using the factory function
//   providedIn: 'root',
//   useClass: CoursesService
// })
@Injectable()
export class CoursesService {

  id: number; // identifier for each instance

  constructor(private http: HttpClient) { 
    
    counter++;

    this.id = counter; // each instance gets the value of counter for its id
  }

  loadCourses(): Observable<Course[]>{
    const params = new HttpParams()
    .set("page", "1")
    .set("pageSize", "10");
    
    return this.http.get<Course[]>('/api/courses', {params});
  }

  saveCourse(course: Course): Observable<any> {

    const headers = new HttpHeaders()
    .set("X-Auth", "userId");

    return this.http.put(`/api/courses/${course.id}`, course, { headers });
  }

}
