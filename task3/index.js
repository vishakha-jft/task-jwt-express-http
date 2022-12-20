const http=require('http');
const fs=require('fs');
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
    else if(req.url==='/json'){
        res.writeHead(200,"Good",{'Content-Type':'text/json'});
        fs.readFile('index.json',(err,data)=>{
            if(err) console.log(err);
            else{
                res.end(data);
            }
        });
    }
    else if(req.url==='/text'){
        res.writeHead(200,"Good",{'Content-Type':'text/plain'});
        fs.readFile('abc.txt',(err,data)=>{
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