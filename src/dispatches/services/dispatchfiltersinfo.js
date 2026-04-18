import {app_config} from "@/dispatches/config/setconfig";


async function getDispatchFiltersInfo(dispatch_id){
    
    try {

        let filtersResp = await fetch(app_config.apiUrl + app_config.dispatchFilterInfoUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                dispatch_id: dispatch_id
            })
        });

        let filtersStatus = Number(filtersResp.status);

        let filtersAnswer = await filtersResp.json();

        console.log("getDispatchFiltersInfo filtersAnswer: ", filtersAnswer);

        if (filtersStatus === 200){
            return {'status': 'ok', 'filters': filtersAnswer}
        }
    }
    catch (error) {
        console.log(error);
        return {'status': 'error'}
    }

}

export {getDispatchFiltersInfo}