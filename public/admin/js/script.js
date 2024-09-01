



const buttonStatus=document.querySelectorAll("[button-status]");
const buttonSearch=document.querySelector("#form-search");


const url=new URL(location.href);

if(buttonSearch){
    let url=new URL(location.href);
    buttonSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const keyword=e.target.keyword.value;
        if(keyword){
            url.searchParams.set("keyword",keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        location.href=url.href;
    })
}

if(buttonStatus.length>0){
    buttonStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const status=button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status",status);
            }
            else{
                url.searchParams.delete("status");
            }
            location.href=url.href;

        })
    })
}

//pagination
const buttonPagination=document.querySelectorAll("[button-pagination]");
if(buttonPagination){
    buttonPagination.forEach(item=>{
        item.addEventListener("click",()=>{
            const page=item.getAttribute("button-pagination");
            const url = new URL(window.location.href)
            url.searchParams.set("page",page);
            location.href=url.href;
    });
    });
}
//End pagination

//Checkbox Multi
const checkboxMulti=document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll=checkboxMulti.querySelector("input[name='checkall']");
    const inputsId=checkboxMulti.querySelectorAll("input[name='id']");
    inputCheckAll.addEventListener("click",()=>{
       if(inputCheckAll.checked){
        inputsId.forEach(item=>{
            item.checked=true;
        })
       }else{
        inputsId.forEach(item=>{
            item.checked=false;
        })
       }
    })
    inputsId.forEach(input=>{
        input.addEventListener("click",()=>{
            const countChecked=checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked==inputsId.length){
                inputCheckAll.checked=true;
            }else{
                inputCheckAll.checked=false;
            }

        })

    })
}


//End Checkbox Mutil

//Form Change Multi
const formchangeMulti=document.querySelector("[form-change-multi]");
if(formchangeMulti){
    formchangeMulti.addEventListener("submit",(e)=>{
        //ngăn load lại trang.
        e.preventDefault();
        const checkboxMulti=document.querySelector("[checkbox-multi]");
        const inputsChecked=checkboxMulti.querySelectorAll("input[name='id']:checked");
        const typeChange=e.target.elements.type.value;
        
        if(typeChange=="delete-all"){
            const isConfirm=confirm("Bạn có chắc muốn xóa những sản phẩm này?");
            if(!isConfirm){
                return;
            }
        }
        if(inputsChecked.length>0){
            let ids=[];
            const inputIds=formchangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(input=>{
                // value== getAttribute("value");
                const id=input.value;
                if(typeChange=="change-position"){
    
                    const position=input
                    .closest("tr")
                    .querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`)
                   
                }else{
                    ids.push(id);
                }

            })
            inputIds.value=ids.join(", ");
            formchangeMulti.submit();
        }else{
            alert("Vui lòng chọn ít nhất 1 bản ghi!");
        }

    });
}
//End Change Multi

//Show Alert
const showAlert=document.querySelector("[show-alert]");
if(showAlert){
    const time=parseInt(showAlert.getAttribute("data-time"));
    const closeAlert=showAlert.querySelector("[close-alert]")
    setTimeout(()=>{
        showAlert.classList.add("aleart-hidden");
    },time);
    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden");
    })
  
    


}

//End show alert


// Upload image
const uploadImage=document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput=document.querySelector("[upload-image-input]");
    const uploadImagePreview=document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change",(e)=>{
        const file=e.target.files[0];
        if(file){
            uploadImagePreview.src=URL.createObjectURL(file);
            if(uploadImagePreview){
                const btnClose=document.querySelector("[btn-close]");
                btnClose.style.display="block";
                uploadImagePreview.style.display="block";
                btnClose.addEventListener("click",()=>{
                    uploadImageInput.value = "";
                    uploadImageInput.src="";
                    uploadImagePreview.style.display="none";
                    btnClose.style.display="none";
                
            })
            }
        }
    })

}
// End upload Image
