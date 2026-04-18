import {app_config} from "@/projects/config/setconfig";

async function getStatsListInfo(params){
    try{

        const moResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"getstatslist", "projectid":params.projectid,
                "sorting": params.sorting, "pagecount": params.pagecount,
                "searchinput": params.searchinput, 'nopaginoffset': params.nopaginoffset,
                "activepage": params.activepage, "filters_list": params.filters_list,
                "visibility_filters": params.visibility_filters, "scrollresults": params.scrollresults
            })
        });

        return  await moResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {getStatsListInfo}