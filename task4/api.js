
function Deleteemployee(id){
    fetch('http://localhost:3000/employee/'+id,{
        method:"DELETE"
    })
}
function addemployee(obj){
    fetch('http://localhost:3000/employee',{
        method:"POST",
        headers:{
            Accept :"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(obj)
    })
}
function updatefinalemp(obj){
    fetch('http://localhost:3000/employee/'+obj.id,{
        method:"PUT",
        headers:{
            Accept :"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(obj)
    })
}
async function updateget(id){
    const emp=await fetch('http://localhost:3000/employee/'+id,{
        method:"GET"
    })
    return emp.json();
}
async function listall (){
    const emp=await fetch('http://localhost:3000/employee',{
        method:"GET"
    })
    return emp.json();
}
