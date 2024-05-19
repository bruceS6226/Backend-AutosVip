const { DataTypes } = require('sequelize')

function parseDataType(dataType) {
    if (typeof dataType === 'string' && dataType.startsWith('DECIMAL')) {
        return DataTypes.DECIMAL;
    } else if (typeof dataType === 'string' && (dataType.startsWith('VARCHAR') || dataType.startsWith('CHAR'))) {
        return DataTypes.STRING;
    } else if (dataType === 'INTEGER' || dataType === 'INT') {
        return DataTypes.INTEGER;
    } else if (typeof dataType === 'string' && dataType.startsWith('TEXT')) {
        return DataTypes.TEXT;
    } else if (typeof dataType === 'string' && dataType.startsWith('BOOLEAN')) {
        return DataTypes.BOOLEAN;
    } else if (typeof dataType === 'string' && dataType.startsWith('DATE')) {
        return DataTypes.DATE;
    } else if (typeof dataType === 'string' && dataType.startsWith('ENUM')) {
        return DataTypes.STRING;
    } else {
        return DataTypes.STRING;
    }
}

module.exports = { parseDataType }