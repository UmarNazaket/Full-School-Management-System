import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {StudentService} from '../../../shared/student.service';

@Component({
  selector: 'app-scheme-of-studies',
  templateUrl: './scheme-of-studies.component.html',
  styleUrls: ['./scheme-of-studies.component.scss']
})
export class SchemeOfStudiesComponent implements OnInit {
  schemeOdStudies = "This is scheme of studies for this subject";

  constructor(private studentservice: StudentService) { 
  
  }
  onlineexam: any;
  schemeofstudy: any;
  link:any;
  selectedFile: any;
  paper_text: any;
  


  ngOnInit(): void {
    this.schemeofstudy = JSON.parse(localStorage.getItem("schemeOfStudies"));
    (this.schemeofstudy[0].SchemeOfStudy)?this.schemeOdStudies = this.schemeofstudy[0].SchemeOfStudy : this.schemeOdStudies = '';
    this.onlineexam = JSON.parse(localStorage.getItem("onlineExam"))
    console.log(this.onlineexam)
    // var examtext = JSON.parse(this.onlineexam.link).replace(/</g, "&lt;").replaceAll(/>/g, '&gt;');
    var examtext = this.onlineexam?.link;
    console.log("&&&&&&&&&&&&&&&&&&&", examtext)
    document.getElementById("onlineexam").innerHTML=examtext
  }
  submitAnswerSheet(){
    console.log(this.paper_text);
    var data = {
      paper: this.paper_text,
      submissionDate: Date.now(),
      isSubmitted: true,
      studentId: JSON.parse(localStorage.getItem('logindata'))._id,
      subjectId: localStorage.getItem("subjectId")
    }
    console.log(data)
    this.studentservice.studentAddPaper(data).subscribe((res: any) => {
      console.table("this is data", res);
      this.paper_text = "<h3> Paper is successfully Submitted... Thanks </h3>"
    });
  }

}
