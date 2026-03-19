import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Gender = 'Male' | 'Female' | 'Other';

export interface Student {
  id: number;
  studentName: string;
  email: string;
  dateOfBirth: string; // ISO date from API
  gender: string;
  course: string;
  registrationDate: string; // ISO date from API
}

export interface CreateStudentRequest {
  studentName: string;
  email: string;
  dateOfBirth: string; // yyyy-mm-dd
  gender: Gender;
  course: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly baseUrl = 'http://localhost:5265/api/students';

  constructor(private readonly http: HttpClient) {}

  createStudent(request: CreateStudentRequest): Observable<{ id: number; message: string }> {
    return this.http.post<{ id: number; message: string }>(this.baseUrl, request);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }
}
