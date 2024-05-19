const { DataTypes, Model } = require("sequelize");
const sequelize = require('../db/conexion')

class Sistemas_vehiculos extends Model { }

Sistemas_vehiculos.init({
    id_categoria_padre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_categoria_hijo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
}, {
    sequelize,
    modelName: 'Sistemas_vehiculos',
    tableName: 'sistemas_vehiculos',
    timestamps: false
},)

module.exports = { Sistemas_vehiculos }