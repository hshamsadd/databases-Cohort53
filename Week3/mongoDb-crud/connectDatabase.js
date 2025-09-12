import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let _client = null;

/**
 * Connect to MongoDB cluster
 * @param {string} dbName - Database to connect
 */

export async function connectToDatabase(dbName) {
  if (!_client) {
    const connectionString = process.env.DB_URL;
    _client = await MongoClient.connect(connectionString);
  }

  // If no dbName is passed, use the one from .env OR fallback to "test"
  const finalDbName = dbName || process.env.DB_NAME || "test";
  const db = _client.db(finalDbName);

  console.log(`✅ Connected to database: ${db.databaseName}`);
  return db;
}

/**
 * List all databases in cluster
 */

export async function listDatabases() {
  if (!_client) {
    throw new Error(
      "❌ No MongoDB client connection. Call connectToDatabase() first."
    );
  }
  const adminDb = _client.db().admin();
  const dbs = await adminDb.listDatabases();
  console.log("📂 Available Databases:");
  dbs.databases.forEach((db) => console.log(`- ${db.name}`));
  // return dbs.databases.map((db) => db.name);
}

export async function ping(dbName) {
  const db = await connectToDatabase(dbName);
  await db.command({ ping: 1 });
  console.log(`📡 Ping successful for database: ${db.databaseName}`);
  // await listDatabases();
}
