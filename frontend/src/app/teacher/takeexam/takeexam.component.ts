import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-takeexam',
  templateUrl: './takeexam.component.html',
  styleUrls: ['./takeexam.component.scss']
})
export class TakeexamComponent implements OnInit {
  paper_text: any;

  startTime: any;
  endTime: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  submitpaper(){
    console.log(this.paper_text)
  }

}
