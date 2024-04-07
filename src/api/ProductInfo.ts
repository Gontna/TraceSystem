import request from "@/axios/index";

export function getInfo() {
    return request({
        url: '/api/ProInfo/ProInfoList',
        method: 'get'
    })
}

// @ts-ignore
export function getProInfo(query: string | undefined, currentPage: number, PageSize: number, trunfiler: boolean) {
    // console.log(query);
    if (trunfiler) {
        if (query != undefined || query != null || query != '') {
            return request({
                url: '/api/ProInfo/ProInfoList?proName=' + query + '&currentPage=' + currentPage + '&PageSize=' + PageSize,
                method: 'get',
            })
        } else {
            return request({
                url: '/api/ProInfo/ProInfoList?&currentPage=' + currentPage + '&PageSize=' + PageSize,
                method: 'get',
            })
        }
    } else {
        return request({
            url: '/api/ProInfo/ProInfoList?&currentPage=' + currentPage + '&PageSize=' + PageSize,
            method: 'get',
        })
    }


}

export function getProByName(ProName: string, currentPage: number, PageSize: number) {
    return request({
        url: '/api/ProInfo/ProInfoList?proName=' + ProName + '&currentPage=' + currentPage + "&PageSize=" + PageSize,
        method: 'get'
    })
}

//@ts-ignore
export function addProInfo({
                               ProId,
                               ProName,
                               SaveDate,
                               ProRegNo,
                               ProSpec,
                               LevTwo,
                               LevThree,
                               MainContent,
                               ProLevel,
                               ProRegOwner,
                               ProNetCon,
                               ProJX,
                               file,
                           }) {
    let flag = 0
    if (ProId > 0) {
        flag = ProId
    }
    return request({
        method: 'post',
        url: '/api/ProInfo/ProInfo_Add_Edit',
        params: {
            // proName:flag,
            proName: ProName,
            proRegOwner: ProRegOwner,
            proRegNo: ProRegNo,
            mainContent: MainContent,
            proSpec: ProSpec,
            proNetCon: ProNetCon,
            proJX: ProJX,
            saveDate: SaveDate,
            proLevel: ProLevel,
            levTwo: LevTwo,
            levThree: LevThree,
            proId: flag
        },
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

//@ts-ignore
export function delProInfo({ProId}) {
    return request({
        url: '/api/ProInfo/Pro_Del?proId=' + ProId,
        method: 'get',
    })
}
