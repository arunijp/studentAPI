using Microsoft.AspNetCore.Mvc;
using StudentApi.Data;
using StudentApi.Models;

namespace StudentApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class StudentsController(StudentRepository repo) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<object>> Create([FromBody] CreateStudentRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.StudentName))
            return BadRequest(new { message = "Student Name is required." });

        if (string.IsNullOrWhiteSpace(request.Email))
            return BadRequest(new { message = "Email is required." });

        if (string.IsNullOrWhiteSpace(request.Gender))
            return BadRequest(new { message = "Gender is required." });

        if (string.IsNullOrWhiteSpace(request.Course))
            return BadRequest(new { message = "Course is required." });

        var id = await repo.CreateAsync(request, cancellationToken);
        return Ok(new { id, message = "Student registered successfully." });
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Student>>> GetAll(CancellationToken cancellationToken)
    {
        var students = await repo.GetAllLatestFirstAsync(cancellationToken);
        return Ok(students);
    }
}

