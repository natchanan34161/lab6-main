import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginData = {
    teacherId: '',
    password: ''
  }

  constructor (private authService: AuthService, private router: Router) {}

  public login(): void {
    console.log('LoginData: ', this.loginData)
    this.authService.login(this.loginData).subscribe({
    next: (res) => {
      // ตรงนี้จะทำงานเฉพาะตอน Status 200 เท่านั้น!
      this.router.navigateByUrl('/home');
    },
    error: (err) => {
      // --- เขียน if-else เช็ค Error Status ตรงนี้ได้เลย ---
      if (err.status === 400) {
        alert('Wrong Password');
      } else if (err.status === 404) {
        alert('Teacher ID Not Found');
      } else {
        alert('ERROR: ' + (err.error?.msg || 'Unknown Error'));
      }
    }
  });
  }
}