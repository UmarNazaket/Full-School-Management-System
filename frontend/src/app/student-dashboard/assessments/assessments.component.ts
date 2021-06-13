import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/student.service';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.scss']
})
export class AssessmentsComponent implements OnInit {
  announcements = ["announcement 01","announcement 02","announcement 03"]

  constructor(private studentservice: StudentService) { }

  ngOnInit(): void {
    this.studentservice.getAnnouncements().subscribe((res: any) => {
      console.table("this is data", res);
      this.announcements = res.data.announcement;
    });
  }

}
