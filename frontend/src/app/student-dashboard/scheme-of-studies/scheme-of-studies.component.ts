import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {StudentService} from '../../../shared/student.service';
// import {DomSanitizationService} from '@angular/platform-browser';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'

// @Pipe({ name: 'safe' })

@Component({
  selector: 'app-scheme-of-studies',
  templateUrl: './scheme-of-studies.component.html',
  styleUrls: ['./scheme-of-studies.component.scss']
})
export class SchemeOfStudiesComponent implements OnInit {
  uploadedFiles: any[] = [];
  schemeOdStudies = "This is scheme of studies for this subject";

  constructor(private studentservice: StudentService, private sanitizer: DomSanitizer) { 

    
    // this.onlineexam = JSON.parse(localStorage.getItem("onlineExam"));
    
    // this.link = sanitizer.bypassSecurityTrustUrl(this.onlineexam.link);
  
  }
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
  onlineexam: any;
  schemeofstudy: any;
  link:any;

  ngOnInit(): void {
    
    this.schemeofstudy = JSON.parse(localStorage.getItem("schemeOfStudies"));
    (this.schemeofstudy[0].SchemeOfStudy)?this.schemeOdStudies = this.schemeofstudy[0].SchemeOfStudy : this.schemeOdStudies = ''


    // this.onlineexam = JSON.parse(localStorage.getItem("onlineExam"));
    
    // this.link = this.onlineexam.link;
    
  }

  onUpload(event: { files: any; }) {
    console.log(event.files)
    
    // for(let file of event.files) {
    //   console.log(file)
    //   const data = new FormData();
    //   data.append("file", file);
    //     this.uploadedFiles.push(file);
    //     this.studentservice.uploadPDF(data).subscribe((res: any) => {
    //       console.table("this is data", res);
    //     });
    // }
  }

}
