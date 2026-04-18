
const app_object = {
    botName: '',

    questionShowMode: '',

    containerWidth: 0,

    containerHeight: 0,

    windowWidth: 0,

    windowHeight: 0,

    bannerElem: null,

    bannerContentElem: null,

    addQuestionElem: null,

    listServiceElem: null,

    questionListElem: null,

    isLoading: false,

    token_expire_time: 0,

    uploadsize: 2,

    maxuploadfiles: 5,

    totalfilescount: 10,

    anonymuserid: 0,

    urlParams:{
        urlspacekey:'',
        source: '',
        telegram:{
            telegramtoken:'',
            telegramaction: '',
            telegramorderid: '',
            telegrampageindex : '',
            telegramorderstatus : '',
            authtelusername : '',
            authteluserid : ''
        },
        webapp: {
            webappauthtelid: '',
            webappauthtelname: '',
            webappquestionid: '',
            webappnewquestion: ''
        }
    },

    questionIdNeedOpen: 0,

    apiUrl: '',
    portalUrl: ''
}

export {app_object}