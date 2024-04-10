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

export function uploadFile(BatchCode: string, ProId: string, ProduceDate: string, file: any) {

    return request({
        url: '/api/ProductBatchInfo/UploadFile?BatchCode=' + BatchCode + '&ProId=' + ProId + '&ProduceDate=' + ProduceDate,
        method: 'post',
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}