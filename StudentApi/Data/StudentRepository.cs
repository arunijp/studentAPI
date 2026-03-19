using System.Data;
using Dapper;
using Npgsql;
using StudentApi.Models;

namespace StudentApi.Data;

public sealed class StudentRepository(IConfiguration configuration)
{
    private readonly string _connectionString =
        configuration.GetConnectionString("Default")
        ?? throw new InvalidOperationException("Missing connection string: ConnectionStrings:Default");

    private IDbConnection CreateConnection() => new NpgsqlConnection(_connectionString);

    public async Task<int> CreateAsync(CreateStudentRequest request, CancellationToken cancellationToken)
    {
        const string sql = """
            INSERT INTO students (student_name, email, date_of_birth, gender, course, registration_date)
            VALUES (@StudentName, @Email, @DateOfBirth, @Gender, @Course, CURRENT_DATE)
            RETURNING id;
            """;

        using var conn = CreateConnection();
        return await conn.ExecuteScalarAsync<int>(
            new CommandDefinition(
                sql,
                request,
                cancellationToken: cancellationToken
            )
        );
    }

    public async Task<IReadOnlyList<Student>> GetAllLatestFirstAsync(CancellationToken cancellationToken)
    {
        const string sql = """
            SELECT
              id AS "Id",
              student_name AS "StudentName",
              email AS "Email",
              date_of_birth AS "DateOfBirth",
              gender AS "Gender",
              course AS "Course",
              registration_date AS "RegistrationDate"
            FROM students
            ORDER BY registration_date DESC, id DESC;
            """;

        using var conn = CreateConnection();
        var rows = await conn.QueryAsync<Student>(
            new CommandDefinition(
                sql,
                cancellationToken: cancellationToken
            )
        );
        return rows.AsList();
    }
}

