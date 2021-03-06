const express = require('express');

const { usersRouter } = require('./routes/users.routes');
const { consolesRouter } = require('./routes/consoles.routes');
const { gamesRouter } = require('./routes/games.routes');

// Global err controller
const { globalErrorHandler } = require('./controllers/error.controller');

// Utils
const { AppError } = require('./utils/appError.util');


const app = express();


app.use(express.json()) 

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/consoles', consolesRouter);
app.use('/api/v1/games', gamesRouter);

//Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
	next(
		new AppError(
			`${req.method} ${req.originalUrl} not found in this server`,
			404
		)
	);
});

app.use(globalErrorHandler);

module.exports = { app };