const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const db = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: 'postgres',
    password: 'pass1234',
    port: process.env.DB_PORT,
    database: process.env.DB,
	logging: false,
});

module.exports = { db, DataTypes };