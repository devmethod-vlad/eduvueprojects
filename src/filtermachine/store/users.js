import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
    state: () => {
        return {

            selectAllCheckBoxId: 'user-chekall-checkbox',

            checkList: [],

            checkListReverse: [],

            checkAllCheckBoxList: [],

            prefill: 1,

            requestError: false,

            requestErrorInfo: '',

            requestErrorUserInfo: '',

            successInfo: ''
        }
    }
});