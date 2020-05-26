/**
 * Book model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Foto', {
		tableName: 'fotos',
		album() {
			return this.belongsToMany('Album');   // books.author_id = 3   ->   authors.id = 3 (single author)
		},
		user() {

			return this.belongsToMany('User');
		}
	});
}
