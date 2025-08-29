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

async function selectAll() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database!');
    
    const selectQuery = "SELECT * FROM student";
    
    console.log("Going to run:", selectQuery);
    const result = await client.query(selectQuery);
    
    console.log('Query results:');
    result.rows.forEach((row, index) => {
      console.log(`Row ${index}:`, row);
    });
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    await client.end();
  }
}

selectAll();
