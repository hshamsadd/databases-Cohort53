# Lesson Plan Databases Week 1

The lesson plan is primarily written for mentors so that they can use examples and anecdotes from this document in conjunction with the README and explain the concepts better in the session.

## Topics (essentially same as the README file)

1. What is an information (system)?
2. What are entities?
3. What is a database?
4. What is the role of a database in an application?
5. What is Structured Query Language (SQL)?
6. What are data types (as applied to databases)?
7. How to use SQL to Create, Read, Update and Delete (CRUD) ?
8. What is a database dump?

> Before you start, make sure that everyone has successfully set up PostgreSQL using 
> Docker as described in the [Setup guide](./Postgresql-setup.md)

## 1. What is an information (system) ?

### Explanation

An information system (in the context of computers) consists of three components.

1. A place where information is kept.
2. A tool(program) which can interact with this place
3. A user interface

### Example

Email service. Any email server maintains the list of registered users, their messages etc (component 1).
An email client is the program that can interact with it (component 2).
A browser or the computer provides a user interface (component 3).

### Exercise

_Name three other information systems and explain their components._

### Essence

Information systems process and interpret information by the means of computers and people.

## 2. What are entities?

### Explanation

Entity is an abstract concept as opposed to a concrete concept. It describes something that is not tangible.
It has attributes that provide more information about it. An instance is the manifestation of the entity.

### Example

1. Car is a an Entity. Attributes of the car are `Manufacturer name`, `Model name`, `number`, `four wheel drive` etc.
   Jeep model Renegade with the number NL65JY is an instance of the _car entity_.
2. If you consider a table in an Excel sheet, then name of the table is the entity and the rows are the instances.

### Exercise

_Give three more examples of entities and their instances._

### Essence

Entities are general names given to the types/classes of things.

## 3. What is a database?

### Explanation

A database is a collection of tables and users and permissions given to those users and rules for
the access of tables. DataBase Management System (DBMS) is the term often used to describe
the system that manages the access of database. This management involves storing the database,
creating users, giving users appropriate permissions, supporting query language etc.

### Example

Examples of DBMS implementations: PostgreSQL, MySQL, MongoDB, DynamoDB etc.
We use PostgreSQL for the demonstration.

The following command shows all existing databases:

```sql
\l
```

The following command creates a database:

```sql
CREATE DATABASE company;
```

The following command connects to (switches to) a database:

```sql
\c company
```

The following command shows you the current database:

```sql
SELECT current_database();
```

### Exercise

_Explain how the database is an example of a client/server system._

### Essence

Database is used to store data in an organized manner.

## 4. What is the role of a database in an application?

### Explanation

Many applications want to store the data outside of the program and access
it whenever necessary. This **outside** can be really different computer
where database is stored. In such a case, we need the ability to talk to
this external computer and access the database. Thus, we need the external
computer to act as a server and our application acts as a client.
In this way, the primary role of a database is to separate the data handling
from the business logic.

### Example

In a ticket reservation system, the database contains the information
about all passengers, trains, timetables, stations etc. All this information
can be stored in a database and the external application can query the relevant
details per request.

```
Use scripts/connection-test.js file to demonstrate the database connection.
```

### Exercise

_Find out 2 applications on your laptop/phone that require a database and 2 applications that do not require a
database._

### Essence

Role of a database is separation of data from the business logic of the application.

## 5. What is Structured Query Language (SQL)?

### Explanation

SQL is a language to interact with the database. It consists of four categories.

1. Data Definition Language (DDL)
2. Data Query Language (DQL)
3. Data Manipulation Language (DML)
4. Data Control Language (DCL)

### Example (in the format Language : Commands)

1. DDL : `CREATE`, `ALTER`
2. DQL : `SELECT`
3. DML : `INSERT`, `UPDATE`
4. DCL : `GRANT`, `REVOKE`

### Exercise

_Guess the difference between ALTER And UPDATE commands_

### Essence

SQL supports variety of command to interact with the database.

## 6. What are data types (in the context of databases)?

### Explanation

When the data is stored in a database. It must be classified appropriately.
Numbers must be stored differently than a string of alphabets.
Boolean values need much less space than a BLOB (Binary Large OBject) of image.
When the tables are created in the database, all of its columns must
have fixed data type. A column of age must have a number as a data type.

### Example (for PostgreSQL)

| Type                    | Description                                   | Example Value           |
| ----------------------- | --------------------------------------------- | ----------------------- |
| INTEGER or INT          | Numbers                                       | 42                      |
| REAL or FLOAT           | Decimal numbers                               | 3.14                    |
| VARCHAR(N)              | String with variable maximum of N characters  | "Dragon"                |
| TEXT                    | String with unlimited length                  | "Positive"              |
| TIMESTAMP               | Store date and time with timezone             | 2019-01-01 22:10:23+00 |
| BOOLEAN                 | True/False values                             | TRUE, FALSE             |
| BYTEA                   | Store binary files                            | an image                |

### Exercise

_What data types should be used to store a boolean value?_

### Essence

PostgreSQL data types are used to define what types of values the columns of the tables in the database contain.

## 7. How to use SQL to Create, Read, Update and Delete (CRUD)

### Explanation

We will use both PostgreSQL command line client (psql) and the JavaScript client to demonstrate the
interaction with the SQL server.

`Use scripts/create-table.js, scripts/insert-values.js` files to show how the table creation, insertion etc.
can be done via JavaScript client

### Example

All examples can be executed in the `PostgreSQL command line client (psql)`.
Remember that all these commands can also be sent via JavaScript clients.
Please check the available `.js` files in the `Week1` folder.

#### CREATE

The following command creates a table called `employees` (in the `company` database)
with five columns:

1. `employee_id` that contains integer number.
2. `employee_name` that contains alphabetical names (of max 50 characters).
3. `salary` that contains a decimal number.
4. `joining_date` that contains a date time.
5. `gender` than can either be `'m'` or `'f'`.

```sql
CREATE TABLE employees (
    employee_id INTEGER,
    employee_name VARCHAR(50),
    salary REAL,
    joining_date TIMESTAMP,
    gender VARCHAR(1) CHECK (gender IN ('m', 'f'))
);
```

#### INSERT

The following command inserts a row in the table `employees`.
Note that the sequence of columns must be followed.

```sql
INSERT INTO employees VALUES (101, 'Dan', 5000, '2019-06-24', 'm');
```

The following command uses column name (also known as field name sometimes) syntax:

```sql
INSERT INTO employees (employee_name, salary, employee_id, gender, joining_date) VALUES('Dany', 5000, 102, 'f', '2019-05-20');
```

The following command uses the same syntax to add multiple rows at a time

```sql
INSERT INTO employees (employee_name, salary, employee_id, gender, joining_date) VALUES('Ben', 7000, 103, 'm', '2019-07-20'), ('Benta', 3000, 104, 'f', '2019-10-12'), ('Raj', 9000, 105, 'm', '2019-01-01');
```

> If you don't remember the column names, then use `\d employees;` command which lists the column names and their
> data types.

#### SELECT

The following command displays the entire table. The `*` means all columns.

```sql
SELECT * FROM employees;
```

The following command displays names of employees whose salary is greater than 3000.
It uses the `WHERE` clause which filters out the rows based on the condition.
The condition is applied on the column `salary` of each row.
`SELECT employee_name` will only print the `employee_name` column of the rows
where `salary` column has the value `>3000`.

```sql
SELECT employee_name FROM employees
WHERE salary > 3000;
```

#### UPDATE

The following command updates the salary of the employee whose `employee_id` is 102.
Note that `=` works as an assignment operator in `SET salary = 8000`
but works as a comparison operator in the WHERE clause `employee_id = 102`.

```sql
UPDATE employees
SET salary = 8000
WHERE employee_id = 102;
```

#### DELETE

The following command deletes all (rows of) employees who joined after the 1st of July 2019.

```sql
DELETE FROM employees
WHERE joining_date > '2019-07-01';
```

### Exercise

1. Write an SQL query to find all employees who are males.
2. Write an SQL query to insert 4 more records in the table of employees.
3. Write an SQL query to update the salary of all female employees to 12000.
4. Write an SQL query to delete all the employees whose name starts with a 'B'.
5. Write an SQL query to create a table called `departments` with following columns: `dept_id`, `dept_name`, `manager`.

### Essence

SQL commands provide a neat and structured way to interact with the database tables.

## 7.5 Miscellaneous concepts

### Aliases in SELECT queries

#### Explanation

Aliases give nicknames to column names when displaying them. They are especially useful in case of nested queries
when tables have long names and joins are used.

#### Example (without nested query)

`SELECT employee_id AS "Employee Number", employee_name AS "Employee Name", salary AS Earnings FROM employees;`

### NOT NULL and DEFAULT values for columns

#### Explanation

While creating a table, some columns may be declared as `NOT NULL` or `DEFAULT` with a value,
or both. For example, `gender` of the employee can NOT be null. Also some columns like
`Number of holidays` can have default values. It is a good practice to explicitly mark
the columns as `NOT NULL` so that PostgreSQL can do optimizations in storing/indexing.

#### Example

Demonstrate the difference with the live execution of the following sequence of commands:

```sql
CREATE TABLE default_not_null_demo(num1 INTEGER, num2 INTEGER NOT NULL, num3 INTEGER DEFAULT 5555, num4 INTEGER NOT NULL DEFAULT 1111);
\d default_not_null_demo;
INSERT INTO default_not_null_demo (num2, num4) VALUES (1, DEFAULT);
SELECT * FROM default_not_null_demo;
INSERT INTO default_not_null_demo (num2, num3, num4) VALUES (1, 233, DEFAULT);
```


### TIMESTAMP vs TIMESTAMP WITHOUT TIME ZONE

#### Explanation

Both TIMESTAMP and TIMESTAMP WITHOUT TIME ZONE accept values in the format `YYYY-MM-DD HH:MM:SS`.
However, PostgreSQL stores the TIMESTAMP value along with the current system time zone information.
If the time zone is changed, the value displayed might be adjusted accordingly.
TIMESTAMP WITHOUT TIME ZONE may be suitable for the `joining date`, while TIMESTAMP WITH TIME ZONE
may be suitable for `last login` where the exact time and time zone might be crucial.

#### Example

Demonstrate with the live execution of the following sequence of commands:

```sql
CREATE TABLE test_timestamp (dt TIMESTAMP WITHOUT TIME ZONE, ts TIMESTAMP WITH TIME ZONE);

INSERT INTO test_timestamp VALUES ('2020-01-01 00:00:00', '2020-01-01 00:00:00');

SELECT * FROM test_timestamp;

SET timezone = 'Europe/Amsterdam';

SELECT * FROM test_timestamp;
```

## 8. What is a database dump?

### Explanation

A database dump is a file. This file contains SQL commands (mostly CREATE and INSERT)
that reflect the current state of the database.

### Example

To create the SQL dump, execute the following command from the terminal:

```bash
pg_dump -U hyfuser -h localhost company > /path/to/store/dump/file/company-db-snapshot.sql
```

Note that the path should be a location where the user has `write` permission (E.g. Desktop),
otherwise, you will get permission errors.

To apply the dump from psql command prompt (`postgres=#`), use the following command

```sql
\i /path/to/the/dump/file
```

To apply the dump from the terminal (with generally a dollar prompt `$`), use the following command

```bash
psql -U hyfuser -h localhost -d company < /path/to/the/dump/file
```

To apply the dump from the terminal(with generally a dollar prompt `$`), use the following command

```
psql -uhyfuser -p [database] < /path/to/the/dump/file
```

Use [this](https://john-dugan.com/dump-and-restore-mysql-databases-in-windows/) link to learn more about
how to do it in Windows (using `cmd`).

### Exercise

Take the dump of `company` database and use the dump file to re-create the database.

### Essence

Dump files work as a snapshot of the database which allows going back to the previous states of the database.
