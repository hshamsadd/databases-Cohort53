-- Drop tables if they exist to start fresh (optional, for testing)
DROP TABLE IF EXISTS StudentCourses;
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS EmployeeCars;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Departments;

-- 1. One-to-One Example: Employees and Company Cars
-- Each employee gets one car, and each car belongs to one employee.

CREATE TABLE Employees (
    employee_id INT PRIMARY KEY, -- Unique ID for each employee
    employee_name VARCHAR(100) NOT NULL
);

CREATE TABLE EmployeeCars (
    car_id INT PRIMARY KEY, -- Unique ID for each car
    employee_id INT UNIQUE, -- This is the Foreign Key, linking to Employees.employee_id
                            -- UNIQUE constraint ensures only one car per employee (1:1)
    car_model VARCHAR(100),
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

INSERT INTO Employees (employee_id, employee_name) VALUES
(1, 'Alice'),
(2, 'Bob');

INSERT INTO EmployeeCars (car_id, employee_id, car_model) VALUES
(101, 1, 'Toyota Camry'),
(102, 2, 'Honda Civic');

-- 2. One-to-Many Example: Departments and Employees
-- One department has many employees, but each employee works for only one department.

CREATE TABLE Departments (
    dept_id INT PRIMARY KEY, -- Unique ID for each department
    dept_name VARCHAR(100) NOT NULL
);

-- We already have an Employees table, let's add a dept_id to it
ALTER TABLE Employees
ADD COLUMN dept_id INT,
ADD CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES Departments(dept_id);

INSERT INTO Departments (dept_id, dept_name) VALUES
(10, 'Sales'),
(20, 'Marketing'),
(30, 'HR');

-- Update employees to assign them to departments
UPDATE Employees SET dept_id = 10 WHERE employee_id = 1; -- Alice in Sales
UPDATE Employees SET dept_id = 20 WHERE employee_id = 2; -- Bob in Marketing
INSERT INTO Employees (employee_id, employee_name, dept_id) VALUES (3, 'Charlie', 10); -- Charlie in Sales

-- 3. Many-to-Many Example: Students and Courses
-- One student can take many courses, and one course can have many students.

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL
);

CREATE TABLE Courses (
    course_id VARCHAR(10) PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL
);

-- This is our JUNCTION TABLE for Many-to-Many relationship
CREATE TABLE StudentCourses (
    student_id INT,
    course_id VARCHAR(10),
    PRIMARY KEY (student_id, course_id), -- Composite Primary Key
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

INSERT INTO Students (student_id, student_name) VALUES
(101, 'Alice Student'),
(102, 'Bob Student');

INSERT INTO Courses (course_id, course_name) VALUES
('MATH101', 'Basic Math'),
('ENG101', 'English Writing');

INSERT INTO StudentCourses (student_id, course_id) VALUES
(101, 'MATH101'), -- Alice takes Math
(101, 'ENG101'),  -- Alice also takes English
(102, 'MATH101');  -- Bob takes Math


-- View all data across all tables
SELECT * FROM Employees;
SELECT * FROM EmployeeCars;
SELECT * FROM Departments;
SELECT * FROM Students;
SELECT * FROM Courses;
SELECT * FROM StudentCourses;