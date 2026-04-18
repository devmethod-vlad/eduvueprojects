import {prod_secrets} from "@/dispatches/secrets/prod";

export const app_config_prod = {

    prod: true,

    apiUrl: 'https://edu.emias.ru/edu-rest-api/dispatches/api',

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

    filterUrl: "https://edu.emias.ru/edu-rest-api/filtermachine/filter/",

    roleFilterUrl: "https://edu.emias.ru/edu-rest-api/filtermachine/role/",

    roleDownloadUrl: "https://edu.emias.ru/edu-rest-api/filtermachine/role/download/",

    specFilterUrl: "https://edu.emias.ru/edu-rest-api/filtermachine/spec/",

    specDownloadUrl: "https://edu.emias.ru/edu-rest-api/filtermachine/spec/download/",

    moFilterUrl: "https://edu.emias.ru/edu-rest-api/filtermachine/mo/",

    moDownloadUrl: "https://edu.emias.ru/edu-rest-api/filtermachine/mo/download/",

    moNameCategoryUrl: "https://edu.emias.ru/edu-rest-api/filtermachine/mo/nameorcategory/",

    muFilterUrl: "https://edu.emias.ru/edu-rest-api/filtermachine/mu/",

    muDownloadUrl: "https://edu.emias.ru/edu-rest-api/filtermachine/mu/download/",

    muNameCategoryUrl: "https://edu.emias.ru/edu-rest-api/filtermachine/mu/nameorcategory/",

    usersDownloadUrl: "https://edu.emias.ru/edu-rest-api/filtermachine/filter/download/"
}