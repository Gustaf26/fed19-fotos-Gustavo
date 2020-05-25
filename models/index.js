// Setting up the database connection
const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || '127.0.0.1',
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER || 'Library',
		password: process.env.DB_PASSWORD || 'mysql',
		database: process.env.DB_NAME || 'Library',
	}
});

const bookshelf = require('bookshelf')(knex);

const models = {};
models.Author = require('./Author')(bookshelf);
models.Book = require('./Book')(bookshelf);
models.User = require('./User')(bookshelf);

module.exports = {
	bookshelf,
	...models,
};
