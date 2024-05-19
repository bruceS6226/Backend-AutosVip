const { Model } = require("sequelize");
const sequelize = require('../../db/conexion');
const obtenerAtributosTabla = require("../../../funciones/obtenerAtributosTabla");

class Relacion_sistemas_vehiculos extends Model { }
async function initModel() {
    try {
        const nombreTabla = 'relacion_sistemas_vehiculos';
        const atributos = await obtenerAtributosTabla(nombreTabla);
        Relacion_sistemas_vehiculos.init(atributos, {
            sequelize,
            modelName: 'Relacion_sistemas_vehiculos',
            tableName: nombreTabla,
            timestamps: false
        });
    } catch (error) {
        console.error('Error', error);
    }
}
initModel();
module.exports = { Relacion_sistemas_vehiculos }