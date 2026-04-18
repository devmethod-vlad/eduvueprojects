
function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}
function getAnswerObject(answer, questionsInfo, workspaceParams){

    let answerObject = {};
    let resultObject = {};

    if (Number(workspaceParams.checkResult)===1){
        let successAnswerList = [];
        let commentAnswerList = [];
        if(Object.keys(answer).length === 0){

            if(Number(workspaceParams.showResult)===1){
                answerObject.percent = 0;
            }

        }
        else {
            for (let [answerKey, answerValue] of Object.entries(answer)){

                answerObject[answerKey]={answer:answerValue};
                // console.log("questionsInfo.corranswerbyname: ", questionsInfo.corranswerbyname);
                // console.log("answerKey: ", answerKey);

                if (answerKey in questionsInfo.corranswerbyname){
                    let correctAnswer = questionsInfo.corranswerbyname[answerKey].correctAnswer;
                    if (questionsInfo.corranswerbyname[answerKey].type === 'checkbox'){

                        answerValue.sort();
                        correctAnswer.sort();
                        if (arrayEquals(answerValue, correctAnswer)){

                            answerObject[answerKey]['answered'] = 1;
                            successAnswerList.push(answerKey);

                        }
                        else {

                            answerObject[answerKey]['answered'] = 0;
                        }
                    }
                    else if (['text', 'comment'].includes(questionsInfo.corranswerbyname[answerKey].type)){

                        if(answerValue.trim().toLowerCase() === correctAnswer.trim().toLowerCase()){
                            answerObject[answerKey]['answered'] = 1;
                            successAnswerList.push(answerKey);

                        }
                        else {

                            answerObject[answerKey]['answered'] = 0;
                        }
                    }
                    else if (['radiogroup', 'dropdown', 'boolean'].includes(questionsInfo.corranswerbyname[answerKey].type)){

                        if(answerValue === correctAnswer){
                            answerObject[answerKey]['answered'] = 1;
                            successAnswerList.push(answerKey);

                        }
                        else {

                            answerObject[answerKey]['answered'] = 0;
                        }
                    }
                    else if (['rating'].includes(questionsInfo.corranswerbyname[answerKey].type)){

                        if(Number(answerValue) === Number(correctAnswer[0])){
                            answerObject[answerKey]['answered'] = 1;
                            successAnswerList.push(answerKey);

                        }
                        else {

                            answerObject[answerKey]['answered'] = 0;
                        }
                    }
                    else if (['multipletext'].includes(questionsInfo.corranswerbyname[answerKey].type)){

                        let corrFlag = true;
                        for (let [answValKey, answValItem] of Object.entries(answerValue)){
                            if(Object.prototype.hasOwnProperty.call(correctAnswer, answValKey)){
                                if(correctAnswer[answValKey].trim().toLowerCase()!==answValItem.trim().toLowerCase()){
                                    corrFlag = false;
                                }
                            }
                            else {
                                corrFlag = false;
                            }
                        }
                        if(corrFlag){

                            answerObject[answerKey]['answered'] = 1;
                            successAnswerList.push(answerKey);
                        }
                        else {

                            answerObject[answerKey]['answered'] = 0;
                        }
                    }
                    else if (['comment'].includes(questionsInfo.corranswerbyname[answerKey].type)){

                        commentAnswerList.push(answerValue);
                    }
                }
            }
        }

        let userRigthAnswerLen = successAnswerList.length;

        let userRigthPercent = Math.ceil((userRigthAnswerLen*100)/(workspaceParams.totalCount-commentAnswerList.length));

        answerObject.percent = userRigthPercent;

        if (userRigthPercent >= Number(workspaceParams.percentRigth)){
            answerObject.success = 1;
        }
        else {
            answerObject.success = 0;
        }
        resultObject.success = answerObject.success;
        resultObject.percent = answerObject.percent;
    }
    else {
        answerObject = answer
    }

    console.log("answerObject: ", answerObject);
    console.log("resultObject: ", resultObject);

    return {'answerObject':answerObject, 'resultObject':resultObject}
}

export {getAnswerObject}