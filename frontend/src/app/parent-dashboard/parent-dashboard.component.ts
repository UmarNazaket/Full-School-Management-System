import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.scss']
})
export class ParentDashboardComponent implements OnInit {
  students:[];
  isopen = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
    // @ts-ignore
    document.getElementById('eup-navbar-heading').innerText = 'Parent Dashboard';
    if(!localStorage.getItem("token")){
      this.router.navigate(['/']);
    }
  }
  logout(): void{
    // Logout Functionality here
    this.router.navigate(['./'])
  }
  hamburgerclicked():void {
    console.log('clicking the button works !');
    this.isopen = !this.isopen;
      // @ts-ignore
      // $("#sidebar").toggle("slow");
    }

}
