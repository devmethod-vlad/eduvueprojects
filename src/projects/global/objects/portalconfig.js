import {app_config} from "@/projects/config/setconfig";

export const portalConfigObject = {

    prod: app_config.prod,

    apiUrl: '',

    authUrl: '',

    portalUrl: '',

    enableFakeEduAuth: false,

    eduFakeDisplayName : '',

    eduFakeUserName : '',

    fakeLocalAuth: false,

    fakeLocalLogin: '',

    getParams: {
        spacekey: 'urlspacekey',
        source: 'source',
        telegram: {
            telegramtoken: 'telegramtoken',
            telegramaction: 'telegramaction',
            telegramorderid: 'telegramorderid',
            telegrampageindex: 'telegrampageindex',
            telegramorderstatus: 'telegramorderstatus',
            authtelusername: 'authtelusername',
            authteluserid: 'authteluserid'
        }
    },

    localStorage: {
        userInfo: {
            key: 'userinfo',
            props: {
                token: 'userToken'
            }
        }
    },

    minAuthPanelHeight: 400,

    tlgrmNotifyList: [],

    botToken: ''
}