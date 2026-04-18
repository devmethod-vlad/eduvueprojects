
export const app_config_dev = {
    apiUrl: 'http://127.0.0.1:5000/eduportal/projects',
    projectListApiUrl: '/projectinfo/',
    projectEnrolApiUrl: '/projectenrol/',
    enrolPluginApiUrl: '/enrolplugin/',
    filterMachineApiUrl: '/filterprocess/',
    surveyApiUrl: '/surveyprocess/',
    portalUrl: 'https://edu.example.com',
    loadingSrc: '/static/imgs/loading.gif',
    portalSurveyUrl: 'http://127.0.0.1:5000/eduportal/projects/surveyprocess/survey/',
    portalSurveyRedactUrl: 'http://127.0.0.1:5000/eduportal/projects/surveyprocess/surveyredactor/',
    portalEnrolPluginUrl: 'http://127.0.0.1:5000/eduportal/projects/enrolplugin/enrolprojmembers/',
    portalFilterMachineUrl: 'http://127.0.0.1:5000/eduportal/projects//filterprocess/filtermachine/',
    actionSurveyName: 'Тестирование | Опрос | Анкета',
    actionEnrolName: 'Плагин набора сотрудников на проект',
    adminRoleName: 'Администратор',
    redactorRoleName: 'Сотрудник ЕМИАС',
    staffRoleName: 'Сотрудник МУ',
    enrolTypeLoginName: 'Доступ по списку логинов ЕМИАС',
    enrolTypeAllName: 'Доступно всем',
    newSurveyActionName: 'Новый опрос',
    projectListUrl: 'http://127.0.0.1:5000/eduportal/projects/projectlist/',
    moListurl:'http://127.0.0.1:5000/eduportal/projects/enrolplugin/molist/',
    mainStatUrl: 'http://127.0.0.1:5000/eduportal/projects/enrolplugin/statstable/',
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