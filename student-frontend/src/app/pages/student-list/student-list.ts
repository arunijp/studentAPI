import { Component, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Student, StudentService } from '../../services/student';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, DatePipe],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  protected readonly loading = signal(true);
  protected readonly students = signal<Student[]>([]);

  constructor(private readonly service: StudentService) {
    this.refresh();
  }

  protected refresh(): void {
    this.loading.set(true);
    this.service.getStudents().subscribe({
      next: (rows) => this.students.set(rows ?? []),
      error: (err) => {
        const msg = err?.message ?? 'Failed to load students.';
        alert(msg);
        this.students.set([]);
      },
      complete: () => this.loading.set(false),
    });
  }
}
