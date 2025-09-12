import { createCollection } from "./collections.js";

export async function insertOne(dbName, collectionName, doc) {
  if (!doc) return console.log("⚠️ No document provided to insertOne");
  const collection = await createCollection(dbName, collectionName);
  const result = await collection.insertOne(doc);
  console.log(`📌 insertOne: Inserted _id = ${result.insertedId}`);
  return result;
}


/**
 * Insert many documents (auto-create collection if missing)
 */

export async function insertMany(dbName, collectionName, docs) {
  if (!docs || !Array.isArray(docs) || docs.length === 0) {
    return console.log("⚠️ No documents provided to insertMany");
  }
  const collection = await createCollection(dbName, collectionName);
  const result = await collection.insertMany(docs);
  console.log(`📌 insertMany: Inserted ${result.insertedCount} documents`);
  return result;
}


// Insert one document
// async function insertOne(dbName, collectionName, doc) {
//   const collection = await createCollection(dbName, collectionName);
//   const result = await collection.insertOne(doc);
//   console.log(`📌 insertOne: Inserted _id = ${result.insertedId}`);
//   return result;
// }



// async function main(){
//   // 1️⃣ Create DB + initial collection
//   await createDatabase("AppleProducts", "IPhones");
//   // 2️⃣ Create another collection in same DB
//   await createCollection("AppleProducts", "IPads");
//   // 3️⃣ Insert a document into the IPhones collection
//   await insertOne("AppleProducts", "IPhones", { name: "iPhone 14", price: 999 });
// }

// main()