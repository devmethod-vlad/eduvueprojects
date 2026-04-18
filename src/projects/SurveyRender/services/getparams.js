import {app_config} from "@/projects/config/setconfig";

async function requestSurveyInfo(surveyid, userid){
    try{
        // await console.log("requestSurveyInfo");

        // console.log("requestSurveyInfo userid: ", userid);
        // console.log("requestSurveyInfo surveyid: ", surveyid);
        const surveyResp = await fetch(app_config.apiUrl+app_config.surveyApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"surveyinfo", "surveyid":Number(surveyid), "userid":Number(userid)})
        });

        let answer = await surveyResp.json();
        console.log("requestSurveyInfo answer:", answer);
        // console.log("requestSurveyInfo content:", JSON.parse(answer.content));
        return  answer;
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}


async function setWorkspaceParams(data, userid){
    // await console.log("setWorkspaceParams");
    console.log("setWorkspaceParams initial data: ", data);

    let workspaceParams = {

    }
    let surveyContent;

    //Тело самого опроса/теста в том виде, в котором представлено в редакторе
    if (data.content === ""){
        surveyContent = {}
    }
    else {
        surveyContent = await JSON.parse(data.content);
        console.log("setWorkspaceParams surveyContent: ", surveyContent);
    }

    if (data.executiontime){
        workspaceParams.surveyTime = await Number(data.executiontime);
        if(Number(data.hasstate)===1){
            surveyContent.maxTimeToFinish = await Number(data.timexecute);
            workspaceParams.surveyTimeToFinish = await Number(data.timexecute);
        }
        else {
            surveyContent.maxTimeToFinish = await Number(data.executiontime);
            workspaceParams.surveyTimeToFinish = await Number(data.executiontime);
        }
    }
    else if(surveyContent.maxTimeToFinish) {
        if(Number(data.hasstate)===1){
            workspaceParams.surveyTime = await Number(data.executiontime);
            workspaceParams.surveyTimeToFinish = await Number(data.executiontime);
        }
        else {
            workspaceParams.surveyTime = await workspaceParams.content.maxTimeToFinish;
            workspaceParams.surveyTimeToFinish = await workspaceParams.content.maxTimeToFinish;
        }

    }
    else {
        workspaceParams.surveyTime = 0;
        workspaceParams.surveyTimeToFinish = 0;
    }
    if(Number(data.updateinterval)===0){
        workspaceParams.updateInterval = 3000;
    }
    else {
        workspaceParams.updateInterval = await Number(data.updateinterval);
    }

    workspaceParams.maxAttemptsCount = await Number(data.maxentries);
    workspaceParams.userAttemptNumber = await Number(data.attempts);

    //Нужно ли сохранять прогресс выполнения между попытками
    workspaceParams.saveProgress = await Number(data.saveprogress);
    if (![0,1].includes(Number(data.saveprogress))){
        throw "Задано неправильное значение параметра сохранения прогресса пользователя!";
    }

    workspaceParams.totalCount = await Number(data.itemscount);

    //показывать результаты по завершению
    if (![0,1].includes(Number(data.showresult))){
        throw "Задано неправильное значение сохранения прогресса пользователя!";
    }

    //Перемешивать вопросы. Если есть группы - то внутри групп
    workspaceParams.questionsRandomFlag = await Number(data.shufflequestions);

    //Наличие в базе состояния опроса
    workspaceParams.surveyHasState = await Number(data.hasstate);

    //Если есть группы вопросов, то перемешивать их между собой
    workspaceParams.groupRandomFlag = await Number(data.shufflegroup);

    workspaceParams.showAttemptsInfo = await Number(data.showattemptsinfo);

    workspaceParams.showCustomresultsPanel = await Number(data.showcustomresultspanel);

    if(data.countbygroupsinfo===''){
        workspaceParams.surveyGroupsCount = {};
    }
    else {
        workspaceParams.surveyGroupsCount = await JSON.parse(data.countbygroupsinfo);
    }

    if(data.excludequestiontypes===''){
        workspaceParams.excludeQuestType = [];
    }
    else {
        workspaceParams.excludeQuestType = await JSON.parse(data.excludequestiontypes);
    }
    if(workspaceParams.showAttemptsInfo===1 && workspaceParams.maxAttemptsCount===0){
        throw "Установлено отображение кол-ва попыток, но не установлено их максимальное число (неограничено)";
    }

    if (data.surveyworkname===''){
        throw "Не установлено название опроса/тестирования, используемое для отображения на экране пользователя!";
    }
    else {
        workspaceParams.surveyName = await data.surveyworkname;
    }

    if (data.surveyhtmlid===''){
        throw "Не задан ID html элемента в котором будет отображаться опрос/тестирование!";
    }
    else {
        workspaceParams.surveyHtmlId = await data.surveyhtmlid;
    }

    if (data.questiongroupid===''){
        throw "Не задано обозначение для группы вопросов!";
    }
    else {
        workspaceParams.groupId = await data.questiongroupid;
    }

    if (data.complexquestionid===''){
        throw "Не задано обозначение для комплексных вопросов!";
    }
    else {
        workspaceParams.complexId = await data.complexquestionid;
    }

    workspaceParams.checkResult = await Number(data.checkresult);

    workspaceParams.shuffleAnswerVars = await Number(data.shuffleanswers);

    workspaceParams.showResult = await Number(data.showresult);

    workspaceParams.percentRigth = await Number(data.percentrigth);

    workspaceParams.use_raw_content = await Number(data.use_raw_content);

    if(Number(data.checkresult)===1 && Number(data.percentrigth)===0){
        throw "Задана проверка результатов, но не задан процент правильных ответов!";
    }

    if(Number(data.showresult)===1 && (Number(data.percentrigth)===0 || Number(data.checkresult)===0)){
        throw "Включено отображение результата, но не выставлены параметры прохождения!";
    }

    if(Number(data.checkresult)===1 && Number(data.itemscount)===0){
        throw "Задана проверка результатов, но не задано общее кол-во элементов в опросе/тесте!";
    }

    if (Object.keys(workspaceParams.surveyGroupsCount).length !== 0 ){
        let groupsCount = 0;
        for (let item of Object.values(workspaceParams.surveyGroupsCount)){
            groupsCount = groupsCount+Number(item);
        }
        if (groupsCount>workspaceParams.totalCount || workspaceParams.totalCount > groupsCount){
            throw "Заданное общее кол-во вопросов и сумма вопросов по группам не совпадают!";
        }
    }

    workspaceParams.surveyID = Number(data.id);

    workspaceParams.userID = Number(userid);

    workspaceParams.startime = data.startime;

    return {'workspaceParams':workspaceParams, 'surveyContent':surveyContent};
}
export {requestSurveyInfo, setWorkspaceParams}

