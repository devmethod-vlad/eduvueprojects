import { defineStore } from 'pinia'

export const useRoleStore = defineStore('role', {
    state: () => {
        return {
            filter_disclaimer: 'Отметьте те роли, которые будут участвовать в формировании списка',

            filter_pagecount: 10,

            filter_page_number: 1,

            filter_search_phrase: '',

            total: 0,

            info_list: [],

            sort: {
                "active": 1,
                "type": "asc"
            },

            check_first: 0,

            selectAllCheckBoxId: 'role-chekall-checkbox',

            checkList: [],

            checkListReverse: [],

            prefill: 0,

            checkAllCheckBoxList: [],

            requestError: false,

            requestErrorInfo: '',

            requestErrorUserInfo: '',

            successInfo: '',

            needUpdate: false,

            updateActive: false
        }
    }
});