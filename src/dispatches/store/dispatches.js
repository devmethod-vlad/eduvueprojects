import { defineStore } from 'pinia'

export const useDispatchesStore = defineStore('dispatches', {
    state: () => {
        return {

            search_phrase: '',

            statusIncludes: [],

            methodIncludes: ['telegram'],

            // 10 25 50 100
            pageCount: 10,

            pageNumber: 1,

            created_sort: {
                "active": 1,
                "type": "desc"
            },

            actuality_sort: {
                "active": 0,
                "type": "desc"
            },

            renderList: [],

            availableStatus: [],

            total: 0,

            is_dispatch_exist: 1,

            search_enable: false,

            loadingDispatches: false,

            dispatchesError: false,

            infoText: '',

            requestExecution: false

        }
    }
});