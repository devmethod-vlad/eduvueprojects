import { defineStore } from 'pinia'

export const useMailStore = defineStore('updatemail', {
    state: () => {
        return {
            exist: [
                // {id: 1, mail: 'example@example.com', base:0, archive: 0, valid:true},
                // {id: 2, mail: 'mail@mail.com', base:0, archive: 0, valid:true},
            ],
            runtime: [],
            base: [],
            userInteraction: false
        }
    }
})