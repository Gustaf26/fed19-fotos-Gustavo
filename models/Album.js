/**
 * Author model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',

		user() {return this.belongsToMany('User')},
		
		photos() {
			return this.belongsToMany('Photo');
		},
	});
}
