import { Component, OnInit } from '@angular/core';
import {AdminSService} from '../../../shared/admin-s.service'

@Component({
  selector: 'app-add-subject-class',
  templateUrl: './add-subject-class.component.html',
  styleUrls: ['./add-subject-class.component.scss']
})
export class AddSubjectClassComponent implements OnInit {
  classes = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: 6},{name: 7},{name: 8},{name: 9},{name: 10}]
  selectedClass: any;
  subject: any;
  days = [{day: "monday", count: 1},{day: "tuesday", count: 2},{day: "wednesday", count: 2},{day: "thursday", count: 2},{day: "friday", count: 2} ]
  selectedDay: any
  time: any;
  subject1: any
  selectedClass1: any;
  constructor(private adminservice: AdminSService) { }

  ngOnInit(): void {
    
  }

  addSubject(): void{
    let data = {
      classNo: this.selectedClass.name,
      name: this.subject
    }
    this.adminservice.addSubject(data).subscribe((res: any) => {
      console.table("this is data", res);
      window.alert("Subject Added Successfully!")
    });
  }

  createTimeTable(): void{
    let data = {
      day: this.selectedDay.count,
      startTime: this.time,
      classNumber: this.selectedClass1.name,
      subjectName: this.subject1
    }
    this.adminservice.createTimeTable(data).subscribe((res: any) => {
      console.table("this is data", res);
      window.alert("Time Table Successfully Added!")
    });
  }

}
