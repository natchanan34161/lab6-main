import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiLoginUrl = 'http://localhost:3000/login'

  constructor(private http: HttpClient) {}

  public login (credential: any): Observable<any> {
    return this.http.post(this.apiLoginUrl, credential, {observe: 'response'}).pipe(
      tap((response: any) => {
        // CHECK RESPOND TOKEN ถ้ามีให้ Save ไว้
        if (response && response.body.token) {
          localStorage.setItem('auth_token', response.body.token)
        }
      })
    )
  }

    // ดึง TOKEN จาก localStorage
  public getToken (): any {
    return localStorage.getItem('auth_token')
  }

  public logout (): void {
    localStorage.removeItem('auth_token')
  }
}
