import { defineStore } from 'pinia'

export const useUserAppsStore = defineStore('userapps', {
    state: () => {
        return {

            telegram:{
                active:0,

                info:{
                    tg_id:'',
                    tg_name: ''
                }
            }
        }
    }
})