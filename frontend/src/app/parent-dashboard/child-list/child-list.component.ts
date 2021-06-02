import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent implements OnInit {
  children = [
    {name: 'Bilal', class: '03', roll_no: '234'},
    {name: 'Faizan', class: '04', roll_no: '374'}
  ]

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  getResult(rollNo: any): void{
    this.router.navigate(['/parent/result']);
  }
  getFee(rollNo: any): void{
    this.router.navigate(['/parent/fee']);
  }
  getAttendance(rollNo: any): void{
    this.router.navigate(['/parent/attendance']);
  }
}
