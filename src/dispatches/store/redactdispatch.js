import { defineStore } from 'pinia'

export const useRedactDispatchStore = defineStore('redactdispatch', {
    state: () => {
        return {
            dispatch_id: 0,

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

            dispatchStatus: {
                id: 0,
                name: '',
                db_name: ''
            },

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