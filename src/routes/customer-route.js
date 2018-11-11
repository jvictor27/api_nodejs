'use strict';

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer-controller')

router.post('/', customerController.post);
// router.put('/:id', customerController.put);
router.put('/', customerController.put);
router.delete('/:id', customerController.delete);

module.exports = router;