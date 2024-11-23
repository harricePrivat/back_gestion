const { DataTypes } = require('sequelize')
 const sequelize= require('../database')

const User= sequelize.define('User',{
    nom:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    prenom:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    date_naissace:{
        type: DataTypes.DATE,
        allowNull: false
    },
    niveau:{
        type: DataTypes.STRING
    },
    numero_cin:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    path_images:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: false
    }

})

module.exports = User ;