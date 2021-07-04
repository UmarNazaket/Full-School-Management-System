import { Component, OnInit } from '@angular/core';
// import { this.state. } from 'node:fs';
import { StudentService } from 'src/shared/student.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  subjectName = localStorage.getItem("subjectName");
  price = localStorage.getItem("price")
  firstName: any;
  lastName: any;
  phone: any;
  address: any;
  city: any;
  state: any;
  country: any;
  postalcode: any;
  email: any;
  orderNote: any;

  message: any;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.message = ''
  }
  sendcheckoutdata(): void{
    
    var  data = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      city: this.city,
      state: this.state,
      country: this.country,
      postalCode: this.postalcode,
      email: this.email,
      bookName: this.subjectName,
      price: this.price,
      orderNote: this.orderNote
}
this.studentService.placeOrder(data).subscribe((res: any) => {
  console.table("this is data", res);
  this.message = 'Your Order Has Been Placed'
});

  }
  checkoutvalidation(): void{
  }

}
