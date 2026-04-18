
export const app_config_test = {
    apiUrl: 'https://edu.example.com/edu-rest-api/projects-test',
    projectListApiUrl: '/projectinfo/',
    projectEnrolApiUrl: '/projectenrol/',
    enrolPluginApiUrl: '/enrolplugin/',
    filterMachineApiUrl: '/filterprocess/',
    surveyApiUrl: '/surveyprocess/',
    portalUrl: 'https://edu.example.com',
    loadingSrc: '/static/imgs/loading.gif',
    portalSurveyUrl: 'https://edu.example.com/zyuzin/testirovanie-opros-anketirovanie-178029151.html',
    portalSurveyRedactUrl: 'https://edu.example.com/edu-rest-api/projects-test/surveyprocess/surveyredactor',
    portalEnrolPluginUrl: 'https://edu.example.com/zyuzin/nabor-pol-zovatelej-na-proekt-178029156.html',
    portalFilterMachineUrl: 'https://edu.example.com/zyuzin/otfil-trovat-pol-zovatelej-na-proekt-178029158.html',
    actionSurveyName: 'Тестирование | Опрос | Анкета',
    actionEnrolName: 'Плагин набора сотрудников на проект',
    adminRoleName: 'Администратор',
    redactorRoleName: 'Сотрудник ЕМИАС',
    staffRoleName: 'Сотрудник МУ',
    enrolTypeLoginName: 'Доступ по списку логинов ЕМИАС',
    enrolTypeAllName: 'Доступно всем',
    newSurveyActionName: 'Новый опрос',
    projectListUrl: 'https://edu.example.com/zyuzin/spisok-proektov-178029149.html',
    moListurl:'https://edu.example.com/zyuzin/spisok-meditsinskih-organizatsij-178029160.html',
    mainStatUrl: 'https://edu.example.com/zyuzin/statistika-po-proektu-178029154.html',
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
    },
}