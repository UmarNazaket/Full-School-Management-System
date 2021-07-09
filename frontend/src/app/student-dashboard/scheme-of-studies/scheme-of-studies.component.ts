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
    (this.schemeofstudy[0].SchemeOfStudy)?this.schemeOdStudies = this.schemeofstudy[0].SchemeOfStudy : this.schemeOdStudies = ''
  }
  submitAnswerSheet(){
    console.log(this.paper_text);
  }

}
