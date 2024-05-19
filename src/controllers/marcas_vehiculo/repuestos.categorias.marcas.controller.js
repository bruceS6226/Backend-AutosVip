const { Categoria_dentro_marcas_vehiculo } = require("../../models/marcas_vehiculos/categoria.dentro.marcas");
const { Repuesto_categoria_dentro_marcas_vehiculo } = require("../../models/marcas_vehiculos/repuesto.categoria.marcas");
const { Repuesto } = require("../../models/repuestos/repuesto");

const crearRepuestosPorCategoriaDentroMarcasVehiculo = async (id_repuesto, id_categoria_dentro_marcas_vehiculo) => {
    try {
        return await Repuesto_categoria_dentro_marcas_vehiculo.create({
            id_repuesto, id_categoria_dentro_marcas_vehiculo
        })
    } catch (error) {
        console.error("Error al crear el repuesto:", error);
        throw error;
    }
}

const obtenerRepuestosCategoriasDentroMarcasVehiculo = async (req, res) => {
    try {
        const listaRepuestosCategorias = await Repuesto_categoria_dentro_marcas_vehiculo.findAll();
        res.status(202).json(listaRepuestosCategorias)
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}

const obtenerCategoriasDentroMarcasVehiculoPorRepuesto = async (req, res) => {
    try {
        const { id_repuesto } = req.params;
        if (id_repuesto) {
            const listaRepuestosCategorias = await Repuesto_categoria_dentro_marcas_vehiculo.findAll({
                where: { id_repuesto: id_repuesto }
            });
            if (listaRepuestosCategorias) {
                res.status(202).json(listaRepuestosCategorias)
            } else {
                res.status(202).json([])
            }
        } else {
            res.status(404).json({
                msg: "No existe el id del repuesto"
            })
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener las categorias',
            error: error
        })
    }
}

const obtenerRepuestosPorCategoriaDentroMarcasVehiculo = async (req, res) => {
    try {
        const categorias = req.body;
        const { inicio, fin } = req.params;
        if (categorias.some(categoria => categoria !== '')) {
            var listaRepuestos, auxListaCategorias, listaRepuestosPorCategorias, idsCategorias, idsRepuestos, auxListaRepuestosPorCategorias;
            for (let i = 0; i < categorias.length; i++) {
                auxListaCategorias = await Categoria_dentro_marcas_vehiculo.findAll({
                    where: { nombre_categoria_dentro_marcas_vehiculo: categorias[i] }
                });
                idsCategorias = auxListaCategorias.map(id_categoria_dentro_marcas_vehiculo =>
                    id_categoria_dentro_marcas_vehiculo.id_categoria_dentro_marcas_vehiculo);
                listaRepuestosPorCategorias = await Repuesto_categoria_dentro_marcas_vehiculo.findAll({
                    where: { id_categoria_dentro_marcas_vehiculo: idsCategorias }
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
                                const primerosRepuestos = listaRepuestos.slice(inicio, fin);
                                return res.status(202).json(primerosRepuestos)
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
                                const primerosRepuestos = listaRepuestos.slice(inicio, fin);
                                return res.status(202).json(primerosRepuestos)
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
            const todosRepuestos = await Repuesto.findAll();
            const primerosRepuestos = todosRepuestos.slice(inicio, fin);
            return res.status(202).json(primerosRepuestos)
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error',
            error: error
        })
    }

}

const obtenerFotosRepuestosPorCategoriaDentroMarcasVehiculo = async (req, res) => {
    try {
        const categorias = req.body;
        const { inicio, fin } = req.params;
        if (categorias.some(categoria => categoria !== '')) {
            var listaRepuestos, auxListaCategorias, listaRepuestosPorCategorias, idsCategorias, idsRepuestos, auxListaRepuestosPorCategorias;
            for (let i = 0; i < categorias.length; i++) {
                auxListaCategorias = await Categoria_dentro_marcas_vehiculo.findAll({
                    where: { nombre_categoria_dentro_marcas_vehiculo: categorias[i] }
                });
                idsCategorias = auxListaCategorias.map(id_categoria_dentro_marcas_vehiculo =>
                    id_categoria_dentro_marcas_vehiculo.id_categoria_dentro_marcas_vehiculo);
                listaRepuestosPorCategorias = await Repuesto_categoria_dentro_marcas_vehiculo.findAll({
                    where: { id_categoria_dentro_marcas_vehiculo: idsCategorias }
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
                                const primerosRepuestos = listaRepuestos.slice(inicio, fin);
                                const fotos = primerosRepuestos.map(repuesto => repuesto.foto_principal);
                                res.status(202).json(fotos)
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
                                const primerosRepuestos = listaRepuestos.slice(inicio, fin);
                                const fotos = primerosRepuestos.map(repuesto => repuesto.foto_principal);
                                res.status(202).json(fotos)
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
            const todosRepuestos = await Repuesto.findAll();
            const primerosRepuestos = todosRepuestos.slice(inicio, fin);
            const fotos = primerosRepuestos.map(repuesto => repuesto.foto_principal);
            res.status(202).json(fotos)
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error',
            error: error
        })
    }
}

const obtenerCantidadRepuestosPorCategoriaDentroMarcasVehiculo = async (req, res) => {
    try {
        const categorias = req.body;
        if (categorias.some(categoria => categoria !== '')) {
            var listaRepuestos, auxListaCategorias, listaRepuestosPorCategorias, idsCategorias, idsRepuestos, auxListaRepuestosPorCategorias;
            for (let i = 0; i < categorias.length; i++) {
                auxListaCategorias = await Categoria_dentro_marcas_vehiculo.findAll({
                    where: { nombre_categoria_dentro_marcas_vehiculo: categorias[i] }
                });
                idsCategorias = auxListaCategorias.map(id_categoria_dentro_marcas_vehiculo =>
                    id_categoria_dentro_marcas_vehiculo.id_categoria_dentro_marcas_vehiculo);
                listaRepuestosPorCategorias = await Repuesto_categoria_dentro_marcas_vehiculo.findAll({
                    where: { id_categoria_dentro_marcas_vehiculo: idsCategorias }
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
                                res.status(202).json(listaRepuestos.length)
                            } else {
                                return res.status(202).json(0)
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
                                res.status(202).json(listaRepuestos.length)
                            } else {
                                return res.status(202).json(0)
                            }
                        }
                    }

                } else {
                    return res.status(202).json([])
                }
            }
        } else {
            const todosRepuestos = await Repuesto.findAll();
            res.status(202).json(todosRepuestos.length)
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error',
            error: error
        })
    }
}
module.exports = {
    obtenerRepuestosCategoriasDentroMarcasVehiculo, obtenerRepuestosPorCategoriaDentroMarcasVehiculo,
    crearRepuestosPorCategoriaDentroMarcasVehiculo, obtenerFotosRepuestosPorCategoriaDentroMarcasVehiculo,
    obtenerCantidadRepuestosPorCategoriaDentroMarcasVehiculo, obtenerCategoriasDentroMarcasVehiculoPorRepuesto
}