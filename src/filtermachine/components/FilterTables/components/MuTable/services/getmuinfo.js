

async function getMuInfo(machine, mu, mo){
    mu.needUpdate = false;
    mu.updateActive = true;

    let mu_list = [];

    if (mu.$state.prefill === 1){
        mu.$state.checkListReverse.forEach((id)=>{
            mu_list.push(Number(id))
        })
    }
    else {
        mu.$state.checkList.forEach((id)=>{
            mu_list.push(Number(id))
        })
    }

    let category_list = [];

    mu.$state.activeCategory.forEach((id)=>{
        category_list.push(Number(id));
    })

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

    let mo_category_list = [];

    if(mo.$state.activeCategory.length > 0){
        mo.$state.activeCategory.forEach((id)=>{
            mo_category_list.push(Number(id));
        })
    }

    try{

        const muFilterResp = await fetch(machine.$state.muFilterUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                page_count: mu.$state.filter_pagecount,
                page_number: mu.$state.filter_page_number,
                search_phrase: mu.$state.filter_search_phrase,
                name_sort: mu.$state.name_sort,
                shortname_sort: mu.$state.shortname_sort,
                check_first: mu.$state.check_first,
                prefill: mu.$state.prefill,
                mu_list: mu_list,
                mo_prefill: mo.$state.prefill,
                mo_list: mo_list,
                mo_category_list: mo_category_list,
                category_list: category_list
            })
        });
        // console.log("muFilterResp: ", muFilterResp);

        let respStatus = Number(muFilterResp.status);

        let answerBody = await muFilterResp.json();

        console.log("muFilterAnswerBody: ", answerBody);

        if (respStatus === 200){
            mu.total = answerBody.total
            mu.info_list = answerBody.info;

            let category =  []

            answerBody.category.forEach((item)=>{
                category.push({'id': item['category_id'], 'name': item['category_name']})
            })
            mu.category = category;

        }
        else{
            mu.requestError = true;
            mu.requestErrorInfo = answerBody.detail;
            mu.requestErrorUserInfo = 'Возникли проблемы при получении данных. Повторите позже.'
        }

        mu.updateActive = false;

    }
    catch(error) {
        mu.updateActive = false;
        mu.requestError = true;
        mu.requestErrorInfo = error;
        mu.requestErrorUserInfo = 'Возникли проблемы при получении данных. Повторите позже.'
    }
}

export {getMuInfo}