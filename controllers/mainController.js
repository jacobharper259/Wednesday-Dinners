const express =require('express')
const app = express()
const bodyParser= require('body-parser')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
let path = (__dirname.split('/controllers')[0]+'/public')


module.exports={
    index:(req,res)=>{
        res.sendFile(path+'/index.html')
    },
    login:(req,res)=>{
        if(JSON.parse((process.env.SUPER_SECRETS.toString()))[req.body.password]){
            res.json({
                name: JSON.parse((process.env.SUPER_SECRETS.toString()))[req.body.password],
                password: req.body.password
            })
        }else{
            res.json(null)
        }
        
        
    }

}