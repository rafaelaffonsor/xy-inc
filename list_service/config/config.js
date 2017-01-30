//  Simple application configuration. Extend as needed.
module.exports = {
	port: process.env.PORT || 3000,
  db: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    database: 'pois',
    user: 'root',
    password: '123',
    port: 3306
  }
};
