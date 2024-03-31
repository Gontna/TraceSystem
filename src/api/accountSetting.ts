import request from '@/axios/index'

export function getUserInfoList(pageInfo: any, keyName: string) {

    return request({
        url: '/api/UserInfo/UserInfoList?keyName=' + keyName + '&currentPage=' + pageInfo.currentPage + '&PageSize=' + pageInfo.pageSize,
        meth: 'get'
    })
}

//增加或编辑用户信息
export function addAndEditAccount(query: any) {
    let condition = []
    for (let index in query) {
        condition.push(`${index}=${query[index]}`);
    }
    let query_string = condition.join('&');
    console.log(query_string)
    return request({
        url: '/api/UserInfo/UserInfo_Add_Edit?' + query_string,
        method: 'post'
    })
}

//删除用户信息
export function delUserInfo(userId: number, userLevel: string) {
    return request({
        url: '/api/UserInfo/UserInfo_Del?userId=' + userId + '&userLevel=' + userLevel,
        method: 'get'
    })
}

export function getMenuById(userId: number, userLevel: string) {
    return request({
        url: '/api/UserInfo/MenuByAdminId?userId=' + userId + '&userLevel=' + userLevel,
        method: 'get',
    })

}