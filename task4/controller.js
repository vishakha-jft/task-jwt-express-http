const Db = require('./models')

async function getemps(req,res){
    try{
        const dbs = await Db.findall()
        res.writeHead(200,{ 'content-Type':'application/json'})
       res.end(JSON.stringify(dbs)) 
    } catch(error){
        console.log(error)
    }
}
async function getemp(req,res,id){
    try{
        const db = await Db.findbyid(id)
        if(!db){
            res.writeHead(404,{ 'content-Type':'application/json'})
            res.end(JSON.stringify({message : 'Route Not Found '}))
        }
        else{
            res.writeHead(200,{ 'content-Type':'application/json'})
            res.end(JSON.stringify(db)) 
        }
    } catch(error){
        console.log(error)
    }
}
async function createemp(req,res){
    try{
        let body = ''
        req.on('data',(chunk)=>{
            body+= chunk.toString()
        })
        req.on('end',async ()=>{
            const { name, job, salary } = JSON.parse(body)
            const emp={
                name,
                job,
                salary
            }
            const nemp= await Db.create(emp)
            res.writeHead(201,{'content-Type':'application/json'})
            return res.end(JSON.stringify(nemp))
        }) 
    } catch(error){
        console.log(error)
    }
}
async function updateemp(req,res,id){
    try{
        const db = await Db.findbyid(id)
        if(!db){
            res.writeHead(404,{ 'content-Type':'application/json'})
            res.end(JSON.stringify({message : 'Route Not Found '}))
        }
        else{
            let body = ''
           req.on('data',(chunk)=>{
            body+= chunk.toString()
            })
           req.on('end',async ()=>{
            const { name, job, salary } = JSON.parse(body)
            const empdata={
                name: name || emp.name,
                job: job || emp.job,
                salary: salary || emp.salary
            }
            const updemp= await Db.update(id,empdata)
            res.writeHead(200,{'content-Type':'application/json'})
            return res.end(JSON.stringify(updemp))
        }) 
        }        
    } catch(error){
        console.log(error)
    }
}
async function removeemp(req,res,id){
    try{
        const db = await Db.findbyid(id)
        //console.log(id);
        if(!db){
            res.writeHead(404,{ 'content-Type':'application/json'})
            res.end(JSON.stringify({message : 'Route Not Found '}))
        }
        else{
            await Db.remove(id)
            res.writeHead(200,{ 'content-Type':'application/json'})
            res.end(JSON.stringify({message : 'Employee deleted '})) 
        }
    } catch(error){
        console.log(error)
    }
}

module.exports = {
    getemps,getemp,createemp,updateemp,removeemp
}
