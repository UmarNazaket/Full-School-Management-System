import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultCComponent implements OnInit {
  Result: any;

  firstTerm: any;
  secondTerm: any;
  thirdTerm: any;

  IsFirstTerm = false;
  IsSecondTerm = false;
  IsThirdTerm = false;

  constructor() { }

  ngOnInit(): void {
    this.Result = JSON.parse(localStorage.getItem("Result"))
      console.log(this.Result)
      this.firstTerm = this.Result.firstTerm;
      this.secondTerm = this.Result.secondTerm;
      this.thirdTerm = this.Result.thirdTerm;
      console.log(this.firstTerm)
  }
  printfn(): void{
    // getresult
    var printContents = document.getElementById("result").innerHTML;
     var originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;
     window.print();
     document.body.innerHTML = originalContents;
     window.location.reload();
  }

  showTerm(num: any){
    if(num == 1){
      this.IsFirstTerm = true;
      this.IsSecondTerm = false;
      this.IsThirdTerm = false;
    }
    else if(num == 2){
      this.IsFirstTerm = false;
      this.IsSecondTerm = true;
      this.IsThirdTerm = false;
    }
    else{
      this.IsFirstTerm = false;
      this.IsSecondTerm = false;
      this.IsThirdTerm = true;
    }
  }
}
