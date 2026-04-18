import { defineStore } from 'pinia'


export const useLoginFormStore = defineStore('portalauthloginform', {
    state: () => {
        return {
            loginInput: '',
            snilsInput: '',
            errorStyleLogin: false,
            errorStyleSnils: false,
            loading: false,
            showInfoBlock: false,
            formError: false
        }
    }
})