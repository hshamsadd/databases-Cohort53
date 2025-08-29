# PostgreSQL Cheatsheet

This cheat sheet provides a quick reference for common PostgreSQL SQL commands and operations.

## Basic Queries

### Specify what information to extract

```sql
SELECT column
```

### From which table

```sql
FROM table
```

### Only extract rows where the condition holds

(Used with an operator: `>, <, >=, <=, =, <>, BETWEEN, LIKE, IN`)

```sql
WHERE column = 'value'
```

### Combining `WHERE` clauses:

(Used with: `AND, OR`)

```sql
WHERE column = 'value' OR
      column = 'other value'
```

### Aggregating results:

(Used with: `SUM, COUNT, MIN, MAX, AVG`)

```sql
SELECT
    SUM(column)
FROM table
```

### Aliasing tables

```sql
SELECT
    column AS alias
FROM table
```

## PostgreSQL-Specific Features

### Common Data Types
```sql
SERIAL          -- Auto-incrementing integer
VARCHAR(n)      -- Variable-length string
TEXT           -- Unlimited-length string
INTEGER        -- 4-byte integer
BIGINT         -- 8-byte integer
BOOLEAN        -- TRUE/FALSE
TIMESTAMP      -- Date and time
JSONB          -- Binary JSON (recommended over JSON)
UUID           -- Universally unique identifier
```

### Create Table with PostgreSQL Features
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
);
```

### Insert with RETURNING
```sql
INSERT INTO users (email, name) 
VALUES ('user@example.com', 'John Doe') 
RETURNING id;
```

### UPSERT (Insert or Update)
```sql
INSERT INTO users (id, email, name) 
VALUES (1, 'user@example.com', 'John Doe')
ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    name = EXCLUDED.name;
```

### Parameterized Queries (for Node.js pg library)
```sql
-- In JavaScript: client.query('SELECT * FROM users WHERE id = $1', [userId])
SELECT * FROM users WHERE id = $1;
```

### JSON Operations
```sql
-- Query JSON data
SELECT data->>'name' FROM users WHERE data @> '{"active": true}';

-- Update JSON data
UPDATE users SET data = data || '{"last_login": "2023-01-01"}' WHERE id = 1;
```

### Common psql Commands
```sql
\l              -- List databases
\c database     -- Connect to database
\dt             -- List tables
\d table        -- Describe table
\q              -- Quit psql
```

### Useful Functions
```sql
-- String functions
CONCAT(str1, str2)     -- Concatenate strings
UPPER(string)          -- Convert to uppercase
LOWER(string)          -- Convert to lowercase
LENGTH(string)         -- String length

-- Date functions
NOW()                  -- Current timestamp
CURRENT_DATE          -- Current date
EXTRACT(YEAR FROM date) -- Extract part of date

-- Window functions
ROW_NUMBER() OVER (ORDER BY column)  -- Row numbering
RANK() OVER (ORDER BY column)        -- Ranking
```
