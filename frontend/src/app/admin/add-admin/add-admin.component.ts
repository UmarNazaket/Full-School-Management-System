import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/student.service'

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  firstname: any;
  lastname: any;
  email: any;
  pass: any;
  phonenumber: any;

  constructor(private studentservice: StudentService) { }

  ngOnInit(): void {
  }

  onsubmit(): any{
    let data = {
      firstName: this.firstname,
      lastName: this.lastname,
      userType: 0,
      email: this.email,
      password: this.pass,
      phoneNumber: this.phonenumber
    }

    this.studentservice.addadmin(data).subscribe((res: any) => {
      console.table("this is data", res);
    });

  }

}
