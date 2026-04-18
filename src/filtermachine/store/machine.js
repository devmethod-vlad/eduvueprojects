import { defineStore } from 'pinia'

export const useMachineStore = defineStore('machine', {
    state: () => {
        return {

            windowWidth: 0,

            windowHeight: 0,

            filterUrl: '',

            roleFilterUrl: '',

            roleDownloadUrl: '',

            specFilterUrl: '',

            specDownloadUrl: '',

            moFilterUrl: '',

            moDownloadUrl: '',

            usersDownloadUrl: '',

            moNameCategoryUrl: '',

            muFilterUrl: '',

            muDownloadUrl: '',

            muNameCategoryUrl: '',

            checkboxWidth: 60,

            loginWidth: 120,

            fioWidth: 180,

            roleWidth: 240,

            specWidth: 240,

            moWidth: 240,

            muWidth: 240,

            requestError: false,

            requestErrorInfo: '',

            requestErrorUserInfo: '',

            // role spec mo mu
            activeFilterTab: 'role',

            downloadActive: false,

            loadingInfo: false,

            showMode: false,

            sendMethodsInclude: false
        }
    }
});