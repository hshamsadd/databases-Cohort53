-- Setting up Tables in pgAdmin 4 (SQL)
-- Open your pgAdmin 4 Query Tool and run these commands to create and fill our example tables.

-- Drop tables if they exist to start fresh (optional, for testing)
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Employees_SelfJoin;

-- Customers Table
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL
);

-- Inset Into Table
INSERT INTO Customers (customer_id, customer_name) VALUES
(1, 'Alice'),
(2, 'Bob'),
(3, 'Charlie');

-- Orders Table
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    customer_id INT, -- This is our Foreign Key to Customers
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Orders Into Table
INSERT INTO Orders (order_id, customer_id, order_date) VALUES
(101, 1, '2023-01-10'), -- Alice's order
(102, 1, '2023-01-15'), -- Alice's second order
(103, 2, '2023-02-01'), -- Bob's order
(104, NULL, '2023-02-05'); -- An order with no customer (maybe a guest order)

-- Employees for Self-Join Example
CREATE TABLE Employees_SelfJoin (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    manager_id INT -- This will point to another employee_id in the same table
);

-- Inset Into Employees Table
INSERT INTO Employees_SelfJoin (employee_id, employee_name, manager_id) VALUES
(1, 'John Doe', NULL), -- John is the CEO, no manager
(2, 'Jane Smith', 1), -- Jane reports to John
(3, 'Peter Jones', 1), -- Peter reports to John
(4, 'Mary Brown', 2); -- Mary reports to Jane

####################################################################################

-- Running Join Queries in pgAdmin 4
-- INNER JOIN Example:** Show customers who have placed orders.
SELECT
    C.customer_name, -- Using alias C for Customers
    O.order_id,
    O.order_date
FROM
    Customers AS C
INNER JOIN
    Orders AS O ON C.customer_id = O.customer_id;


-- **LEFT JOIN Example:** Show all customers, and their orders if they have any.
SELECT
    C.customer_name,
    O.order_id,
    O.order_date
FROM
    Customers AS C
LEFT JOIN
    Orders AS O ON C.customer_id = O.customer_id;

-- **RIGHT JOIN Example:** Show all orders, and the customer who placed them if known.
SELECT
    C.customer_name,
    O.order_id,
    O.order_date
FROM
    Customers AS C
RIGHT JOIN
    Orders AS O ON C.customer_id = O.customer_id;

-- SELF-JOIN Example:** Find employees and their managers.
SELECT
    E.employee_name AS Employee,
    M.employee_name AS Manager
FROM
    Employees_SelfJoin AS E
LEFT JOIN -- Using LEFT JOIN to include employees who don't have a manager (like the CEO)
    Employees_SelfJoin AS M ON E.manager_id = M.employee_id;


-- Column Alias Example:** Rename columns in the output.
SELECT
    customer_name AS CustomerFullName,
    order_id AS OrderNumber
FROM
    Customers
JOIN
    Orders ON Customers.customer_id = Orders.customer_id;