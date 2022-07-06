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
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const consolesRouter = express.Router();

consolesRouter.get('/', getAllConsole);

consolesRouter.use(protectSession);

consolesRouter.post('/', createConsoleValidators, createConsole);

consolesRouter.get('/:id',consoleExists, getConsoleById);

consolesRouter.patch('/:id', consoleExists, updateConsole);

consolesRouter.delete('/:id', consoleExists, deleteConsole);

consolesRouter
	.use('/:id', consoleExists)
	.route('/:id')
	.get(getConsoleById)
	.patch(protectUserAccount, updateConsole)
	.delete(protectUserAccount, deleteConsole);

module.exports = { consolesRouter };