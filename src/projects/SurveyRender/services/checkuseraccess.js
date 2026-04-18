
async function checkUserAccess(dbinfo){
    let showSurvey = true;
    let resultsText='';
    let attemptsText = ''

    if(Number(dbinfo.executiontime) !== 0 && Number(dbinfo.maxentries) !== 0){
        if(Number(dbinfo.userstate.id) !== 0){
            if((Number(dbinfo.userstate.timexecute) === 0 || Number(dbinfo.userstate.timexecute) === 1) && Number(dbinfo.userstate.attempts)>=Number(dbinfo.maxentries)){
                showSurvey = false;
            }
            else if((Number(dbinfo.userstate.timexecute) === 0 || Number(dbinfo.userstate.timexecute) === 1) && Number(dbinfo.userstate.attempts)<Number(dbinfo.maxentries)){
                showSurvey = false;
                resultsText = "Спасибо за участие! Время, отведенное на прохождение истекло!";
            }
            else if((Number(dbinfo.userstate.timexecute) !== 0 || Number(dbinfo.userstate.timexecute) !== 1) && Number(dbinfo.userstate.attempts)>=Number(dbinfo.maxentries)){
                showSurvey = false;
                // attemptsText = "Спасибо! Вы воспользовались всеми возможными попытками. Ваши ответы были учтены!";
                attemptsText = "Благодарим за участие! Вы уже прошли опрос";

            }
        }
        else{
            if(Number(dbinfo.userstate.attempts)>=Number(dbinfo.maxentries)){
                showSurvey = false;
                // attemptsText = "Спасибо! Вы воспользовались всеми возможными попытками. Ваши ответы были учтены!";
                attemptsText = "Благодарим за участие! Вы уже прошли опрос";
            }
        }
    }
    if(Number(dbinfo.executiontime) !== 0 && Number(dbinfo.maxentries) === 0) {
        if(Number(dbinfo.userstate.id) !== 0){
            if(Number(dbinfo.userstate.timexecute) === 0 || Number(dbinfo.userstate.timexecute) === 1){
                showSurvey = false;
                resultsText = "Спасибо за участие! Время, отведенное на прохождение истекло!";
            }
        }
    }
    if (Number(dbinfo.executiontime) === 0 && Number(dbinfo.maxentries) !== 0) {
        if(Number(dbinfo.userstate.attempts)>=Number(dbinfo.maxentries)){
            showSurvey = false;
            // attemptsText = "Спасибо! Вы воспользовались всеми возможными попытками. Ваши ответы были учтены!";
            attemptsText = "Благодарим за участие! Вы уже прошли опрос";
        }
    }
    return {
        'showSurvey':showSurvey,
        'resultsText': resultsText,
        'attemptsText':attemptsText
    }
}
export {checkUserAccess}