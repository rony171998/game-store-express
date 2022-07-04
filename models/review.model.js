const {db , DataTypes} = require('../utils/database.util');

const Review = db.define('review', 
    {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        foreignkey: true,
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    gameId:{
        foreignkey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    }
    }
)
module.exports = { Review };
