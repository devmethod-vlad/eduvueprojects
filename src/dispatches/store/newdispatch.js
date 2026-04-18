import { defineStore } from 'pinia'

export const useNewDispatchStore = defineStore('newdispatch', {
    state: () => {
        return {
            upload_files: [],

            deny_upload_files: [],

            upload_infoarray: [],

            simul_files: 0,

            activeMethod: 'telegram',

            // [telegram, arm, mail]
            methodList: ['telegram'],

            title: '',

            telegram_text: '',

            dispatchDate: '',

            dispatchTime: '',

            dispatch_files: [],

            // rightaway scheduled
            scheduleType: 'rightaway',

            titleError: false,

            titleInfoText: '',

            telMessageError: false,

            telMessageInfoText: '',

            dateError: false,

            dateInfoText: '',

            timeError: false,

            timeInfoText: '',

            methodError: false,

            methodInfoText: '',

            modalLoading: false,

            modalVisible: false,

            modalText: '',

            // confirmation  success  fail
            modalPurpose: '',

            //draft  test  dispatch
            modalTarget: ''
        }
    }
});