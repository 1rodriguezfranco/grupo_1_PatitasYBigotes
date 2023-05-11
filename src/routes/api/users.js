const express = require('express');
const router = express.Router();
const usersAPI = require('../../controllers/api/usersAPI');

// Rutas
// Listado de usuarios
router.get('/', usersAPI.list);
router.get('/:id', usersAPI.detail);

module.exports = router;