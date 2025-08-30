// connectDatabase.js
import pkg from 'pg';
const { Client } = pkg;

export async function setupDatabase(dropAndCreate = false) {
  // Connect to default database
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
    await defaultClient.query(`DROP DATABASE IF EXISTS recipes;`);
    await defaultClient.query(`CREATE DATABASE recipes;`);
    console.log('Database "recipes" created.');
  }

  await defaultClient.end();

  // Connect to recipes DB
  const client = new Client({
    user: 'hyfuser',
    host: 'localhost',
    database: 'recipes',
    password: 'hyfpassword',
    port: 5432,
  });

  await client.connect();
  console.log('Connected to "recipes".');
  return client;
}