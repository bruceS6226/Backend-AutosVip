const { Router } = require('express');
const { obtenerRepuestos, obtenerRepuesto, buscarRepuestos, obtenerPrimeraFoto, obtenerFotos, crearRepuesto, obtenerPocosRepuestos, obtenerCantidadRepuestos, obtenerNombresRepuestos, obtenerFotoPrincipal, obtenerPocasFotosPrincipales, buscarPocasFotosPrincipales, buscarPocosRepuestos, buscarCantidadRepuestos } = require('../controllers/repuestos/repuestos.controller');
const { obtenerCategoriasDentroMarcasVehiculo, obtenerCategoriaDentroMarcasVehiculo } = require('../controllers/marcas_vehiculo/categorias.dentro.marcas.vehiculo.controller');
const { obtenerRepuestosPorCategoriaDentroMarcasVehiculo, obtenerRepuestosCategoriasDentroMarcasVehiculo, obtenerFotosRepuestosPorCategoriaDentroMarcasVehiculo, obtenerCantidadRepuestosPorCategoriaDentroMarcasVehiculo, obtenerCategoriasDentroMarcasVehiculoPorRepuesto } = require('../controllers/marcas_vehiculo/repuestos.categorias.marcas.controller');
const { obtenerRelacionesMarcasVehiculos } = require('../controllers/marcas_vehiculo/relacion.marcas.vehiculos.controller');
const { obtenerRelacionesSistemasVehiculos } = require('../controllers/sistemas_vehiculo/relacion.sistemas.vehiculos.controller');
const { obtenerCategoriasDentroSistemasVehiculo } = require('../controllers/sistemas_vehiculo/categorias.dentro.sistemas.vehiculo.controller');
const { obtenerRepuestosCategoriasDentroSistemasVehiculo, obtenerRepuestosPorCategoriaDentroSistemasVehiculo } = require('../controllers/sistemas_vehiculo/repuestos.categorias.sistemas.controller');
const { obtenerServicio, obtenerServicios } = require('../controllers/servicios/servicios.controller');


const router = Router();


router.get('/repuestos', obtenerRepuestos)
router.get('/cantidad-repuestos', obtenerCantidadRepuestos)
router.get('/nombres-repuestos', obtenerNombresRepuestos)
router.get('/pocos-repuestos/:inicio/:fin', obtenerPocosRepuestos)
router.get('/repuesto/:id_repuesto', obtenerRepuesto)
router.get('/buscar/:textoBuscar?', buscarRepuestos)
router.get('/buscar-pocas-fotos-principales/:inicio/:fin/:textoBuscar?', buscarPocasFotosPrincipales)
router.get('/buscar-pocos-repuestos/:inicio/:fin/:textoBuscar?', buscarPocosRepuestos)
router.get('/buscar-cantidad-repuestos/:textoBuscar?', buscarCantidadRepuestos)
//router.post('/crear-repuesto', crearRepuesto)
router.patch('/guardar-repuestos-excel', crearRepuesto)

router.get('/categorias_dentro_marcas_vehiculo', obtenerCategoriasDentroMarcasVehiculo)
router.get('/repuestos-categorias-dentro-marcas-vehiculo', obtenerRepuestosCategoriasDentroMarcasVehiculo)
router.post('/repuestos-por-categoria-dentro-marcas-vehiculo/:inicio/:fin', obtenerRepuestosPorCategoriaDentroMarcasVehiculo)
router.post('/fotos-repuestos-por-categoria-dentro-marcas-vehiculo/:inicio/:fin', obtenerFotosRepuestosPorCategoriaDentroMarcasVehiculo)
router.post('/cantidad-repuestos-por-categoria-dentro-marcas-vehiculo', obtenerCantidadRepuestosPorCategoriaDentroMarcasVehiculo)
router.get('/relaciones-marcas-vehiculo', obtenerRelacionesMarcasVehiculos)
router.get('/categorias-dentro-marcas-vehiculo-por-repuesto/:id_repuesto', obtenerCategoriasDentroMarcasVehiculoPorRepuesto)
router.get('/categoria_dentro_marcas_vehiculo/:id_categoria', obtenerCategoriaDentroMarcasVehiculo)


router.get('/categorias_dentro_sistemas_vehiculo', obtenerCategoriasDentroSistemasVehiculo)
router.get('/repuestos-categorias-dentro-sistemas-vehiculo', obtenerRepuestosCategoriasDentroSistemasVehiculo)
router.get('/repuestos-por-categoria-dentro-sistemas-vehiculo/*', obtenerRepuestosPorCategoriaDentroSistemasVehiculo)
router.get('/relaciones-sistemas-vehiculo', obtenerRelacionesSistemasVehiculos)

router.get('/imagen-principal/:id_repuesto', obtenerFotoPrincipal)
router.get('/pocas-imagenes-principales/:inicio/:fin', obtenerPocasFotosPrincipales)
router.get('/fotos/:id_repuesto', obtenerFotos)

//servicios

router.get('/servicios', obtenerServicios)
router.get('/servicio/:id_servicio', obtenerServicio)

module.exports = router;
