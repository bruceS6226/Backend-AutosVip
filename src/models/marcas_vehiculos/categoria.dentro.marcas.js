const { Model } = require("sequelize");
const sequelize = require('../../db/conexion');
const obtenerAtributosTabla = require("../../../funciones/obtenerAtributosTabla");

class Categoria_dentro_marcas_vehiculo extends Model{}
async function initModel() {
    try {
        const nombreTabla = 'categorias_dentro_marcas_vehiculo';
        const atributos = await obtenerAtributosTabla(nombreTabla);
        Categoria_dentro_marcas_vehiculo.init(atributos, {
            sequelize,
            modelName: 'Categoria_dentro_marcas_vehiculo',
            tableName: nombreTabla,
            timestamps: false
        });
    } catch (error) {
        console.error('Error', error);
    }
}
initModel();

module.exports = { Categoria_dentro_marcas_vehiculo}