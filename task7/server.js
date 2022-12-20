const express =require('express');
const cors = require('cors')
const fs = require('fs')
let users = require('./user.json')
const bodyParser = require('body-parser')
require("dotenv").config()
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { getemps, getemp, createemp, updateemp,removeemp } = require('./controller')
const verifyUserToken = (req, res, next) => {
    if (!req.headers.authorization) { return res.status(401).send("Unauthorized request") }
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) { return res.status(401).send("Access denied. No token provided."); }
    try {
      const decoded = jwt.verify(token, "Secret Message");
      req.user = decoded.user;
      next();
    } catch (err) { res.status(400).send("Invalid token.");}
};
app.get('/employee',verifyUserToken,(req,res)=>{
  getemps(req,res)
})
app.get('/employee/:id',verifyUserToken,(req,res)=>{getemp(req,res,parseInt(req.params.id))})
app.put('/employee/:id',verifyUserToken,(req,res)=>{updateemp(req,res,req.params.id)})
app.delete('/employee/:id',verifyUserToken,(req,res)=>{removeemp(req,res,req.params.id)})
app.post('/employee',verifyUserToken,(req,res)=>{createemp(req,res)})

app.post('/user/register',async (req,res)=>{
    const user = req.body;
    if (!user.username || !user.password) {
        return res.status(400).send("Username and password are required.");
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    users.push(user);
    fs.writeFileSync('./user.json',JSON.stringify(users),'utf8',(err) => {
        if(err){ console.log(err );}
    })
    res.json(user);
})
app.post("/user/login", async (req, res) => {
    const user = req.body;
    const foundUser = users.find((user) => user.username === req.body.username);
    if (!foundUser) {
      return res.status(400).send("Invalid username or password");
    }
    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).send("Invalid Username or password");
    }
    const token = jwt.sign({ user }, "Secret Message",{
      expiresIn: "1h",
    });
    res.json({ token });
  });
app.listen(3000,()=>{console.log('server started');}); 