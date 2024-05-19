const { Model } = require("sequelize");
const sequelize = require('../../db/conexion');
const obtenerAtributosTabla = require("../../../funciones/obtenerAtributosTabla");

class Relacion_marcas_vehiculos extends Model { }
async function initModel() {
    try {
        const nombreTabla = 'relacion_marcas_vehiculos';
        const atributos = await obtenerAtributosTabla(nombreTabla);
        Relacion_marcas_vehiculos.init(atributos, {
            sequelize,
            modelName: 'Relacion_marcas_vehiculos',
            tableName: nombreTabla,
            timestamps: false
        });
    } catch (error) {
        console.error('Error', error);
    }
}
initModel();
module.exports = { Relacion_marcas_vehiculos }