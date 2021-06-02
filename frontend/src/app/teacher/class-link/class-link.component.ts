import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
