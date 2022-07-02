const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Task } = require('./models/task.model');

// Utils
const { db } = require('./utils/database.util');
const config = require('./config');


console.log('NODE_ENV:'+ config.NODE_ENV);


db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));


User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User);

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(config.PORT,config.HOST,  () => {
	console.log('Express app running!! on port '+config.PORT +' on port '+config.HOST);
});
