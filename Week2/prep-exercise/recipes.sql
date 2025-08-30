-- Table to store recipes
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,      
  name VARCHAR(200) NOT NULL
);

-- Table to store categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Link table to connect recipes to categories
CREATE TABLE recipe_categories (
  recipe_id INT NOT NULL,     
  category_id INT NOT NULL,    
  PRIMARY KEY (recipe_id, category_id)
);

-- Table to store ingredients
CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,   
  name VARCHAR(150) NOT NULL
);

-- Link table to connect recipes to ingredients
CREATE TABLE recipe_ingredients (
  recipe_id INT NOT NULL,       
  ingredient_id INT NOT NULL,
  PRIMARY KEY (recipe_id, ingredient_id)
);

-- Table to store steps (instructions)
CREATE TABLE steps (
  id SERIAL PRIMARY KEY,       
  recipe_id INT NOT NULL,
  step_number INT NOT NULL,
  instruction TEXT NOT NULL
);

-- Insert the recipes 
INSERT INTO recipes (name) VALUES
('No-Bake Cheesecake'),
('Roasted Brussels Sprouts'),
('Mac & Cheese'),
('Tamagoyaki Japanese Omelette');

-- Insert categories
INSERT INTO categories (name) VALUES
('Cake'),
('No-Bake'),
('Vegetarian'),
('Vegan'),
('Gluten-Free'),
('Japanese');

-- Link recipes to categories
INSERT INTO recipe_categories (recipe_id, category_id) VALUES
-- No-Bake Cheesecake: Cake, No-Bake, Vegetarian
(1, 1), (1, 2), (1, 3),
-- Roasted Brussels Sprouts: Vegan, Gluten-Free
(2, 4), (2, 5),
-- Mac & Cheese: Vegetarian
(3, 3),
-- Tamagoyaki: Vegetarian, Japanese
(4, 3), (4, 6);

-- Insert ingredients
INSERT INTO ingredients (name) VALUES
('Condensed milk'),
('Cream Cheese'),
('Lemon Juice'),
('Pie Crust'),
('Cherry Jam'),
('Brussels Sprouts'),
('Lemon juice'), 
('Sesame seeds'),
('Pepper'),
('Salt'),
('Olive oil'),
('Macaroni'),
('Butter'),
('Flour'),
('Milk'),
('Shredded Cheddar cheese'),
('Eggs'),
('Soy sauce'),
('Sugar');

-- Link recipes to ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
-- No-Bake Cheesecake: Condensed milk, Cream Cheese, Lemon Juice, Pie Crust, Cherry Jam
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
-- Roasted Brussels Sprouts: Brussels Sprouts, Lemon juice, Sesame seeds, Pepper, Salt, Olive oil
(2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11),
-- Mac & Cheese: Macaroni, Butter, Flour, Salt, Pepper, Milk, Shredded Cheddar cheese
(3, 12), (3, 13), (3, 14), (3, 10), (3, 9), (3, 15), (3, 16),
-- Tamagoyaki: Eggs, Soy sauce, Sugar, Salt, Olive Oil
(4, 17), (4, 18), (4, 19), (4, 10), (4, 11);

-- Insert steps
INSERT INTO steps (recipe_id, step_number, instruction) VALUES
-- No-Bake Cheesecake
(1, 1, 'Beat Cream Cheese'),
(1, 2, 'Add condensed Milk and blend'),
(1, 3, 'Add Lemon Juice and blend'),
(1, 4, 'Add the mix to the pie crust'),
(1, 5, 'Spread the Cherry Jam'),
(1, 6, 'Place in refrigerator for 3h'),
-- Roasted Brussels Sprouts
(2, 1, 'Preheat the oven'),
(2, 2, 'Mix the ingredients in a bowl'),
(2, 3, 'Spread the mix on baking sheet'),
(2, 4, 'Bake for 30 minutes'),
-- Mac & Cheese
(3, 1, 'Cook Macaroni for 8 minutes'),
(3, 2, 'Melt butter in a saucepan'),
(3, 3, 'Add flour, salt, pepper and mix'),
(3, 4, 'Add Milk and mix'),
(3, 5, 'Cook until mix is smooth'),
(3, 6, 'Add cheddar cheese'),
(3, 7, 'Add the macaroni'),
-- Tamagoyaki Japanese Omelette
(4, 1, 'Beat the eggs'),
(4, 2, 'Add soya sauce, sugar and salt'),
(4, 3, 'Add oil to a sauce pan'),
(4, 4, 'Bring to medium heat'),
(4, 5, 'Add some mix to the sauce pan'),
(4, 6, 'Let it cook for 1 minute'),
(4, 7, 'Add oil to a sauce pan'),
(4, 8, 'Add some mix to the sauce pan'),
(4, 9, 'Let it cook for 1 minute'),
(4, 10, 'Remove pan from fire');

-- Query 1: All vegetarian recipes 
SELECT r.name 
FROM recipes r
JOIN recipe_categories rc ON r.id = rc.recipe_id
JOIN categories c ON rc.category_id = c.id
WHERE c.name = 'Vegetarian';

-- Query 2: All cakes that do not need baking
SELECT r.name 
FROM recipes r
JOIN recipe_categories rc ON r.id = rc.recipe_id
JOIN categories c ON rc.category_id = c.id
WHERE c.name IN ('Cake', 'No-Bake')
GROUP BY r.name
HAVING COUNT(DISTINCT c.name) = 2;

-- Query 3: All vegan and Japanese recipes
SELECT r.name 
FROM recipes r
JOIN recipe_categories rc ON r.id = rc.recipe_id
JOIN categories c ON rc.category_id = c.id
WHERE c.name IN ('Vegan', 'Japanese')
GROUP BY r.name
HAVING COUNT(DISTINCT c.name) = 2;