const { Repuesto } = require("../../models/repuestos/repuesto");
const sequelize = require("../../db/conexion");
const obtenerAtributosTabla = require("../../../funciones/obtenerAtributosTabla");

const agregarRepuesto = async (req, res) => {
    try {
        const atributos = await obtenerAtributosTabla('repuestos');
        const datosRepuesto = {};
        Object.keys(req.body).forEach(key => {
            if (atributos[key]) {
                datosRepuesto[key] = req.body[key];
            }
        });
        const nuevoRepuesto = await Repuesto.create(datosRepuesto);

        res.status(201).json(nuevoRepuesto);
    } catch (error) {
        console.error('Ha ocurrido un error al intentar agregar un nuevo repuesto:', error);
        res.status(500).json({ msg: 'Ha ocurrido un error al intentar agregar un nuevo repuesto', error: error.message });
    }
}

module.exports = agregarRepuesto;
