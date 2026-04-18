import {dev_secrets} from "@/service/SupdSurvey/secrets/dev";


export const app_config_dev = {

    prod: false,

    apiUrl: 'http://127.0.0.1:5000',

    authUrl: '/eduportal/auth/authinfo/',

    authStaticUrl: '/eduportal/auth/static/',

    enableFakeEduAuth: false,

    eduFakeDisplayName : dev_secrets.eduFakeDisplayName,

    eduFakeUserName : dev_secrets.eduFakeUserName,

    fakeLocalAuth: true,

    fakeLocalLogin: dev_secrets.fakeLocalLogin,

    portalUrl: 'https://edu.example.com',

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

    botName: dev_secrets.botName,

    authByTelId: false,

    authTelId: dev_secrets.authTelId,

    targetSurveyId: 12

}