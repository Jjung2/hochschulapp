import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
  })
export class courseService {
    constructor(private http: HttpClient) {}

    // get categories
    getCategories(): Observable<any> {
        const ParseHeaders = {
          headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
          })
        };
        return this.http.get<any[]>(
          environment.baseUri + "topcourses",
          ParseHeaders
        );
      }

      //get all courses
      getAllCourses(): Observable<any> {
        const ParseHeaders = {
          headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
          })
        };
        return this.http.get<any[]>(
          environment.baseUri + "courses",
          ParseHeaders
        );
      }
}