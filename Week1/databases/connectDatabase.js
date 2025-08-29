import pkg from 'pg';
const { Client } = pkg;

// Reusable function for connecting
export async function connectDB() {
  const client = new Client({
    user: 'hyfuser',
    host: 'localhost',
    database: 'world',      
    password: 'hyfpassword', 
    port: 5432,
  });

  try {
    await client.connect();
    console.log(`Connected to database: ${client.database}`);
    return client;  // return client so queries can be made outside
  } catch (error) {
    console.error('Connection error:', error);
    throw error;
  }
}