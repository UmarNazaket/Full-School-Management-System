import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { AddSubjectClassComponent } from './admin/add-subject-class/add-subject-class.component';
import { AddTeacherComponent } from './admin/add-teacher/add-teacher.component';
import { AdminComponent } from './admin/admin.component';
import { AdmissionFormsComponent } from './admin/admission-forms/admission-forms.component';
import { EditStudentComponent } from './admin/edit-student/edit-student.component';
import { AdmissionFormComponent } from './admission-form/admission-form.component';
import { AcceptRejectStdComponent } from './employee/accept-reject-std/accept-reject-std.component';
import { EmployeeComponent } from './employee/employee.component';
import { SetfeestructureComponent } from './employee/setfeestructure/setfeestructure.component';
import { LoginComponent } from './login/login.component';
import { AttendanceComponent } from './parent-dashboard/attendance/attendance.component';
import { ChildListComponent } from './parent-dashboard/child-list/child-list.component';
import { FeeComponent } from './parent-dashboard/fee/fee.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { AssessmentsComponent } from './student-dashboard/assessments/assessments.component';
import { ChallanFormComponent } from './student-dashboard/challan-form/challan-form.component';
import { CheckoutComponent } from './student-dashboard/checkout/checkout.component';
import { ProfileComponent } from './student-dashboard/profile/profile.component';
import { ResultComponent } from './student-dashboard/result/result.component';
import { ResultCComponent } from './parent-dashboard/result/result.component';
import { SchemeOfStudiesComponent } from './student-dashboard/scheme-of-studies/scheme-of-studies.component';
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
    },
    {
      path: "assessment",
      component: AssessmentsComponent
    },
    {
      path: "schemeofstudies",
      component: SchemeOfStudiesComponent
    },
    {
      path: "attendance",
      component: AttendanceComponent
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
      component: ResultCComponent
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
},
{
  path: 'employee',
  component: EmployeeComponent,
  children:[
    {
      path: "adddeletestudents",
      component: AcceptRejectStdComponent
    },
    {
      path: "subjectdetails",
      component: SubjectdetailsComponent
    },
    {
      path: "setfeechallan",
      component: SetfeestructureComponent
    }
  ]
},
{
  path: 'admin',
  component: AdminComponent,
  children:[
    {
      path: "addadmin",
      component: AddAdminComponent
    },
    {
      path: "editstudent",
      component: EditStudentComponent
    },
    {
      path: "admissionforms",
      component: AdmissionFormsComponent
    },
    {
      path: 'addsubject',
      component: AddSubjectClassComponent
    },
    {
      path: "addteacher",
      component: AddTeacherComponent
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
