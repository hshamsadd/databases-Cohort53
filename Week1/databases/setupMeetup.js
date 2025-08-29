import pkg from 'pg';
const { Client } = pkg;

// Connect to default "postgres" database to create/drop meetup
const defaultClient = new Client({
  user: 'hyfuser',
  host: 'localhost',
  database: 'postgres',    // connect to default DB first
  password: 'hyfpassword', // update this
  port: 5432,
});

async function setupDatabase() {
  try {
    await defaultClient.connect();

    // Drop and create the meetup database
    await defaultClient.query(`DROP DATABASE IF EXISTS meetup;`);
    await defaultClient.query(`CREATE DATABASE meetup;`);
    console.log('Database "meetup" created.');

    await defaultClient.end();

    // Connect to the newly created meetup database
    const client = new Client({
      user: 'hyfuser',
      host: 'localhost',
      database: 'meetup',
      password: 'hyfpassword', // update this
      port: 5432,
    });
    await client.connect();

    // Create tables
    await client.query(`
      CREATE TABLE Invitee (
        invitee_no INT,
        invitee_name VARCHAR(100),
        invited_by VARCHAR(100)
      );
    `);

    await client.query(`
      CREATE TABLE Room (
        room_no INT,
        room_name VARCHAR(64),
        floor_number INT
      );
    `);

    await client.query(`
      CREATE TABLE Meeting (
        meeting_no INT,
        meeting_title VARCHAR(64),
        starting_time TIMESTAMP,
        ending_time TIMESTAMP,
        room_no INT
      );
    `);

    console.log('Tables created.');

    // Insert sample rows
    await client.query(`
      INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES
      (1, 'Alice Johnson', 'Bob Smith'),
      (2, 'Bob Smith', 'Carol White'),
      (3, 'Carol White', 'David Lee'),
      (4, 'David Lee', 'Alice Johnson'),
      (5, 'Eve Brown', 'Bob Smith');
    `);

    await client.query(`
      INSERT INTO Room (room_no, room_name, floor_number) VALUES
      (101, 'Blue Room', 1),
      (102, 'Green Room', 1),
      (201, 'Yellow Room', 2),
      (202, 'Red Room', 2),
      (301, 'Conference Hall', 3);
    `);

    await client.query(`
      INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES
      (1, 'Project Kickoff', '2025-09-01 09:00:00', '2025-09-01 10:00:00', 101),
      (2, 'Design Review', '2025-09-02 11:00:00', '2025-09-02 12:30:00', 102),
      (3, 'Team Standup', '2025-09-03 09:30:00', '2025-09-03 10:00:00', 201),
      (4, 'Client Presentation', '2025-09-04 14:00:00', '2025-09-04 15:30:00', 202),
      (5, 'Retrospective', '2025-09-05 16:00:00', '2025-09-05 17:00:00', 301);
    `);

    console.log('Data inserted.');

    await client.end();
    console.log('Setup complete.');

  } catch (err) {
    console.error('Error:', err);
    await defaultClient.end();
  }
}

setupDatabase();