import { defineStore } from 'pinia'

export const useResultStore = defineStore('result', {
    state: () => {
        return {
            total: 0,
            users: [],
            totalWithoutMethods: 0
        }
    }
});