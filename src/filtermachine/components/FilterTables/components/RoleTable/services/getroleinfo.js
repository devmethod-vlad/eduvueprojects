async function getRoleInfo(machine, role){
    role.updateActive = true;
    role.needUpdate = false;
    let role_list = [];

    if (role.$state.prefill === 1){
        role.$state.checkListReverse.forEach((id)=>{
            role_list.push(Number(id))
        });
    }
    else {
        role.$state.checkList.forEach((id)=>{
            role_list.push(Number(id))
        });
    }


    try{

        const roleFilterResp = await fetch(machine.$state.roleFilterUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                page_count: role.$state.filter_pagecount,
                page_number: role.$state.filter_page_number,
                search_phrase: role.$state.filter_search_phrase,
                sort: role.$state.sort,
                check_first: role.$state.check_first,
                prefill: role.$state.prefill,
                role_list: role_list
            })
        });
        // console.log("roleFilterResp: ", roleFilterResp);

        let respStatus = Number(roleFilterResp.status);

        let answerBody = await roleFilterResp.json();

        console.log("roleFilterAnswerBody: ", answerBody);

        if (respStatus === 200){
            role.total = answerBody.total
            role.info_list = answerBody.info;

        }
        else{
            role.requestError = true;
            role.requestErrorInfo = answerBody.detail;
            role.requestErrorUserInfo = 'Возникли проблемы при получении данных. Повторите позже.'
        }
        role.updateActive = false;

    }
    catch(error) {
        role.updateActive = false;
        role.requestError = true;
        role.requestErrorInfo = error;
        role.requestErrorUserInfo = 'Возникли проблемы при получении данных. Повторите позже.'
    }
}

export {getRoleInfo}