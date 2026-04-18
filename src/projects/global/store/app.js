import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            tokenExpireTime: 0,
            apiUrl: '',
            portalUrl: 0,
            localHostAuth: true,
            authByLink: true,
            authByStorageToken: true,
            authByEdu: true,
            manualAuth: false,
            eduSpaceKey: ''
        }
    }
})