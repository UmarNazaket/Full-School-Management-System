import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/model/global';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl = BASE_URL;

  
  id = JSON.parse(localStorage.getItem("logindata"))._id;

  constructor(private httpClient: HttpClient) { }

  getClassLink(){
    return this.httpClient.post(this.baseUrl + '/student/fetch/online/class', {id: this.id}); 
  }
  getSubjects(){
    return this.httpClient.post(this.baseUrl + '/student/subjects', {id: this.id}); 
  }
  getAttendance(subjectId: any){ 
    return this.httpClient.post(this.baseUrl + '/student/fetch/attendance', {subjectId , id: this.id});
  }
  getFeeChallan(){
    return this.httpClient.post(this.baseUrl + '/student/fetch/fee/challan', {id: this.id}); 
  }
  gettimetable(){
    return this.httpClient.post(this.baseUrl + '/student/timetable' , {id: this.id}); 
  }
  getresult(){
    return this.httpClient.post(this.baseUrl + '/student/fetch/marks', {id: this.id});
  }
  getschemeofstudies(subjectId: any){
    return this.httpClient.post(this.baseUrl + '/student/fetch/subject/syllabus' , {subjectId, id: this.id});
  }
  getpaper(subjectId: any){
    return this.httpClient.post(this.baseUrl + '/student/fetch/online/exam' , {subjectId, id: this.id});
  }
  uploadPDF(data: any){
    return this.httpClient.post('https://cloudinary.com/console/c-1249697e2a6182748d39113d4140b1/media_library/folders/home' , {data, id: this.id});
  }
  getAnnouncements(){
    return this.httpClient.post(this.baseUrl + '/student/fetch/announcements', {id: this.id});
  }

  placeOrder(data){
    return this.httpClient.post(this.baseUrl + '/student/order' , {data});
  }

  // FOR PARENT
  getchildren(){
    return this.httpClient.post(this.baseUrl + '/parent/view/child', {id: this.id});
  }

  getAttendanceP(data: any){
    console.log(data)
    return this.httpClient.post(this.baseUrl + '/parent/view/student/data', {data, id: this.id});
  }

  getChallanP(data: any){
    console.log(data)
    return this.httpClient.post(this.baseUrl + '/parent/view/student/data', {data, id: this.id});
  }

  getResultP(data: any){
    console.log(data)
    return this.httpClient.post(this.baseUrl + '/parent/view/student/data', {data, id: this.id});
  }

  // FOR EMPLOYEE
  getStdList(classes: any){
    return this.httpClient.post(this.baseUrl + '/employee/student/list', {classes, id: this.id});
  }

  setFee(data: any){
    return this.httpClient.post(this.baseUrl + '/employee/generate/fee', {data, id: this.id});
  }

  // Teacher
  fetchSubjects(teacherId: any){
    return this.httpClient.post(this.baseUrl + '/teacher/subjects', {teacherId, id: this.id});
  }

  fetchStudents(subjectId: any){
    return this.httpClient.post(this.baseUrl + '/teacher/fetch/student/list', {subjectId, id: this.id});
  }

  markAttendance(attendanceArry: any){
    return this.httpClient.post(this.baseUrl + '/teacher/add/attendance', {attendanceArry, id: this.id});
  }

  addMarks(data: any){
    return this.httpClient.post(this.baseUrl + '/teacher/add/marks', {data, id: this.id});
  }

  schemeOfStudy(data: any){
    return this.httpClient.put(this.baseUrl + '/teacher/add/study/scheme', {data, id: this.id});
  }

  classLink(data: any){
    return this.httpClient.post(this.baseUrl + '/teacher/add/onlineclass', {data, id: this.id});
  }

  // ADMIN APi's
  addadmin(data: any){
    return this.httpClient.post(this.baseUrl + '/admin/subadmin/create', {data, id: this.id});
  }
  
}

