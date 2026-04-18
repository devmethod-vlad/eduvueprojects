
async function getMoInfo(machine, mo){
    mo.needUpdate = false;
    mo.updateActive = true;

    let mo_list = [];

    if (mo.$state.prefill === 1){
        mo.$state.checkListReverse.forEach((id)=>{
            mo_list.push(Number(id))
        });
    }
    else{
        mo.$state.checkList.forEach((id)=>{
            mo_list.push(Number(id))
        });
    }


    let category_list = [];

    mo.$state.activeCategory.forEach((id)=>{
        category_list.push(Number(id));
    })

    try{

        const moFilterResp = await fetch(machine.$state.moFilterUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                page_count: mo.$state.filter_pagecount,
                page_number: mo.$state.filter_page_number,
                search_phrase: mo.$state.filter_search_phrase,
                name_sort: mo.$state.name_sort,
                shortname_sort: mo.$state.shortname_sort,
                check_first: mo.$state.check_first,
                prefill: mo.$state.prefill,
                mo_list: mo_list,
                category_list: category_list
            })
        });
        console.log("moFilterResp: ", moFilterResp);

        let respStatus = Number(moFilterResp.status);

        let answerBody = await moFilterResp.json();

        console.log("moFilterAnswerBody: ", answerBody);

        if (respStatus === 200){
            mo.total = answerBody.total
            mo.info_list = answerBody.info;

            let category = [];

            answerBody.category.forEach((item)=>{
                category.push({'id': item['category_id'], 'name': item['category_name']})
            })
            mo.category = category;

        }
        else{
            mo.requestError = true;
            mo.requestErrorInfo = answerBody.detail;
            mo.requestErrorUserInfo = 'Возникли проблемы при получении данных. Повторите позже.'
        }
        mo.updateActive = false;

    }
    catch(error) {
        mo.updateActive = false;
        mo.requestError = true;
        mo.requestErrorInfo = error;
        mo.requestErrorUserInfo = 'Возникли проблемы при получении данных. Повторите позже.'
    }
}

export {getMoInfo}