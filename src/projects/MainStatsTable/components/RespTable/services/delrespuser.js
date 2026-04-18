
async function deleteRespUser(apiurl, userid, moid, projectid){
    try{

        const delResp = await fetch(apiurl+'/enrolplugin/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"deleterespuser", "userid": userid, "moid": moid,
                "projectid": projectid
            })
        });

        return  await delResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {deleteRespUser}