import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { newsService } from "../Services/newsServices";
import { courseService } from '../Services/courseServices';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
   queryStringData:any;
   allCourses:any;
   courseDetils:any;
   isLoggedin=false;
   signedUpedCourses=[]
  constructor(private router:Router,private route: ActivatedRoute,private myNewsServices: newsService,private mycourseService:courseService) { }

  ngOnInit() {
    if(localStorage.getItem('logedInUser')==undefined||localStorage.getItem('logedInUser')==null)
    {
      this.isLoggedin=false;
    }
    else
    {
      debugger;
      //this.user= this.authenticateUser(localStorage.getItem('logedInUser'));
      this.isLoggedin=true;
    }
    this.queryStringData=this.route.snapshot.paramMap.get('id');
    this.getTopCourseList();
  }

  getCourseDetails(){

  }

  async getTopCourseList(): Promise<any> {
    return await this.mycourseService.getAllCourses().subscribe(res => {
      
      this.allCourses = res;
      this.allCourses.forEach(element => {
        if(element.id== this.queryStringData)
        {
          this.courseDetils=element;
          
          console.log('selected Item : '+JSON.stringify(this.courseDetils))
        }
      });
      
      return res;
    });
  }

  //signup for course
  onSignUpCourse(){
    debugger;
    var myemail=this.authenticateUser(localStorage.getItem('logedInUser'));
    var signUpedCourse = {
      email: myemail,
      nid: this.courseDetils.id,
    };

    this.signedUpedCourses.push(signUpedCourse);

    if(localStorage.getItem('signedUpedCourses')==undefined||localStorage.getItem('signedUpedCourses')==null)
    {
      localStorage.setItem('signedUpedCourses',JSON.stringify(this.signedUpedCourses))
    }
    else
    {
      this.signedUpedCourses=JSON.parse(localStorage.getItem('signedUpedCourses'));
      this.signedUpedCourses.push(signUpedCourse);
      localStorage.setItem('signedUpedCourses',JSON.stringify(this.signedUpedCourses));
      alert('Course successfully SignedUP');
      
    }
  }

  authenticateUser(usercipher){
    var SimpleCrypto = require("simple-crypto-js").default;
    var _secretKey = "yaac";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    return simpleCrypto.decrypt(usercipher);
  }
}
