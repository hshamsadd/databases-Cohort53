-- Drop table if it exists to start fresh (optional, for testing)
DROP TABLE IF EXISTS Products;

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


#### Running Queries in pgAdmin 4

**`COUNT()` and `DISTINCT` Example:**
SELECT COUNT(product_id) AS TotalProducts FROM Products;
SELECT COUNT(DISTINCT category) AS UniqueCategoriesCount FROM Products;
SELECT DISTINCT category FROM Products;


-- **`SUM()`, `AVG()`, `MIN()`, `MAX()` with `GROUP BY` Example:**
SELECT category, SUM(price) AS TotalCategoryPrice FROM Products GROUP BY category;
SELECT category, AVG(price) AS AverageCategoryPrice FROM Products GROUP BY category;
SELECT category, MAX(price) AS MaxPriceInCategory FROM Products GROUP BY category;


-- **`HAVING` Clause Example:**
SELECT category, SUM(price) AS TotalCategoryPrice FROM Products GROUP BY category HAVING SUM(price) > 100;