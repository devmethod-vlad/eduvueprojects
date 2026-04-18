import { defineStore } from 'pinia'

export const useFreezeArrayStore = defineStore('freezearr', {
    state: () => {
        return {
            dataArr: []
        }
    }
})