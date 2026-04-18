import {test_secrets} from "@/projects/secrets/test";

export const auth_config_test = {
    prod: true,

    apiUrl: 'https://edu.example.com/edu-rest-api',

    authUrl: '/auth-test/authinfo/',

    portalUrl: 'https://edu.example.com',

    enableFakeEduAuth:  false,

    eduFakeDisplayName : test_secrets.eduFakeDisplayName,

    eduFakeUserName : test_secrets.eduFakeUserName,

    fakeLocalAuth: false,

    fakeLocalLogin: test_secrets.fakeLocalLogin,

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

    tlgrmNotifyList: test_secrets.tlgrmNotifyList,

    botToken: test_secrets.botToken,

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