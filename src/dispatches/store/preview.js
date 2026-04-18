import { defineStore } from 'pinia'

export const usePreviewStore = defineStore('preview', {
    state: () => {
        return {
            dispatch_id: 0,

            // [telegram, arm, mail]
            methodList: ['telegram'],

            title: '',

            telegram_text: '',

            created_at : '',

            modified_at: '',

            start_time: '',

            end_time: '',

            active_dispatch_start_time: '',

            dispatch_result_start_time: '',

            dispatch_result_end_time: '',

            dispatchStatus: {
                id: 0,
                name: '',
                db_name: ''
            },

            dispatch_files: [],

            loading: true,

            modalLoading: false,

            modalVisible: false,

            modalText: '',

            // confirmation  success  fail
            modalPurpose: '',

            //draft  test  dispatch
            modalTarget: '',

            closePreviewAfterModal: false
        }
    }
});