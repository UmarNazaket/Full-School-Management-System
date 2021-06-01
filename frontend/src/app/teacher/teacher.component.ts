import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  isopen = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
    // @ts-ignore
    document.getElementById('eup-navbar-heading').innerText = 'Teacher Dashboard';
    if(!localStorage.getItem("token")){
      this.router.navigate(['/']);
    }
  }

  logout(): void{
    // Logout Functionality here
  }
  hamburgerclicked():void {
    console.log('clicking the button works !');
    this.isopen = !this.isopen;
      // @ts-ignore
      // $("#sidebar").toggle("slow");
    }

}
