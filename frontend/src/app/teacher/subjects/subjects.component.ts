import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  smallfinalarray = [{ID: 83648,
    teacher_name: "Dr. Uzair Iqbal",
    post_title: "English",
    class: 10}
    ,
    {ID: 83648,
      teacher_name: "Ms. Asma Ul Hassan",
      post_title: "Urdu",
      class: 5}
    ]
    
    contentLoader = false;
    
  constructor() { }

  ngOnInit(): void {
  }

  gotodetailspage(subjectName: any): void{
    console.log(subjectName);
  }
}
