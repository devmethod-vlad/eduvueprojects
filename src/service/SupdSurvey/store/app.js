import { defineStore } from 'pinia'

export const useAppStore = defineStore('app_supdsurvey', {
    state: () => {
        return {
            loading: false,
            globalText: '',
            globalWarnStyle: false
        }
    }
})