'use strict';

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer-controller')
const authService = require('../services/auth_service');

router.post('/', customerController.post);
router.post('/authenticate', customerController.authenticate);
router.post('/refresh-token', authService.authorize, customerController.refreshToken);
// router.put('/:id', customerController.put);
// router.put('/', customerController.put);
// router.delete('/:id', customerController.delete);

module.exports = router;