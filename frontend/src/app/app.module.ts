import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
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
// import { ResultComponent } from './parent-dashboard/result/resultc.component';
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
import { EmployeeComponent } from './employee/employee.component';
import { AcceptRejectStdComponent } from './employee/accept-reject-std/accept-reject-std.component';
import { SetfeestructureComponent } from './employee/setfeestructure/setfeestructure.component';
import { AdminComponent } from './admin/admin.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { EditStudentComponent } from './admin/edit-student/edit-student.component';




import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AssessmentsComponent } from './student-dashboard/assessments/assessments.component';
import { SchemeOfStudiesComponent } from './student-dashboard/scheme-of-studies/scheme-of-studies.component';
import { AdmissionFormsComponent } from './admin/admission-forms/admission-forms.component';
import { AddSubjectClassComponent } from './admin/add-subject-class/add-subject-class.component';
import { AddTeacherComponent } from './admin/add-teacher/add-teacher.component';
import { ResultCComponent } from './parent-dashboard/result/result.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import {EditorModule} from 'primeng/editor';
import { GetStdPaperComponent } from './teacher/get-std-paper/get-std-paper.component';

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
    ResultCComponent,
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
    ClassLinkComponent,
    EmployeeComponent,
    AcceptRejectStdComponent,
    SetfeestructureComponent,
    AdminComponent,
    AddAdminComponent,
    EditStudentComponent,
    AssessmentsComponent,
    SchemeOfStudiesComponent,
    AdmissionFormsComponent,
    AddSubjectClassComponent,
    AddTeacherComponent,
    GetStdPaperComponent
  ],
  imports: [
    EditorModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,
    ConfirmDialogModule,
    InputNumberModule,
    RadioButtonModule,
    RatingModule,
    ToolbarModule,
    InputTextModule,
    ProgressBarModule,
    DialogModule,
    ContextMenuModule,
    MultiSelectModule,
    SliderModule,
    CalendarModule,
    ToastModule,
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
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
