import request from "@/axios/index";

export function getShopInfoList(keyName: string) {
    return request({
        url: '/api/ShopInfo/ShopInfoList?keyName=' + keyName,
        method: 'get'
    })
}