
function Deleteemployee(id){
    const token=sessionStorage.getItem('token')
    fetch('http://localhost:3000/employee/'+id,{
        method:"DELETE",
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
}
function logout() {
    localStorage.removeItem('token');
}
async function loginuser(obj){
    const token= await fetch('http://localhost:3000/user/login',{
        method:"POST",
        headers:{
            Accept :"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(obj)
    })
    let tks=await token.json()
    sessionStorage.setItem("token",tks.token )
    //console.log(await token.json());
}
function adduser(obj){
    fetch('http://localhost:3000/user/register',{
        method:"POST",
        headers:{
            Accept :"application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body: JSON.stringify(obj)
    })
}
function addemployee(obj){
    const token=sessionStorage.getItem('token')
    fetch('http://localhost:3000/employee',{
        method:"POST",
        headers:{
            Accept :"application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body: JSON.stringify(obj)
    })
}
function updatefinalemp(obj){
    const token=sessionStorage.getItem('token')
    fetch('http://localhost:3000/employee/'+obj.id,{
        method:"PUT",
        headers:{
            Accept :"application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body: JSON.stringify(obj)
    })
}
async function updateget(id){
    const token=sessionStorage.getItem('token')
    const emp=await fetch('http://localhost:3000/employee/'+id,{
        method:"GET",
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return emp.json();
}
async function listall (){
    const token=sessionStorage.getItem('token')
    const emp=await fetch('http://localhost:3000/employee',{
        method:"GET",
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return await emp.json();
    // console.log(await emp.json());
}
