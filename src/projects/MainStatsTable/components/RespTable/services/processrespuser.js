
async function processRespUser(apiurl, target, flag, userid, moid, projectid){
    try{

        const respListResp = await fetch(apiurl+'/enrolplugin/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"processrespuser", "resptarget":target,
                "processrespflag": flag, "userid": userid, "moid": moid, "projectid": projectid
            })
        });

        return  await respListResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {processRespUser}