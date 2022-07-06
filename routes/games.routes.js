const express = require('express');


const {
	getAllGame,
	createGame,
	updateGame,
	deleteGame,
	postReview,
	postGameInConsole,
	getGameById,

} = require('../controllers/games.controller');


const {
	createGameValidators
} = require('../middlewares/validators.middleware');
const { gameExists } = require('../middlewares/games.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const gamesRouter = express.Router();

gamesRouter.get('/', getAllGame);

gamesRouter.use(protectSession);

gamesRouter.post('/', createGameValidators, createGame);

gamesRouter.post('/reviews/:id',gameExists, postReview);

gamesRouter.post('/gamesinconsole/:id',gameExists, postGameInConsole);



gamesRouter
	.use('/:id', gameExists)
	.route('/:id')
	.get(getGameById)
	.patch(protectUserAccount, updateGame)
	.delete(protectUserAccount, deleteGame);

module.exports = { gamesRouter };