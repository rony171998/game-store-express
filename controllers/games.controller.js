const { Game } = require("../models/game.model");
const { Review } = require("../models/review.model");
const { User } = require("../models/user.model");
const { Console } = require("../models/console.model");

const { catchAsync } = require("../utils/catchAsync.util");

const createGame = catchAsync(async (req, res, next) => {
    const { title, genre } = req.body;

    const newGame = await Game.create({
        title,
        genre,
    });

    res.status(201).json({
        status: "success",
        newGame,
    });
});

const getAllGame = catchAsync(async (req, res, next) => {
    const games = await Game.findAll({
    });

    res.status(200).json({
        status: "success",
        games,
    });
});

const getGameById = catchAsync(async (req, res, next) => {
	const { game } = req;

	res.status(200).json({
		status: 'success',
		game,
	});
});

const updateGame = catchAsync(async (req, res, next) => {
    const { game } = req;
    const { title } = req.body;

    await game.update({ title });

    res.status(200).json({ status: "success" });
});

const deleteGame = catchAsync(async (req, res, next) => {
    const { game } = req;

    await game.update({ status: "deleted" });

    res.status(200).json({ status: "success" });
});

const postReview = catchAsync(async (req, res, next) => {
    const { game } = req;
    const { userId, comment } = req.body;

    const newReview = await Review.create({
        userId,
        gameId: game.id,
        comment,
    });

    res.status(200).json({ 
        status: "success", 
        newReview 
    });
});

module.exports = {
    createGame,
    getAllGame,
    getGameById,
    updateGame,
    deleteGame,
    postReview,
};
