const { Console } = require('../models/console.model');
const { Gamesinconsoles } = require('../models/gamesinconsoles.model');

const {catchAsync} = require('../utils/catchAsync.util');

const createConsole = catchAsync(async (req, res, next) => {
	const { name, company } = req.body;

	const newConsole = await Console.create({
		name,
		company,
	});

	res.status(201).json({
		status: 'success',
		newConsole,
	});
});

const getAllConsole = catchAsync(async (req, res, next) => {
	const consoles = await Console.findAll({
		include: Gamesinconsoles,
	});

	res.status(200).json({
		status: 'success',
		consoles,
	});
});

const updateConsole = catchAsync(async (req, res, next) => {
	const { console } = req;
	const { name } = req.body;

	await console.update({ name });

	res.status(200).json({ status: 'success' });
});

const deleteConsole = catchAsync(async (req, res, next) => {
	const { console } = req;

	await console.update({ status: 'deleted' });

	res.status(200).json({ status: 'success' });
});

module.exports = {
    createConsole,
    getAllConsole,
    updateConsole,
    deleteConsole
}