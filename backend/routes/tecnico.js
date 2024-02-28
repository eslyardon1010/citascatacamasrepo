const express = require('express')
const router = express.Router()

// Controlador
const tecnicoControlador = require('../controllers/tecnico')

// * * * * * * * GET * * * * * * * *
// login
// pefil
// landing page
// ver todas las citas, ver una cita
router.get('/citas/:idtecnico', tecnicoControlador.getCitas)
// ver clientes

// * * * * * * * POST * * * * * * * *
// login

// * * * * * * * PUT * * * * * * * *
router.put('/citas/aceptar/:idCita')   // aceptrar cita
// cancelar cita
// actualizar perfil

// * * * * * * * DELETE * * * * * * * *
// eliminar cita

module.exports = router