import {app_config} from "@/massincidents/config/setconfig";

async function getPollData(appStore, freezeArrStore){
        if(appStore.$state.activesort ===''
        || appStore.$state.activesort ==='opentime'
        || appStore.$state.activesort ==='cntsd'
        ){
            appStore.cntCountSort=null;
        }

        if (Number(appStore.$state.openTimeSort)===0 && Number(appStore.$state.cntCountSort)===0){
            appStore.openTimeSort=0;
            appStore.cntCountSort=null;
        }
        try {
            let postData = await fetch(app_config.apiUrl + app_config.getPollDataUrl, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(
                    {
                        "userprint": appStore.$state.userfingerprintid,
                        "opentimesort": appStore.$state.openTimeSort,
                        "cntsdsort": appStore.$state.cntCountSort,
                        "activekpilist": appStore.$state.activekpilist,
                        'searchstring': appStore.$state.searchInput,
                        'userip': appStore.$state.userip
                    }
                    )
            });

            let resp = await postData.json();

            console.log("getData resp: ", resp);

            if (resp['status']==='ok'){
                appStore.dataArr = await JSON.parse(JSON.stringify(resp['info']['result_list']));
                freezeArrStore.dataArr = await JSON.parse(JSON.stringify(resp['info']['result_list']));
                appStore.kpilist = await resp['info']['kpi_list'];
                if (appStore.$state.kpisearchstring.trim().toLowerCase()===''){
                    appStore.searchkpilist = await resp['info']['kpi_list'];
                }
                else {
                    let copyKpiList = [...appStore.$state.kpilist];
                    copyKpiList = copyKpiList.filter((item)=>{
                        return (item.trim().toLowerCase()).includes(appStore.$state.kpisearchstring.trim().toLowerCase())
                    });
                    appStore.kpilist = copyKpiList;
                }
                return {'status': 'ok'}
            }
            else {
                return {'status': 'error'}
            }
        }
        catch (e) {
            await console.log(e);
            return {'status': 'error'}
        }
}
export {getPollData}