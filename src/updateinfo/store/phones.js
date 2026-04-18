import { defineStore } from 'pinia'

export const usePhoneStore = defineStore('updatephone', {
    state: () => {
        return {
            exist: [
                // {id: 1, phone:'+79165182089', base: 0, archive: 0, valid:true},
                // {id: 2, phone:'+79266293190', base: 0, archive: 0, valid:true}
            ],
            runtime: [],
            base: [],
            userInteraction: false
        }
    }
})