
export const app_config_prod = {
    apiUrl: 'https://edu.example.com/edu-rest-api/projects',
    projectListApiUrl: '/projectinfo/',
    projectEnrolApiUrl: '/projectenrol/',
    enrolPluginApiUrl: '/enrolplugin/',
    filterMachineApiUrl: '/filterprocess/',
    surveyApiUrl: '/surveyprocess/',
    portalUrl: 'https://edu.example.com',
    loadingSrc: '/static/imgs/loading.gif',
    portalSurveyUrl: 'https://edu.example.com/course/projti-testirovanie-opros-anketirovanie-102666126.html',
    portalSurveyRedactUrl: 'https://edu.example.com/edu-rest-api/projects/surveyprocess/surveyredactor',
    portalEnrolPluginUrl: 'https://edu.example.com/course/nabor-pol-zovatelej-na-proekt-114296004.html',
    portalFilterMachineUrl: 'https://edu.example.com/course/otfil-trovat-pol-zovatelej-dlya-proekta-114296006.html',
    actionSurveyName: 'Тестирование | Опрос | Анкета',
    actionEnrolName: 'Плагин набора сотрудников на проект',
    adminRoleName: 'Администратор',
    redactorRoleName: 'Сотрудник ЕМИАС',
    staffRoleName: 'Сотрудник МУ',
    enrolTypeLoginName: 'Доступ по списку логинов ЕМИАС',
    enrolTypeAllName: 'Доступно всем',
    newSurveyActionName: 'Новый опрос',
    projectListUrl: 'https://edu.example.com/course/spisok-proektov-102665941.html',
    moListurl:'https://edu.example.com/course/spisok-meditsinskih-organizatsij-114296002.html',
    mainStatUrl: 'https://edu.example.com/course/statistika-po-proektu-112624029.html',
    noPaginOffset: 20,

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
    }

}