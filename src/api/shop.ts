import request from "@/axios/index";

export function getShopInfoList(keyName: string) {
    return request({
        url: '/api/ShopInfo/ShopInfoList?keyName=' + keyName,
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