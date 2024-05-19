const { Model } = require("sequelize");
const sequelize = require('../../db/conexion');
const obtenerAtributosTabla = require("../../../funciones/obtenerAtributosTabla");

class Repuesto extends Model { }
async function initRepuestoModel() {
    try {
        const nombreTabla = 'repuestos';
        const atributos = await obtenerAtributosTabla(nombreTabla);
        Repuesto.init(atributos, {
            sequelize,
            modelName: 'Repuesto',
            tableName: nombreTabla,
            timestamps: false
        });
    } catch (error) {
        console.error('Error', error);
    }
}
class FotoRepuesto extends Model{}
async function initFotoRepuestoModel() {
    try {
        const nombreTabla = 'fotos_repuestos';
        const atributos = await obtenerAtributosTabla(nombreTabla);
        FotoRepuesto.init(atributos, {
            sequelize,
            modelName: 'FotoRepuesto',
            tableName: nombreTabla,
            timestamps: false
        });
    } catch (error) {
        console.error('Error', error);
    }
}
initFotoRepuestoModel()
initRepuestoModel();
module.exports = { Repuesto, FotoRepuesto };
