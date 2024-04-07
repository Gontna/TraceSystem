import {defineStore} from "pinia";

export const useAccountStore = defineStore('account',
    {
        state() {
            return {
                data: {
                    CreateDate: '',
                    DepName: '',
                    HeadUrl: '',
                    NickName: '',
                    Phone: '',
                    UserId: 0,
                    UserName: '',
                    UserPwd: '',
                    File: null,
                    MenuIds: ''
                },
                checkList: []
            }
        },
        getters: {},
        actions: {},
        persist: true,
    })