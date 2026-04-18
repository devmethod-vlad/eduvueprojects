import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            // dispatches  newdispatch modifydispatch
            activeComponent: 'dispatches',

            // telegram  mail arm
            method: 'telegram'
        }
    }
});