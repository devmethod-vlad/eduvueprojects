import {app_config} from "@/questions/config/setconfig";

async function deleteAttach(target, attachid, orderid, userid){
    try{
        // await console.log("deleteAttach target", target);
        // await console.log("deleteAttach attachid", attachid);
        // await console.log("deleteAttach orderid", orderid);
        // await console.log("deleteAttach userid", userid);

        const delResp = await fetch(app_config.apiUrl+app_config.serviceUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "action": "deleteattachment",
                "attach_target": target,
                "attachid": attachid,
                "orderid": orderid,
                "userid": userid
            })
        });

        return  await delResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {deleteAttach}