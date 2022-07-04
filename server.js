const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Review } = require('./models/review.model');
const { Game } = require('./models/game.model');
const { Gamesinconsoles } = require('./models/gamesinconsoles.model');
const { Console } = require('./models/console.model');
// Utils
const { db } = require('./utils/database.util');
const config = require('./config');


console.log('NODE_ENV:'+ config.NODE_ENV);


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

app.listen(config.PORT,config.HOST,  () => {
	console.log('Express app running!! on port '+config.PORT +' on port '+config.HOST);
});
