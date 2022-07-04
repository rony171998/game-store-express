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
        include: [
			{ model:Game, include: [{ model: Review, model: User }] },
			{ model: Console },
		],
    });

    res.status(200).json({
        status: "success",
        games,
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
    if (!userId || !game.id) {
        return next(new AppError("Please provide a userId", 400));
    } else {
        const newReview = await Review.create({
            userId,
            gameId: game.id,
            comment,
        });

        res.status(200).json({ status: "success" });
    }
});

module.exports = {
    createGame,
    getAllGame,
    updateGame,
    deleteGame,
	postReview,
};
