import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/shared/student.service';

@Component({
  selector: 'app-takeexam',
  templateUrl: './takeexam.component.html',
  styleUrls: ['./takeexam.component.scss']
})
export class TakeexamComponent implements OnInit {
  paper_text: any;

  startTime: any;
  endTime: any;

  constructor(private studentservice: StudentService) { }

  ngOnInit(): void {
    
  }

  submitpaper(){
    var data = {
      teacherId: JSON.parse(localStorage.getItem("logindata"))._id,
      startTime: this.startTime,
      endTime: this.endTime,
      subject: localStorage.getItem("subjectIdforteacher"),
      link: this.paper_text,
      day: 1
    }
    console.log(data)
    this.studentservice.teacherAddPaper(data).subscribe((res: any) => {
      console.table("this is data", res);
      this.startTime = '';
      this.endTime = '';
      this.paper_text = '<b>Paper is submitted.... Thanks for adding Paper<b/>'
    });
  }

}
