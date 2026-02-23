import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Student } from './pages/student/student';
import { Teacher } from './pages/teacher/teacher';
import { LoginComponent } from './pages/login-component/login-component';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'student', component: Student},
    {path: 'teacher', component: Teacher},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];
