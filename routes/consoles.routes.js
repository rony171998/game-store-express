const express = require('express');


const {
	
	createConsole,
	getAllConsole,
	updateConsole,
	deleteConsole,
	getConsoleById,
} = require('../controllers/consoles.controller');


const {
	createConsoleValidators
} = require('../middlewares/validators.middleware');
const { consoleExists } = require('../middlewares/consoles.middleware');

const consolesRouter = express.Router();

consolesRouter.post('/', createConsoleValidators, createConsole);

consolesRouter.get('/', getAllConsole);

consolesRouter.get('/:id',consoleExists, getConsoleById);

consolesRouter.patch('/:id', consoleExists, updateConsole);

consolesRouter.delete('/:id', consoleExists, deleteConsole);

module.exports = { consolesRouter };