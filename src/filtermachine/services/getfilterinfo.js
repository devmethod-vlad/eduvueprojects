async function getFilterInfo(machine, filter, result){
    if(!machine.$state.loadingInfo){

        machine.loadingInfo = true;

        try{

            const filterResp = await fetch(machine.$state.filterUrl, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(filter.$state)
            });
            // console.log("filterResp: ", filterResp);

            let respStatus = Number(filterResp.status);

            let answerBody = await filterResp.json();

            console.log("answerBody: ", answerBody);

            if (respStatus === 200){

                if(filter.$state.methods.length === 0){
                    result.totalWithoutMethods = answerBody.total;
                }
                result.total = answerBody.total;
                result.users = answerBody.users;

            }
            else{
                machine.requestError = true;
                machine.requestErrorInfo = answerBody.detail;
                machine.requestErrorUserInfo = 'Возникли проблемы при получении данных. Повторите позже.'
            }

            machine.loadingInfo = false;

        }
        catch(error) {
            machine.loadingInfo = false;
            machine.requestError = true;
            machine.requestErrorInfo = error;
            machine.requestErrorUserInfo = 'Возникли проблемы при получении данных. Повторите позже.'
        }
    }
}

export {getFilterInfo}