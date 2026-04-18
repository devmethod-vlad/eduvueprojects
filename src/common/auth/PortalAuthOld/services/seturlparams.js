
async function setUrlParams(appConfig, urlState){

    //Вне зависимости от типа авторизации забираем все парметры из url
    const queryString = await window.location.search;
    const urlParams = await new URLSearchParams(queryString);

    // console.log("portal urlParams: ", urlParams);

    //Параметр, определяющий с какого пространства портала был сделан переход
    //по ссылке
    if (urlParams.get(appConfig.getParams.spacekey)) {
        urlState.urlspacekey = await urlParams.get(appConfig.getParams.spacekey);
    }

    //Определяет с какого приложения был осуществлен переход (ранее "from")
    if (urlParams.get(appConfig.getParams.source)) urlState.source = urlParams.get(appConfig.getParams.source);

    //Список параметров при переходе из Telegram
    if (urlParams.get(appConfig.getParams.telegram.telegramtoken)) urlState.telegram.telegramtoken = urlParams.get(appConfig.getParams.telegram.telegramtoken);

    if (urlParams.get(appConfig.getParams.telegram.telegramaction)) urlState.telegram.telegramaction = urlParams.get(appConfig.getParams.telegram.telegramaction);

    if (urlParams.get(appConfig.getParams.telegram.telegramorderid)) urlState.telegram.telegramorderid = urlParams.get(appConfig.getParams.telegram.telegramorderid);

    if (urlParams.get(appConfig.getParams.telegram.telegrampageindex)) urlState.telegram.telegrampageindex = urlParams.get(appConfig.getParams.telegram.telegrampageindex);

    if (urlParams.get(appConfig.getParams.telegram.telegramorderstatus)) urlState.telegram.telegramorderstatus = urlParams.get(appConfig.getParams.telegram.telegramorderstatus);

    if (urlParams.get(appConfig.getParams.telegram.authtelusername)) urlState.telegram.authtelusername = urlParams.get(appConfig.getParams.telegram.authtelusername);

    if (urlParams.get(appConfig.getParams.telegram.authteluserid)) urlState.telegram.authteluserid = urlParams.get(appConfig.getParams.telegram.authteluserid);

    if (urlParams.get(appConfig.getParams.webapp.webappauthtelid)) urlState.webapp.webappauthtelid = urlParams.get(appConfig.getParams.webapp.webappauthtelid);

    if (urlParams.get(appConfig.getParams.webapp.webappauthtelname)) urlState.webapp.webappauthtelname = urlParams.get(appConfig.getParams.webapp.webappauthtelname);

    if (urlParams.get(appConfig.getParams.webapp.webappquestionid)) urlState.webapp.webappquestionid = urlParams.get(appConfig.getParams.webapp.webappquestionid);

    if (urlParams.get(appConfig.getParams.webapp.webappnewquestion)) urlState.webapp.webappnewquestion = urlParams.get(appConfig.getParams.webapp.webappnewquestion);
    //Очищаем url от параметров
    // await window.history.pushState(null, null, window.location.href.split('?')[0]);

}

export {setUrlParams}