import {defineStore} from "pinia";

export const useWareHouseStore = defineStore('wareStore', {
    state() {
        return {
            data: {
                ProName: '',
                ProId: '',
            }
        }
    },
    persist: true,
})