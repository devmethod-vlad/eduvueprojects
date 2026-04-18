
async function submitRespUser(apiurl, userid, moid){
    try{

        const submitResp = await fetch(apiurl+'/enrolplugin/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"submitrespuser", "moid":moid,
                "userid": userid
            })
        });

        return  await submitResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {submitRespUser}