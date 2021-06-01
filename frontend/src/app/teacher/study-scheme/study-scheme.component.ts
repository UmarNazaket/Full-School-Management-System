import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }
  submitSchemeOfStudy(): any{
    console.log(this.schemeOfStudy)
  }

}
