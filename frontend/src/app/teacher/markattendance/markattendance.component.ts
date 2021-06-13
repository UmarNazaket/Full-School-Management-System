import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/student.service';
import {Message,MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-markattendance',
  templateUrl: './markattendance.component.html',
  styleUrls: ['./markattendance.component.scss'],
  providers: [MessageService]
})
export class MarkattendanceComponent implements OnInit {
  Students = [{Roll_No: 123,name: "Ali"},{Roll_No: 234,name: "Umar"}]
  constructor(private studentservice: StudentService, private messageService: MessageService, private primengConfig: PrimeNGConfig) { }
  subjectId: any;
  msgs1: Message[];

  ngOnInit(): void {
    this.subjectId = localStorage.getItem("subjectIdforteacher")
    this.studentservice.fetchStudents(this.subjectId).subscribe((res: any) => {
      console.table("this is data", res);
      this.Students = res.data.studentList
    });
  }

  markattendance(stdId: any , ispresent: any): void{
    console.log(stdId , ispresent)
    if(ispresent == 1 ){
      this.msgs1 = [
        { severity: 'success', summary: 'Present', detail: '' }
      ];
    }else{
      this.msgs1 = [
        { severity: 'error', summary: 'Absent', detail: '' }
      ];   
    }
    var date = new Date()
    var attendanceArry = [{date: date, status: ispresent, studentId: stdId, subjectId: this.subjectId, day: 2}]
    this.studentservice.markAttendance(attendanceArry).subscribe((res: any) => {
      console.table("this is data", res);
    });
  }

}
