import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accept-reject-std',
  templateUrl: './accept-reject-std.component.html',
  styleUrls: ['./accept-reject-std.component.scss']
})
export class AcceptRejectStdComponent implements OnInit {
  Students = [{Roll_No: 123,name: "Ali"},{Roll_No: 234,name: "Umar"}]
  
  constructor() { }

  ngOnInit(): void {
  }
  AccRejectStd(Roll_No: any , ispresent: any): void{
    console.log(Roll_No , ispresent)
  }

}
