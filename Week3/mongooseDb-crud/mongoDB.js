import mongoose from "mongoose";

export async function connectToDatabase(dbName) {
  const connectionString = process.env.MONGOOSE_URL;
  if (!connectionString) {
    throw new Error("❌ MONGOOSE_URL environment variable is not set.");
  }

  await mongoose.connect(connectionString, {
    dbName, // always controlled here
  });

  console.log(`✅ Connected to database: ${mongoose.connection.name}`);
}

export async function listDatabases() {
  if (mongoose.connection.readyState !== 1) {
    throw new Error(
      "❌ No Mongoose connection. Connect to the database first."
    );
  }
  const adminDb = mongoose.connection.getClient().db().admin();
  const dbs = await adminDb.listDatabases();
  return dbs.databases.map((db) => db.name);
}

export async function pingDatabase(dbName) {
  await connectToDatabase(dbName);
  await mongoose.connection.db.command({ ping: 1 });
  return mongoose.connection.name;
}

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// const PORT = process.env.PORT || 5000;

// // The Express app instance
// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// /**
//  * Mongoose doesn't use the concept of an external client object like the native driver.
//  * It manages the connection pool and state internally.
//  * The core logic is to call mongoose.connect() and then use the `mongoose.connection` object.
//  */

// // Import your Product model from the productModel.js file.
// // import Product from "./productModel.js";

// /**
//  * @desc Connects to the MongoDB cluster using Mongoose
//  * @param {string} dbName - The database name to connect to.
//  */
// async function connectToDatabase(dbName) {
//   const connectionString = process.env.MONGOOSE_URL;
//   if (!connectionString) {
//     throw new Error("❌ MONGOOSE_URL environment variable is not set.");
//   }

//   // Mongoose handles the connection and reconnection logic.
//   // It will create or switch to the specified database name.
//   await mongoose.connect(connectionString, {
//     dbName: dbName || "test", // default to "test" if none passed
//   });
//   console.log(`✅ Connected to database: ${mongoose.connection.name}`);
// }

// /**
//  * @desc Lists all databases in the cluster using Mongoose's internal connection.
//  * @returns {Promise<Array<string>>} An array of database names.
//  */
// async function listDatabases() {
//   if (mongoose.connection.readyState !== 1) {
//     throw new Error(
//       "❌ No Mongoose connection. Connect to the database first."
//     );
//   }
//   const adminDb = mongoose.connection.getClient().db().admin();
//   const dbs = await adminDb.listDatabases();
//   return dbs.databases.map((db) => db.name);
// }

// /**
//  * @desc Pings the specified database.
//  * @param {string} dbName - The database name to ping.
//  */
// async function ping(dbName) {
//   await connectToDatabase(dbName);
//   await mongoose.connection.db.command({ ping: 1 });
// }

// // Express Route to connect to the database
// app.post("/api/connect", async (req, res) => {
//   try {
//     const { dbName } = req.body;
//     await connectToDatabase(dbName);
//     res.status(200).json({
//       message: `✅ Successfully connected to database: ${mongoose.connection.name}`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "❌ Failed to connect to database.",
//       error: error.message,
//     });
//   }
// });

// // Express Route to list all databases
// app.get("/api/databases", async (req, res) => {
//   try {
//     const databases = await listDatabases();
//     res.status(200).json({ message: "📂 Available Databases:", databases });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "❌ Failed to list databases.", error: error.message });
//   }
// });

// // Express Route to ping a database
// app.post("/api/ping", async (req, res) => {
//   try {
//     const { dbName } = req.body;
//     await ping(dbName);
//     res.status(200).json({
//       message: `📡 Ping successful for database: ${mongoose.connection.name}`,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "❌ Failed to ping database.", error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });

/*
import {MongoClient} from mongodb;

const MONGOOSE_URL = "mongodb+srv://hshamsadd:Kooora2016!@cluster0.0fal5yh.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0";

let _db = null;

export async function connectToDataBase() {
    if(!_db) {
        const connectionString = process.env.MONGOOSE_URL;
        const client = await MongoClient.connect(connectionString);
        _db = client.db(dbName);
    }
    return _db;
}

export async function ping(){
    const db = await connectToDataBase();
    await db.command({ping: 1});
    console.log('Pinged the database')
}
    */
