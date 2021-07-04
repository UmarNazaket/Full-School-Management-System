import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/model/global';

@Injectable({
  providedIn: 'root'
})
export class AdminSService {
  baseUrl = BASE_URL;
  id = JSON.parse(localStorage.getItem("logindata"))._id;

  constructor(private httpClient: HttpClient) { }

  getStudentData(){
    return this.httpClient.get(this.baseUrl + '/admin/subAdmin/admission/list'); 
  }

  AcceptRejectStd(id: any, status: any){
    return this.httpClient.put(this.baseUrl + '/admin/subAdmin/admission/status', {id , status}); 
  }

  getStudents(classnum: any){
    return this.httpClient.post(this.baseUrl + '/admin/subAdmin/class/student', {class: classnum.classNo});
  }

  deleteStd(data: any){
    return this.httpClient.put(this.baseUrl + '/admin/subAdmin/update/status', {data , id: this.id});
  }

  editStd(data: any){
    return this.httpClient.post(this.baseUrl + '/admin/subAdmin/update/user', {data , id: this.id});
  }

  addSubject(data: any){
    return this.httpClient.post(this.baseUrl + '/admin/subAdmin/create/subject', {data , id: this.id});
  }

  createTimeTable(data: any){
    return this.httpClient.post(this.baseUrl + '/admin/subAdmin/create/timetable', {data , id: this.id});
  }
}
