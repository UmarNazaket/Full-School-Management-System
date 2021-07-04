import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/student.service';
import {Message,MessageService} from 'primeng/api';

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

  msgs1: Message[];

  constructor(private studentservice: StudentService, private messageService: MessageService) { }

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
      this.schemeOfStudy = null;
        this.msgs1 = [
          { severity: 'success', summary: 'Scheme Of Study Added', detail: '' }
        ];
     
    });
  }

}
