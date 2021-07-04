import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/shared/student.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  students:[];
  attendance: any;
  attendances: any;
  basicData: any;
  basicOptions: any;

  present: any;
  absent: any;

  

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.attendance = JSON.parse(localStorage.getItem("attendancevalues"));
    console.log(this.attendance);
    this.attendances = this.attendance.data.studentAttendance;
    this.present = this.attendance.data.present;
    this.absent = this.attendance.data.absent;

    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
          {
              label: 'Present',
              backgroundColor: '#00ff7f',
              data: this.present
          },
          {
              label: 'Absent',
              backgroundColor: '#dc143c',
              data: this.absent
          }
      ]
  };
  }

  
}
