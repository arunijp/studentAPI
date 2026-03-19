-- Database: studentdb
-- Table: students

CREATE DATABASE studentdb;

\c studentdb;

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  student_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL,
  course VARCHAR(200) NOT NULL,
  registration_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE INDEX IF NOT EXISTS ix_students_registration_date
  ON students (registration_date DESC, id DESC);

