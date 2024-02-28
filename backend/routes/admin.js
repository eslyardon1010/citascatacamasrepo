const express = require('express')
const router = express.Router()

// Controlador
const adminControlador = require('../controllers/admin')

// * * * * * * * GET * * * * * * * *
// login
// pefil
// landing page
// ver citas
// ver tecnicos, ver tecnico, pagina para agregar tecnico
// ver clientes
// ver estadisticas del negocio

// * * * * * * POST * * * * * * * * 
router.post('/tecnicos/agregar', adminControlador.postAgregartecnico)   // agregar tecnico
// login

// * * * * * * PUT * * * * * * * * *
router.put('/tecnicos/:id', adminControlador.puttecnico)   // actualizar tecnico
// cancelar cita
// actualizar perfil

// * * * * * * DELETE * * * * * * * *
router.delete('/tecnicos/:id', adminControlador.deletetecnico)    // eliminar tecnico

module.exports = router