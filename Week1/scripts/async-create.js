import { Client } from 'pg';

// Database connection configuration
const config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
  port: 5432,
};

const client = new Client(config);

async function seedDatabase() {
  const CREATE_STUDENTS_TABLE = `
    CREATE TABLE IF NOT EXISTS students (
      student_number INTEGER PRIMARY KEY,
      student_name VARCHAR(50),
      date_of_birth DATE,
      grade FLOAT,
      gender VARCHAR(1) CHECK (gender IN ('m', 'f'))
    )`;
    
  const CREATE_TEACHERS_TABLE = `
    CREATE TABLE IF NOT EXISTS teachers (
      teacher_number INTEGER PRIMARY KEY,
      teacher_name VARCHAR(50),
      date_of_birth DATE,
      subject TEXT,
      gender VARCHAR(1) CHECK (gender IN ('m', 'f'))
    )`;
    
  const students = [
    {
      student_number: 1001,
      student_name: 'Ben',
      date_of_birth: '1995-04-26',
      grade: 8.3,
      gender: 'm',
    },
    {
      student_number: 1002,
      student_name: 'Henri',
      date_of_birth: '1998-05-12',
      grade: 8.5,
      gender: 'm',
    },
  ];

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database!');

    // Create tables
    await client.query(CREATE_STUDENTS_TABLE);
    console.log('Students table created successfully');
    
    await client.query(CREATE_TEACHERS_TABLE);
    console.log('Teachers table created successfully');

    // Insert students
    for (const student of students) {
      const insertQuery = `
        INSERT INTO students (student_number, student_name, date_of_birth, grade, gender)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (student_number) DO NOTHING
      `;
      const values = [
        student.student_number,
        student.student_name,
        student.date_of_birth,
        student.grade,
        student.gender
      ];
      
      await client.query(insertQuery, values);
      console.log(`Inserted student: ${student.student_name}`);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
  }
}

seedDatabase();
