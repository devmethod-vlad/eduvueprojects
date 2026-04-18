import {prod_secrets} from "@/projects/secrets/prod";

export const auth_config_prod = {
    prod: true,

    apiUrl: 'https://edu.example.com/edu-rest-api',

    authUrl: '/auth/authinfo/',

    portalUrl: 'https://edu.example.com',

    enableFakeEduAuth: false,

    eduFakeDisplayName : prod_secrets.eduFakeDisplayName,

    eduFakeUserName : prod_secrets.eduFakeUserName,

    fakeLocalAuth: false,

    fakeLocalLogin: prod_secrets.fakeLocalLogin,

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

    tlgrmNotifyList: prod_secrets.tlgrmNotifyList,

    botToken: prod_secrets.botToken,

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