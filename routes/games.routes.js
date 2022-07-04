const express = require('express');


const {
	getAllGame,
	createGame,
	updateGame,
	deleteGame,
	postReview,
	getGameById,
} = require('../controllers/games.controller');


const {
	createGameValidators
} = require('../middlewares/validators.middleware');
const { gameExists } = require('../middlewares/games.middleware');

const gamesRouter = express.Router();

gamesRouter.post('/', createGameValidators, createGame);

gamesRouter.get('/', getAllGame);

gamesRouter.get('/:id',gameExists, getGameById);

gamesRouter.patch('/:id', gameExists, updateGame);

gamesRouter.delete('/:id', gameExists, deleteGame);

gamesRouter.post('/reviews/:gameId',gameExists, postReview);

module.exports = { gamesRouter };