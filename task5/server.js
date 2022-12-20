const express =require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
const { getemps, getemp, createemp, updateemp,removeemp } = require('./controller')
app.get('/employee',(req,res)=>{getemps(req,res)})
app.get('/employee/:id',(req,res)=>{
    getemp(req,res,parseInt(req.params.id))
 })
app.put('/employee/:id',(req,res)=>{
    updateemp(req,res,req.params.id)
})
app.delete('/employee/:id',(req,res)=>{
    removeemp(req,res,req.params.id)
})
app.post('/employee',(req,res)=>{
    createemp(req,res)
})
app.listen(3000,()=>{console.log('server started');}); 