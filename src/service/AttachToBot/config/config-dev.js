import {dev_secrets} from "@/service/AttachToBot/secrets/dev";

export const attachbot_config_dev = {
    prod: false,
    botName: '',
    eduInfoPageLink: 'https://edu.example.com/x/yZ-9Ag',
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

    minAuthPanelHeight: 0,

    tlgrmNotifyList: dev_secrets.tlgrmNotifyList,

    botToken: dev_secrets.botToken,
}