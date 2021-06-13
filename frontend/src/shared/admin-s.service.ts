import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/model/global';

@Injectable({
  providedIn: 'root'
})
export class AdminSService {
  baseUrl = BASE_URL;

  constructor(private httpClient: HttpClient) { }

  getStudentData(){
    return this.httpClient.get(this.baseUrl + '/admin/subAdmin/admission/list'); 
  }

  AcceptRejectStd(id: any, status: any){
    return this.httpClient.put(this.baseUrl + '/admin/subAdmin/admission/status', {id , status}); 
  }

  getStudents(classnum: any){
    return this.httpClient.post(this.baseUrl + '/admin/subAdmin/class/student', {classnum});
  }

  deleteStd(data: any){
    return this.httpClient.put(this.baseUrl + '/admin/subAdmin/update/status', {data});
  }

  editStd(data: any){
    return this.httpClient.post(this.baseUrl + '/admin/subAdmin/update/user', {data});
  }

  addSubject(data: any){
    return this.httpClient.post(this.baseUrl + '/admin/subAdmin/create/subject', {data});
  }

  createTimeTable(data: any){
    return this.httpClient.post(this.baseUrl + '/admin/subAdmin/create/timetable', {data});
  }
}
