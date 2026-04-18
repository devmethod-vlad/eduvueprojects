export let userObject = {
    auth:false,
    authSource:'',
    tokenExpire: true,

    userid:0,

    userrole:{
        id:0,
        name:''
    },

    lastname: '',
    firstname: '',
    secondname: '',
    wikilogin:'',
    emiaslogin: '',
    adminlogin: '',
    token: '',

    appRegistration:{
        telegram: 0
    },

    appUrlParams:{
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
    }
}