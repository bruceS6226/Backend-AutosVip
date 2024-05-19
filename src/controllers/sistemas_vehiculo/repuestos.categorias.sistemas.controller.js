const { Repuesto } = require("../../models/repuestos/repuesto");
const { Categoria_dentro_sistemas_vehiculo } = require("../../models/sistemas_vehiculos/categoria.dentro.sistemas");
const { Repuesto_categoria_dentro_sistemas_vehiculo } = require("../../models/sistemas_vehiculos/repuesto.categoria.sistemas");

const obtenerRepuestosCategoriasDentroSistemasVehiculo = async (req, res) => {
    try {
        const listaRepuestosCategorias = await Repuesto_categoria_dentro_sistemas_vehiculo.findAll();
        res.status(202).json(listaRepuestosCategorias)
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}

const obtenerRepuestosPorCategoriaDentroSistemasVehiculo = async (req, res) => {
    try {
        const categorias = req.params[0].split('/');
        if (categorias.some(categoria => categoria !== '')) {
            var listaRepuestos, auxListaCategorias, listaRepuestosPorCategorias, idsCategorias, idsRepuestos, auxListaRepuestosPorCategorias;
            for (let i = 0; i < categorias.length; i++) {
                auxListaCategorias = await Categoria_dentro_sistemas_vehiculo.findAll({
                    where: { nombre_categoria_dentro_sistemas_vehiculo: categorias[i] }
                });
                idsCategorias = auxListaCategorias.map(id_categoria_dentro_sistemas_vehiculo =>
                    id_categoria_dentro_sistemas_vehiculo.id_categoria_dentro_sistemas_vehiculo);
                listaRepuestosPorCategorias = await Repuesto_categoria_dentro_sistemas_vehiculo.findAll({
                    where: { id_categoria_dentro_sistemas_vehiculo: idsCategorias }
                });
                if (listaRepuestosPorCategorias) {
                    if (i > 0) {
                        var aux = [];
                        for (var auxRepuestoPorCategoria of auxListaRepuestosPorCategorias) {
                            for (var repuestoPorCategoria of listaRepuestosPorCategorias) {
                                if (auxRepuestoPorCategoria.id_repuesto === repuestoPorCategoria.id_repuesto) {
                                    aux.push(repuestoPorCategoria)
                                    break;
                                }
                            }
                        }
                        if (aux.length === 0) {
                            return res.status(202).json([])
                        }
                        auxListaRepuestosPorCategorias = aux;
                        if (categorias.length === i + 1) {
                            idsRepuestos = auxListaRepuestosPorCategorias.map(id_repuesto => id_repuesto.id_repuesto);
                            listaRepuestos = await Repuesto.findAll({
                                where: { id_repuesto: idsRepuestos }
                            });
                            if (listaRepuestos) {
                                return res.status(202).json(listaRepuestos)
                            } else {
                                return res.status(202).json([])
                            }
                        }
                    } else {
                        auxListaRepuestosPorCategorias = listaRepuestosPorCategorias;
                        if (categorias.length === 1) {
                            idsRepuestos = auxListaRepuestosPorCategorias.map(id_repuesto => id_repuesto.id_repuesto);
                            listaRepuestos = await Repuesto.findAll({
                                where: { id_repuesto: idsRepuestos }
                            });
                            if (listaRepuestos) {
                                return res.status(202).json(listaRepuestos)
                            } else {
                                return res.status(202).json([])
                            }
                        }
                    }

                } else {
                    return res.status(202).json([])
                }
            }
        } else {
            const todosLosRepuestos = await Repuesto.findAll();
            res.status(202).json(todosLosRepuestos)
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error',
            error: error
        })
    }

}

module.exports = { obtenerRepuestosCategoriasDentroSistemasVehiculo, obtenerRepuestosPorCategoriaDentroSistemasVehiculo }