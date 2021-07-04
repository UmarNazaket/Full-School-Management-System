import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {AdminSService} from '../../../shared/admin-s.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
        
    `]
})
export class EditStudentComponent implements OnInit {
  productDialog: boolean;

  products: any;

  product: any;

  selectedProducts: any;

  submitted: boolean;

  statuses: any[];

  data1;

  constructor(private orderService: AdminSService ,private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    // this.orderService.getStudentData().subscribe((data: any) => {
    //   console.table("this is data", data.result);
    //   this.products = data.result;
    // });
    // this.products = [{fullname: "umar", rollno: 1234, email: "umar@gmail.com", phone: 123345}]
  }

  getStudents(classnum: number){
      
    this.orderService.getStudents({classNo: classnum}).subscribe((data: any) => {
        console.table("this is data", data);
        this.products = data.data.classStudent;
      });
  }


   // Default CRUD FUNCTIONS
   openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
}

deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.selectedProducts = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Student Deleted', life: 3000});
        }
    });
}

editProduct(product) {
    this.product = {...product};
    this.productDialog = true;
}

deleteProduct(product) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete this student record?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter(val => val._id !== product._id);
            this.product = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Student Deleted', life: 3000});
            var data = {
                studentId: product._id,
                status: 5
            }
            // Deleting from Database
            this.orderService.deleteStd(data).subscribe((data: any) => {
                console.table("this is data", data);
              });
        }
    });
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
        if (this.product._id) {
            console.log("Going into if")
            this.products[this.findIndexById(this.product._id)] = this.product;                
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Student Details Updated', life: 3000});
            // updating from Database
            this.orderService.editStd(this.product).subscribe((data: any) => {
                console.table("this is data", data);
              });
        }
        else {
            console.log("Going into else")
            this.product._id = this.createId();
            this.product.image = 'product-placeholder.svg';
            this.products.push(this.product);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Student Created', life: 3000});
        }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
        console.log("Products updated ",this.products)
    }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i]._id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

}
