import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';
import { HomePageComponent } from './home-page/home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CourseListComponent } from './course-list/course-list.component';
const appRoutes: Routes = [
  { path: 'homepage', component: HomePageComponent },
  { path: 'courseDetails/:id', component: CourseDetailsComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomePageComponent },
  { path: 'courseByCategory', component: CourseListComponent }

]
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CourseDetailsComponent,
    SignUpComponent,
    LoginComponent,
    CourseListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging thingy
    )
  ],
  exports: [
    MatDatepickerModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
