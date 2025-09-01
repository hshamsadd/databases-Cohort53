import pkg from 'pg';
const { Client } = pkg;

export async function setupDatabase(dropAndCreate = false) {
  // Connect to default database to manage "demo_db"
  const defaultClient = new Client({
    user: 'hyfuser',
    host: 'localhost',
    database: 'postgres',
    password: 'hyfpassword',
    port: 5432,
  });

  await defaultClient.connect();
  console.log('Connected to default database.');

  if (dropAndCreate) {
    await defaultClient.query(`DROP DATABASE IF EXISTS demo_db;`);
    await defaultClient.query(`CREATE DATABASE demo_db;`);
    console.log('Database "demo_db" created.');
  }

  await defaultClient.end();

  // Connect to "demo_db"
  const client = new Client({
    user: 'hyfuser',
    host: 'localhost',
    database: 'demo_db',
    password: 'hyfpassword',
    port: 5432,
  });

  await client.connect();
  console.log('Connected to "demo_db".');
  return client; // return the client for reuse
}