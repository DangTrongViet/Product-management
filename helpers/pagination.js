module.exports=(objPagination,query,countProduct)=>{
    if(query.page){
        objPagination.currentPage=parseInt(query.page);
    }

    objPagination.skip=(objPagination.currentPage-1)*objPagination.limitItems;
    const totalPage=Math.ceil(countProduct/(objPagination.limitItems));
    objPagination.totalPage=totalPage;

    return objPagination;
}