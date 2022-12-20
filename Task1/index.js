import http from 'http';
import fs from 'fs';
const server = http.createServer((req,res)=>{
    if(req.url==='/'){
        res.writeHead(200,"Good",{'Content-Type':'text/html'});
        fs.readFile('index.html',(err,data)=>{
            if(err) console.log(err);
            else{
                res.end(data);
            }
        }); 
    }
    else{
            res.end('<h1>404 Error Page Not Found</h1>')
    }
});
server.listen(8000,'localhost');