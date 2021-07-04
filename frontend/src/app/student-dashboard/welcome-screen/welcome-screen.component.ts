import { Component, OnInit } from '@angular/core';
import {ChartOptions, ChartType} from "chart.js";
import {faSearch, faSortAmountDown} from "@fortawesome/free-solid-svg-icons";
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from "ng2-charts";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentService} from '../../../shared/student.service'

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {
  subjects: any;
  smallfinalarray = [{ID: 83648,
    teacher_name: "Dr. Uzair Iqbal",
    post_title: "English",
    value: 10.0418410041841},
    {ID: 83648,
      teacher_name: "Ms. Asma Ul Hassan",
      post_title: "Urdu",
      value: 10.0418410041841}
    ]
  // @ts-ignore
  subscriptions: Subscription = [];
  loader = true;
  multiplier = 100;
  totalcourses: any;
  completedcouses: any;
  enrolledcourses: any;
  courses: any;
  percentages: any;
  // Adding percentages and total courses api data in one variable
  finalCourseArray: any;
  // Making copy of it to save it for search function
  finalCourseArray2: any;

  // smallfinalarray: any;

  // smallfinalarray: any;
  contentLoader = false;

  searchText = ''


  pointersColorClasses = ['eup-green-pointer','eup-red-pointer','eup-blue-pointer','eup-purple-pointer'];
  chartType: ChartType = 'pie';
  search = faSearch;
  sortAmount = faSortAmountDown;
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  chartColors: Array<any> = [
    {
      backgroundColor: [
        '#61ce87',
        '#e14f6a',
        '#389cf2',
        '#7583f0'
      ]
    }
  ];
  pieChartLabels: Label[] = [['Correctly Answered'], ['Incorrectly Answered'], ['Used  Questions'], ['Unused Questions']];
  pieChartData: SingleDataSet = [20, 16, 36, 40];
  pieChartType: ChartType = 'pie';
  pieChartLegend = false;
  pieChartPlugins = [];
  cardLabels = [
    {label: 'Correctly Answered', value: 12, bgClass: 'eup-green-card'},
    {label: 'Incorrectly Answered', value: 2, bgClass: 'eup-red-card'},
    {label: 'Used Questions', value: 14, bgClass: 'eup-blue-card'},
    {label: 'Total Questions', value: 20, bgClass: 'eup-purple-card'},
  ];

  constructor(private route:ActivatedRoute, private router:Router , private studentservice: StudentService) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  classlink: any;
  ngOnInit(): void {
    this.studentservice.getClassLink().subscribe((data: any) => {
      console.table("this is Class data", data);
      this.classlink = data.data.studentOnlineClass;
    });

    this.studentservice.getSubjects().subscribe((res: any) => {
      console.table("this is data", res);
      this.subjects = res.data.studentSubjects;
    });
  }
  searchCourse(): any{

  }
  gotoAssessment(post_title: any, courseid:any): void{
    console.log(post_title, courseid);
    localStorage.setItem("subjectName", post_title);

    this.studentservice.getschemeofstudies(courseid).subscribe((res: any) => {
      console.table("this is data", res);
      localStorage.setItem("schemeOfStudies", JSON.stringify(res.data.studyScheme));
    });

    this.studentservice.getpaper(courseid).subscribe((res: any) => {
      console.table("this is data", res.data.onlineExam);
      // localStorage.setItem("schemeOfStudies", res.data.studyScheme);
      localStorage.setItem("onlineExam", JSON.stringify(res.data.onlineExam[0]));
    });

    
    this.router.navigate(['/student/schemeofstudies'])
  }

  getAttendance(subjectId: any): void{
    this.studentservice.getAttendance(subjectId).subscribe((res: any) => {
      console.table("this is attendance data ", res);
      localStorage.setItem("attendancevalues", JSON.stringify(res));
      this.router.navigate(['/student/attendance'])
    });
  }

  gotoCheckout(price: any, subjectName: any): any{
    localStorage.setItem("price", price);
    localStorage.setItem("subjectName", subjectName);
    this.router.navigate(['/student/checkout'])
  }

}
