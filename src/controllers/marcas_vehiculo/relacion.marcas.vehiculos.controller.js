const { Relacion_marcas_vehiculos } = require("../../models/marcas_vehiculos/relacion.marcas.vehiculos");

const obtenerCategoriasPorRelacionMarcasVehiculos = async(req,res) =>{
    try {
        const { id_categoria } = req.body;
        const listaCategorias = await Relacion_marcas_vehiculos.findAll({where: {id_categoria_padre: id_categoria}});
        res.status(202).json(listaCategorias)
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}

const obtenerRelacionesMarcasVehiculos = async(req,res) =>{
    try {
        const listaCategorias = await Relacion_marcas_vehiculos.findAll();
        res.status(202).json(listaCategorias)
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}

module.exports = {obtenerRelacionesMarcasVehiculos}