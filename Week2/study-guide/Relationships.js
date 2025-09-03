import { setupDatabase } from './connectDatabase.js';

async function createTables(client) {
  await client.query(`
    DROP TABLE IF EXISTS StudentCourses CASCADE;
    DROP TABLE IF EXISTS Students CASCADE;
    DROP TABLE IF EXISTS Courses CASCADE;
    DROP TABLE IF EXISTS EmployeeCars CASCADE;
    DROP TABLE IF EXISTS Employees CASCADE;
    DROP TABLE IF EXISTS Departments CASCADE;

    CREATE TABLE Employees (employee_id INT PRIMARY KEY, employee_name VARCHAR(100) NOT NULL);
    CREATE TABLE EmployeeCars (car_id INT PRIMARY KEY, employee_id INT UNIQUE, car_model VARCHAR(100), FOREIGN KEY (employee_id) REFERENCES Employees(employee_id));
    INSERT INTO Employees (employee_id, employee_name) VALUES (1, 'Alice'), (2, 'Bob');
    INSERT INTO EmployeeCars (car_id, employee_id, car_model) VALUES (101, 1, 'Toyota Camry'),(102, 2, 'Honda Civic');

    CREATE TABLE Departments (dept_id INT PRIMARY KEY, dept_name VARCHAR(100) NOT NULL);
    ALTER TABLE Employees ADD COLUMN dept_id INT, ADD CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES Departments(dept_id);
    INSERT INTO Departments (dept_id, dept_name) VALUES (10, 'Sales'), (20, 'Marketing'), (30, 'HR');
    UPDATE Employees SET dept_id = 10 WHERE employee_id = 1;
    UPDATE Employees SET dept_id = 20 WHERE employee_id = 2;
    INSERT INTO Employees (employee_id, employee_name, dept_id) VALUES (3, 'Charlie', 10);

    CREATE TABLE Students (student_id INT PRIMARY KEY, student_name VARCHAR(100) NOT NULL);
    CREATE TABLE Courses (course_id VARCHAR(10) PRIMARY KEY, course_name VARCHAR(100) NOT NULL);
    CREATE TABLE StudentCourses (student_id INT, course_id VARCHAR(10), PRIMARY KEY (student_id, course_id), FOREIGN KEY (student_id) REFERENCES Students(student_id), FOREIGN KEY (course_id) REFERENCES Courses(course_id));
    INSERT INTO Students (student_id, student_name) VALUES (101, 'Alice Student'), (102, 'Bob Student');
    INSERT INTO Courses (course_id, course_name) VALUES ('MATH101', 'Basic Math'), ('ENG101', 'English Writing');
    INSERT INTO StudentCourses (student_id, course_id) VALUES (101, 'MATH101'), (101, 'ENG101'), (102, 'MATH101');
  `);
  console.log('Tables for relationships created and populated.');
}

async function getEmployeeCars(client) {
    console.log('\n--- Employee and Car (One-to-One) ---');
    const res = await client.query(`SELECT e.employee_name, ec.car_model FROM Employees e JOIN EmployeeCars ec ON e.employee_id = ec.employee_id;`);
    res.rows.forEach(row => console.log(row));
}

async function getEmployeesByDepartment(client) {
    console.log('\n--- Employees by Department (One-to-Many) ---');
    const res = await client.query(`SELECT e.employee_name, d.dept_name FROM Employees e LEFT JOIN Departments d ON e.dept_id = d.dept_id;`);
    res.rows.forEach(row => console.log(row));
}

async function getStudentCourses(client) {
    console.log('\n--- Student Enrollments (Many-to-Many) ---');
    const res = await client.query(`SELECT s.student_name, c.course_name FROM Students s JOIN StudentCourses sc ON s.student_id = sc.student_id JOIN Courses c ON sc.course_id = c.course_id;`);
    res.rows.forEach(row => console.log(row));
}

async function runAllRelationshipChecks() {
  let client;
  try {
    client = await setupDatabase(true);
    await createTables(client);
    await getEmployeeCars(client);
    await getEmployeesByDepartment(client);
    await getStudentCourses(client);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    if (client) {
      await client.end();
      console.log('Disconnected from "demo_db".');
    }
  }
}

runAllRelationshipChecks();