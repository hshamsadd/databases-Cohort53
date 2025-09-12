// // dbConnect.js
// import { MongoClient } from "mongodb";

// export async function connecToDatabase() {
//   const MONGO_URI =
//     "mongodb+srv://hshamsadd:Kooora2016!@cluster0.0fal5yh.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0";
//   const client = new MongoClient(MONGO_URI);
//   try {
//     await client.connect();

//     await listDatabases(client);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }

// async function listDatabases(client) {
//   const databaseList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databaseList.databases.forEach((db) => {
//     console.log(`_ ${db.name}`);
//   });
// }

import { MongoClient } from "mongodb";

export async function connectToDatabase(dbName) {
  if (!dbName) {
    console.error("❌ Please provide a database name!");
    return;
  }
  const MONGO_URI =
    "mongodb+srv://hshamsadd:Kooora2016!@cluster0.0fal5yh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db(dbName);
    console.log(`📌 Connected to database: ${dbName}`);

    return db; // return the database object
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}

connectToDatabase("Node-API");

// export async function connecToDatabase(dbName) {
//   try {
//     await client.connect();
//     console.log("✅ Connected to MongoDB Atlas");

//     const databaseName = dbName || "Node-API"; // default DB
//     const db = client.db(databaseName);

//     console.log(`📌 Using database: ${databaseName}`);
//     return db;
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// }

// async function run() {
//   const db = await connectDB(); // default DB
//   const products = db.collection("products");

//   const result = await products.insertOne({ name: "Laptop", price: 1200 });
//   console.log("📌 insertOne result:", result.insertedId);

//   process.exit();
// }

// run();

// async function listDatabases(currentDbName) {
//   // Connect to MongoDB client without specifying DB to list all DBs
//   const db = await connectDB(currentDbName);

//   // Get the client from the db object
//   const client = db.client || db.s.s.client; // sometimes we can access the client via internal properties

//   // OR better: store client in dbConnect.js and export it
//   // For simplicity, let's reuse your existing client
//   const adminDb = db.admin();

//   // Get all databases
//   const dbs = await adminDb.listDatabases();

//   console.log("📌 Current Database:", db.databaseName);
//   console.log("📌 All Databases:");
//   dbs.databases.forEach((d) => console.log(" -", d.name));

//   process.exit();
// }

// listDatabases("Node-API"); // pass the DB name you are currently connected to

