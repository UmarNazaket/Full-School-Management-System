import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId = localStorage.getItem('Id');
name: any;
  Reg: any;
  user=  {
    ID: localStorage.getItem('id'),
    user_email: 'ali123@gmail.com',
    contact: '0312567892'
  }
  message=''

  constructor() {
    this.name = "Muhammad Ali"
    this.Reg = "12345"
   }

  ngOnInit(): void {
  }
  changePass(): void{

  }

}
