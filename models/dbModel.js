const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  equipment: {
    type: Array,
    required: true,
  },
  steps: {
    type: Array,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Recipe', TodoSchema)
