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
    user_username: '',
    user_pass: ''
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
    this.authService.login(this.user).subscribe((data: any) => {
      console.log("this is data", data);
      if(data.status){
      console.log("if condition ");
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email); 
      localStorage.setItem('username', this.user.user_username);
      this.router.navigate(['/admin']);
    }
    else{
      console.log(data);
      console.log("Showing Else Part");
      this.message = "Please Write Correct Email and Pass";
    }
    });
  }
}
