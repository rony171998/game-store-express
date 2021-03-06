// Models
const { User } = require('../models/user.model');
const { Review } = require('../models/review.model');
const { Game } = require('../models/game.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

 //Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')
dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res, next) => {
	const user = await User.findAll({ where: { status: 'active' }, 
		include: [
			{
				model: Review, include: {model: Game}
			},
		],
	});

	res.status(200).json({
		status: 'success',
		user,
	});
});

const createUser = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body;

	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		email,
		password : hashedPassword,
	});

	newUser.password = undefined;

	res.status(201).json({
		status: 'success',
		newUser,
	});
});


const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate credentials (email)
	const user = await User.findOne({
		where: {
			email,
			status: 'active',
		},
	});

	if (!user) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Validate password
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Generate JWT (JsonWebToken) ->
	const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Send response
	res.status(200).json({
		status: 'success',
		token,
	});
});

const getUserById = catchAsync(async (req, res, next) => {
	const { user } = req;

	res.status(200).json({
		status: 'success',
		user,
	});
});

const updateUser = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { name , email } = req.body;

	await user.update({ name, email });

	res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { user } = req;

	await user.update({ status: 'deleted' });

	res.status(200).json({ status: 'success' });
});

module.exports = {
	getAllUsers,
	createUser,
	login,
	getUserById,
	updateUser,
	deleteUser,
};
