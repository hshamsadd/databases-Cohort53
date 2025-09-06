🗂️ Database Normalization Made Simple

Normalization = a process to organize data in a database so that:

It is clean

Has no duplicates

Is easy to update

Prevents mistakes

We do this in steps called “Normal Forms” (NF).


---


✅ 1NF – First Normal Form – No repeating groups
Rule: Each cell should have one value only, no lists, no repeating groups.


❌ Before (Breaks 1NF – multiple values in one cell)

```SQL
CREATE TABLE Students (
  student_id INT PRIMARY KEY,     -- OK: unique ID
  student_name VARCHAR(50),       -- OK: single value
  courses VARCHAR(100)            -- ❌ has multiple values in one cell, e.g. "Math, Science"
);

-- Sample data
INSERT INTO Students (student_id, student_name, courses) VALUES
(1, 'Alice', 'Math, Science'),
(2, 'Bob', 'History, Math');
```
-- OUTPUT: `Students`
<p align="center">
<img src="./images/1.png" alt="Students table" width="200"/>
</p>

✅ After (Follows 1NF – one value per cell)
```SQL
CREATE TABLE Students (
  student_id INT PRIMARY KEY,     -- OK: unique ID
  student_name VARCHAR(50)        -- OK: single value
);

CREATE TABLE Enrollments (
  student_id INT,                 -- FK to Students
  course VARCHAR(50),             -- OK: one course per row
  PRIMARY KEY (student_id, course), -- OK: unique pair
  FOREIGN KEY (student_id) REFERENCES Students(student_id)
);


-- Sample data
INSERT INTO Students (student_id, student_name) VALUES
(1, 'Alice'),
(2, 'Bob');

INSERT INTO Enrollments (student_id, course) VALUES
(1, 'Math'),
(1, 'Science'),
(2, 'History'),
(2, 'Math');
```
OUTPUT: `Students`
<p align="center">
<img src="./images/2.png" alt="Students table" width="200"/>
</p>

OUTPUT: `Enrollments`
<p align="center">
<img src="./images/3.png" alt="Students table" width="200"/>
---



✅ 2NF (Second Normal Form) – Remove partial dependency
Rule: Must be in 1NF.
No partial dependency (a column depends only on part of a composite key).

❌ Before (Breaks 2NF – column depends only on part of composite key)
```SQL
CREATE TABLE Enrollments (
  student_id INT,                  -- part of PK
  course_id INT,                   -- part of PK
  course_name VARCHAR(50),         -- ❌ depends only on course_id, not whole key
  PRIMARY KEY (student_id, course_id) -- This is the whole key
);


-- Sample data
INSERT INTO Enrollments (student_id, course_id, course_name) VALUES
(1, 101, 'Math'),
(2, 101, 'Math'),
(1, 102, 'Science');
```
OUTPUT: `Enrollments`
<p align="center">
<img src="./images/4.png" alt="Students table" width="200"/>

✅ After (Follows 2NF – separate courses)
```SQL
CREATE TABLE Courses (
  course_id INT PRIMARY KEY,       -- OK: each course has one name
  course_name VARCHAR(50)          -- OK: depends fully on PK
);

CREATE TABLE Enrollments (
  student_id INT,                  -- part of PK
  course_id INT,                   -- part of PK
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id) -- OK
);


-- Sample data
INSERT INTO Courses (course_id, course_name) VALUES
(101, 'Math'),
(102, 'Science');

INSERT INTO Enrollments (student_id, course_id) VALUES
(1, 101),
(2, 101),
(1, 102);
```
OUTPUT: `Courses`
<p align="center">
<img src="./images/5.png" alt="Students table" width="200"/>

OUTPUT: `Enrollments`
<p align="center">
<img src="./images/6.png" alt="Students table" width="200"/>

---



✅ 3NF (Third Normal Form) – Remove transitive dependency
Rule: Must be in 2NF.
No transitive dependency (non-key depending on another non-key).


❌ Before (Breaks 3NF – instructor_office depends on instructor_name, not PK)
```SQL
CREATE TABLE Enrollments (
  student_id INT PRIMARY KEY,      -- PK
  course_id INT,                   -- OK
  instructor_name VARCHAR(50),     -- ❌ not a key
  instructor_office VARCHAR(50)    -- ❌ depends on instructor_name, not on student_id
);


-- Sample data
INSERT INTO Enrollments (student_id, course_id, instructor_name, instructor_office) VALUES
(1, 101, 'Dr. Smith', 'Room 201'),
(2, 102, 'Dr. Jones', 'Room 305');
```
OUTPUT: `Enrollments`
<p align="center">
<img src="./images/7.png" alt="Students table" width="700"/>

✅ After (Follows 3NF – move instructors to new table)
```SQL
CREATE TABLE Instructors (
  instructor_name VARCHAR(50) PRIMARY KEY, -- OK
  instructor_office VARCHAR(50)            -- OK: depends on PK directly
);

CREATE TABLE Enrollments (
  student_id INT PRIMARY KEY,      -- OK
  course_id INT,                   -- OK
  instructor_name VARCHAR(50),     -- FK
  FOREIGN KEY (instructor_name) REFERENCES Instructors(instructor_name)
);


-- Sample data
INSERT INTO Instructors (instructor_name, instructor_office) VALUES
('Dr. Smith', 'Room 201'),
('Dr. Jones', 'Room 305');

INSERT INTO Enrollments (student_id, course_id, instructor_name) VALUES
(1, 101, 'Dr. Smith'),
(2, 102, 'Dr. Jones');
```
OUTPUT: `Instructors`
<p align="center">
<img src="./images/8.png" alt="Students table" width="700"/>

OUTPUT: `Enrollments`
<p align="center">
<img src="./images/9.png" alt="Students table" width="700"/>

---



✅ BCNF (Breaks BCNF – room determines course_time, but room isn’t a candidate key)
Rule: Must be in 3NF.
Every determinant must be a candidate key (no non-key column should decide another column).
Every determinant (thing that defines another column) must be a candidate key.


❌ Before (Breaks BCNF)
```SQL
CREATE TABLE CourseSchedule (
  course_id INT PRIMARY KEY,       -- PK
  room VARCHAR(50),                -- ❌ determines course_time, but not a candidate key
  course_time TIME                 -- ❌ depends on room instead of course_id
);


-- Sample data
INSERT INTO CourseSchedule (course_id, room, course_time) VALUES
(101, 'Room A', '10:00'),
(102, 'Room A', '10:00'); -- ❌ Room decides time
```
OUTPUT: `CourseSchedule`
<p align="center">
<img src="./images/10.png" alt="Students table" width="700"/>


✅ After (Follows BCNF – separate rooms and schedules)
```SQL
CREATE TABLE Rooms (
  room VARCHAR(50) PRIMARY KEY,    -- OK: unique room
  course_time TIME                 -- OK: depends on room
);

CREATE TABLE CourseSchedule (
  course_id INT PRIMARY KEY,       -- OK
  room VARCHAR(50),                -- FK to Rooms
  FOREIGN KEY (room) REFERENCES Rooms(room)
);



-- Sample data
INSERT INTO Rooms (room, course_time) VALUES
('Room A', '10:00'),
('Room B', '11:00');

INSERT INTO CourseSchedule (course_id, room) VALUES
(101, 'Room A'),
(102, 'Room B');
```
OUTPUT: `Rooms`
<p align="center">
<img src="./images/11.png" alt="Students table" width="700"/>

OUTPUT: `CourseSchedule`
<p align="center">
<img src="./images/12.png" alt="Students table" width="700"/>

---


✅ 4NF (Fourth Normal Form) – Remove multi-valued facts
Rule: Must be in BCNF.
No multi-valued dependencies (a table should not try to represent two independent relationships at once).


❌ Before (Breaks 4NF – mixing independent lists in one table)
```SQL
CREATE TABLE StudentInfo (
  student_id INT PRIMARY KEY,       -- OK
  hobby VARCHAR(50),                -- ❌ student can have 'many' hobbies
  language VARCHAR(50)              -- ❌ student can also know 'many' languages (independent list)
);
-- Problem: mixing 2 independent many-to-many relationships in 1 table. 
-- 👉 Hobby and Language are independent, but mixed in one table.


-- Sample data
INSERT INTO StudentInfo (student_id, hobby, language) VALUES
(1, 'Chess', 'English'),
(1, 'Chess', 'Spanish'),
(1, 'Reading', 'English');
```
OUTPUT: `StudentInfo`
<p align="center">
<img src="./images/13.png" alt="Students table" width="700"/>

✅ After (Follows 4NF – separate independent many-to-many relations)
```SQL
CREATE TABLE Students (
  student_id INT PRIMARY KEY        -- OK
);

CREATE TABLE StudentHobbies (
  student_id INT,                   -- FK
  hobby VARCHAR(50),                -- OK
  PRIMARY KEY (student_id, hobby)   -- OK: one hobby per row
);

CREATE TABLE StudentLanguages (
  student_id INT,                   -- FK
  language VARCHAR(50),             -- OK
  PRIMARY KEY (student_id, language) -- OK: one language per row
);



-- Sample data
-- Students
INSERT INTO Students (student_id) VALUES
(1);

INSERT INTO StudentHobbies (student_id, hobby) VALUES
(1, 'Chess'),
(1, 'Reading');

INSERT INTO StudentLanguages (student_id, language) VALUES
(1, 'English'),
(1, 'Spanish');
```
OUTPUT: `Students`
<p align="center">
<img src="./images/14.png" alt="Students table" width="700"/>

OUTPUT: `StudentHobbies`
<p align="center">
<img src="./images/15.png" alt="Students table" width="700"/>

OUTPUT: `StudentLanguages`
<p align="center">
<img src="./images/16.png" alt="Students table" width="700"/>

---


✅ 5NF (Fifth Normal Form) – Break down to smallest pieces
Rule: No join dependency (tables shouldn’t need recombining to avoid redundancy).

A table should not have information that can be broken into smaller tables without losing meaning.
Helps when relationships are complex (like supplier, product, customer).


❌ Before (Breaks 5NF – student, project, advisor all mixed together)
```SQL
CREATE TABLE StudentProjects (
  student_id INT,
  project_id INT,
  advisor_id INT,
  PRIMARY KEY (student_id, project_id, advisor_id)
);

-- Sample data
INSERT INTO StudentProjects (student_id, project_id, advisor_id) VALUES
(1, 201, 301),
(1, 201, 302), -- ❌ student 1 works on same project with two advisors
(2, 202, 301);
```
OUTPUT: `StudentProjects`
<p align="center">
<img src="./images/17.png" alt="Students table" width="700"/>


✅ After (Follows 5NF – break into separate relations)
```SQL
CREATE TABLE StudentProject (
  student_id INT,
  project_id INT,
  PRIMARY KEY (student_id, project_id)
);

CREATE TABLE ProjectAdvisor (
  project_id INT,
  advisor_id INT,
  PRIMARY KEY (project_id, advisor_id)
);



-- Sample data
-- StudentProject
INSERT INTO StudentProject (student_id, project_id) VALUES
(1, 201),
(2, 202);

INSERT INTO ProjectAdvisor (project_id, advisor_id) VALUES
(201, 301),
(201, 302),
(202, 301);
```
OUTPUT: `StudentProjects`
<p align="center">
<img src="./images/18.png" alt="Students table" width="700"/>

OUTPUT: `ProjectAdvisor`
<p align="center">
<img src="./images/19.png" alt="Students table" width="700"/>

---


6NF – Sixth Normal Form
Rule: Tables split into irreducible pieces (good for temporal data).



❌ Before (Breaks 6NF – multiple facts in one table)
```SQL
CREATE TABLE EmployeeContracts (
  employee_id INT PRIMARY KEY,
  salary DECIMAL(10,2),
  department VARCHAR(50),
  start_date DATE,
  end_date DATE
);

-- Sample data
INSERT INTO EmployeeContracts (employee_id, salary, department, start_date, end_date) VALUES
(1, 4000.00, 'HR', '2023-01-01', '2023-12-31');
```
OUTPUT: `EmployeeContracts`
<p align="center">
<img src="./images/20.png" alt="Students table" width="700"/>


✅ After (Follows 6NF – separate tables for salary and department history)
```SQL
CREATE TABLE EmployeeSalary (
  employee_id INT,
  salary DECIMAL(10,2),
  start_date DATE,
  end_date DATE,
  PRIMARY KEY (employee_id, start_date)
);

CREATE TABLE EmployeeDepartment (
  employee_id INT,
  department VARCHAR(50),
  start_date DATE,
  end_date DATE,
  PRIMARY KEY (employee_id, start_date)
);

-- Sample data
INSERT INTO EmployeeSalary (employee_id, salary, start_date, end_date) VALUES
(1, 4000.00, '2023-01-01', '2023-12-31');

INSERT INTO EmployeeDepartment (employee_id, department, start_date, end_date) VALUES
(1, 'HR', '2023-01-01', '2023-12-31');
```
OUTPUT: `EmployeeSalary`
<p align="center">
<img src="./images/21.png" alt="Students table" width="700"/>

OUTPUT: `EmployeeDepartment`
<p align="center">
<img src="./images/22.png" alt="Students table" width="700"/>
---

🎯 Summary:

1NF → No repeating values.

2NF → Split data so all columns depend on the whole key.

3NF → Remove indirect dependencies.

BCNF/4NF/5NF → Handle advanced duplication & relationships.