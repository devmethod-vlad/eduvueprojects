import {prod_secrets} from "@/updateinfo/secrets/prod";


export const app_config_prod = {

    prod: true,

    enableFakeEduAuth: false,

    apiUrl: 'https://edu.example.com/edu-rest-api',

    authUrl: '/auth/authinfo/',

    authStaticUrl: '/auth/static/',

    getUpdateFormInfoUrl:'https://edu.example.com/edu-rest-api/getinfo/updateform/getinfo/',

    updateContactsUrl:'https://edu.example.com/edu-rest-api/getinfo/updateform/updateuserinfo/',

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

    jwt_secret: prod_secrets.jwt_secret,

    returnTextDisappearTime: 10000,

    qrCodeImageUrl: 'https://edu.example.com/edu-rest-api/getinfo/info/static/imgs/emias-logo-qr-50.png'
}