import { defineStore } from 'pinia'

export const useListStore = defineStore('list', {
    state: () => {
        return {
            projIdActiveModal: 0,
            projValidateInfo: '',
            availActionsList: [],
            availEnrolTypes: [],
            activeList: {}
        }
    }
})