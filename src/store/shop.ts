import {defineStore} from "pinia";

export const useShopStore = defineStore('shop', {
    state() {
        return {
            data: {
                AddDate: '',
                Addr: '',
                CreateDate: '',
                ImgUrl: '',
                JobName: '',
                LeaderName: '',
                Phone: '',
                ShopId: 0,
                ShopName: '',
                File: null,
            }
        }
    },
    persist: true,
})