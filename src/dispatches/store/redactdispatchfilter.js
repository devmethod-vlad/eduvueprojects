import { defineStore } from 'pinia'

export const useRedactDispatchFilterStore = defineStore('redactdispatchfilter', {
    state: () => {
        return {

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