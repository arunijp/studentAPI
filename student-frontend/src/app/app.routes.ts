import { Routes } from '@angular/router';
import { StudentRegistration } from './pages/student-registration/student-registration';
import { StudentList } from './pages/student-list/student-list';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'register' },
  { path: 'register', component: StudentRegistration, title: 'Register Student' },
  { path: 'students', component: StudentList, title: 'Student List' },
  { path: '**', redirectTo: 'register' },
];
