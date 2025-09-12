import { createDatabase } from "./createDatabase.js";
import { createCollection } from "./collections.js";
import { dropDatabase } from "./dropDatabase.js";
import { listDatabases } from "./connectDatabase.js";
import { insertOne, insertMany } from "./crudOperations.js";

async function test1() {
  const dbName = "databaseWeek3";
  const collectionName = "bob_ross_episodes";
  // 1️⃣ Create DB + collection
  await createDatabase(dbName, collectionName);
  // 2️⃣ List databases
  await listDatabases();
}

/*
async function test2() {
  const dbName = "AppleProducts";
  const collectionName = "IPhones";
  // 1️⃣ Insert a document
  await insertOne(dbName, collectionName, {
    name: "iPhone 17",
    price: 999,
    InStock: "Yes",
  });
}

async function test3() {
  const dbName = "AppleProducts";
  const collectionName = "IPads";
  // 1️⃣ Create another collection in same DB
  await createCollection(dbName, collectionName);
  // 2️⃣ Insert documents
  await insertMany(dbName, collectionName, [
    { name: "Ipad Air 12", price: 899 },
    { name: "Ipad 11 Pro", price: 799 },
  ]);
}

async function test4() {
  const dbName = "AppleProducts";
  // 1️⃣ Drop a database
  await dropDatabase(dbName);
  // 2️⃣ List databases
  await listDatabases();
}

async function main() {
  await test1();
  await test2();
  await test3();
  await test4();
}
*/

async function main() {
  await test1();
}

main();
