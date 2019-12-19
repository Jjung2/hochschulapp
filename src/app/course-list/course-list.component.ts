import { Component, OnInit } from '@angular/core';
import { courseService } from '../Services/courseServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  allCourse=[];

  constructor(private courseService:courseService,private router:Router) { }

  ngOnInit() {
    this.getAllCourses();
  }

  //retrive courses
  async getAllCourses(){
    return await this.courseService.getAllCourses().subscribe(res => {
      this.allCourse = res;
      console.log("topCourseData result : " + JSON.stringify(res));
      return res;
    });
  }
 //select courses
  selectCourse(id){
    this.router.navigate(["courseDetails", id]);
  }
}
