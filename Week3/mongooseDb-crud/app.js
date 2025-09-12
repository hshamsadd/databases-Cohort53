import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

// The Express app instance
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Mongoose doesn't use the concept of an external client object like the native driver.
 * It manages the connection pool and state internally.
 * The core logic is to call mongoose.connect() and then use the `mongoose.connection` object.
 */

// Import your Product model from the productModel.js file.
// This is necessary for Mongoose to function correctly.

/**
 * @desc Connects to the MongoDB cluster using Mongoose
 * @param {string} dbName - The database name to connect to.
 */
async function connectToDatabase(dbName) {
  const connectionString = process.env.MONGOOSE_URL;
  if (!connectionString) {
    // A better error message for clarity
    throw new Error(
      "❌ MONGOOSE_URL environment variable is not set. Please check your .env file."
    );
  }

  // Mongoose handles the connection and reconnection logic.
  // It will create or switch to the specified database name.
  // Fixed the `dbName` logic to correctly fall back to an env variable or "test"
  await mongoose.connect(connectionString, {
    dbName: dbName || process.env.DB_NAME || "admin",
  });
  console.log(`✅ Connected to database: ${mongoose.connection.name}`);
}

/**
 * @desc Lists all databases in the cluster using Mongoose's internal connection.
 * @returns {Promise<Array<string>>} An array of database names.
 */
async function listDatabases() {
  if (mongoose.connection.readyState !== 1) {
    throw new Error(
      "❌ No Mongoose connection. Connect to the database first."
    );
  }
  const adminDb = mongoose.connection.getClient().db().admin();
  const dbs = await adminDb.listDatabases();
  return dbs.databases.map((db) => db.name);
}

/**
 * @desc Pings the specified database.
 * @param {string} dbName - The database name to ping.
 */
async function ping(dbName) {
  await connectToDatabase(dbName);
  await mongoose.connection.db.command({ ping: 1 });
}

// Express Route to connect to the database
app.post("/api/connect", async (req, res) => {
  try {
    const { dbName } = req.body;
    await connectToDatabase(dbName);
    res.status(200).json({
      message: `✅ Successfully connected to database: ${mongoose.connection.name}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to connect to database.",
      error: error.message,
    });
  }
});

// Express Route to list all databases
app.get("/api/databases", async (req, res) => {
  try {
    const databases = await listDatabases();
    res.status(200).json({ message: "📂 Available Databases:", databases });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to list databases.", error: error.message });
  }
});

// Express Route to ping a database
app.post("/api/ping", async (req, res) => {
  try {
    const { dbName } = req.body;
    await ping(dbName);
    res.status(200).json({
      message: `📡 Ping successful for database: ${mongoose.connection.name}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to ping database.", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

/*
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config(); // loads variables from .env
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000; // fallback to 5000 if not in .env

// MongoDB connection
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

startServer();

*/
