const { Model } = require("sequelize");
const sequelize = require('../../db/conexion');
const obtenerAtributosTabla = require("../../../funciones/obtenerAtributosTabla");

class Repuesto_categoria_dentro_sistemas_vehiculo extends Model{}
async function initModel() {
    try {
        const nombreTabla = 'repuestos_categorias_dentro_sistemas_vehiculo';
        const atributos = await obtenerAtributosTabla(nombreTabla);
        Repuesto_categoria_dentro_sistemas_vehiculo.init(atributos, {
            sequelize,
            modelName: 'Repuesto_categoria_dentro_sistemas_vehiculo',
            tableName: nombreTabla,
            timestamps: false
        });
    } catch (error) {
        console.error('Error', error);
    }
}
initModel();

module.exports = { Repuesto_categoria_dentro_sistemas_vehiculo }