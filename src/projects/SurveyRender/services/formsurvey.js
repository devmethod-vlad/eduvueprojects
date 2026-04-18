
async function formSurvey(data, workspaceparams){
    // await console.log("formSurvey");
    // await console.log("formSurvey initial data: ", data);

    let pageElements = [];
    if (Object.keys(data.ingroup).length === 0){
        if(data.ungroup.length >0){
            pageElements = await data.ungroup;
            if (Number(workspaceparams.questionsRandomFlag)===1){
                pageElements = pageElements.sort(() => 0.5 - Math.random());
            }
        }
    }
    else {

        let groupNameArray = [];
        for (let key of Object.keys(data.ingroup)){
            groupNameArray.push(key);
        }

        // await console.log("groupNameArray before sorting: ", groupNameArray);

        if (groupNameArray.length>1 && Number(workspaceparams.groupRandomFlag)===1){
            groupNameArray = groupNameArray.sort(() => 0.5 - Math.random());
        }
        // await console.log("formSurvey groupNameArray after sorting: ", groupNameArray);

        for (let nameItem of Object.values(groupNameArray)){

            let groupArray = await data.ingroup[nameItem];
            // await console.log("groupNameArray before random: ", groupArray);
            if(Number(workspaceparams.questionsRandomFlag)===1){
                groupArray = groupArray.sort(() => 0.5 - Math.random());
            }
            // await console.log("groupNameArray after random: ", groupArray);
            let sliceCount = 0;
            if (workspaceparams.surveyGroupsCount[nameItem]){
                sliceCount = await workspaceparams.surveyGroupsCount[nameItem];
            }

            if (Number(sliceCount)!==0 && Number(sliceCount)<groupArray.length){
                groupArray = await groupArray.slice(0,sliceCount);
            }
            for (let elItem of groupArray){
                await pageElements.push(elItem)
            }
        }
        if (Number(workspaceparams.questionsRandomFlag)===1) {
            pageElements = pageElements.sort(() => 0.5 - Math.random());
        }

    }
    if (pageElements.length<Number(workspaceparams.totalCount)){
        throw "Количество вопросов в параметрах больше фактического кол-ва созданных вопросов!";
    }

    if (Number(workspaceparams.totalCount)<pageElements.length && (Number(workspaceparams.totalCount) !==0)){
        pageElements = await pageElements.slice(0, Number(workspaceparams.totalCount))
    }
    return pageElements

}
export {formSurvey}