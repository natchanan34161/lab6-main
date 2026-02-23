import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TeacherClass, teacherMockup } from '../classes/teacher-class';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {

  private apiUrl: string = 'http://localhost:3000/teacher';

  constructor(private http: HttpClient) {}

  //CREATE
  public add(teacher: TeacherClass): Observable<any> {
    return this.http.post(this.apiUrl, teacher, {observe: 'response'});
  }

  //READ
  public getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  //UPDATE
  public update(teacher: TeacherClass): Observable<any> {
    return this.http.put(this.apiUrl + '/' + teacher.teacherId, teacher, {observe: 'response'});
  }

  //DELETE
  public delete(teacherID: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + teacherID, {observe: 'response'});
  }

}
