const express = require('express')
const router = express.Router()
const dbController = require('../controllers/dbController')

router.get('/', dbController.getTodos)
router.post('/createRecipe', dbController.createTodo)

module.exports = router