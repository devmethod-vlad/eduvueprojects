async function checkSurveyItem(dItem, workspaceParams){
    if(Number(workspaceParams.shuffleAnswerVars)===1){
        if(['checkbox', 'radiogroup', 'dropdown', 'multipletext'].includes(dItem.type)){
            if(['checkbox', 'radiogroup', 'dropdown'].includes(dItem.type)){
                dItem.choices = await dItem.choices.sort(() => 0.5 - Math.random());
            }
            else if(dItem.type==='checkbox'){
                dItem.items = await dItem.items.sort(() => 0.5 - Math.random());
            }
        }
    }

    if(Number(workspaceParams.checkResult)===1){
        // await console.log("dItem.correctAnswer: ", dItem.correctAnswer);
        if (!Object.prototype.hasOwnProperty.call(dItem,'correctAnswer')){

            // console.log("dItem: ", dItem);
            // console.log("!dItem.hasOwnProperty('correctAnswer')");
            throw "В вопросе '"+dItem.name+"' не задан правильный ответ";
        }
        else {
            if(['checkbox', 'radiogroup', 'dropdown'].includes(dItem.type)){
                let choicesPre = await dItem.choices;
                let choices = [];
                let correctAnswer = await dItem.correctAnswer;
                for (let chItem of choicesPre){
                    if(typeof chItem === 'string'){
                        choices.push(chItem)
                    }
                    else{
                        choices.push(chItem.value)
                    }
                }
                if (dItem.type==='checkbox'){
                    for (let cItem of correctAnswer){
                        let checkIndex = await choices.indexOf(cItem);
                        if(checkIndex ===-1){
                            await dItem.correctAnswer.splice(checkIndex, 1)
                        }
                    }
                }
                if (['radiogroup', 'dropdown'].includes(dItem.type)){
                    let checkIndex = await choices.indexOf(correctAnswer);
                    if(checkIndex ===-1){
                        // console.log("!dItem.hasOwnProperty('correctAnswer')");
                        throw "В вопросе '"+dItem.name+"' фактический ответ на вопрос не соответствует ни одному из представленных вариантов ответа";
                    }
                }
            }

            if(dItem.type==='checkbox'){
                if(!Array.isArray(dItem.correctAnswer)){
                    // console.log("!Array.isArray(dItem.correctAnswer)");
                    throw "В вопросе '"+dItem.name+"' не корректно сформирован тип правильного ответа";
                }
                else {
                    if (dItem.correctAnswer.length===0){
                        // console.log("dItem.correctAnswer.length===0");
                        throw "В вопросе '"+dItem.name+"' после проверки нет правильных вариантов ответа";
                    }
                }

            }
            if(['radiogroup', 'dropdown', 'text'].includes(dItem.type)){
                if(typeof dItem.correctAnswer !== 'string'){
                    // console.log("typeof dItem.correctAnswer !== 'string'");
                    throw "В вопросе '"+dItem.name+"' не корректно сформирован тип правильного ответа";
                }
                else {
                    if(dItem.correctAnswer===""){
                        // console.log("dItem.correctAnswer===''");
                        throw "В вопросе '"+dItem.name+"' вместо ответа пустая строка";
                    }
                }
            }
            if(dItem.type==='rating'){
                if(typeof dItem.correctAnswer !== 'number'){
                    // console.log("typeof dItem.correctAnswer !== 'number'");
                    throw "В вопросе '"+dItem.name+"' не корректно сформирован тип правильного ответа";
                }
            }
            if(dItem.type==='boolean'){
                if(typeof dItem.correctAnswer !== 'boolean'){
                    // console.log("typeof dItem.correctAnswer !== 'boolean'");
                    throw "В вопросе '"+dItem.name+"' не корректно сформирован тип правильного ответа";
                }
            }
            if(dItem.type==='multipletext'){
                if(typeof dItem.correctAnswer === 'object' && dItem.correctAnswer !== null && !Array.isArray(dItem.correctAnswer)){
                    if(Object.keys(dItem.correctAnswer).length === 0){
                        // console.log("Object.keys(dItem.correctAnswer).length === 0");
                        throw "В вопросе '"+dItem.name+"' после проверки нет правильных вариантов ответа";
                    }
                }
                else {
                    throw "В вопросе '"+dItem.name+"' не корректно сформирован тип правильного ответа";
                }
            }
        }
    }
}

async function checkSurveyData(data, workspaceParams){
    // await console.log("checkSurveyData");
    // await console.log("checkSurveyData data before: ", data);
    // await console.log("checkSurveyData workspaceParams: ", workspaceParams);

    for (let dItem of data){
        if(dItem.type==='panel' && dItem.name.includes(workspaceParams.complexId)){
            for (let elemItem of dItem.elements){
                if (!workspaceParams.excludeQuestType.includes(elemItem.type)){
                    await checkSurveyItem(elemItem, workspaceParams);
                }
            }
        }
        else {
            await checkSurveyItem(dItem, workspaceParams);
        }
    }
    return data;
}

export {checkSurveyData}