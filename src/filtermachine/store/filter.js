import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
    state: () => {
        return {

            // 10 25 50 100
            page_count: 10,

            page_number: 1,

            search_phrase: "",

            methods: [],

            login_sort: {
                "active": 1,
                "type": "asc"
            },

            fio_sort: {
                "active": 0,
                "type": "desc"
            },

            mu_name_sort: {
                "active": 0,
                "type": "desc"
            },

            mo_name_sort: {
                "active": 0,
                "type": "desc"
            },

            mu_shortname_sort: {
                "active": 0,
                "type": "desc"
            },

            mo_shortname_sort: {
                "active": 0,
                "type": "desc"
            },

            role_sort: {
                "active": 0,
                "type": "desc"
            },

            spec_sort: {
                "active": 0,
                "type": "desc"
            },

            mu_params: {
                "prefill": 1,
                "mu_list": [],
                "check_first": 0,
                "category_list": []
            },

            mo_params: {
                "prefill": 1,
                "mo_list": [],
                "check_first": 0,
                "category_list": []
            },

            role_params: {
                "prefill": 0,
                "role_list": [],
                "check_first": 0
            },

            spec_params: {
                "prefill": 0,
                "spec_list": [],
                "check_first": 0
            },

            user_params: {
                "prefill": 1,
                "user_list": [],
                "check_first": 0
            }
        }
    }
});