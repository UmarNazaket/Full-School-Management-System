import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../shared/authentication.service'

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.scss']
})
export class AdmissionFormComponent implements OnInit { 
  firstname: any;
  lastname: any;
  fathername: any;
  email: any;
  class: any;
  address: any;
  phone: any;

  constructor(private authenticate: AuthenticationService , private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(): any{
    let user = {
      firstName: this.firstname,
      lastName: this.lastname,
      fatherName: this.fathername,
      email: this.email,
      class: this.class,
      address: this.address,
      phoneNumber: this.phone
    }

    this.authenticate.admission(user).subscribe((res: any) => {
      if(res.success == 1){
        this.router.navigate(['/'])
      }
    })
  }

}
