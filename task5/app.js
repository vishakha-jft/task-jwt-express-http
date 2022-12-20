let objid;
async function display(){
   let abc=await listall();
   console.log(abc);
   details(abc);  
} 
$("#add").click(async function(){
    obj={
        "name":$("#name").val(),
        "job":$("#job").val(),
        "salary":$("#sal").val()
    }
    await addemployee(obj);
    display();
    clear();    
  });
async function search() {
    obj={
        "name":$("#name").val(),
        "job":$("#job").val(),
        "salary":$("#sal").val()
    }
    let abc=await listall();
    //const emp=abc.findIndex(emp=>emp.name==obj.name && emp.job==obj.job && emp.salary==obj.salary)
    const find=abc.find(emp=>{
        obj2={
        "name":emp.name,
        "job":emp.job,
        "salary":emp.salary
        }
        console.log(obj,obj2);
        return _.isEqual(obj,obj2)
    })
    // if(emp<=abc.length && emp != -1){
    //     let nabc=[];
    //     nabc.push(abc[emp])
    //     console.log(nabc);
    //     details(nabc)
    // }
    if(find){
        alert("Data is Found");
    }
    else{
        alert("Data Not Found");
    }
  }
function details(emp){
    var html ="<tbody>"
    for (var i = 0; i < emp.length; i++) {
    html+="<tr>";
    html+="<td>"+emp[i].name+"</td>";
    html+="<td>"+emp[i].job+"</td>";
    html+="<td>"+emp[i].salary+"</td>";
    html+=`<td><button id="${emp[i].id}" onclick=update(this.id)>Edit</button><button id="${emp[i].id}" onclick='Delete(this.id)' >Delete</button>`;    
    html+="</tr>";}
    html+="</tbody>";
    document.getElementById("box").innerHTML = html;
}
async function sort(field){
    let abc=await listall();
    if(field == 'salary'){
        abc.sort((a, b) => a[field] - b[field]);
    }
    else{
        abc.sort((a, b) => {
            const nameA = a[field].toUpperCase();
            const nameB = b[field].toUpperCase();
            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1;  }
            return 0;
          });
    }
    details(abc)
   }
async function revsort(field){
    let abc=await listall();
    if(field == 'salary'){
        abc.sort((a, b) => a[field] - b[field]);
    }
    else{
        abc.sort((a, b) => {
            const nameA = a[field].toUpperCase();
            const nameB = b[field].toUpperCase();
            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1;  }
            return 0;
          });
    }
    details(abc.reverse())
}
async function Delete(id){
    await Deleteemployee(id);
    display();
}  
async function update(id){        
    document.getElementById('add').disabled=true;
    document.getElementById('upbtn').disabled=false;
    let obj=await updateget(id);
    showdata(obj);
}    
async function updatefinal(){
    obj={ 
        "name":$("#name").val(),
        "job":$("#job").val(),
        "salary":$("#sal").val(),
        "id":objid
    }
    await updatefinalemp(obj);
    display();
    document.getElementById('add').disabled=false;
    document.getElementById('upbtn').disabled=true;
    clear();    
}
function clear(){
    $("#name")[0].value="";
    $("#job")[0].value="";
    $("#sal")[0].value="";
}
function showdata(obj){
    $("#name")[0].value=obj.name;
    $("#job")[0].value=obj.job;
    $("#sal")[0].value=obj.salary;
    objid=obj.id;
}
