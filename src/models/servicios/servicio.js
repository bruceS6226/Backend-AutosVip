const { Model } = require("sequelize");
const sequelize = require('../../db/conexion');
const obtenerAtributosTabla = require("../../../funciones/obtenerAtributosTabla");

class Servicio extends Model { }
async function initServicioModel() {
    try {
        const nombreTabla = 'servicios';
        const atributos = await obtenerAtributosTabla(nombreTabla);
        Servicio.init(atributos, {
            sequelize,
            modelName: 'Servicio',
            tableName: nombreTabla,
            timestamps: false
        });
    } catch (error) {
        console.error('Error', error);
    }
}
initServicioModel();
module.exports = { Servicio };
