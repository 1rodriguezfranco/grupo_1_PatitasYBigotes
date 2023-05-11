const express = require('express');
const router = express.Router();
const productAPI = require('../../controllers/api/productAPI');

// Rutas
// Listado de usuarios
router.get('/', productAPI.list);
router.get('/:id', productAPI.detail);

module.exports = router;