import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/student.service';

@Component({
  selector: 'app-challan-form',
  templateUrl: './challan-form.component.html',
  styleUrls: ['./challan-form.component.scss']
})
export class ChallanFormComponent implements OnInit {

  constructor(private studentservice: StudentService) { }

  studentfee: any;
  ngOnInit(): void {
    this.studentservice.getFeeChallan().subscribe((res: any) => {
      console.table("this is data", res);
      this.studentfee = res.data.studentFee;
      // this.subjects = res.data.studentSubjects;
    });
  }

  printfn(): void{
    var printContents = document.getElementById("challanForm").innerHTML;
     var originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;
     window.print();
     document.body.innerHTML = originalContents;
     window.location.reload();
  }

}
