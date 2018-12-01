'use strict';

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller')
const authService = require('../services/auth_service');

router.get('/', authService.authorize, orderController.get);
router.post('/', authService.authorize, orderController.post);
// router.put('/:id', orderController.put);
// router.put('/', orderController.put);
// router.delete('/:id', orderController.delete);

module.exports = router;