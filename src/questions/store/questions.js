import { defineStore } from 'pinia'

export const useQuestionsStore = defineStore('questions', {
    state: () => {
        return {

            updateFlag: false,
            renderList: [],
            totalCountByConditions: 0,
            availableStatuses: [],
            availableSpaces: [],
            totalCount: 0,
            statusId: 0,
            spaceId: 0,
            activePage: 1,
            countPerPage: 5,
            sorting: 'desc',
            searchInput: '',
            isFeedback: 0,
            onlyPublic: 0,
            enableSearch: 0,
            loading: false
        }
    }
})