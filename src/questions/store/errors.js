import { defineStore } from 'pinia'

export const useErrorsStore = defineStore('error', {
    state: () => {
        return {
            blockError: {
                isActive: false,
                message: ''
            },

            infoError: {
                isActive: false,
                message: ''
            }
        }
    }
})