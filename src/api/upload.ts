import request from "@/axios/index";

export function getProBatchInfo(query: any, pageInfo: any) {
    let condition = []
    for (let index in query) {
        condition.push(`${index}=${query[index]}`);
    }
    let query_string = condition.join('&');
    return request({
        url: '/api/ProductBatchInfo/ProductBatchInfoList?' + query_string + '&currentPage=' + pageInfo.currentPage + '&PageSize=' + pageInfo.pageSize,
        method: 'get'
    })

}