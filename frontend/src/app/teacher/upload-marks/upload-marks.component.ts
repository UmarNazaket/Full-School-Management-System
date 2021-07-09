import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/student.service';
import {Message,MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-marks',
  templateUrl: './upload-marks.component.html',
  styleUrls: ['./upload-marks.component.scss'],
  providers: [MessageService]
})
export class UploadMarksComponent implements OnInit {
  Students = [{Roll_No: 123,name: "Ali"},{Roll_No: 234,name: "Umar"}]
  terms=[{name: "First Term"},{name: "Second Term"}, {name: "Final Term"}]
  selectedTerm: any;
  msgs1: Message[];
  subjectId: any;
  totalMarks: any;
  optMarks: any;


  constructor(private router: Router,private studentservice: StudentService, private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.subjectId = localStorage.getItem("subjectIdforteacher")
    this.studentservice.fetchStudents(this.subjectId).subscribe((res: any) => {
      console.table("this is data", res);
      this.Students = res.data.studentList
    });
  }
  uploadMarks(stdId: any): void{
    
    let data;
      this.msgs1 = [
        { severity: 'success', summary: 'Marks Uploaded', detail: '' }
      ];
      console.log(this.selectedTerm)
      if(this.selectedTerm.name == "First Term"){
        data = {
          firstTerm: {
            totalMarks: this.totalMarks,
            obtMarks: this.optMarks
          },
          subjectId: this.subjectId,
          studentId: stdId
        }
      }else if(this.selectedTerm == "Second Term"){
        data = {
          firstTerm: {
            totalMarks: this.totalMarks,
            obtMarks: this.optMarks
          },
          subjectId: this.subjectId,
          studentId: stdId
        }

      }else{
        data = {
          secondTerm: {
            totalMarks: this.totalMarks,
            obtMarks: this.optMarks
          },
          subjectId: this.subjectId,
          studentId: stdId
        }
      }

      console.log(data)
      this.studentservice.addMarks(data).subscribe((res: any) => {
        console.table("this is data", res);
      });
  }

  getValue(val: any): void{
    console.log(val)
  }

  getPaper(stdid: any): any{
    localStorage.setItem("stdidforteacher",stdid)
    this.router.navigate(['/teacher/studentpaper'])
  }

}
