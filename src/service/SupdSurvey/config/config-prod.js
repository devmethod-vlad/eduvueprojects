import {prod_secrets} from "@/service/SupdSurvey/secrets/prod";
import tr from "air-datepicker/locale/tr";


export const app_config_prod = {

    prod: true,

    enableFakeEduAuth: false,

    apiUrl: 'https://edu.example.com/edu-rest-api',

    authStaticUrl: '/auth/static/',

    authUrl: '/auth/authinfo/',

    eduFakeDisplayName : prod_secrets.eduFakeDisplayName,

    eduFakeUserName : prod_secrets.eduFakeUserName,

    fakeLocalAuth: false,

    fakeLocalLogin: prod_secrets.fakeLocalLogin,

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

    tlgrmNotifyList: prod_secrets.tlgrmNotifyList,

    botToken: prod_secrets.botToken,

    botName: prod_secrets.botName,

    authByTelId: tr,

    authTelId:  prod_secrets.authTelId,

    targetSurveyId: 6

}