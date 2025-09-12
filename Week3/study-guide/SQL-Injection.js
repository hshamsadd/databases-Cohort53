// // Perfect! Let’s make a super simple Node.js / Express + PostgreSQL example
// // showing common SQL Injection types and how to prevent them. 
// // We'll use pg (node-postgres) for PostgreSQL.

// import express from ('express');
// import pkg from 'pg';
// const { Pool } = pkg;
// const app = express();
// app.use(express.json());

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'testdb',
//   password: 'password',
//   port: 5432,
// });

// //1. Classic / In-Band SQLi
// // Unsafe (vulnerable):

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
//   const result = await pool.query(query); // ❌ vulnerable
//   res.send(result.rows);
// });

// // Attack:
// // username = ' OR '1'='1 → bypass login


// // Safe (Parameterized Query):
// app.post('/login-safe', async (req, res) => {
//   const { username, password } = req.body;
//   const query = 'SELECT * FROM users WHERE username=$1 AND password=$2';
//   const result = await pool.query(query, [username, password]); // ✅ safe
//   res.send(result.rows);
// });

// // 2. Union-Based SQLi
// // Unsafe Example:
// app.get('/search', async (req, res) => {
//   const { q } = req.query;
//   const query = `SELECT id, name FROM products WHERE name LIKE '%${q}%'`; // ❌ vulnerable
//   const result = await pool.query(query);
//   res.send(result.rows);
// });


// // Safe (Parameterized Query with LIKE):
// app.get('/search-safe', async (req, res) => {
//   const { q } = req.query;
//   const query = 'SELECT id, name FROM products WHERE name LIKE $1';
//   const result = await pool.query(query, [`%${q}%`]); // ✅ safe
//   res.send(result.rows);
// });

// // 3. Blind / Boolean-Based SQLi
// // Unsafe: attacker checks DB by injecting AND 1=1 or AND 1=2 in a URL param.

// // Safe: always use parameters + input validation:
// app.get('/user-safe', async (req, res) => {
//   const { id } = req.query;
//   if (!/^\d+$/.test(id)) return res.status(400).send("Invalid ID"); // validate input
//   const query = 'SELECT * FROM users WHERE id=$1';
//   const result = await pool.query(query, [id]);
//   res.send(result.rows);
// });

// // 4. Error-Based SQLi
// // Unsafe: directly exposing DB errors lets attackers learn DB structure.

// // Safe: handle errors gracefully, never return raw SQL errors.
// app.get('/user/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const query = 'SELECT * FROM users WHERE id=$1';
//     const result = await pool.query(query, [id]);
//     res.send(result.rows);
//   } catch (err) {
//     console.error(err); // log internally
//     res.status(500).send("Something went wrong"); // don't reveal DB info
//   }
// });

// //💡 Memory Tip:
// // "Never trust user input. Parameterize, validate, limit permissions."

// // ✅ Summary of Prevention:
// // Always use parameterized queries ($1, $2, etc. in pg).
// // Validate inputs: numbers, email format, allowed characters.
// // Never expose raw DB errors to users.
// // Least privilege DB user.
// // Avoid dynamic SQL concatenation.

// app.listen(3000, () => console.log('Server running'));





import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
const PORT =  3000;

const app = express();
app.use(express.json());

// Create PostgreSQL connection pool
const pool = new Pool({
    user: 'hyfuser',
    host: 'localhost',
    database: 'test_db',
    password: 'hyfpassword',
    port: 5432,
});

// 1. Classic SQL Injection Examples

// UNSAFE: Classic SQL Injection vulnerability
app.post('/login-unsafe', async (req, res) => {
  const { username, password } = req.body;
  // ❌ VULNERABLE: Direct string concatenation
  const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
  
  try {
    const result = await pool.query(query);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred");
  }
});

// SAFE: Parameterized query prevention
app.post('/login-safe', async (req, res) => {
  const { username, password } = req.body;
  // ✅ SAFE: Parameterized query
  const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
  
  try {
    const result = await pool.query(query, [username, password]);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred");
  }
});

// 2. Union-Based SQL Injection Examples

// UNSAFE: Union-based SQL injection
app.get('/search-unsafe', async (req, res) => {
  const { q } = req.query;
  // ❌ VULNERABLE: Direct concatenation with user input
  const query = `SELECT id, name FROM products WHERE name LIKE '%${q}%'`;
  
  try {
    const result = await pool.query(query);
    res.send(result.rows);
  } catch (err) {
      console.error(err);
      res.status(500).send("Error occurred");
  }
});

// SAFE: Parameterized query with LIKE
app.get('/search-safe', async (req, res) => {
  const { q } = req.query;
  // ✅ SAFE: Parameterized query with pattern matching
  const query = 'SELECT id, name FROM products WHERE name LIKE $1';
  
  try {
    const result = await pool.query(query, [`%${q}%`]);
    res.send(result.rows);
  } catch (err) {
    res.status(500).send("Error occurred");
  }
});

// 3. Blind SQL Injection Examples

// UNSAFE: Vulnerable to blind SQL injection
app.get('/user-unsafe', async (req, res) => {
  const { id } = req.query;
  // ❌ VULNERABLE: No input validation
  const query = `SELECT * FROM users WHERE id = ${id}`;
  
  try {
    const result = await pool.query(query);
    res.send(result.rows);
  } catch (err) {
    res.status(500).send("Error occurred");
  }
});

// SAFE: Input validation + parameterized query
app.get('/user-safe', async (req, res) => {
  const { id } = req.query;
  
  // ✅ Input validation - only allow numeric IDs
  if (!id || !/^\d+$/.test(id)) {
    return res.status(400).send("Invalid ID format");
  }
  
  const query = 'SELECT * FROM users WHERE id = $1';
  
  try {
    const result = await pool.query(query, [id]);
    res.send(result.rows);
  } catch (err) {
    res.status(500).send("Error occurred");
  }
});

// 4. Error-Based SQL Injection Examples

// UNSAFE: Exposes database errors to attackers
app.get('/product-unsafe/:id', async (req, res) => {
  const { id } = req.params;
  // ❌ VULNERABLE: Direct concatenation + error exposure
  const query = `SELECT * FROM products WHERE id = ${id}`;
  
  try {
    const result = await pool.query(query);
    res.send(result.rows);
  } catch (err) {
    // ❌ UNSAFE: Exposing raw database errors
    res.status(500).send(`Database error: ${err.message}`);
  }
});

// SAFE: Parameterized query + proper error handling
app.get('/product-safe/:id', async (req, res) => {
  const { id } = req.params;
  
  // ✅ Input validation
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("Invalid product ID");
  }
  
  const query = 'SELECT * FROM products WHERE id = $1';
  
  try {
    const result = await pool.query(query, [id]);
    res.send(result.rows);
  } catch (err) {
    // ✅ SAFE: Log error internally but don't expose details
    console.error('Database error:', err);
    res.status(500).send("Something went wrong");
  }
});

// 5. Time-Based Blind SQL Injection Example

// UNSAFE: Vulnerable to time-based attacks
app.get('/check-user-unsafe', async (req, res) => {
  const { username } = req.query;
  // ❌ VULNERABLE: Time-based SQL injection possible
  const query = `SELECT CASE WHEN EXISTS (
                 SELECT 1 FROM users WHERE username='${username}'
                 ) THEN pg_sleep(2) ELSE pg_sleep(0) END`;
  
  try {
    const result = await pool.query(query);
    res.send("Check completed");
  } catch (err) {
    res.status(500).send("Error occurred");
  }
});

// SAFE: Parameterized query prevents time-based attacks
app.get('/check-user-safe', async (req, res) => {
  const { username } = req.query;
  
  // ✅ Input validation
  if (!username || username.length > 50) {
    return res.status(400).send("Invalid username");
  }
  
  // ✅ SAFE: Parameterized query
  const query = 'SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)';
  
  try {
    const result = await pool.query(query, [username]);
    res.send({ userExists: result.rows[0].exists });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send("Something went wrong");
  }
});

// Additional Security Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;