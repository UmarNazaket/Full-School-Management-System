import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  Result: any;

  firstTerm: any;
  secondTerm: any;
  thirdTerm: any;

  constructor() { }

  ngOnInit(): void {
    this.Result = localStorage.getItem("Result")
    this.firstTerm = this.Result[0];
      this.secondTerm = this.Result[1];
      this.thirdTerm = this.Result[2];
  }

}
