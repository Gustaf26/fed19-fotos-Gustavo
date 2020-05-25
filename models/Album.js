/**
 * Author model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		fotos() {
			return this.hasMany('Foto');
		},
	});
}
