import { connectToDatabase } from "./connectDatabase.js";

/**
 * Create a new database and collection
 * @param {string} dbName - The name of the database
 * @param {string} collectionName - The name of the collection
 */
export async function createDatabase(dbName, collectionName) {
  if (!dbName || !collectionName) {
    throw new Error(
      "❌ Please provide both a database name and a collection name."
    );
  }
  const db = await connectToDatabase(dbName);
  // Check if collection already exists
  const collections = await db.listCollections().toArray();
  const exists = collections.some((col) => col.name === collectionName);

  if (exists) {
    console.log(
      `⚠️ Collection '${collectionName}' already exists in '${dbName}'`
    );
  } else {
    await db.createCollection(collectionName);
    console.log(
      `✅ Database '${dbName}' created with collection '${collectionName}'`
    );
  }
  return db;
}

// Alternative simpler version to just connect to a database

/**
 * Connect to a database (MongoDB creates it when you add data)
 * @param {string} dbName - The name of the database
 */
/* export async function createDatabase(dbName) {
  if (!dbName) {
    throw new Error("❌ Please provide a database name.");
  }
  const db = await connectToDatabase(dbName);
  console.log(
    `✅ Connected to database '${dbName}'. It will be created when you add data.`
  );
  return db;
}
*/
