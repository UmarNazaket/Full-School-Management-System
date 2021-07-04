import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-takeexam',
  templateUrl: './takeexam.component.html',
  styleUrls: ['./takeexam.component.scss']
})
export class TakeexamComponent implements OnInit {
  uploadedFiles: any[] = [];

  startTime: any;
  endTime: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  onUpload(event: { files: any; }) {
    
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
  }

}
