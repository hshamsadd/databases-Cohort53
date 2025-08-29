-- Table to store recipes
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,      
  name VARCHAR(200) NOT NULL, 
  description TEXT             
);

-- Table to store categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Link table to connect recipes to categories (many-to-many)
CREATE TABLE recipe_categories (
  recipe_id INT NOT NULL,     
  category_id INT NOT NULL,    
  PRIMARY KEY (recipe_id, category_id), 
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Table to store ingredients
CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,   
  name VARCHAR(150) NOT NULL UNIQUE 
);

-- Link table to connect recipes to ingredients (many-to-many)
CREATE TABLE recipe_ingredients (
  recipe_id INT NOT NULL,       
  ingredient_id INT NOT NULL,  
  quantity VARCHAR(50),         
  PRIMARY KEY (recipe_id, ingredient_id), 
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- Table to store steps (instructions)
CREATE TABLE steps (
  id SERIAL PRIMARY KEY,       
  instruction TEXT NOT NULL
);

-- Link table to connect recipes to steps (many-to-many)
CREATE TABLE recipe_steps (
  recipe_id INT NOT NULL,
  step_id INT NOT NULL,      
  step_number INT NOT NULL,   
  PRIMARY KEY (recipe_id, step_id), 
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (step_id) REFERENCES steps(id)
);


CREATE TABLE Invitee (
    invitee_no INT,
    invitee_name VARCHAR(100),
    invited_by VARCHAR(100)
);

CREATE TABLE Room (
    room_no INT,
    room_name VARCHAR(64),
    floor_number INT
);

CREATE TABLE Meeting (
    meeting_no INT, 
    meeting_title VARCHAR(64), 
    starting_time TIMESTAMP,
    ending_time TIMESTAMP,
    room_no INT
);

INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES
(1, 'Alice Johnson', 'Bob Smith'),
(2, 'Bob Smith', 'Carol White'),
(3, 'Carol White', 'David Lee'),
(4, 'David Lee', 'Alice Johnson'),
(5, 'Eve Brown', 'Bob Smith');


INSERT INTO Room (room_no, room_name, floor_number) VALUES
(101, 'Blue Room', 1),
(102, 'Green Room', 1),
(201, 'Yellow Room', 2),
(202, 'Red Room', 2),
(301, 'Conference Hall', 3);


INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES
(1, 'Project Kickoff', '2025-09-01 09:00:00', '2025-09-01 10:00:00', 101),
(2, 'Design Review', '2025-09-02 11:00:00', '2025-09-02 12:30:00', 102),
(3, 'Team Standup', '2025-09-03 09:30:00', '2025-09-03 10:00:00', 201),
(4, 'Client Presentation', '2025-09-04 14:00:00', '2025-09-04 15:30:00', 202),
(5, 'Retrospective', '2025-09-05 16:00:00', '2025-09-05 17:00:00', 301);

SELECT * FROM invitee

SELECT * FROM Room

SELECT * FROM Meeting
