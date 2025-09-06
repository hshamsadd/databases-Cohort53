import { setupDatabase } from './connectDatabase.js';

async function createTablesForSummaries(client) {
  await client.query(`
    DROP TABLE IF EXISTS Products CASCADE;

    CREATE TABLE Products (
        product_id INT PRIMARY KEY,
        product_name VARCHAR(100) NOT NULL,
        category VARCHAR(50),
        price DECIMAL(10, 2)
    );
    INSERT INTO Products (product_id, product_name, category, price) VALUES
    (1, 'Laptop', 'Electronics', 1200.00),
    (2, 'Mouse', 'Electronics', 25.50),
    (3, 'Keyboard', 'Electronics', 75.00),
    (4, 'Novel', 'Books', 15.00),
    (5, 'Textbook', 'Books', 80.00),
    (6, 'T-Shirt', 'Apparel', 20.00),
    (7, 'Jeans', 'Apparel', 50.00);
  `);
  console.log('Table for summaries created and populated.');
}

async function getTotalProducts(client) {
    console.log('\n--- Total Products ---');
    const res = await client.query(`SELECT COUNT(product_id) AS TotalProducts FROM Products;`);
    console.log(res.rows[0]);
}

async function getUniqueCategories(client) {
    console.log('\n--- Unique Categories ---');
    const res = await client.query(`SELECT DISTINCT category FROM Products;`);
    res.rows.forEach(row => console.log(row));
}

async function getTotalPriceByCategory(client) {
    console.log('\n--- Total Price by Category ---');
    const res = await client.query(`SELECT category, SUM(price) AS TotalCategoryPrice FROM Products GROUP BY category;`);
    res.rows.forEach(row => console.log(row));
}

async function getCategoriesWithHighTotalSales(client) {
    console.log('\n--- Categories with Total Price > 100 ---');
    const res = await client.query(`SELECT category, SUM(price) AS TotalCategoryPrice FROM Products GROUP BY category HAVING SUM(price) > 100;`);
    res.rows.forEach(row => console.log(row));
}

async function runAllSummaryChecks() {
  let client;
  try {
    client = await setupDatabase(true);
    await createTablesForSummaries(client);
    await getTotalProducts(client);
    await getUniqueCategories(client);
    await getTotalPriceByCategory(client);
    await getCategoriesWithHighTotalSales(client);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    if (client) {
      await client.end();
      console.log('Disconnected from "demo_db".');
    }
  }
}

runAllSummaryChecks();