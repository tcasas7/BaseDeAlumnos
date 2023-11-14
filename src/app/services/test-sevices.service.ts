import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class TestSevicesService {
  private apiUrl = "https://backend-idra-production.up.railway.app/student"; 

  constructor(private http: HttpClient) {}


  edit(updatedStudent: student): Observable<any> {
    const url = `${this.apiUrl}/${updatedStudent.id}`; // Asume que la URL para editar un estudiante es /students/{id}
  
    return this.http.put<student>(url, updatedStudent);
  }
  

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl + '/getAll');
  }

  save(student: any): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/update`, student);
  }


  deleteStudent(id: number, student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/delete`, null);
  }
  
}




















/*import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpResponse, HttpParams} from '@angular/common/http'
import { student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class TestSevicesService {
  edit(student: student) {
    throw new Error('Method not implemented.');
  }

  private url = "http://7acf-2800-2245-9080-776-668-1c51-3c8d-fa31.ngrok-free.app/student"

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.url + '/getAll')
  } 

  save(student: any): Observable<any> {
    return this.http.post(this.url,student)
  }

  updateStudent(id: number, student: any): Observable<any>{
    return this.http.post(this.url + '/' + id + '/update',student)
  }
  deleteStudent(id: number, student: any): Observable<any>{
    return this.http.post(this.url + '/' + id + '/delete',null)
}

viewStudent(id: number, student: any): Observable<any>{
  return this.http.post(this.url + '/' + id + '/view',null)
}


}*/