import {app_config} from "@/projects/config/setconfig";

async function getUserListInfo(params){
    try{

        const userResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"getuserlistenrol", "projectid":params.projectid,
                "moid": params.moid, "sorting": params.sorting, "pagecount": params.pagecount,
                "searchinput": params.searchinput, 'nopaginoffset': params.nopaginoffset,
                "activepage": params.activepage, "filters": params.filters, "userid": params.userid
            })
        });

        return  await userResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {getUserListInfo}