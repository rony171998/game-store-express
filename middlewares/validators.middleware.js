const { body, validationResult, param } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	checkResult,
];
const createTaskValidators = [
	body('title').notEmpty().withMessage('Name cannot be empty'),
    body('userId')
		.notEmpty().withMessage('UserId cannot be empty')
		.isNumeric().withMessage("UserId must be a number"),
		
    body('limitDate')
		.notEmpty().withMessage("LimitDate cannot be empty")
		.isISO8601({format: 'yyyy-MM-dd HH:mm:ss'}).withMessage("LimitDate must be a date")
		.isLength({ min: 10 }).withMessage("LimitDate must be a valid date 10 numbers"),
		
    checkResult,
];


module.exports = { createUserValidators , createTaskValidators };
