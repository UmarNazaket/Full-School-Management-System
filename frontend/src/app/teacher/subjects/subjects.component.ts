import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/student.service'
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  smallfinalarray = [{ID: 83648,
    teacher_name: "Dr. Uzair Iqbal",
    post_title: "English",
    class: 10}
    ,
    {ID: 83648,
      teacher_name: "Ms. Asma Ul Hassan",
      post_title: "Urdu",
      class: 5}
    ]

    teacherId = "60a75be05b90242c1c92f8fd"
    
    contentLoader = false;
    
  constructor( private studentservice: StudentService, private router:Router) { }

  ngOnInit(): void {
    // localStorage.setItem("teacherID",this.teacherId);
    this.studentservice.fetchSubjects(this.teacherId).subscribe((res: any) => {
      console.table("this is data", res);
      this.smallfinalarray = res.data.teacherSubjects;
    });
  }

  gotodetailspage(subjectId: any): void{
    console.log(subjectId);
    localStorage.setItem("subjectIdforteacher", subjectId);
    this.router.navigate(['./teacher/subjectdetails'])
  }
}
