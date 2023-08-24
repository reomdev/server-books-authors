'use strict'

const express = require('express')
const router = express.Router()
    
const bookController = require('../controllers/book');

router.get('/', bookController.init)
router.post('/create', bookController.create)
router.get('/all', bookController.all)

module.exports = router