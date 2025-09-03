import { setupDatabase } from './connectDatabase.js';

async function createTables(client) {
  await client.query(`
    DROP TABLE IF EXISTS Enrollments CASCADE;
    DROP TABLE IF EXISTS Students CASCADE;
    DROP TABLE IF EXISTS Courses CASCADE;

    CREATE TABLE Students (
        student_id INT PRIMARY KEY,
        student_name VARCHAR(100) NOT NULL,
        age INT
    );
    INSERT INTO Students (student_id, student_name, age) VALUES
    (101, 'Alice', 20),
    (102, 'Bob', 21),
    (103, 'Charlie', 20);

    CREATE TABLE Courses (
        course_id VARCHAR(10) PRIMARY KEY,
        course_name VARCHAR(100) NOT NULL,
        instructor VARCHAR(100)
    );
    INSERT INTO Courses (course_id, course_name, instructor) VALUES
    ('CS101', 'Intro to Computer Science', 'Mr. Smith'),
    ('MA201', 'Calculus I', 'Ms. Jones');

    CREATE TABLE Enrollments (
        student_id INT,
        course_id VARCHAR(10),
        enrollment_date DATE,
        PRIMARY KEY (student_id, course_id),
        FOREIGN KEY (student_id) REFERENCES Students(student_id),
        FOREIGN KEY (course_id) REFERENCES Courses(course_id)
    );
    INSERT INTO Enrollments (student_id, course_id, enrollment_date) VALUES
    (101, 'CS101', '2023-09-01'),
    (101, 'MA201', '2023-09-01'),
    (102, 'CS101', '2023-09-05');
  `);
  console.log('Tables created and populated.');
}

async function checkStudents(client) {
  try {
    const res = await client.query('SELECT * FROM Students;');
    console.log('--- Students Table ---');
    res.rows.forEach(row => console.log(row));
  } catch (err) {
    console.error('Error fetching students:', err.message);
  }
}

async function checkEnrollments(client) {
  try {
    const res = await client.query('SELECT * FROM Enrollments;');
    console.log('\n--- Enrollments Table ---');
    res.rows.forEach(row => console.log(row));
  } catch (err) {
    console.error('Error fetching enrollments:', err.message);
  }
}

async function checkCourses(client) {
  try {
    const res = await client.query('SELECT * FROM Courses;');
    console.log('\n--- Courses Table ---');
    res.rows.forEach(row => console.log(row));
  } catch (err) {
    console.error('Error fetching courses:', err.message);
  }
}

async function runChecks() {
  let client;
  try {
    client = await setupDatabase(true);
    await createTables(client);
    await checkStudents(client);
    await checkEnrollments(client);
    await checkCourses(client);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    if (client) {
      await client.end();
      console.log('Disconnected from "demo_db".');
    }
  }
}

runChecks();