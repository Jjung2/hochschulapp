import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
  })
export class newsService {
    constructor(private http: HttpClient) {}
    
    //getnews
    getNewsList(): Observable<any> {
        const ParseHeaders = {
          headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
          })
        };
        return this.http.get<any[]>(
          environment.baseUri + "news",
          ParseHeaders
        );
      }

      //top course list
      getTopCourseList(): Observable<any> {
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
}