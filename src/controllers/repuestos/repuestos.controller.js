const { Sequelize } = require("sequelize");
const { Repuesto, FotoRepuesto } = require("../../models/repuestos/repuesto");
const XLSX = require('xlsx');
const { crearCategoriasDentroMarcasVehiculo } = require("../marcas_vehiculo/categorias.dentro.marcas.vehiculo.controller");
const sequelize = require("../../db/conexion");
const { Repuesto_categoria_dentro_marcas_vehiculo } = require("../../models/marcas_vehiculos/repuesto.categoria.marcas");
const { Categoria_dentro_marcas_vehiculo } = require("../../models/marcas_vehiculos/categoria.dentro.marcas");

const obtenerRepuestos = async (req, res) => {
    try {
        const listaRepuestos = await Repuesto.findAll();
        res.status(202).json(listaRepuestos)
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}
const obtenerNombresRepuestos = async (req, res) => {
    try {
        const listaRepuestos = await Repuesto.findAll();
        const nombresRepuestos = listaRepuestos.map(repuesto => repuesto.nombre_repuesto);
        res.status(202).json(nombresRepuestos);
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}
const obtenerCantidadRepuestos = async (req, res) => {
    try {
        const listaRepuestos = await Repuesto.findAll();
        res.status(202).json(listaRepuestos.length)
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}

const obtenerPocosRepuestos = async (req, res) => {
    try {
        const { inicio, fin } = req.params;
        const listaRepuestos = await Repuesto.findAll();
        const primerosRepuestos = listaRepuestos.slice(inicio, fin);
        res.status(202).json(primerosRepuestos)
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}

const obtenerFotoPrincipal = async (req, res) => {
    try {
        const { id_repuesto } = req.params;
        if (id_repuesto) {
            const repuestoExistente = await Repuesto.findOne({
                where: { id_repuesto: id_repuesto }
            });
            if (repuestoExistente) {
                const imagenPrincipal = repuestoExistente.foto_principal
                if (imagenPrincipal) {
                    res.status(202).json(imagenPrincipal)
                } else {
                    res.status(202).json('uploads\\2e5a8af2-d1da-4507-aca5-8d86688932c9.png')
                }
            } else {
                res.status(404).json({ msg: 'El repuesto no tiene fotos' })
            }
        } else {
            res.status(404).json({ msg: 'El id del repuesto es invalido' })
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}
const obtenerPocasFotosPrincipales = async (req, res) => {
    try {
        const { inicio, fin } = req.params;
        const listaRepuestos = await Repuesto.findAll();
        const primerosRepuestos = listaRepuestos.slice(inicio, fin);
        if (primerosRepuestos) {
            const fotos = primerosRepuestos.map(repuesto => repuesto.foto_principal);
            res.status(202).json(fotos)
        } else {
            res.status(404).json({ msg: 'El repuesto no tiene fotos' })
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}

const obtenerFotos = async (req, res) => {
    try {
        const { id_repuesto } = req.params;
        if (id_repuesto) {
            const fotos = await FotoRepuesto.findAll({
                where: { id_repuesto: id_repuesto }
            })
            if (fotos) {
                res.status(202).json({
                    msg: 'Exito',
                    fotos: fotos
                })
            } else {
                res.status(404).json({ msg: 'El repuesto no tiene fotos' })
            }
        } else {
            res.status(404).json({ msg: 'El id del repuesto es invalido' })
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}
const obtenerRepuesto = async (req, res) => {
    try {
        const { id_repuesto } = req.params;
        if (id_repuesto) {
            const repuestoExistente = await Repuesto.findOne({
                where: { id_repuesto: id_repuesto }
            })
            if (repuestoExistente) {
                res.status(202).json(repuestoExistente)
            } else {
                res.status(404).json({ msg: 'El repuesto no existe' })
            }
        } else {
            res.status(404).json({ msg: 'El id del repuesto es invalido' })
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}

const buscarRepuestos = async (req, res) => {
    try {
        const { textoBuscar } = req.params;

        if (textoBuscar) {
            const palabrasComunes = [
              'de', 'para', 'y', 'la', 'el', 'es', 'un', 'una', 'en', 'con', 'por', 'a', 'los', 
              'las', 'al', 'del', 'se', 'lo', 'como', 'más', 'o', 'pero', 'sus', 'le', 'ha', 
              'me', 'si', 'sin', 'sobre', 'este', 'ya', 'entre', 'cuando', 'todo', 'esta', 
              'ser', 'son', 'dos', 'también', 'fue', 'había', 'muy', 'hasta', 'desde', 'nos', 
              'durante', 'uno', 'ni', 'ese', 'contra', 'sí', 'porque', 'qué', 'está', 'ante', 
              'e', 'les', 'estos', 'algunos', 'cual', 'poco', 'ella', 'esto', 'esos', 'esas', 
              'algunas', 'algo', 'nosotros', 'vosotros', 'vosotras', 'ellos', 'ellas', 'míos', 
              'tuyo', 'tus', 'mías', 'tuyas', 'nuestros', 'vuestra', 'vuestros', 'vuestro', 
              'mío', 'mi', 'nuestra', 'nuestras', 'nuestros', 'tuyo', 'tuyos', 'vuestro', 
              'vuestra', 'vuestros', 'vuestras'
          ]; // Lista de palabras no claves
            const atributos = Object.keys(Repuesto.rawAttributes);
            const palabras = textoBuscar.split(' ')
                .filter(palabra => palabra.trim() !== '' && !palabrasComunes.includes(palabra.toLowerCase()));
            const condicionesDeBusqueda = palabras.map(palabra => ({
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

            if (repuestosEncontrados.length > 0 || repuestosEncontradosPorPalabras.length > 0) {
                res.status(202).json({
                    repuestos: repuestosEncontrados,
                    repuestosSugeridos: repuestosEncontradosPorPalabras
                });
            } else {
                res.status(202).json({
                    repuestos: [],
                    repuestosSugeridos: []
                });
            }
        } else {
            const todosRepuestos = await Repuesto.findAll();
            res.status(202).json({
                repuestos: todosRepuestos,
                repuestosSugeridos: []
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error al intentar buscar repuestos',
            error: error.message
        });
    }
}

const buscarPocosRepuestos = async (req, res) => {
    try {
        const { textoBuscar, inicio, fin } = req.params;
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
                const primerosRepuestosEncontrados = repuestosEncontrados.slice(inicio, fin);
                const primerosRepuestosEncontradosPorPalabras = repuestosEncontradosPorPalabras.slice(inicio, fin);
                res.status(202).json({
                    repuestos: primerosRepuestosEncontrados,
                    repuestosSugeridos: primerosRepuestosEncontradosPorPalabras
                })
            } else {
                if (!repuestosEncontrados && repuestosEncontradosPorPalabras) {
                    const primerosRepuestosEncontradosPorPalabras = repuestosEncontradosPorPalabras.slice(inicio, fin);
                    res.status(202).json({
                        repuestos: [],
                        repuestosSugeridos: primerosRepuestosEncontradosPorPalabras
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
            const primerosRepuestos = todosRepuestos.slice(inicio, fin);
            res.status(202).json({
                repuestos: primerosRepuestos,
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
const buscarPocasFotosPrincipales = async (req, res) => {
    try {
        const { textoBuscar, inicio, fin } = req.params;
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
                const primerosRepuestosEncontrados = repuestosEncontrados.slice(inicio, fin);
                const primerosRepuestosEncontradosPorPalabras = repuestosEncontradosPorPalabras.slice(inicio, fin);
                const fotosRepuestosEncontrados = primerosRepuestosEncontrados.map(repuesto => repuesto.foto_principal);
                const fotosRepuestosEncontradosPorPalabras = primerosRepuestosEncontradosPorPalabras.map(repuesto => repuesto.foto_principal);
                res.status(202).json({
                    fotosRepuestos: fotosRepuestosEncontrados,
                    fotosRepuestosSugeridos: fotosRepuestosEncontradosPorPalabras
                })
            } else {
                if (!repuestosEncontrados && repuestosEncontradosPorPalabras) {
                    const primerosRepuestosEncontradosPorPalabras = repuestosEncontradosPorPalabras.slice(inicio, fin);
                    const fotosRepuestosEncontradosPorPalabras = primerosRepuestosEncontradosPorPalabras.map(repuesto => repuesto.foto_principal);
                    res.status(202).json({
                        fotosRepuestos: [],
                        fotosRepuestosSugeridos: fotosRepuestosEncontradosPorPalabras
                    })
                }
                if (!repuestosEncontrados && !repuestosEncontradosPorPalabras) {
                    res.status(202).json({
                        fotosRepuestos: [],
                        fotosRepuestosSugeridos: []
                    })
                }
            }
        } else {
            const todosRepuestos = await Repuesto.findAll();
            const primerosRepuestos = todosRepuestos.slice(inicio, fin);
            const fotosRepuestos = primerosRepuestos.map(repuesto => repuesto.foto_principal);
            res.status(202).json({
                fotosRepuestos: fotosRepuestos,
                fotosRepuestosSugeridos: [],
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error al intentar buscar repuestos',
            error: error
        });
    }
}
const buscarCantidadRepuestos = async (req, res) => {
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
                    cantidadRepuestos: repuestosEncontrados.length,
                    cantidadRepuestosSugeridos: repuestosEncontradosPorPalabras.length
                })
            } else {
                if (!repuestosEncontrados && repuestosEncontradosPorPalabras) {
                    res.status(202).json({
                        cantidadRepuestos: 0,
                        cantidadRepuestosSugeridos: repuestosEncontradosPorPalabras.length
                    })
                }
                if (!repuestosEncontrados && !repuestosEncontradosPorPalabras) {
                    res.status(202).json({
                        cantidadRepuestos: 0,
                        cantidadRepuestosSugeridos: 0
                    })
                }
            }
        } else {
            const todosRepuestos = await Repuesto.findAll();
            res.status(202).json({
                cantidadRepuestos: todosRepuestos.length,
                cantidadRepuestosSugeridos: 0,
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Ha ocurrido un error al intentar obtener repuestos',
            error: error
        })
    }
}
const leerExcel = async (ruta) => {
    const archivo = XLSX.readFile(ruta);
    const sheetsArchivo = archivo.SheetNames;
    const hojaRepuestos = sheetsArchivo[0];
    const datos = XLSX.utils.sheet_to_json(archivo.Sheets[hojaRepuestos]);
    return datos;
};
const crearRepuesto = async (req, res) => {
    try {
        datosRepuestos = await leerExcel('./uploads/repuestosAyuda.xlsx')
        if (datosRepuestos) {
            await FotoRepuesto.destroy({ where: {} })
            await Repuesto_categoria_dentro_marcas_vehiculo.destroy({ where: {} })
            await Categoria_dentro_marcas_vehiculo.destroy({ where: {} })
            await Repuesto.destroy({ where: {} })
            const divisionCantidadDatos = Math.ceil(datosRepuestos.length / 2);
            const fotos = ['porsche.png', 'mini.png', 'mercedes.png', 'bmw.png', 'audi.png'];
            for (let i = 0; i <= divisionCantidadDatos; i++) {
                const repuestoExistente = await Repuesto.findByPk(datosRepuestos[i].id_repuesto)
                if (!repuestoExistente) {
                    await Repuesto.create({
                        id_repuesto: datosRepuestos[i].id_repuesto,
                        nombre_repuesto: datosRepuestos[i].nombre_repuesto,
                        precio_PVP: datosRepuestos[i].precio_PVP,
                        cantidad_inventario: datosRepuestos[i].cantidad_inventario,
                        foto_principal: 'uploads\\2e5a8af2-d1da-4507-aca5-8d86688932c9.png'
                    })
                    for (const foto of fotos) {
                        await FotoRepuesto.create({
                            id_repuesto: datosRepuestos[i].id_repuesto,
                            foto: `uploads\\${foto}`
                        });
                    }
                    if (datosRepuestos[i].marca_vehiculo) {
                        await crearCategoriasDentroMarcasVehiculo(datosRepuestos[i].id_repuesto, datosRepuestos[i].marca_vehiculo);
                    }
                }

            }
            for (let i = divisionCantidadDatos; i < datosRepuestos.length; i++) {
                const repuestoExistente = await Repuesto.findByPk(datosRepuestos[i].id_repuesto)
                if (!repuestoExistente) {
                    await Repuesto.create({
                        id_repuesto: datosRepuestos[i].id_repuesto,
                        nombre_repuesto: datosRepuestos[i].nombre_repuesto,
                        precio_PVP: datosRepuestos[i].precio_PVP,
                        cantidad_inventario: datosRepuestos[i].cantidad_inventario,
                        foto_principal: 'uploads\\2e5a8af2-d1da-4507-aca5-8d86688932c9.png'
                    })
                    for (const foto of fotos) {
                        await FotoRepuesto.create({
                            id_repuesto: datosRepuestos[i].id_repuesto,
                            foto: `uploads\\${foto}`
                        });
                    }
                    if (datosRepuestos[i].marca_vehiculo) {
                        await crearCategoriasDentroMarcasVehiculo(datosRepuestos[i].id_repuesto, datosRepuestos[i].marca_vehiculo);
                    }
                }
            }
            res.status(202).json('Exito')
        } else {
            console.log('Sin datos');
            res.status(404).json('Sin datos');
        }
    } catch (error) {
        res.status(404).json('Error al crear el repuesto');
    }
}

module.exports = {
    obtenerRepuestos, obtenerFotoPrincipal, obtenerRepuesto, obtenerFotos, obtenerNombresRepuestos, buscarPocosRepuestos,
    buscarRepuestos, crearRepuesto, obtenerPocosRepuestos, obtenerCantidadRepuestos, obtenerPocasFotosPrincipales,
    buscarPocasFotosPrincipales, buscarCantidadRepuestos,
}