const express = require('express');


const {
	getAllGame,
	createGame,
	updateGame,
	deleteGame,
} = require('../controllers/games.controller');


const {
	createGameValidators
} = require('../middlewares/validators.middleware');
const { gameExists } = require('../middlewares/games.middleware');

const gamesRouter = express.Router();

gamesRouter.post('/', createGameValidators, createGame);

gamesRouter.get('/', getAllGame);

gamesRouter.patch('/:id', gameExists, updateGame);

gamesRouter.delete('/:id', gameExists, deleteGame);

gamesRouter.post('/reviews/:gameId', createGameValidators, createGame);

module.exports = { gamesRouter };