const http=require('http');
//const fs=require('fs');
const { getemps, getemp, createemp, updateemp,removeemp } = require('./controller')
const server = http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, content-type, Access-Control-Request-Method, Access-Control-Request-Headers");
    if(req.method==='OPTIONS')
    {
        res.writeHead(200);
        res.end();
    }
    else if(req.url=='/employee' && req.method === 'GET'){
       getemps(req,res)
    }
    else if (req.url.match(/\/employee\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[2]
        getemp(req,res,id)
    }
    else if (req.url.match(/\/employee\/([0-9]+)/) && req.method === 'PUT'){
        const id = req.url.split('/')[2]
        updateemp(req,res,id)
    }
    else if (req.url.match(/\/employee\/([0-9]+)/) && req.method === 'DELETE'){
        const id = req.url.split('/')[2]
        removeemp(req,res,id)
    }
    else if(req.url === '/employee' && req.method === 'POST'){
        createemp(req,res)
    }
    else{
       res.writeHead(404,{ 'content-Type':'application/json'})
       res.end(JSON.stringify({message : 'Route Not Found '}))
    }

});
server.listen(3000,'localhost'); 