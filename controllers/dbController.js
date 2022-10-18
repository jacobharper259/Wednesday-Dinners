const express =require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require('../models/dbModel')
module.exports = {
    getTodos: async (req,res)=>{
        try{
            const todoItems = await db.find()
            res.json(todoItems)
            //const itemsLeft = await Todo.countDocuments({completed: false})
            //console.log(todoItems)
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        console.log(req.body.name)

        try{
            await db.create({name: req.body.name, ingredients: req.body.ingredients, equipment: req.body.equipment, steps: req.body.steps,author: req.body.author})
            console.log('Todo has been added!')
            res.redirect('/')
        }catch(err){
            console.log(err)
        }

    }
}