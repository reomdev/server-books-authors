'use strict'

const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

router.get('/', authorController.init);
router.post('/create', authorController.create);
router.get('/all',  authorController.all);

module.exports = router;