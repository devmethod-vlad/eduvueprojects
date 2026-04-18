import { defineStore } from 'pinia'

export const useSubmitMessageStore = defineStore('submitmessage', {
    state: () => {
        return {
           message: ''
        }
    }
})