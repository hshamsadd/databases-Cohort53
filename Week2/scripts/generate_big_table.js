import { Client } from 'pg';

const config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'big',
  port: 5432,
};

const client = new Client(config);

async function seedDatabase() {
  const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS big (
      id_pk SERIAL PRIMARY KEY,
      number INTEGER
    )`;

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database!');
    
    await client.query(CREATE_TABLE);
    console.log('Table created successfully');
    
    // Clear existing data
    await client.query('TRUNCATE TABLE big RESTART IDENTITY');
    console.log('Table cleared');

    // Insert data in batches for better performance
    const batchSize = 20000;
    const numberOfBatches = 100;

    for (let i = 0; i < numberOfBatches; i++) {
      // Create values for batch insert
      const values = [];
      const placeholders = [];
      
      for (let j = 1; j <= batchSize; j++) {
        values.push(j + i * batchSize);
        placeholders.push(`($${j})`);
      }
      
      const insertQuery = `INSERT INTO big(number) VALUES ${placeholders.join(', ')}`;
      await client.query(insertQuery, values);
      console.log(`Inserted batch: ${i*batchSize + 1} to ${i*batchSize + batchSize}`);
    }
    
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

async function performanceQueries() {
  try {
    // Clear Postgres cache before running each test
    await client.query('DISCARD ALL');

    // Query with primary key (should be fast)
    console.time("Execution time with a primary key: ");
    await client.query('SELECT * FROM big WHERE id_pk = $1', [230]);
    console.timeEnd("Execution time with a primary key: ");

    // Query without index (should be slower)
    await client.query('DISCARD ALL');
    console.time("Execution time with no index: ");
    await client.query('SELECT * FROM big WHERE number = $1', [89199]);
    console.timeEnd("Execution time with no index: ");
    
    // Create index on number column for comparison
    console.log('Creating index on number column...');
    await client.query('CREATE INDEX IF NOT EXISTS idx_big_number ON big(number)');
    
    // Query with index (should be fast again)
    await client.query('DISCARD ALL');
    console.time("Execution time with index on number: ");
    await client.query('SELECT * FROM big WHERE number = $1', [4230]);
    console.timeEnd("Execution time with index on number: ");

  } catch (error) {
    console.error('Error in performance queries:', error);
  } finally {
    await client.end();
  }
}

// Execute the functions
seedDatabase()
  .then(() => performanceQueries())
  .catch(error => {
    console.error('Application error:', error);
    client.end();
  });

