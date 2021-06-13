import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/model/global';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl = BASE_URL;

  _id = JSON.parse(localStorage.getItem("logindata"))._id;

  constructor(private httpClient: HttpClient) { }

  getClassLink(){
    return this.httpClient.get(this.baseUrl + '/student/fetch/online/class'); 
  }
  getSubjects(){
    return this.httpClient.get(this.baseUrl + '/student/subjects'); 
  }
  getAttendance(subjectId: any){ 
    return this.httpClient.post(this.baseUrl + '/student/fetch/attendance', {subjectId});
  }
  getFeeChallan(){
    return this.httpClient.get(this.baseUrl + '/student/fetch/fee/challan'); 
  }
  gettimetable(){
    return this.httpClient.get(this.baseUrl + '/student/timetable'); 
  }
  getresult(){
    return this.httpClient.get(this.baseUrl + '/student/fetch/marks');
  }
  getschemeofstudies(subjectId: any){
    return this.httpClient.post(this.baseUrl + '/student/fetch/subject/syllabus' , {subjectId});
  }
  getpaper(subjectId: any){
    return this.httpClient.post(this.baseUrl + '/student/fetch/online/exam' , {subjectId});
  }
  uploadPDF(data: any){
    return this.httpClient.post('https://cloudinary.com/console/c-1249697e2a6182748d39113d4140b1/media_library/folders/home' , {data});
  }
  getAnnouncements(){
    return this.httpClient.post(this.baseUrl + '/student/fetch/announcements', {});
  }

  // FOR PARENT
  getchildren(){
    return this.httpClient.get(this.baseUrl + '/parent/view/child');
  }

  getAttendanceP(data: any){
    console.log(data)
    return this.httpClient.post(this.baseUrl + '/parent/view/student/data', {data});
  }

  getChallanP(data: any){
    console.log(data)
    return this.httpClient.post(this.baseUrl + '/parent/view/student/data', {data});
  }

  getResultP(data: any){
    console.log(data)
    return this.httpClient.post(this.baseUrl + '/parent/view/student/data', {data});
  }

  // FOR EMPLOYEE
  getStdList(classes: any){
    return this.httpClient.post(this.baseUrl + '/employee/student/list', {classes});
  }

  setFee(data: any){
    return this.httpClient.post(this.baseUrl + '/employee/generate/fee', {data});
  }

  // Teacher
  fetchSubjects(teacherId: any){
    return this.httpClient.post(this.baseUrl + '/teacher/subjects', {teacherId});
  }

  fetchStudents(id: any){
    return this.httpClient.post(this.baseUrl + '/teacher/fetch/student/list', {id});
  }

  markAttendance(attendanceArry: any){
    return this.httpClient.post(this.baseUrl + '/teacher/add/attendance', {attendanceArry});
  }

  addMarks(data: any){
    return this.httpClient.post(this.baseUrl + '/teacher/add/marks', {data});
  }

  schemeOfStudy(data: any){
    return this.httpClient.put(this.baseUrl + '/teacher/add/study/scheme', {data});
  }

  classLink(data: any){
    return this.httpClient.post(this.baseUrl + '/teacher/add/onlineclass', {data});
  }

  // ADMIN APi's
  addadmin(data: any){
    return this.httpClient.post(this.baseUrl + '/admin/subadmin/create', {data});
  }
  
}

