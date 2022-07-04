const {db , DataTypes} = require('../utils/database.util');

const Gamesinconsoles = db.define('gamesinconsoles',
{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    gameid:{
        foreignkey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    consoleid:{
        foreignkey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    }
    }
);
module.exports = { Gamesinconsoles };