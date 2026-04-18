
export const portalConfigObject = {

    prod: false,

    apiUrl: '',

    authUrl: '',

    authStaticUrl:'/eduportal/auth/static/',

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

    tlgrmNotifyList: [],

    botToken: ''
}