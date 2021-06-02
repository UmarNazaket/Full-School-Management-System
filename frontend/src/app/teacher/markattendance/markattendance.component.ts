import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-markattendance',
  templateUrl: './markattendance.component.html',
  styleUrls: ['./markattendance.component.scss']
})
export class MarkattendanceComponent implements OnInit {
  Students = [{Roll_No: 123,name: "Ali"},{Roll_No: 234,name: "Umar"}]
  constructor() { }

  ngOnInit(): void {
  }

  markattendance(Roll_No: any , ispresent: any): void{
    console.log(Roll_No , ispresent)
  }
}
