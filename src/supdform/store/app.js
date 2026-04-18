import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            successSend: false,

            loading: false,

            infoText: '',

            infoTextWarn: false,

            getParams: {
                login:'',
                moId:'',
                muId:'',
                version:''
            },

            fioInput: '',
            fioErrorStyle: false,
            loginInput: '',
            loginErrorStyle: false,
            moInput: '',
            moErrorStyle: false,
            mailInput: '',
            mailErrorStyle: false,
            phoneInput: '',
            phoneErrorStyle: false,
            messInput: '',
            messErrorStyle: false,

            upload_files: [],
            deny_upload_files: [],
            upload_infoarray: [],

            simul_files: 0,

        }
    }
});