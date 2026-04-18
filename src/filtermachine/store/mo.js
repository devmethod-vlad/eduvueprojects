import { defineStore } from 'pinia'

export const useMoStore = defineStore('mo', {
    state: () => {
        return {
            filter_disclaimer: 'Снимите галочки с тех МО, которые НЕ будут участвовать в формировании списка',

            filter_pagecount: 10,

            filter_page_number: 1,

            filter_search_phrase: '',

            total: 0,

            info_list: [],

            name_sort: {
                "active": 1,
                "type": "asc"
            },

            shortname_sort: {
                "active": 0,
                "type": "asc"
            },

            check_first: 0,

            selectAllCheckBoxId: 'mo-chekall-checkbox',

            checkList: [],

            checkListReverse: [],

            checkAllCheckBoxList: [],

            prefill: 1,

            category: [],

            activeCategory: [],

            requestError: false,

            requestErrorInfo: '',

            requestErrorUserInfo: '',

            successInfo: '',

            needUpdate: false,

            updateActive: false
        }
    }
});