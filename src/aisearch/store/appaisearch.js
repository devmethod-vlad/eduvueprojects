import { defineStore } from 'pinia'

export const useAppAiSearchStore = defineStore('appaisearch', {
    state: () => {
        return {
            query: '',
            results: [],
            renderList: [],
            resultPanelVisible: false,
            activePage: 1,
            countPerPage: 10,
            pageCount: 0,
            noResults: false,
            loadingResults: false,
            searchElemHeight: 0
        }
    }
});