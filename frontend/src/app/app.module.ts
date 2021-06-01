import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { ChartsModule } from 'ng2-charts';
import {ChartModule} from 'primeng/chart';
import {DropdownModule} from 'primeng/dropdown';
import {SkeletonModule} from 'primeng/skeleton';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FileUploadModule} from 'primeng/fileupload';

import { WebsiteComponent } from './website/website.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdmissionFormComponent } from './admission-form/admission-form.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ChallanFormComponent } from './student-dashboard/challan-form/challan-form.component';
import { ProfileComponent } from './student-dashboard/profile/profile.component';
import { WelcomeScreenComponent } from './student-dashboard/welcome-screen/welcome-screen.component';
import { TimetableComponent } from './student-dashboard/timetable/timetable.component';
import { GuestUserComponent } from './guest-user/guest-user.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';
import { ResultComponent } from './student-dashboard/result/result.component';
import { CheckoutComponent } from './student-dashboard/checkout/checkout.component';
import { AnnouncementsComponent } from './student-dashboard/announcements/announcements.component';
import { ChildListComponent } from './parent-dashboard/child-list/child-list.component';
import { AttendanceComponent } from './parent-dashboard/attendance/attendance.component';
import { FeeComponent } from './parent-dashboard/fee/fee.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SubjectsComponent } from './teacher/subjects/subjects.component';
import { SubjectdetailsComponent } from './teacher/subjectdetails/subjectdetails.component';
import { MarkattendanceComponent } from './teacher/markattendance/markattendance.component';
import { UploadMarksComponent } from './teacher/upload-marks/upload-marks.component';
import { TakeexamComponent } from './teacher/takeexam/takeexam.component';
import { StudySchemeComponent } from './teacher/study-scheme/study-scheme.component';
import { ClassLinkComponent } from './teacher/class-link/class-link.component';

@NgModule({
  declarations: [
    AppComponent,
    WebsiteComponent,
    LoginComponent,
    SignupComponent,
    AdmissionFormComponent,
    StudentDashboardComponent,
    ChallanFormComponent,
    ProfileComponent,
    WelcomeScreenComponent,
    TimetableComponent,
    GuestUserComponent,
    ParentDashboardComponent,
    ResultComponent,
    CheckoutComponent,
    AnnouncementsComponent,
    ChildListComponent,
    AttendanceComponent,
    FeeComponent,
    TeacherComponent,
    SubjectsComponent,
    SubjectdetailsComponent,
    MarkattendanceComponent,
    UploadMarksComponent,
    TakeexamComponent,
    StudySchemeComponent,
    ClassLinkComponent
  ],
  imports: [
    FileUploadModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    CardModule,
    SkeletonModule,
    ChartsModule,
    DropdownModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToggleButtonModule,
    TableModule,
    ButtonModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
