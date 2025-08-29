import { Client } from 'pg';

// Database connection configuration
const config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'hy',
  port: 5432,
};

const client = new Client(config);

async function insertValues() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database!');
    
    // First ensure the employees table exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS employees (
        employee_id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        salary INTEGER,
        hire_date DATE,
        gender CHAR(1)
      )
    `;
    
    await client.query(createTableQuery);
    console.log('Employees table ready');
    
    const insertQueries = [
      {
        text: "INSERT INTO employees (employee_id, name, salary, hire_date, gender) VALUES ($1, $2, $3, $4, $5)",
        values: [106, 'Ibrahim', 2000, '2019-03-10', 'm']
      },
      {
        text: "INSERT INTO employees (employee_id, name, salary, hire_date, gender) VALUES ($1, $2, $3, $4, $5)",
        values: [107, 'Ali', 3000, '2019-04-10', 'm']
      }
    ];
    
    for (const query of insertQueries) {
      console.log("Going to run:", query.text, "with values:", query.values);
      const result = await client.query(query);
      console.log("Insert successful, affected rows:", result.rowCount);
    }
  } catch (error) {
    console.error('Error inserting values:', error);
  } finally {
    await client.end();
  }
}

insertValues();
