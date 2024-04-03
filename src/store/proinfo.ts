import {defineStore} from "pinia";

export const useUsersStore = defineStore("proinfo", {
    //配置选项
    state: () => {
        return {
            ProId: '',
            ProName: '',
            SaveDate: '',
            ProRegNo: '',
            ProSpec: '',
            LevTwo: '',
            LevThree: '',
            MainContent: '',
            ProLevel: '',
            ProRegOwner: '',
            ProNetCon: '',
            ProJX: '',
            ProUrl: '',
        }
    },
    actions: {},
    persist: true,

})