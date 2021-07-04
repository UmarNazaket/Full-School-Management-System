import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {
  challan: any;
  constructor() { }

  ngOnInit(): void {
    this.challan = JSON.parse(localStorage.getItem("feeChallan"))
    console.log(this.challan)
  }

}
