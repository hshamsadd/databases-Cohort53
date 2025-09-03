import { setupDatabase } from './connectDatabase.js';

async function createTableInDatabase(client) {
  console.log("Step 1: Starting to create the table...");
  await client.query(`
    CREATE TABLE IF NOT EXISTS my_test_table (
      id SERIAL PRIMARY KEY,
      message TEXT
    );
  `);
  console.log("Step 1: Table is now created!");
}

async function insertDataIntoDatabase(client) {
  console.log("Step 2: Starting to insert data...");
  await client.query(`
    INSERT INTO my_test_table (message) VALUES ('Hello from Node.js!');
  `);
  console.log("Step 2: Data is now inserted!");
}

export async function runMyDatabaseTasks() {
  let client; // declare here for finally
  try {
    client = await setupDatabase(true); // drops and creates a fresh DB
    console.log("Starting all database tasks...");

    await createTableInDatabase(client);
    await insertDataIntoDatabase(client);

    console.log("✅ All database tasks finished!");
  } catch (error) {
    console.error('❌ An error occurred:', error);
  } finally {
    if (client) {
      await client.end();
      console.log('🔒 Disconnected from "demo_db".');
    }
  }
}

// Run immediately if this is the entry file
runMyDatabaseTasks();