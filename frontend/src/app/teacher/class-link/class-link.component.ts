import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/student.service'

@Component({
  selector: 'app-class-link',
  templateUrl: './class-link.component.html',
  styleUrls: ['./class-link.component.scss']
})
export class ClassLinkComponent implements OnInit {
  classLink: any;
  selectedSubject: any;
  selectedClass: any;

  subjects = [{name: "English"},{name: "urdu"}]
  class = [{name: 3}, {name: 4}]

  subjectId: any;
  teacherId: any;

  startTime: any;
  endTime: any;

  constructor(private studentservice: StudentService) { }

  ngOnInit(): void {
    this.subjectId = localStorage.getItem("subjectIdforteacher")
    this.teacherId = localStorage.getItem("teacherID")
  }

  sendClassLink(): void{
    let data = {
      startTime: this.startTime,
      endTime: this.endTime,
      subject: this.subjectId,
      link: this.classLink,
      day: 2,
      teacherId: this.teacherId
    }
    this.studentservice.classLink(data).subscribe((res: any) => {
      console.table("this is data", res);
    });
  }

}
