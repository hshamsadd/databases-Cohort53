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
      student_number: 4444,
      student_name: 'Benno',
      date_of_birth: '1995-04-26',
      grade: 8.3,
      gender: 'm',
    },
    {
      student_number: 3333,
      student_name: 'Henriata',
      date_of_birth: '1998-05-12',
      grade: 8.5,
      gender: 'f', 
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

    for (const student of students) {
      let insertQuery = `
        INSERT INTO students (student_number, student_name, date_of_birth, grade, gender)
        VALUES ($1, $2, $3, $4, $5)
      `;

      // If the student already exists, update their information instead.
      // This will allow us to run this script multiple times without errors.
      insertQuery += `
        ON CONFLICT (student_number) DO UPDATE SET
        student_name = EXCLUDED.student_name,
        date_of_birth = EXCLUDED.date_of_birth,
        grade = EXCLUDED.grade,
        gender = EXCLUDED.gender`;

      const values = [
        student.student_number,
        student.student_name,
        student.date_of_birth,
        student.grade,
        student.gender
      ];
      
      await client.query(insertQuery, values);
      console.log(`Inserted/Updated student: ${student.student_name}`);
    }

    // Add a SELECT query to show the results
    const selectQuery = 'SELECT * FROM students ORDER BY student_number';
    const result = await client.query(selectQuery);
    
    console.log('\nCurrent students in the database:');
    result.rows.forEach(row => {
      console.log(`ID: ${row.student_number}, Name: ${row.student_name}, Grade: ${row.grade}`);
    });

    console.log('\nDatabase seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
  }
}

seedDatabase();
