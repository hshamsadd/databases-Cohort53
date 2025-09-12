import { connectToDatabase } from "./connectDatabase.js";

/**
 * Create a new database and collection
 * @param {string} dbName - The name of the database
 * @param {string} collectionName - The name of the collection
 */
export async function createDatabase(dbName, collectionName) {
  if (!dbName || !collectionName) {
    throw new Error("❌ Please provide both a database name and a collection name.");
  }
  const db = await connectToDatabase(dbName);
  // Check if collection already exists
  const collections = await db.listCollections().toArray();
  const exists = collections.some((col) => col.name === collectionName);

  if (exists) {
    console.log(`⚠️ Collection '${collectionName}' already exists in '${dbName}'`);
  } else {
    await db.createCollection(collectionName);
    console.log(`✅ Database '${dbName}' created with collection '${collectionName}'`);
  }
  return db;
}