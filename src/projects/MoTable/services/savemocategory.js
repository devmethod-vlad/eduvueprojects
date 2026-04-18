import {app_config} from "@/projects/config/setconfig";

async function saveMoCategory(moid, mocategory){
    try{
        // await console.log("saveMoCategory moid: ", moid);
        // await console.log("saveMoCategory mocategory: ", mocategory);

        const moPartResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"changemocategory", "moid":moid,
                "mocategory": mocategory
            })
        });

        return  await moPartResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {saveMoCategory}