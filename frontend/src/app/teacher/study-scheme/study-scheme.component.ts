import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/student.service'

@Component({
  selector: 'app-study-scheme',
  templateUrl: './study-scheme.component.html',
  styleUrls: ['./study-scheme.component.scss']
})
export class StudySchemeComponent implements OnInit {
  subjects = [{name: "English"},{name: "urdu"}]
  class = [{name: 3}, {name: 4}]

  selectedSubject: any;
  selectedClass: any;
  schemeOfStudy: any;
  subjectId: any;

  constructor(private studentservice: StudentService) { }

  ngOnInit(): void {
    this.subjectId = localStorage.getItem("subjectIdforteacher")
  }
  submitSchemeOfStudy(): any{
    console.log(this.schemeOfStudy)
    var data = {
      schemeOfStudy: this.schemeOfStudy,
      subjectId: this.subjectId
    }


    this.studentservice.schemeOfStudy(data).subscribe((res: any) => {
      console.table("this is data", res);
    });
  }

}
