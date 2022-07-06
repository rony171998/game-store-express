const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Review } = require('./models/review.model');
const { Game } = require('./models/game.model');
const { Gamesinconsoles } = require('./models/gamesinconsoles.model');
const { Console } = require('./models/console.model');
// Utils
const { db } = require('./utils/database.util');


db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

	
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

Review.belongsTo(Game);
Game.hasMany(Review, { foreignKey: 'gameId' });
Game.hasMany(Gamesinconsoles, { foreignKey: 'gameId' });
Console.hasMany(Gamesinconsoles, { foreignKey: 'consoleId' });
Gamesinconsoles.belongsTo(Game)
Gamesinconsoles.belongsTo(Console)

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));
	
	const PORT = process.env.DB_PORT;
	const HOST = process.env.DB_HOST;
app.listen(PORT,HOST,  () => {
	console.log('Express app running!! on port '+PORT +' on port '+HOST);
});
