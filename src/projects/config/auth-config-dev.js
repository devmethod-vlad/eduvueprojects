import {dev_secrets} from "@/projects/secrets/dev";

export const auth_config_dev = {

    prod: false,

    apiUrl: 'http://127.0.0.1:5000',

    authUrl: '/eduportal/auth/authinfo/',

    portalUrl: 'https://edu.example.com',

    enableFakeEduAuth: true,

    eduFakeDisplayName : dev_secrets.eduFakeDisplayName,

    eduFakeUserName : dev_secrets.eduFakeUserName,

    fakeLocalAuth: false,

    fakeLocalLogin: dev_secrets.fakeLocalLogin,

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
        },
        webapp: {
            webappauthtelid: 'webappauthtelid',
            webappauthtelname: 'webappauthtelname',
            webappquestionid: 'webappquestionid',
            webappnewquestion: 'webappnewquestion'
        }
    },

    localStorage: {
        userInfo: {
            key: 'userinfo',
            props: {
                token: 'userToken'
            }
        },

        eduQuestionSpaceKey: {
            key: 'eduQuestionSpaceKey',
            props: {
                spacekey: 'spaceKey'
            }
        }
    },

    minAuthPanelHeight: 400,

    tlgrmNotifyList: dev_secrets.tlgrmNotifyList,

    botToken: dev_secrets.botToken,

    BASE_ROLE: {
        'admin':{
            id:1,
            db_name: 'Администратор',
            show_name: 'Администратор'
        },

        'redactor': {
            id: 3,
            db_name: 'Сотрудник ЕМИАС',
            show_name: 'Редактор'
        },

        'personal': {
            id: 2,
            db_name: 'Сотрудник МУ',
            show_name: 'Сотрудник МУ'
        },

        'anonym': {
            id: 4,
            db_name: 'Аноним',
            show_name: 'Аноним'
        }
    },
}
