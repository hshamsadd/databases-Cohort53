-- Create the Students table
CREATE TABLE students (
    student_id INT PRIMARY KEY, -- This is our Primary Key! Unique and not empty.
    student_name VARCHAR(100) NOT NULL,
    age INT
);

-- 1. Check now
SELECT * FROM Students;

-- Insert some sample students
INSERT INTO Students (student_id, student_name, age) VALUES
(101, 'Alice', 20),
(102, 'Bob', 21),
(103, 'Charlie', 20);

-- 2. Check now
SELECT * FROM Students;

-- Create the Courses table
CREATE TABLE Courses (
    course_id VARCHAR(10) PRIMARY KEY, -- Another Primary Key!
    course_name VARCHAR(100) NOT NULL,
    instructor VARCHAR(100)
);

-- 3. Check now
SELECT * FROM Courses;

-- Insert some sample courses
INSERT INTO Courses (course_id, course_name, instructor) VALUES
('CS101', 'Intro to Computer Science', 'Mr. Smith'),
('MA201', 'Calculus I', 'Ms. Jones');

-- 4. Check now
SELECT * FROM Courses;

-- Create the Enrollments table (this will use Foreign Keys and a Composite Key)
CREATE TABLE Enrollments (
    student_id INT, -- This will be a Foreign Key
    course_id VARCHAR(10), -- This will also be a Foreign Key
    enrollment_date DATE,
    -- Here, (student_id, course_id) together form the Composite Primary Key
    PRIMARY KEY (student_id, course_id),
    -- Define Foreign Key relationships
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- 5. Check now
SELECT * FROM Enrollments;

-- Insert some sample enrollments
INSERT INTO Enrollments (student_id, course_id, enrollment_date) VALUES
(101, 'CS101', '2023-09-01'),
(101, 'MA201', '2023-09-01'),
(102, 'CS101', '2023-09-05');

-- 6. Check now
SELECT * FROM Enrollments;

-- Try to insert a student with an existing student_id (will fail because of PRIMARY KEY constraint)
INSERT INTO Students (student_id, student_name, age) VALUES (101, 'David', 22);

-- 7. Check now
SELECT * FROM Courses;

-- Try to insert an enrollment for a student that doesn't exist (will fail because of FOREIGN KEY constraint)
INSERT INTO Enrollments (student_id, course_id, enrollment_date) VALUES (999, 'CS101', '2023-09-10');

-- 8. Check now
SELECT * FROM Enrollments;

-- 17. Try to insert the exact same enrollment again (will fail because of COMPOSITE PRIMARY KEY constraint)
INSERT INTO Enrollments (student_id, course_id, enrollment_date) VALUES (101, 'CS101', '2023-09-01');

-- 9. Check now
SELECT * FROM Enrollments;