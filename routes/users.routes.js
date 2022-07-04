const express = require('express');


const {
	getAllUsers,
	createUser,
	Login,
	getUserById,
	updateUser,
	deleteUser,
} = require('../controllers/users.controller');


const {
	createUserValidators
} = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidators, createUser);

usersRouter.post('/login', Login);

usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers);

usersRouter
	.use('/:id', userExists)
	.route('/:id')
	.get(getUserById)
	.patch(protectUserAccount, updateUser)
	.delete(protectUserAccount, deleteUser);

module.exports = { usersRouter };
