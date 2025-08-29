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

async function testConnection() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database!');
    
    const result = await client.query('SELECT 1 + 1 AS solution');
    console.log('The solution is:', result.rows[0].solution);
  } catch (error) {
    console.error('Connection error:', error);
  } finally {
    await client.end();
  }
}

testConnection();
