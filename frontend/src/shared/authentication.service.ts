import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/model/global';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = BASE_URL;
  
  constructor(private httpClient: HttpClient) {}

  login(user: any){
    return this.httpClient.post(this.baseUrl + '/checkadminlogin', {user}); 
  }
  
}
