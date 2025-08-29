import { connectDB } from './connectDatabase.js';

async function DbQueries() {
  const client = await connectDB();
  try {
    // 1. What are the names of countries with population greater than 8 million?
    const result1 = await client.query(`
      SELECT name
      FROM country 
      WHERE population > 8000000;
    `);
    console.log('Countries with population more than 8M:', result1.rows);

    // 2. What are the names of countries that have "land" in their names?
    const result2 = await client.query(`
      SELECT name 
      FROM country 
      WHERE name ILIKE '%land%';
    `);
    console.log('Countries with "land" in their names:', result2.rows);
    
    // 3. What are the names of the cities with population in between 500,000 and 1 million?
    const result3 = await client.query(`
        SELECT name
        FROM CITY
        WHERE population BETWEEN 500000 AND 1000000;
        `)
        console.log('Cities with population between 500,000 and 1 million:', result3.rows);
        
    // 4. What's the name of all the countries on the continent 'Europe'?
    const result4 = await client.query(`
        SELECT name
        FROM country
        WHERE continent = 'Europe'
        `)
        console.log('Countries in Europe continent:', result4.rows)

    // 5. List all the countries in the descending order of their surface areas.
        const result5 = await client.query(`
            SELECT name
            FROM country
            ORDER BY surfacearea DESC
            `)
        console.log('countries in the descending order of their surface areas:', result5.rows)

    // 6. What are the names of all the cities in the Netherlands?
        const result6 = await client.query(`
            SELECT name
            FROM city
            WHERE countrycode = 'NLD'
            `)
            console.log('All cities in the Netherlands:', result6.rows)

    // 7. What is the population of Rotterdam?
        const result7 = await client.query(`
            SELECT population
            FROM city
            WHERE name = 'Rotterdam'
            `)
            console.log('Population of Rotterdam is:', result7.rows)

    // 8. What's the top 10 countries by Surface Area?
        const result8 = await client.query(`
            SELECT name
            FROM country
            ORDER BY surfacearea DESC
            LIMIT 10
            `)
            console.log('Top 10 countries by Surface Area:', result8.rows)

    // 9. What's the top 10 most populated cities?
        const result9 = await client.query(`
            SELECT name
            FROM city
            ORDER BY population DESC
            LIMIT 10;
            `)
            console.log('Top 10 most populated cities:', result9.rows)

    // 10. What is the population number of the world?
        const result10 = await client.query(`
            SELECT SUM(population)
            FROM country
            `)
            console.log('The population number of the world is:', result10.rows)
  } catch (err) {
    console.error('Error running queries:', err);
  } finally {
    await client.end();
    console.log('Connection closed.');
  }
}

DbQueries();