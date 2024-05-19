const { Categoria_dentro_marcas_vehiculo } = require("../../models/marcas_vehiculos/categoria.dentro.marcas");
const { crearRepuestosPorCategoriaDentroMarcasVehiculo } = require("./repuestos.categorias.marcas.controller");

const obtenerCategoriasDentroMarcasVehiculo = async (req, res) => {
    try {
        const listaCategorias = await Categoria_dentro_marcas_vehiculo.findAll();
        res.status(202).json(listaCategorias)
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}

const obtenerCategoriaDentroMarcasVehiculo = async (req, res) => {
    try {
        const { id_categoria } = req.params;
        if (id_categoria) {
            const listaCategorias = await Categoria_dentro_marcas_vehiculo.findOne({
                where: { id_categoria_dentro_marcas_vehiculo: id_categoria }
            });
            if (listaCategorias) {
                res.status(202).json(listaCategorias)
            } else {
                res.status(202).json([])
            }
        } else {
            res.status(404).json({
                msg: "No existe el id de la categoria"
            })
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}

const crearCategoriasDentroMarcasVehiculo = async (id_repuesto, marca_vehiculo) => {
    try {
        const existeCategoria = await Categoria_dentro_marcas_vehiculo.findOne({
            where: {
                nombre_categoria_dentro_marcas_vehiculo: marca_vehiculo
            }
        })
        var id_categoria;
        if (!existeCategoria) {
            const nuevaCategoria = await Categoria_dentro_marcas_vehiculo.create({
                nombre_categoria_dentro_marcas_vehiculo: marca_vehiculo
            })
            id_categoria = nuevaCategoria.id_categoria_dentro_marcas_vehiculo;
        } else {
            id_categoria = existeCategoria.id_categoria_dentro_marcas_vehiculo;
        }
        return await crearRepuestosPorCategoriaDentroMarcasVehiculo(id_repuesto, id_categoria)
    } catch (error) {
        console.error("Error al crear el repuesto:", error);
        throw error;
    }
}

module.exports = { obtenerCategoriasDentroMarcasVehiculo, crearCategoriasDentroMarcasVehiculo,
    obtenerCategoriaDentroMarcasVehiculo
 }