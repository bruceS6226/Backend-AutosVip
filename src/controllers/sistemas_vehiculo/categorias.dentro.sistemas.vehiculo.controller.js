const { Categoria_dentro_sistemas_vehiculo } = require("../../models/sistemas_vehiculos/categoria.dentro.sistemas");

const obtenerCategoriasDentroSistemasVehiculo = async (req, res) => {
    try {
        const listaCategorias = await Categoria_dentro_sistemas_vehiculo.findAll();
        res.status(202).json(listaCategorias)
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}

module.exports = { obtenerCategoriasDentroSistemasVehiculo }