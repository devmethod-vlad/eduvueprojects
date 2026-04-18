import {app_config} from "@/massincidents/config/setconfig";

async function getEmiasInfo(appStore){
    try {
        let postData = await fetch(app_config.apiUrl+'/getemiasdata/', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"emiaslogin":appStore.$state.localHostInfo.login})
        });
        return await postData.json()
    }
    catch (e) {
        console.log(e);
        return {'status':'error'}
    }
}
export {getEmiasInfo}