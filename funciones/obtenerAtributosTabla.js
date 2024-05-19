const sequelize = require('../src/db/conexion');
const { parseDataType } = require("./parseDataType");

module.exports = async function obtenerAtributosTabla(nombreTabla) {
    try {
        const columnas = await sequelize.queryInterface.describeTable(nombreTabla);
        const atributos = {};
        Object.entries(columnas).forEach(([columnName, columnDetails]) => {
            const attributeConfig = {
                type: parseDataType(columnDetails.type),
                allowNull: columnDetails.allowNull || false,
                primaryKey: columnDetails.primaryKey || false,
                defaultValue: columnDetails.defaultValue
            };
            if (columnDetails.autoIncrement) {
                attributeConfig.autoIncrement = true;
            }
            if (columnDetails.unique) {
                attributeConfig.unique = true;
            }
            if (columnDetails.validate) {
                attributeConfig.validate = columnDetails.validate;
            }
            atributos[columnName] = attributeConfig;
        });
        return atributos
    } catch (error) {
        console.error(`Error al inicializar el modelo`, error);
        throw error;
    }
}

