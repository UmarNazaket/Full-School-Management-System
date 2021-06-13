import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../../../shared/student.service'

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent implements OnInit {
  children = [
    {name: 'Bilal', class: '03', roll_no: '234'},
    {name: 'Faizan', class: '04', roll_no: '374'}
  ]

  childlist: any;
  constructor(private router:Router , private student:StudentService) { }

  ngOnInit(): void {
    this.student.getchildren().subscribe((res: any) => {
      console.table("this is data", res);
      this.childlist = res.data.studentsList[0];
    });
  } 
  getResult(stdId: any): void{
    this.student.getResultP({studentId: stdId , status: 1}).subscribe((res: any) => {
      console.table("this is data", res);
      localStorage.setItem("Result", JSON.stringify(res.data.student));
    });
    // 1
    this.router.navigate(['/parent/result']);
  } 
  getFee(stdId: any): void{
    this.student.getChallanP({studentId: stdId , status: 0}).subscribe((res: any) => {
      console.table("this is data", res);
     localStorage.setItem("feeChallan",JSON.stringify(res.data.student));
    });
    // 0
    this.router.navigate(['/parent/fee']);
  } 
  getAttendance(stdId: any): void{
    this.student.getAttendanceP({studentId: stdId , status: 2}).subscribe((res: any) => {
      console.table("this is data", res);
      localStorage.setItem("AttendanceForm",JSON.stringify(res.data.student));
    });
    // 2
    this.router.navigate(['/parent/attendance']);
  } 

}
