import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  smallfinalarray = [{ID: 83648,
    teacher_name: "Dr. Uzair Iqbal",
    post_title: "English",
    value: 10.0418410041841},
    {ID: 83648,
      teacher_name: "Ms. Asma Ul Hassan",
      post_title: "Urdu",
      value: 10.0418410041841}
    ]
    contentLoader = false;

  constructor() { }

  ngOnInit(): void {
  }

}
