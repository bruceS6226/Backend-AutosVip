const { Sequelize } = require("sequelize");
const sequelize = require("../../db/conexion");
const { Servicio } = require("../../models/servicios/servicio");

const obtenerServicios = async (req, res) => {
    try {
        const listaServicios = await Servicio.findAll();
        res.status(202).json(listaServicios)
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}
const obtenerServicio = async (req, res) => {
    try {
        const { id_servicio } = req.params;
        if (id_servicio) {
            const servicioExistente = await Servicio.findOne({
                where: { id_servicio: id_servicio }
            })
            if (servicioExistente) {
                res.status(202).json(servicioExistente)
            } else {
                res.status(404).json({ msg: 'El servicio no existe' })
            }
        } else {
            res.status(404).json({ msg: 'El id del servicio es invalido' })
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener servicios',
            error: error
        })
    }
}
const buscarRepuestos = async (req, res) => {
    try {
        const { textoBuscar } = req.params;
        if (textoBuscar) {
            var condicionesDeBusqueda;
            const atributos = Object.keys(Repuesto.rawAttributes);
            const palabras = textoBuscar.split(' ').filter(palabra => palabra.trim() !== '');
            condicionesDeBusqueda = palabras.map(palabra => ({
                [Sequelize.Op.or]: atributos.map(atributo => ({
                    [atributo]: { [Sequelize.Op.like]: `%${palabra}%` }
                }))
            }));
            const repuestosEncontrados = await Repuesto.findAll({
                where: {
                    [Sequelize.Op.and]: condicionesDeBusqueda
                }
            });
            const repuestosEncontradosPorPalabras = await Repuesto.findAll({
                where: {
                    [Sequelize.Op.or]: condicionesDeBusqueda
                }
            });
            if (repuestosEncontrados && repuestosEncontradosPorPalabras) {
                res.status(202).json({
                    repuestos: repuestosEncontrados,
                    repuestosSugeridos: repuestosEncontradosPorPalabras
                })
            } else {
                if (!repuestosEncontrados && repuestosEncontradosPorPalabras) {
                    res.status(202).json({
                        repuestos: [],
                        repuestosSugeridos: repuestosEncontradosPorPalabras
                    })
                }
                if (!repuestosEncontrados && !repuestosEncontradosPorPalabras) {
                    res.status(202).json({
                        repuestos: [],
                        repuestosSugeridos: []
                    })
                }
            }
        } else {
            const todosRepuestos = await Repuesto.findAll();
            res.status(202).json({
                repuestos: todosRepuestos,
                repuestosSugeridos: [],
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error al intentar buscar repuestos',
            error: error
        });
    }
}
module.exports = {
    obtenerServicio, obtenerServicios
}