'use strict';

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller')

router.get('/', orderController.get);
router.post('/', orderController.post);
// router.put('/:id', orderController.put);
// router.put('/', orderController.put);
// router.delete('/:id', orderController.delete);

module.exports = router;