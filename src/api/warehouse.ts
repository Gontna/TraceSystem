import request from '@/axios/index.ts'


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

export function ProOutBound(query: any) {
    let condition = []
    for (let index in query) {
        condition.push(`${index}=${query[index]}`);
    }
    let query_string = condition.join('&');

    return request({
        url: '/api/ProductBatchInfo/ProductOutBound?' + query_string,
        method: 'get'
    })
}

export function getProInfoByProId(query: any, pageInfo: any) {
    let condition = []
    for (let index in query) {
        condition.push(`${index}=${query[index]}`);
    }
    let query_string = condition.join('&');

    return request({
        url: '/api/ProductBatchInfo/ProductCodeInfoByProId?' + query_string + '&currentPage=' + pageInfo.currentPage + '&PageSize=' + pageInfo.pageSize,
        method: 'get'
    })
}

export function DelProCodeInfo(outBatchCode: string, codeState: string) {
    return request({
        url: '/api/ProductBatchInfo/ProductCodeInfoDel?outBatchCode=' + outBatchCode + '&codeState=' + codeState,
        method: 'get'
    })

}