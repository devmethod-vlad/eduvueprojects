
async function getRespUserList(apiurl, projectid, moid){
    try{

        const respListResp = await fetch(apiurl+'/enrolplugin/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"getresplist", "moid":moid,
                "projectid": projectid
            })
        });

        return  await respListResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {getRespUserList}