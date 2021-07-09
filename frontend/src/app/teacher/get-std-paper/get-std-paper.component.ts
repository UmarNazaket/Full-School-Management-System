import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/shared/student.service';

@Component({
  selector: 'app-get-std-paper',
  templateUrl: './get-std-paper.component.html',
  styleUrls: ['./get-std-paper.component.scss']
})
export class GetStdPaperComponent implements OnInit {
  exam: any;

  constructor( private studentservice: StudentService) { }

  ngOnInit(): void {
    // teacherfetchpaper
    var data={
      subjectId: localStorage.getItem("subjectIdforteacher"),
      studentId: localStorage.getItem("stdidforteacher")
    }
    this.studentservice.teacherfetchpaper(data).subscribe((res: any) => {
      console.log(res)
      this.exam = res.data.studentPaper;
      var examText = this.exam.paper;
      document.getElementById("onlineexam").innerHTML=examText;
      console.log(this.exam)
    });
  }

}
