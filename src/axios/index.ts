import axios from "axios";
import {md5} from "js-md5";
import {ElNotification} from "element-plus";
import router from '@/router'


const service: any = axios.create({
    baseURL: 'http://zhuisu.zjhkjy.com/',
    timeout: 50000
})
const ser: string = '7C0954A527D547E68BCDE727DD307CB9'
// @ts-ignore
service.interceptors.request.use(config => {
    //token 加密方式
    let time = Math.floor(Date.now() / 1000)
    const tok = ser + time
    const token = md5(tok).toUpperCase()
    config.headers['token'] = token
    config.headers['timestamp'] = time
    return config
    //@ts-ignore
}, err => Promise.reject(err))

// @ts-ignore
service.interceptors.response.use(res => {
       
        if (res.data && res.data.retCode === 0) {
            return Promise.resolve(res.data)
        } else {

            //一般无条目时会走此线
            return Promise.reject(res.data)

        }
//@ts-ignore
    }, err => {
        console.log(err)
        router.push('/error')
        ElNotification({
            title: 'Error服务器错误',
            type: 'error',
        })
    }
)


export default service