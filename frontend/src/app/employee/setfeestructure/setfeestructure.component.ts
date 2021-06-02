import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setfeestructure',
  templateUrl: './setfeestructure.component.html',
  styleUrls: ['./setfeestructure.component.scss']
})
export class SetfeestructureComponent implements OnInit {
  Students = [{Roll_No: 123,name: "Ali"},{Roll_No: 234,name: "Umar"}]
  classes = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: 6},{name: 7},{name: 8},{name: 9},{name: 10}]
  selectedClass: any;
  duedate: any;
  amount: any;

  constructor() { }

  ngOnInit(): void {
    this.selectedClass = this.classes[0].name;
  }

}
