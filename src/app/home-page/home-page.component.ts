import { Component, OnInit } from "@angular/core";
import { newsService } from "../Services/newsServices";
import { Router } from "@angular/router";
import { courseService } from '../Services/courseServices';
@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  newsData: any[];
  topCourseData: any[];
  isLoggedin=false;
  user='';
  subsribedCourses=[];
  allCourse=[];
  constructor(private myNewsServices: newsService,private mycourseService:courseService, private router: Router) {}

  ngOnInit() {
    
    if(localStorage.getItem('logedInUser')==undefined||localStorage.getItem('logedInUser')==null)
    {
      this.isLoggedin=false;
    }
    else
    {
      
      this.user= this.authenticateUser(localStorage.getItem('logedInUser'));
      
      this.isLoggedin=true;
      this.getAllCourses();
      this. myCourses();
    }
    
    this.getNewsList();
    this.getTopCourseList();
    
  }

  //news list
  async getNewsList(): Promise<any> {
    return await this.myNewsServices.getNewsList().subscribe(res => {
      this.newsData = res;
      console.log("newsData result : " + JSON.stringify(res));
      return res;
    });
  }

  //top courses
  async getTopCourseList(): Promise<any> {
    return await this.myNewsServices.getTopCourseList().subscribe(res => {
      this.topCourseData = res;
      console.log("topCourseData result : " + JSON.stringify(res));
      return res;
    });
  }

  //course click
  onCourseClick(item) {
    this.router.navigate(["courseDetails", item.nid]);
  }

  myCourses(){
    
    
  }
  //retrive courses
  async getAllCourses(){
    return await this.mycourseService.getAllCourses().subscribe(res => {
      this.allCourse = res;
      console.log("topCourseData result : " + JSON.stringify(res));

      var mydata=[]
    if(localStorage.getItem('signedUpedCourses')==undefined||localStorage.getItem('signedUpedCourses')==null)
    {
      this.subsribedCourses=[];
    }
    else
    {
      debugger;
      mydata=JSON.parse(localStorage.getItem('signedUpedCourses'));
      //var courseLists=JSON.parse(localStorage.getItem('courseList'));//Get all course list
      var user= this.authenticateUser(localStorage.getItem('logedInUser'))
      //alert(user)
    mydata.forEach(element => {
      if(element.email==user)
      {
        res.forEach(element2 => {
          if(element.nid==element2.id){
            this.subsribedCourses.push(element2);
          }
        });
      }
    });
      console.log('subscribed courses:'+ JSON.stringify(this.subsribedCourses));
     // localStorage.setItem('mySubscribedCourses',JSON.stringify( this.subsribedCourses))
    }

      return res;
    });
  }

  //logout
  logout(){
    localStorage.removeItem(
      "logedInUser"
    );
    this.router.navigate(["login"]);
  }

  //auth
  authenticateUser(usercipher){
    var SimpleCrypto = require("simple-crypto-js").default;
    var _secretKey = "yaac";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    return simpleCrypto.decrypt(usercipher);
  }
}
