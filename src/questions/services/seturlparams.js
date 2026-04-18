
function setUrlParams(urlState, appStore){

    if(urlState.urlspacekey){
        appStore.urlParams.urlspacekey = urlState.urlspacekey;
    }
    if(urlState.source){
        appStore.urlParams.source = urlState.source;
    }

    if(urlState.telegram.telegramtoken){
        appStore.urlParams.telegram.telegramtoken = urlState.telegram.telegramtoken;
    }

    if(urlState.telegram.telegramaction){
        appStore.urlParams.telegram.telegramaction = urlState.telegram.telegramaction;
    }

    if(urlState.telegram.telegramorderid){
        appStore.urlParams.telegram.telegramorderid = urlState.telegram.telegramorderid;
    }

    if(urlState.telegram.telegrampageindex){
        appStore.urlParams.telegram.telegrampageindex = urlState.telegram.telegrampageindex;
    }

    if(urlState.telegram.telegramorderstatus){
        appStore.urlParams.telegram.telegramorderstatus = urlState.telegram.telegramorderstatus;
    }

    if(urlState.telegram.authtelusername){
        appStore.urlParams.telegram.authtelusername = urlState.telegram.authtelusername;
    }

    if(urlState.telegram.authteluserid){
        appStore.urlParams.telegram.authteluserid = urlState.telegram.authteluserid;
    }

    if(urlState.webapp.webappauthtelid){
        appStore.urlParams.webapp.webappauthtelid = urlState.webapp.webappauthtelid;
    }

    if(urlState.webapp.webappauthtelname){
        appStore.urlParams.webapp.webappauthtelname = urlState.webapp.webappauthtelname;
    }

    if(urlState.webapp.webappquestionid){
        appStore.urlParams.webapp.webappquestionid = urlState.webapp.webappquestionid;
    }

    if(urlState.webapp.webappnewquestion){
        appStore.urlParams.webapp.webappnewquestion = urlState.webapp.webappnewquestion;
    }

}

export {setUrlParams}