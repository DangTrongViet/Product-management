module.exports=(query)=>{
        let filterStatus=[
            {
                name: "Tất cả",
                class: "",
                status: ""
            },
            {
                name: "Hoạt động",
                class: "",
                status: "active"
            },
            {
                name: "Dừng hoạt động",
                class: "",
                status: "inactive"
            }
        ];
        
        
        //Thuộc chức năng lọc
        if(query.status){
            const index=filterStatus.findIndex(item => item.status==query.status);
            filterStatus[index].class="active";
        }else{
            const index=filterStatus.findIndex(item => item.status=="");
            filterStatus[index].class="active";
        }
        return filterStatus;
}