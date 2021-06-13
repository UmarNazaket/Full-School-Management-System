import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/student.service'

@Component({
  selector: 'app-setfeestructure',
  templateUrl: './setfeestructure.component.html',
  styleUrls: ['./setfeestructure.component.scss']
})
export class SetfeestructureComponent implements OnInit {
  Students = []
  classes = [{name: "1"},{name: "2"},{name: "3"},{name: "4"},{name: "5"},{name: "6"},{name: "7"},{name: "8"},{name: "9"},{name: "10"}]
  selectedClass: any;
  duedate: any;
  amount: any;
  checked: boolean = false;

  constructor(private studentservice: StudentService) { }

  ngOnInit(): void {
    this.selectedClass = this.classes[0].name;
  }

  getlistofStudents(): void{
    this.studentservice.getStdList(this.selectedClass.name).subscribe((res: any) => {
      console.table("this is data", res);
      this.Students = res.data.studentList;
      // this.result = res.data.studentMarks
    });
  }

  setFee(stdId: any): void{

    this.studentservice.setFee(stdId).subscribe((res: any) => {
      console.table("this is data", res);
    });
  }

  checkkinship(): void{
    this.checked = !this.checked;
  }

  SendChallan(stdId: any): void{
    if(this.checked == true){
      let percent = (this.amount * 20) / 100;
      this.amount = this.amount - percent;
    }
    var data = {
      submissionDate: this.duedate,
      fee: this.amount,
      student: stdId
    }
    this.studentservice.setFee(data).subscribe((res: any) => {
      console.table("this is data", res);
      window.alert("Fee is sent")
    });
  }

}
