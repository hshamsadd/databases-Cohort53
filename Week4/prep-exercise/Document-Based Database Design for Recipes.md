# Document-Based Database Design for Recipes

## Collections

- **recipes** (main collection)
- **ingredients** (optional, only if I want to store extra info about ingredients)
- **categories** (optional, only if I want to store extra info about categories)

---

## Embedded Data

- **Steps**: Embedded as an array of objects inside each recipe document.
- **Ingredient names**: Embedded as an array of strings inside each recipe document.
- **Category names**: Embedded as an array of strings inside each recipe document.

---

## Normalized Data

- **Ingredients**: If I want to store details (e.g., nutritional info), create a separate `ingredients` collection and reference by ID.
- **Categories**: If I want to store details (e.g., descriptions), create a separate `categories` collection and reference by ID.

---

## Not Included

- **recipe_ingredients** and **recipe_categories** tables:  
  These junction tables are not needed in a document-based database. Their purpose (linking recipes to ingredients/categories) is handled by embedding ingredient and category names directly in the recipe document.

---

## Example Recipe Document

```json
{
  "_id": ObjectId("..."),
  "name": "No-Bake Cheesecake",
  "categories": ["Cake", "No-Bake", "Vegetarian"],
  "ingredients": [
    "Condensed milk",
    "Cream Cheese",
    "Lemon Juice",
    "Pie Crust",
    "Cherry Jam"
  ],
  "steps": [
    { "step_number": 1, "instruction": "Beat Cream Cheese" },
    { "step_number": 2, "instruction": "Add condensed Milk and blend" },
    { "step_number": 3, "instruction": "Add Lemon Juice and blend" },
    { "step_number": 4, "instruction": "Add the mix to the pie crust" },
    { "step_number": 5, "instruction": "Spread the Cherry Jam" },
    { "step_number": 6, "instruction": "Place in refrigerator for 3h" }
  ]
}
```

---

## Discussion

**Embedding:**  
I embed steps, ingredient names, and category names because they are tightly related to each recipe and usually accessed together.

**Normalization:**  
I would only normalize ingredients or categories if I need to store extra details or update them independently.

**Omitted Tables:**  
`recipe_ingredients` and `recipe_categories` are not needed, as their relationships are represented by embedded arrays.

**Technology Choice:**  
I would choose MongoDB for its flexibility and ability to store all recipe data together. PostgreSQL is better for complex relationships and strict consistency.
