import prompt from 'prompt';
import { Client } from 'pg';

// Database connection configuration
const config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'company',
  port: 5432,
};

const client = new Client(config);

const getInput = (schema) => {
  return new Promise((resolve, reject) => {
    prompt.get(schema, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

async function queryDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database!');
    
    // Ensure employees table exists for demonstration
    await client.query(`
      CREATE TABLE IF NOT EXISTS employees (
        employee_id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        salary INTEGER,
        department VARCHAR(50)
      )
    `);
    
    // Insert some sample data if not exists
    const checkData = await client.query('SELECT COUNT(*) FROM employees');
    if (parseInt(checkData.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO employees (employee_id, name, salary, department) VALUES
        (101, 'John Doe', 50000, 'Engineering'),
        (102, 'Jane Smith', 60000, 'Marketing'),
        (103, 'Bob Johnson', 55000, 'Engineering')
      `);
      console.log('Sample data inserted');
    }

    prompt.start();
    
    const result = await getInput(['employee_number']);
    const inputNumber = result.employee_number;

    console.log('\n=== SQL Injection Demonstration ===\n');

    // 1. VULNERABLE: Direct string concatenation (DON'T DO THIS!)
    console.log('1. VULNERABLE APPROACH (demonstrates the problem):');
    const vulnerableQuery = `SELECT * FROM employees WHERE employee_id = ${inputNumber}`;
    console.log('Query:', vulnerableQuery);
    console.log('⚠️  This is vulnerable to SQL injection!\n');
    
    // Don't actually execute the vulnerable query in production
    // await client.query(vulnerableQuery);

    // 2. SAFE: Using parameterized queries (DO THIS!)
    console.log('2. SAFE APPROACH (using parameterized queries):');
    const safeQuery = 'SELECT * FROM employees WHERE employee_id = $1';
    console.log('Query template:', safeQuery);
    console.log('Parameter:', inputNumber);
    
    const queryResult = await client.query(safeQuery, [inputNumber]);
    
    if (queryResult.rows.length > 0) {
      console.log('\nResults:');
      queryResult.rows.forEach(row => {
        console.log(`ID: ${row.employee_id}, Name: ${row.name}, Salary: ${row.salary}, Dept: ${row.department}`);
      });
    } else {
      console.log('No employee found with that ID.');
    }

    console.log('\n=== Key Points ===');
    console.log('✅ Always use parameterized queries ($1, $2, etc.)');
    console.log('✅ Never directly concatenate user input into SQL strings');
    console.log('✅ PostgreSQL automatically escapes parameters');
    console.log('\nTry entering: 101 OR 1=1 -- to see how parameterized queries prevent injection');

  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await client.end();
  }
}

queryDatabase();
