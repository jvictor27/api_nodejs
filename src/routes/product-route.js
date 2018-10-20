'use strict';

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller')

router.get('/', productController.get);
router.get('/:slug', productController.getBySlug);
router.get('/admin/:id', productController.getById);
router.get('/tags/:tag', productController.getByTag);
router.post('/', productController.post);
// router.put('/:id', productController.put);
router.put('/', productController.put);
router.delete('/:id', productController.delete);

module.exports = router;