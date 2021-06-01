import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { AdmissionFormComponent } from './admission-form/admission-form.component';
import { LoginComponent } from './login/login.component';
import { AttendanceComponent } from './parent-dashboard/attendance/attendance.component';
import { ChildListComponent } from './parent-dashboard/child-list/child-list.component';
import { FeeComponent } from './parent-dashboard/fee/fee.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { ChallanFormComponent } from './student-dashboard/challan-form/challan-form.component';
import { CheckoutComponent } from './student-dashboard/checkout/checkout.component';
import { ProfileComponent } from './student-dashboard/profile/profile.component';
import { ResultComponent } from './student-dashboard/result/result.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TimetableComponent } from './student-dashboard/timetable/timetable.component';
import { WelcomeScreenComponent } from './student-dashboard/welcome-screen/welcome-screen.component';
import { ClassLinkComponent } from './teacher/class-link/class-link.component';
import { MarkattendanceComponent } from './teacher/markattendance/markattendance.component';
import { StudySchemeComponent } from './teacher/study-scheme/study-scheme.component';
import { SubjectdetailsComponent } from './teacher/subjectdetails/subjectdetails.component';
import { SubjectsComponent } from './teacher/subjects/subjects.component';
import { TakeexamComponent } from './teacher/takeexam/takeexam.component';
import { TeacherComponent } from './teacher/teacher.component';
import { UploadMarksComponent } from './teacher/upload-marks/upload-marks.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: 'admission',
  component: AdmissionFormComponent
},
{
  path: 'student',
  component: StudentDashboardComponent,
  children: [
    {
      path: 'challan',
      component: ChallanFormComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'welcome',
      component: WelcomeScreenComponent
    },
    {
      path: 'timetable',
      component: TimetableComponent
    },{
      path: 'result',
      component: ResultComponent
    },
    {
      path: 'checkout',
      component: CheckoutComponent
    }
  ]
},
{
  path: 'parent',
  component: ParentDashboardComponent,
  children:[
    {
      path: "childlist",
      component: ChildListComponent
    },
    {
      path: "fee",
      component: FeeComponent
    },
    {
      path: "result",
      component: ResultComponent
    },
    {
      path: "attendance",
      component: AttendanceComponent
    }
  ]
},
{
  path: 'teacher',
  component: TeacherComponent,
  children:[
    {
      path: "subjects",
      component: SubjectsComponent
    },
    {
      path: "subjectdetails",
      component: SubjectdetailsComponent
    },
    {
      path: "markattendance",
      component: MarkattendanceComponent
    },
    {
      path: "uploadmarks",
      component: UploadMarksComponent
    },
    {
      path: "takeexam",
      component: TakeexamComponent
    },
    {
      path: "schemeofstudy",
      component: StudySchemeComponent
    },
    {
      path: "classlink",
      component: ClassLinkComponent
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
