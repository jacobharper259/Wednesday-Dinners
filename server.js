const express = require('express')
const app = express()
const PORT = 8000
const bodyParser= require('body-parser')
const connectDB = require('./config/database')
require('dotenv').config({path: './config/.env'})
console.log(process.env)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))



connectDB()


const mainRoutes = require('./routes/main')
const dbRoutes = require('./routes/db')
app.use('/', mainRoutes)
app.use('/db', dbRoutes)

app.listen(process.env.PORT || PORT)