// Permissions
const tablePermissions=document.querySelector("[table-permissions]");
if(tablePermissions){
    const buttonSubmit=document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click",()=>{
        let permissions=[];

        const rows=tablePermissions.querySelectorAll("[data-name]");
        
        rows.forEach((row)=>{
            const name=row.getAttribute("data-name");
            const inputs=row.querySelectorAll("input");
            if(name=="id"){
                inputs.forEach((input)=>{
                    const id=input.value;
                    permissions.push({
                        id: id,
                        permissions:[]
                    });
                });
            }
            else{
                inputs.forEach((input,index)=>{
                    const checked=input.checked;
                    if(checked){
                        permissions[index].permissions.push(name);
                    }
                })
            }

        });
        if(permissions.length>0){
            const formChangePermissions=document.getElementById("form-change-permissions");
            const input=formChangePermissions.querySelector("input[name='permissions']");
            input.value=JSON.stringify(permissions);
            formChangePermissions.submit();
        }


    });
}

// End Permissions


// Permission Data Default
const dataRecords=document.querySelector("[data-records]")
if(dataRecords){
    const records=JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermissions=document.querySelector("[table-permissions]");
    records.forEach((record,index)=>{
        const permission=record.permission;
        permission.forEach(permission=>{
            const row=tablePermissions.querySelector(`[data-name=${permission}]`);
            const input=row.querySelectorAll("input")[index];
            input.checked=true;
        })
    })

}

// End Permission Data Default