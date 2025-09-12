import { connectToDatabase } from "./connectDatabase.js";

/**
 * Create collection if it doesn't exist
 */
export async function createCollection(dbName, collectionName) {
  if (!dbName || !collectionName) throw new Error("❌ Provide both dbName and collectionName");
  const db = await connectToDatabase(dbName);

  const existing = await db.listCollections({ name: collectionName }).toArray();
  if (existing.length === 0) {
    await db.createCollection(collectionName);
    console.log(`✅ Collection '${collectionName}' created in '${dbName}'`);
  }

  return db.collection(collectionName);
}


// Create a collection if not exists
// async function createCollection(dbName, collectionName) {
//   if (!dbName || !collectionName) throw new Error("❌ Provide both database and collection names.");
//   const db = await connectToDatabase(dbName);

//   const collections = await db.listCollections({ name: collectionName }).toArray();
//   if (collections.length > 0) {
//     console.log(`⚠️ Collection '${collectionName}' already exists in '${dbName}'`);
//     return db.collection(collectionName);
//   }

//   await db.createCollection(collectionName);
//   console.log(`✅ Collection '${collectionName}' created in '${dbName}'`);
//   return db.collection(collectionName);
// }