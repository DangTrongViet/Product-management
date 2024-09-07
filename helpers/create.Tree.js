let count=0;
const createTree=(arr,parentId="")=>{
    const Tree=[];
    for(item of arr){  
        if(item.parent_id===parentId){
            count++;
            const newItem=item;
            newItem.index=count;
            const children=createTree(arr,newItem.id);
            if(children.length>0){
                newItem.children=children;
            }
            Tree.push(newItem);
        }
    }
    return Tree;
}




module.exports.tree=(arr,parentId="")=>{
    count=0;
    const tree=createTree(arr,parentId="");
    return tree;


}