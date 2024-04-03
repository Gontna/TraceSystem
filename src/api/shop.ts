import request from "@/axios/index";

export function getShopInfoList(keyName: string, pageInfo: any) {
    return request({
        url: '/api/ShopInfo/ShopInfoList?keyName=' + keyName + '&currentPage=' + pageInfo.currentPage + '&PageSize=' + pageInfo.pageSize,
        method: 'get'
    })
}

export function addAndEditShopInfo(query: any, file: any) {
    let condition = []
    for (let index in query) {
        condition.push(`${index}=${query[index]}`);
    }
    let query_string = condition.join('&');
    return request({
        url: '/api/ShopInfo/ShopInfo_Add_Edit?' + query_string,
        method: 'post',
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

}

export function delShopInfo(shopId: number) {
    return request({
        url: 'api/ShopInfo/Shop_Del?shopId=' + shopId,
        method: 'get'
    })

}

export function getProCoudeInfoByShopId(query: any, pageInfo: any) {
    let condition = []
    for (let index in query) {
        condition.push(`${index}=${query[index]}`);
    }
    let query_string = condition.join('&');
    return request({
        url: '/api/ProductBatchInfo/ProductCodeInfoByShopId?' + query_string + '&currentPage=' + pageInfo.currentPage + '&PageSize=' + pageInfo.pageSize,
        method: 'get'
    })
}