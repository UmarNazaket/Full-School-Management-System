import { Component, OnInit } from '@angular/core';
import {AdminSService} from '../../../shared/admin-s.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admission-forms',
  templateUrl: './admission-forms.component.html',
  styleUrls: ['./admission-forms.component.scss']
})
export class AdmissionFormsComponent implements OnInit {
  Students = [{Roll_No: 123,name: "Ali"},{Roll_No: 234,name: "Umar"}];
  
  constructor(private adminservice: AdminSService, private router: Router) { }

  ngOnInit( ): void {
    this.adminservice.getStudentData().subscribe((res: any) => {
      console.log(res);
      this.Students = res.data.admissionForm;
    })
  }

  getadmission(id: any , isaccepted: any): void{
    console.log(id , isaccepted);
    this.adminservice.AcceptRejectStd(id , isaccepted).subscribe((res: any) => {
      console.log(res);
      location.reload();
    })
  }

}
