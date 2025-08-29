import { Client } from 'pg';

// Database connection configuration
const config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
  port: 5432,
};

const client = new Client(config);

async function performTransaction() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database!');

    // Begin transaction
    await client.query('BEGIN');
    console.log('Transaction started');

    try {
      // Update student grades within transaction
      const result1 = await client.query(
        'UPDATE students SET grade = $1 WHERE student_number = $2', 
        [10, 4444]
      );
      console.log(`Updated ${result1.rowCount} row(s) - Student 4444 grade to 10`);

      const result2 = await client.query(
        'UPDATE students SET grade = $1 WHERE student_number = $2', 
        [2, 3333]
      );
      console.log(`Updated ${result2.rowCount} row(s) - Student 3333 grade to 2`);

      // Commit the transaction
      await client.query('COMMIT');
      console.log('Transaction committed successfully');

    } catch (transactionError) {
      // Rollback transaction on error
      await client.query('ROLLBACK');
      console.error('Transaction rolled back due to error:', transactionError);
      throw transactionError;
    }

  } catch (error) {
    console.error('Error in transaction:', error);
  } finally {
    await client.end();
  }
}

performTransaction();
