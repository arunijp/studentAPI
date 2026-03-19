using System;

namespace StudentApi.Models{
    public class Student{
        public int Id { get; set; }
        public string StudentName { get; set; }
        public string Email { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Course { get; set; }
        public DateOnly? RegistrationDate { get; set; }
    }

    public class CreateStudentRequest{
        public string StudentName { get; set; }
        public string Email { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Course { get; set; }
    }
}