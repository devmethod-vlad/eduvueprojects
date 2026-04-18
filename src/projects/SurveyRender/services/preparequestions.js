
async function pushRawPanel(item, ingroup, ungroup, groupid){

        if (groupid !==''){
            if (ingroup[groupid]){
                await ingroup[groupid].push(item);
            }
            else {
                ingroup[groupid] = [];
                await ingroup[groupid].push(item)
            }
        }
        else {
            await ungroup.push(item)
        }

    return {ingroup:ingroup, ungroup: ungroup}
}

async function pushRawQuestion(item, excludeList, ingroup, ungroup, groupid, complexflag){
    if (!excludeList.includes(item.type) && !complexflag){
        if (groupid !==''){
            if (ingroup[groupid]){
                await ingroup[groupid].push(item);
            }
            else {
                ingroup[groupid] = [];
                await ingroup[groupid].push(item)
            }
        }
        else {
            await ungroup.push(item)
        }
    }
    return {ingroup:ingroup, ungroup: ungroup}
}

async function pushGidrateQuestion(item, excludeList, groupGidrate, ungroupGidrate, correctAnswByName, groupid, index){
    if (!excludeList.includes(item.type)){
        if (!Object.prototype.hasOwnProperty.call(correctAnswByName, item.name)){
            correctAnswByName[item.name] = {'type': item.type, 'title': item.title, 'page': index, 'correctAnswer':item.correctAnswer}
        }

        if (groupid !==''){
            if (groupGidrate[groupid]){
                await groupGidrate[groupid].push({'type': item.type, 'name': item.name, 'title': item.title, 'page': index, 'correctAnswer':item.correctAnswer, 'group': groupid})
            }
            else {
                groupGidrate[groupid] = [];
                await groupGidrate[groupid].push({'type': item.type, 'name': item.name, 'title': item.title, 'page': index, 'correctAnswer':item.correctAnswer, 'group': groupid})
            }
        }
        else {
            await ungroupGidrate.push({'type': item.type, 'name': item.name, 'title': item.title, 'page': index, 'correctAnswer':item.correctAnswer})
        }
    }
    return {groupGidrate:groupGidrate, ungroupGidrate: ungroupGidrate, groupGidrateObj:correctAnswByName}
}


async function prepareQuestions(data, workspaceParams){
    // await console.log("prepareQuestions");
    // await console.log("prepareQuestions initial data: ", data);
    let questionsInGroup = {};
    let questionsUngroup = [];
    let questionsUngroupGidrate = [];
    let questionsGroupGidrate = {};
    let correctAnswByName = {};

    for (let [pageIndex, surveyPage] of Object.entries(data)){
        for (let pageItem of surveyPage.elements) {
            // await console.log("pageItem :", pageItem);
            let groupIdentifier = '';
            let complexLev1 = false;
            if (pageItem.type === 'panel'){

                if (await pageItem.name.split('-')[0]){
                    if (await pageItem.name.split('-')[0] === workspaceParams.groupId){
                        if (await pageItem.name.split('-')[1]){
                            groupIdentifier = await pageItem.name.split('-')[1];
                        }
                    }
                    else if(await pageItem.name.split('-')[0] === workspaceParams.complexId){
                        await questionsUngroup.push(pageItem);
                        complexLev1 = true;
                    }
                }
                for (let panItemLev1 of pageItem.elements){
                    let complexLev2 = false;
                    if(panItemLev1.type === 'panel'){
                        if (await panItemLev1.name.split('-')[0]){
                            if (await panItemLev1.name.split('-')[0] === workspaceParams.complexId && !complexLev1){
                                let lev1RawPanelPush = await pushRawPanel(panItemLev1, questionsInGroup, questionsUngroup, groupIdentifier)
                                questionsInGroup = await lev1RawPanelPush.ingroup;
                                questionsUngroup = await lev1RawPanelPush.ungroup;
                                complexLev2 = true;
                            }
                        }
                        for (let panItemLev2 of panItemLev1.elements){
                            let complexLev3 = false;
                            if (panItemLev2.type === 'panel'){
                                if (await panItemLev2.name.split('-')[0]){
                                    if (await panItemLev2.name.split('-')[0] === workspaceParams.complexId && !complexLev2){
                                        let lev2RawPanelPush = await pushRawPanel(panItemLev2, questionsInGroup, questionsUngroup, groupIdentifier)
                                        questionsInGroup = await lev2RawPanelPush.ingroup;
                                        questionsUngroup = await lev2RawPanelPush.ungroup;
                                        complexLev3 = true;
                                    }
                                }
                                for (let panItemLev3 of panItemLev2.elements){
                                    if(panItemLev3.type !== 'panel'){
                                        let lev3RawPush = await pushRawQuestion(panItemLev3, workspaceParams.excludeQuestType, questionsInGroup, questionsUngroup, groupIdentifier, complexLev3);
                                        questionsInGroup = await lev3RawPush.ingroup;
                                        questionsUngroup = await lev3RawPush.ungroup;
                                        let lev3Push = await pushGidrateQuestion(panItemLev3, workspaceParams.excludeQuestType, questionsGroupGidrate, questionsUngroupGidrate, correctAnswByName, groupIdentifier, pageIndex);
                                        questionsGroupGidrate = await lev3Push.groupGidrate;
                                        questionsUngroupGidrate = await lev3Push.ungroupGidrate;
                                        correctAnswByName = await lev3Push.groupGidrateObj;
                                    }
                                }
                            }
                            else {
                                let lev2RawPush = await pushRawQuestion(panItemLev2, workspaceParams.excludeQuestType, questionsInGroup, questionsUngroup, groupIdentifier, complexLev2);
                                questionsInGroup = await lev2RawPush.ingroup;
                                questionsUngroup = await lev2RawPush.ungroup;
                                let lev2Push = await pushGidrateQuestion(panItemLev2, workspaceParams.excludeQuestType, questionsGroupGidrate, questionsUngroupGidrate, correctAnswByName, groupIdentifier, pageIndex);
                                questionsGroupGidrate = await lev2Push.groupGidrate;
                                questionsUngroupGidrate = await lev2Push.ungroupGidrate;
                                correctAnswByName = await lev2Push.groupGidrateObj;
                            }
                        }
                    }
                    else {
                        let lev1RawPush = await pushRawQuestion(panItemLev1, workspaceParams.excludeQuestType, questionsInGroup, questionsUngroup, groupIdentifier, complexLev1);
                        questionsInGroup = await lev1RawPush.ingroup;
                        questionsUngroup = await lev1RawPush.ungroup;
                        let lev1Push = await pushGidrateQuestion(panItemLev1, workspaceParams.excludeQuestType, questionsGroupGidrate, questionsUngroupGidrate, correctAnswByName, groupIdentifier, pageIndex);
                        questionsGroupGidrate = await lev1Push.groupGidrate;
                        questionsUngroupGidrate = await lev1Push.ungroupGidrate;
                        correctAnswByName = await lev1Push.groupGidrateObj;
                    }
                }
            }
            else {
                if (!workspaceParams.excludeQuestType.includes(pageItem.type)){
                    await questionsUngroup.push(pageItem)
                    await questionsUngroupGidrate.push({'type': pageItem.type, 'name': pageItem.name, 'title': pageItem.title, 'page': pageIndex, 'correctAnswer':pageItem.correctAnswer});
                    if (!Object.prototype.hasOwnProperty.call(correctAnswByName, pageItem.name)){
                        correctAnswByName[pageItem.name] = {'type': pageItem.type, 'title': pageItem.title, 'page': pageIndex, 'correctAnswer':pageItem.correctAnswer}
                    }
                }
            }
        }
    }
    let nameToGroupObj = {}
    let allgroupquests = {}
    if (Object.keys(questionsGroupGidrate).length !== 0){
        for (let [grKey, grItem] of Object.entries(questionsGroupGidrate)){
            if (!nameToGroupObj[grKey]){
                nameToGroupObj[grKey] = []
            }
            for (let item of grItem){
                await nameToGroupObj[grKey].push(item.name)
                if(!Object.prototype.hasOwnProperty.call(allgroupquests, item.name)){
                    allgroupquests[item.name] = grKey;
                }
            }
        }
    }

    return {'ingroup': questionsInGroup, 'ungroup':questionsUngroup, 'group_gidrate': questionsGroupGidrate, 'ungroup_gidrate': questionsUngroupGidrate, 'namedgroup':nameToGroupObj, 'allgroupquestions': allgroupquests, 'corranswerbyname':correctAnswByName}
}

export {prepareQuestions}