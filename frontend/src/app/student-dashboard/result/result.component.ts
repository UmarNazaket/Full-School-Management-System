import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/student.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  firstTerm: any;
  secondTerm: any;
  thirdTerm: any;

  result: any;
  constructor(private studentservice: StudentService) { }

  ngOnInit(): void {
    this.studentservice.getresult().subscribe((res: any) => {
      console.table("this is data", res);
      // this.result = res.data.studentMarks
      this.firstTerm = res.data.studentMarks.firstTerm;
      this.secondTerm = res.data.studentMarks.secondTerm;
      this.thirdTerm = res.data.studentMarks.thirdTerm;
    });
  }
  printfn(): void{
    // getresult
    var printContents = document.getElementById("result").innerHTML;
     var originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;
     window.print();
     document.body.innerHTML = originalContents;
  }

}
