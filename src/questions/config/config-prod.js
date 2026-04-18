import {prod_secrets} from "@/questions/secrets/prod";

export const app_config_prod = {

    prod: true,

    apiUrl: 'https://edu.example.com/edu-rest-api',

    authUrl: '/auth/authinfo/',

    questionsUrl: '/questions/questionslist/',

    spaceAndRolesUrl: '/questions/spaceandroles/',

    serviceUrl: '/questions/service/',

    statUrl: '/questions/statistic/',

    attachmentsUrl: '/questions/static/attachments',

    saveOrUpdateUrl: '/questions/saveorupdate/',

    portalUrl: 'https://edu.emias.ru',

    staticUrls: {
        telbanner:'/questions/static/imgs/'
    },

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

    minLoadingPanelHeight: 400,

    minErrorPanelHeight: 400,

    minAuthPanelHeight: 400,

    QUESTION_STATUS : {
        'create': {
            id: 1,
            db_name: 'Создано',
            show_name: 'Создано'
        },

        'inwork': {
            id: 2,
            db_name: 'Взято в работу',
            show_name: 'В работе'
        },

        'received_answer': {
            id: 3,
            db_name: 'Получило ответ',
            show_name: 'С ответом'
        },

        'archive': {
            id: 4,
            db_name: 'Получило ответ',
            show_name: 'В архиве'
        },

        'trash': {
            id: 5,
            db_name: 'В корзине',
            show_name: 'В корзине'
        },

        'back_in_work': {
            id: 7,
            db_name: 'Возвращено в работу',
            show_name: 'Возвращено'
        },

        'feedback': {
            id: 100,
            db_name: 'Пожелания',
            show_name: 'Пожелания'
        },

        'public': {
            id: 101,
            db_name: 'Опубликовано',
            show_name: 'Опубликовано'
        }
    },

    BASE_ROLE: {
        'admin':{
            id:1,
            db_name: 'Администратор',
            show_name: 'Администратор'
        },

        'redactor': {
            id: 3,
            db_name: 'Сотрудник ЕМИАС',
            show_name: 'Редактор'
        },

        'personal': {
            id: 2,
            db_name: 'Сотрудник МУ',
            show_name: 'Сотрудник МУ'
        },

        'anonym': {
            id: 4,
            db_name: 'Аноним',
            show_name: 'Аноним'
        }
    },

    QUESTION_ACTIONS : {
        'to_trash': {
            show_name: 'Отправить в корзину'
        },

        'from_trash': {
            show_name: 'Вернуть из корзины'
        },

        'delete': {
            show_name: 'Удалить навсегда'
        },

        'in_work': {
            show_name: 'Взять в работу'
        },

        'from_work': {
            show_name: 'Отказаться от исполнения'
        },

        'from_work_admin': {
            show_name: 'Снять с исполнения'
        },

        'to_archive': {
            show_name: 'Отправить в архив'
        },

        'public': {
            show_name: 'Опубликовать на портале'
        },

        'from_public': {
            show_name: 'Снять с публикации'
        },

        'back_in_work': {
            show_name: 'Вернуть в работу'
        },
        'update': {
            show_name: 'Обновить вопрос'
        }
    },

    ACTIONS_NEED_SUBMIT: ['delete', 'to_archive', 'back_in_work'],

    NULLSPACE: {
        'id': 26,
        'title': 'Не распределено',
        'spacekey': 'nullspacekey'
    },

    NULLROLE: {
        'id': 159,
        'name': 'Другое',
        'emiasid': 0
    },

    SHOW_ALL_SPACES_ITEM:{
        'id': 0,
        'title': 'Показать все'
    },

    IMAGE_EXT_ARR: ['jpg', 'jpeg', 'png'],

    tlgrmNotifyList: prod_secrets.tlgrmNotifyList,

    botToken: prod_secrets.botToken,

    updateCompareStateTimer: 5000
}