import request from "@/axios/index";

export function getScanCodeInfo(keyName: string, pageInfo: any) {
    return request({
        url: '/api/ScanCodeInfo/ScanCodeInfoList?keyName=' + keyName + '&currentPage=' + pageInfo.currentPage + '&PageSize=' + pageInfo.pageSize,
        method: 'get'
    })
}

export function delScanCodeInfo(scanCodeId: number) {
    return request({
        url: '/api/ScanCodeInfo/ScanCodeInfo_Del?scanCodeId=' + scanCodeId,
        method: 'get'
    })
}