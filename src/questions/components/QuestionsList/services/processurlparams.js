import {app_config} from "@/questions/config/setconfig";

async function processUrlParams (userid, listStore, appStore){
    await console.log("questionlist processUrlParams");
    if (appStore.$state.urlParams.source === 'telegram'){

        if (appStore.$state.urlParams.telegram.telegramorderid !==''){

            appStore.questionIdNeedOpen = Number(appStore.$state.urlParams.telegram.telegramorderid);

            try{
                const listResp = await fetch(app_config.apiUrl+app_config.questionsUrl, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        "userid": userid,
                        "orderid": appStore.$state.urlParams.telegram.telegramorderid,
                        "findquestioninlist": 1
                    })
                });

                let answer = await listResp.json();

                await console.log("processUrlParams findinlist answer: ", answer);

                if (answer.status === 'ok'){
                    listStore.statusId = answer.info.statusId;
                    listStore.spaceId = answer.info.spaceId;
                    listStore.activePage = answer.info.activePage;
                    listStore.countPerPage = answer.info.countPerPage;
                    listStore.sorting = answer.info.sorting;
                    listStore.searchInput = answer.info.searchInput;
                    listStore.enableSearch = answer.info.enableSearch;
                }
            }
            catch (e) {
                await console.log(e);
            }
        }
    }
}

export {processUrlParams}