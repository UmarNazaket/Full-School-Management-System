import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/student.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;

  constructor(private studentservice: StudentService) { }

  ngOnInit(): void {
    this.studentservice.gettimetable().subscribe((res: any) => {
      console.table("this is data", res.data.TimeTable);
      this.monday = res.data.TimeTable.Monday;
      this.tuesday = res.data.TimeTable.Tuesday;
      this.wednesday = res.data.TimeTable.Wednesday;
      this.thursday = res.data.TimeTable.Thursday;
      this.friday = res.data.TimeTable.Friday;
    });
  }

}
