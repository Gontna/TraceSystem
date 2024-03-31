import {defineStore} from "pinia";

export const useUsersStore = defineStore("user", {
    //配置选项
    state: () => {
        return {
            userInfo: {
                UserId: 0,
                UserName: '',
                UserPwd: '',
                UserLevel: '',
                NickName: '',
                Phone: '',
                HeadUrl: null,
                DepName: '',
                CreateDate: '',
                R1: '',
                R2: '',
                R3: ''
            },
            menuInfo: []
        }
    },
    getters: {
        gettersUserName(state) {
            return state.userInfo.UserName
        }
    },
    actions: {},
    persist: true,

})