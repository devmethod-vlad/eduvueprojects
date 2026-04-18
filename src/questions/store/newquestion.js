import { defineStore } from 'pinia';
import {app_config} from "@/questions/config/setconfig";

let nullSpace = {...app_config.NULLSPACE};

let nullRole = {... app_config.NULLROLE};

export const useNewQuestionStore = defineStore('newquestion', {
    state: () => {
        return {

            userid: 0,
            text: '',
            space_id: nullSpace.id,
            space_key: nullSpace.spacekey,
            space_title: nullSpace.title,
            unionrole_id: nullRole.id,
            unionrole_name: nullRole.name,
            unionrole_emiasid: nullRole.emiasid,

            union_roles: [],

            new_upload_files: [],
            deny_upload_files: [],
            upload_infoarray: [],

            simul_new_files: 0,

            attachments: [],

            answer_text: '',

            new_answer_upload_files: [],
            deny_answer_upload_files: [],
            upload_answer_infoarray: [],

            simul_answer_new_files: 0,

            answer_attachments: [],

            public_flag: false,

            target: '',

            errorInfo: ''
        }
    }
})