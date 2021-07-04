import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/model/global';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = BASE_URL;
  id = JSON.parse(localStorage.getItem("logindata"));
  if(id){
    id = id._id
  }
  
  constructor(private httpClient: HttpClient) {}

  login(user: any){
    return this.httpClient.post(this.baseUrl + '/admin/login', user); 
  }

  admission(user: any){
    return this.httpClient.post(this.baseUrl + '/parent/admission', {user, id: this.id});
  }
  
}
