import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { studentMockup } from '../classes/student-class';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  public getAll(): Observable<any> {
    return of(studentMockup);
  }
  
}
