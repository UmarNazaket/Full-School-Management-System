import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-marks',
  templateUrl: './upload-marks.component.html',
  styleUrls: ['./upload-marks.component.scss']
})
export class UploadMarksComponent implements OnInit {
  Students = [{Roll_No: 123,name: "Ali"},{Roll_No: 234,name: "Umar"}]
  terms=[{name: "First Term"},{name: "Second Term"}, {name: "Final Term"}]
  selectedTerm: any;

  constructor() { }

  ngOnInit(): void {
  }
  givemarks(Roll_No: any , ispresent: any): void{
    console.log(Roll_No , ispresent)
  }

}
