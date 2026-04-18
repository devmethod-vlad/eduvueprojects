import {dev_secrets} from "@/dispatches/secrets/dev";

export const app_config_dev = {

    prod: false,

    apiUrl: 'http://127.0.0.1:5080/api',

    saveUrl: '/save/',

    infoUrl: '/info/',

    attachmentUrl: '/attachments/',

    deleteAttachmentUrl: '/delete/attachment/',

    dispatchFilterInfoUrl: '/info/filters/',

    sendTelTestDispatch: '/send/teltest/',

    sendTelDispatchUrl: '/send/teldispatch/',

    dispatchDeleteUrl: '/delete/dispatch/',

    STATUS: {
        draft: {
            id: 3,
            name: 'Черновик'
        },

        pending: {
            id: 4,
            name: 'В ожидании'
        },

        sending: {
            id: 5,
            name: 'В процессе'
        },

        dispatched: {
            id: 6,
            name: 'Отправлена'
        },
    },

    METHOD: {
        telegram: {
            id: 1,
            name: 'Телеграм'
        },

        mail: {
            id: 2,
            name: 'Почта'
        },

        arm: {
            id: 3,
            name: 'АРМ'
        },
    },

    // Mb
    FILE_UPLOAD_SIZE: 2,

    ALLOW_FILE_EXT : ['png', 'jpeg', 'jpg',
        'doc', 'docx', 'odf',
        'rtf', 'txt',
        'xlsx', 'xlsm', 'xlsb', 'xltx', 'xltm', 'xls',
        'json', 'pdf'],

    IMAGE_EXT_ARR: ['jpg', 'jpeg', 'png'],

    SAME_TITLE_ERROR_TEXT: 'Рассылки не должны иметь повторяющихся заголовков',

    compareStateInterval: 3000,

    filterUrl: "http://127.0.0.1:5081/filter/",

    roleFilterUrl: "http://127.0.0.1:5081/role/",

    roleDownloadUrl: "http://127.0.0.1:5081/role/download/",

    specFilterUrl: "http://127.0.0.1:5081/spec/",

    specDownloadUrl: "http://127.0.0.1:5081/spec/download/",

    moFilterUrl: "http://127.0.0.1:5081/mo/",

    moDownloadUrl: "http://127.0.0.1:5081/mo/download/",

    moNameCategoryUrl: "http://127.0.0.1:5081/mo/nameorcategory/",

    muFilterUrl: "http://127.0.0.1:5081/mu/",

    muDownloadUrl: "http://127.0.0.1:5081/mu/download/",

    muNameCategoryUrl: "http://127.0.0.1:5081/mu/nameorcategory/",

    usersDownloadUrl: "http://127.0.0.1:5081/filter/download/"

}