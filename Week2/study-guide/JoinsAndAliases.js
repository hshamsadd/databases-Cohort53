import { setupDatabase } from './connectDatabase.js';

async function createTablesForJoins(client) {
  await client.query(`
    DROP TABLE IF EXISTS Orders CASCADE;
    DROP TABLE IF EXISTS Customers CASCADE;
    DROP TABLE IF EXISTS Employees_SelfJoin CASCADE;

    CREATE TABLE Customers (
        customer_id INT PRIMARY KEY,
        customer_name VARCHAR(100) NOT NULL
    );
    INSERT INTO Customers (customer_id, customer_name) VALUES
    (1, 'Alice'),
    (2, 'Bob'),
    (3, 'Charlie');

    CREATE TABLE Orders (
        order_id INT PRIMARY KEY,
        customer_id INT,
        order_date DATE,
        FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
    );
    INSERT INTO Orders (order_id, customer_id, order_date) VALUES
    (101, 1, '2023-01-10'),
    (102, 1, '2023-01-15'),
    (103, 2, '2023-02-01'),
    (104, NULL, '2023-02-05');

    CREATE TABLE Employees_SelfJoin (
        employee_id INT PRIMARY KEY,
        employee_name VARCHAR(100) NOT NULL,
        manager_id INT
    );
    INSERT INTO Employees_SelfJoin (employee_id, employee_name, manager_id) VALUES
    (1, 'John Doe', NULL),
    (2, 'Jane Smith', 1),
    (3, 'Peter Jones', 1),
    (4, 'Mary Brown', 2);
  `);
  console.log('Tables for joins created and populated.');
}

async function getInnerJoin(client) {
    console.log('\n--- INNER JOIN: Customers with Orders ---');
    const res = await client.query(`SELECT C.customer_name, O.order_id, O.order_date FROM Customers AS C INNER JOIN Orders AS O ON C.customer_id = O.customer_id;`);
    res.rows.forEach(row => console.log(row));
}

async function getLeftJoin(client) {
    console.log('\n--- LEFT JOIN: All Customers and their Orders ---');
    const res = await client.query(`SELECT C.customer_name, O.order_id, O.order_date FROM Customers AS C LEFT JOIN Orders AS O ON C.customer_id = O.customer_id;`);
    res.rows.forEach(row => console.log(row));
}

async function getRightJoin(client) {
    console.log('\n--- RIGHT JOIN: All Orders and their Customers ---');
    const res = await client.query(`SELECT C.customer_name, O.order_id, O.order_date FROM Customers AS C RIGHT JOIN Orders AS O ON C.customer_id = O.customer_id;`);
    res.rows.forEach(row => console.log(row));
}

async function getSelfJoin(client) {
    console.log('\n--- SELF JOIN: Employees and their Managers ---');
    const res = await client.query(`SELECT E.employee_name AS Employee, M.employee_name AS Manager FROM Employees_SelfJoin AS E LEFT JOIN Employees_SelfJoin AS M ON E.manager_id = M.employee_id;`);
    res.rows.forEach(row => console.log(row));
}

async function runAllJoinChecks() {
  let client;
  try {
    client = await setupDatabase(true);
    await createTablesForJoins(client);
    await getInnerJoin(client);
    await getLeftJoin(client);
    await getRightJoin(client);
    await getSelfJoin(client);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    if (client) {
      await client.end();
      console.log('Disconnected from "demo_db".');
    }
  }
}

runAllJoinChecks();