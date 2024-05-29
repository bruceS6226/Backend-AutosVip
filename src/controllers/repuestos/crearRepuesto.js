const { Repuesto, FotoRepuesto } = require("../../models/repuestos/repuesto");
const sequelize = require("../../db/conexion");
const obtenerAtributosTabla = require("../../../funciones/obtenerAtributosTabla");
const { subirMultiplesImagenes } = require("../../middleware/cargar-imagen");
const { Repuesto_categoria_dentro_marcas_vehiculo } = require("../../models/marcas_vehiculos/repuesto.categoria.marcas");
const { Repuesto_categoria_dentro_sistemas_vehiculo } = require("../../models/sistemas_vehiculos/repuesto.categoria.sistemas");

const agregarRepuesto = async (req, res) => {
    try {
        subirMultiplesImagenes(req, res, async (err) => {
            if (err) {
                return res.status(500).json({
                    msg: 'Error interno del servidor',
                    error: err,
                });
            }

            const atributos = await obtenerAtributosTabla('repuestos');
            const datosRepuesto = {};

            Object.keys(req.body).forEach(key => {
                if (atributos[key]) {
                    datosRepuesto[key] = req.body[key];
                }
            });

            let fotos = [];
            if (req.files && req.files.length > 0) {
                fotos = req.files.map(file => path.join('uploads', file.filename));
            } else {
                fotos = [path.join('uploads', '2e5a8af2-d1da-4507-aca5-8d86688932c9.png')];
            }

            // Asignar la primera foto como foto_principal
            datosRepuesto.foto_principal = fotos[0];

            const nuevoRepuesto = await Repuesto.create(datosRepuesto);
            const id_repuesto = nuevoRepuesto.id_repuesto;

            // Guardar fotos adicionales en FotoRepuesto
            for (let i = 1; i < fotos.length; i++) {
                await FotoRepuesto.create({
                    id_repuesto: id_repuesto,
                    foto: fotos[i]
                });
            }

            res.status(201).json(nuevoRepuesto);
        });
    } catch (error) {
        console.error('Ha ocurrido un error al intentar agregar un nuevo repuesto:', error);
        res.status(500).json({
            msg: 'Ha ocurrido un error al intentar agregar un nuevo repuesto',
            error: error.message
        });
    }
};

const eliminarRepuesto = async (req, res) => {
    try {
        const { id_repuesto } = req.params;
        if (!id_repuesto) {
            return res.status(400).json({ msg: 'El id del repuesto es invalido' });
        }

        const repuestoExistente = await Repuesto.findOne({ where: { id_repuesto: id_repuesto } });
        if (!repuestoExistente) {
            return res.status(404).json({ msg: 'El repuesto no existe' });
        }

        // Eliminar relaciones en las tablas relacionadas
        await FotoRepuesto.destroy({ where: { id_repuesto: id_repuesto } });
        await Repuesto_categoria_dentro_marcas_vehiculo.destroy({ where: { id_repuesto: id_repuesto } });
        await Repuesto_categoria_dentro_sistemas_vehiculo.destroy({ where: { id_repuesto: id_repuesto } });

        // Eliminar el repuesto
        await Repuesto.destroy({ where: { id_repuesto: id_repuesto } });

        res.status(200).json({ msg: 'Repuesto eliminado exitosamente' });
    } catch (error) {
        console.error('Ha ocurrido un error al intentar eliminar el repuesto:', error);
        res.status(500).json({
            msg: 'Ha ocurrido un error al intentar eliminar el repuesto',
            error: error.message
        });
    }
};

module.exports = {agregarRepuesto, eliminarRepuesto};
