// Update with your config settings.

export default {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'hyfuser',
      password: 'hyfpassword',
      database: 'userdb'
    },
    seeds: {
      directory: new URL('./seeds', import.meta.url).pathname
    },
    migrations: {
      directory: new URL('./migrations', import.meta.url).pathname
    }
  },
};
