import { defineStore } from 'pinia'

export const useSynchroStore = defineStore('synchro', {
    state: () => {
        return {

            renderList: [],

            availableStatus: [],

            total: 0

        }
    }
});