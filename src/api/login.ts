import request from '@/axios/index'


export function login(userName: any, userPwd: any) {
    return request({
        url: '/api/UserInfo/UserLogin?userName=' + userName + '&userPwd=' + userPwd,
        method: 'post'
    })
}