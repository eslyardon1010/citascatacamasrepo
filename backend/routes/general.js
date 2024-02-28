const express = require('express')
const router = express.Router()
// Controlador
const controladorGeneral = require('../controllers/general')

// * * * * * * * * GET * * * * * * * * *
router.get('/tecnicos', controladorGeneral.gettecnicos)   //obtener todos los tecnicos
router.get('/servicios', controladorGeneral.getServicios)   //obtener todos los servicios
router.get('/clientes', controladorGeneral.getClientes)   // obtener todos los clientes
router.get('/datos/:idToken', controladorGeneral.getDatos)  // obtener todos los datos de un tecnico con ayuda de su id
router.get('/horario/:idtecnico/:idDia', controladorGeneral.getHorariotecnico)  // obtener el horario de un dia de un tecnico
router.get('/citas/:idtecnico/:fecha', controladorGeneral.getCitas)    // obtener las citas de un tecnico
router.get('/citas', controladorGeneral.getCitasDeClientes)    // obtener las citas de un tecnico

// * * * * * * * * POST * * * * * * * * *
router.post('/login', controladorGeneral.postLogin)

// * * * * * * * * PUT * * * * * * * * *
router.put('/perfil', controladorGeneral.putPerfil)   // actualizar pefil
router.put('/cita/:idCita', controladorGeneral.putCita)  // cancelar cita

module.exports = router