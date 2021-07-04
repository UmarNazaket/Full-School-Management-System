import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/authentication.service'; 
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  val: boolean = true;

  user =  {
    email: '',
    password: ''
  }

  message = ''

  constructor( private authService: AuthenticationService , private route:ActivatedRoute , private router:Router) { }

  ngOnInit(): void {
    // if(!localStorage.getItem("token")){
    //   console.log("User not logged in")
    // }
    // else{
    //   console.log("else part")
    //   this.router.navigate(['/admin']);
    // }
  }

  login(): void{
    console.log(this.user);
    this.authService.login({email: this.user.email, password: this.user.password}).subscribe((data: any) => {
      console.log("this is data", data);
      if(data.data.userType == 0){
      console.log("Admin ");
      localStorage.setItem('dataType', "admin");
      localStorage.setItem('logindata', JSON.stringify(data.data)); 
      this.router.navigate(['/admin/addadmin']);
    }
    else if(data.data.userType == 1){
      console.log("Student");
      localStorage.setItem('logindata', JSON.stringify(data.data));
      localStorage.setItem('dataType', "student");
      this.router.navigate(['/student/welcome']);
    }
    else if(data.data.userType == 2){
      console.log("teacher")
      localStorage.setItem('dataType', "teacher");
      localStorage.setItem('logindata', JSON.stringify(data.data));
      this.router.navigate(['/teacher/subjects']);
    }
    else if(data.data.userType == 3){
      console.log("employee")
      localStorage.setItem('dataType', "employee");
      localStorage.setItem('logindata', JSON.stringify(data.data));
      this.router.navigate(['/employee/setfeechallan']);
    }
    else if(data.data.userType == 4){
      console.log("parent");
      localStorage.setItem('dataType', "parent");
      localStorage.setItem('logindata', JSON.stringify(data.data));
      this.router.navigate(['/parent/childlist']);
    }

    if(data.response == 400){
      this.message = "Invalid Usename or Pass"
    }
    });
  }
}
