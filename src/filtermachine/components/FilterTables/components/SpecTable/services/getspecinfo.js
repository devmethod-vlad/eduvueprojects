async function getSpecInfo(machine, spec){
    spec.updateActive = true;
    spec.needUpdate = false;

    let spec_list = [];

    if (spec.$state.prefill === 1){
        spec.$state.checkListReverse.forEach((id)=>{
            spec_list.push(Number(id))
        });
    }
    else {
        spec.$state.checkList.forEach((id)=>{
            spec_list.push(Number(id))
        });
    }

    try{

        const specFilterResp = await fetch(machine.$state.specFilterUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                page_count: spec.$state.filter_pagecount,
                page_number: spec.$state.filter_page_number,
                search_phrase: spec.$state.filter_search_phrase,
                sort: spec.$state.sort,
                check_first: spec.$state.check_first,
                prefill: spec.$state.prefill,
                spec_list: spec_list
            })
        });
        // console.log("specFilterResp: ", specFilterResp);

        let respStatus = Number(specFilterResp.status);

        let answerBody = await specFilterResp.json();

        console.log("specFilterAnswerBody: ", answerBody);

        if (respStatus === 200){
            spec.total = answerBody.total
            spec.info_list = answerBody.info;

        }
        else{
            spec.requestError = true;
            spec.requestErrorInfo = answerBody.detail;
            spec.requestErrorUserInfo = 'Возникли проблемы при получении данных. Повторите позже.'
        }
        spec.updateActive = false;

    }
    catch(error) {
        spec.updateActive = false;
        spec.requestError = true;
        spec.requestErrorInfo = error;
        spec.requestErrorUserInfo = 'Возникли проблемы при получении данных. Повторите позже.'
    }
}

export {getSpecInfo}