const Db = require('./models')
async function getemps(req,res){
    try{
        const dbs = await Db.findall()
        res.json(dbs)
    } catch(error){
        console.log(error)
    }
}
async function getemp(req,res,id){
    try{
        const db = await Db.findbyid(id)
        res.json(db)
    } catch(error){
        console.log(error)
    }
}
async function createemp(req,res){
    try{
        const emp = req.body
        const nemp= await Db.create(emp)
        res.json(nemp)
    } catch(error){
        console.log(error)
    }
}
async function updateemp(req,res,id){
    try{
        const empdata= req.body;
        const updemp= await Db.update(id,empdata)
        res.json(updemp)    
    } catch(error){
        console.log(error)
    }
}
async function removeemp(req,res,id){
    try{
        const db = await Db.findbyid(id)
        await Db.remove(id) 
        res.json({message : 'Employee deleted '})
    } catch(error){
        console.log(error)
    }
}

module.exports = {
    getemps,getemp,createemp,updateemp,removeemp
}
