const { Relacion_sistemas_vehiculos } = require("../../models/sistemas_vehiculos/relacion.sistemas.vehiculos");

const obtenerCategoriasPorCategorias = async(req,res) =>{
    try {
        const { id_categoria } = req.body;
        const listaCategorias = await Sistemas_vehiculos.findAll({where: {id_categoria_padre: id_categoria}});
        res.status(202).json(listaCategorias)
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}
const obtenerRelacionesSistemasVehiculos = async(req,res) =>{
    try {
        const listaCategorias = await Relacion_sistemas_vehiculos.findAll();
        res.status(202).json(listaCategorias)
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}

module.exports = {obtenerRelacionesSistemasVehiculos}