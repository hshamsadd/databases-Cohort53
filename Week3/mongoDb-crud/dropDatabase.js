import { connectToDatabase, listDatabases } from "./connectDatabase.js";

/**
 * Drop an existing database
 */
export async function dropDatabase(dbName) {
  if (!dbName) {
    throw new Error("❌ Please provide a database name to drop.");
  }

  const db = await connectToDatabase(dbName); // logs connection

  // Drop the database
  const result = await db.dropDatabase();
  if (result) {
    console.log(`🗑️ Database '${dbName}' has been dropped.`);
  } else {
    console.log(
      `⚠️ Database '${dbName}' does not exist or could not be dropped.`
    );
  }
}