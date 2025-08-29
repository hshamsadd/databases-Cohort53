const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'test',
  port: 5432,
});

const execQuery = async (query, params = []) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } finally {
    client.release();
  }
};

async function seedDatabase() {
  /*
  In PostgreSQL, we first create a function that contains the trigger logic,
  then create a trigger that calls this function.
  
  PostgreSQL uses PL/pgSQL language for stored procedures and functions.
  */
  
  // First, create the trigger function
  const CREATE_TRIGGER_FUNCTION = `
    CREATE OR REPLACE FUNCTION check_project_dates()
    RETURNS TRIGGER AS $$
    BEGIN
        IF NEW.start_date > NEW.end_date THEN
            RAISE EXCEPTION 'Project end date cannot be before the start date';
        END IF;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;

  // Then, create the trigger that uses the function
  const CREATE_TRIGGER = `
    DROP TRIGGER IF EXISTS end_date_trigger ON project;
    CREATE TRIGGER end_date_trigger
        BEFORE INSERT OR UPDATE
        ON project
        FOR EACH ROW
        EXECUTE FUNCTION check_project_dates();
  `;

  try {
    // Create the trigger function first
    await execQuery(CREATE_TRIGGER_FUNCTION);
    console.log('Trigger function created successfully');
    
    // Then create the trigger
    await execQuery(CREATE_TRIGGER);
    console.log('Trigger created successfully');
  } catch (error) {
    console.error('Error creating trigger:', error.message);
  } finally {
    await pool.end();
  }
}

seedDatabase();
