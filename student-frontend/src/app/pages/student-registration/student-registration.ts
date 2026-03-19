import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService, Gender } from '../../services/student';

@Component({
  selector: 'app-student-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-registration.html',
  styleUrl: './student-registration.css',
})
export class StudentRegistration {
  private readonly fb = inject(FormBuilder);
  private readonly students = inject(StudentService);

  protected readonly saving = signal(false);
  protected readonly successMessage = signal<string | null>(null);
  protected readonly todayIso = new Date().toISOString().slice(0, 10);
  protected readonly genders: Gender[] = ['Male', 'Female', 'Other'];

  protected readonly form = this.fb.nonNullable.group({
    studentName: ['', [Validators.required, Validators.maxLength(200)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    dateOfBirth: ['', [Validators.required]],
    gender: this.fb.nonNullable.control<Gender>('Male', { validators: [Validators.required] }),
    course: ['', [Validators.required, Validators.maxLength(200)]],
    registrationDate: [{ value: this.todayIso, disabled: true }],
  });

  protected submit(): void {
    this.successMessage.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.students
      .createStudent({
        studentName: this.form.getRawValue().studentName,
        email: this.form.getRawValue().email,
        dateOfBirth: this.form.getRawValue().dateOfBirth,
        gender: this.form.getRawValue().gender,
        course: this.form.getRawValue().course,
      })
      .subscribe({
        next: (res) => {
          this.successMessage.set(res.message ?? 'Saved.');
          const prevGender = this.form.getRawValue().gender;
          this.form.reset({
            studentName: '',
            email: '',
            dateOfBirth: '',
            gender: prevGender,
            course: '',
            registrationDate: this.todayIso,
          });
        },
        error: (err) => {
          const msg =
            err?.error?.message ??
            err?.message ??
            'Failed to save. Check API is running and reachable.';
          this.successMessage.set(null);
          alert(msg);
        },
      })
      .add(() => this.saving.set(false));
  }
}
