import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isopen = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
    // @ts-ignore
    document.getElementById('eup-navbar-heading').innerText = 'Admin Dashboard';
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
