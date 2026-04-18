import {prod_secrets} from "@/service/AttachToBot/secrets/prod";

export const attachbot_config_prod = {
    prod: true,
    botName: '',
    eduInfoPageLink: 'https://edu.example.com/x/yZ-9Ag',
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

    minAuthPanelHeight: 0,

    tlgrmNotifyList: prod_secrets.tlgrmNotifyList,

    botToken: prod_secrets.botToken,
}