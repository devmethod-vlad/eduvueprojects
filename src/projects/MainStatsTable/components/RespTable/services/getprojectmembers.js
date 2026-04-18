
async function getProjectMembers(apiurl, projectid, moid, sorting, nopaginoffset){
    try{

        const commResp = await fetch(apiurl+'/enrolplugin/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"getprojectmembers", "projectid":projectid,
                "moid": moid, "nopaginoffset": nopaginoffset, "sorting": sorting
            })
        });

        return  await commResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {getProjectMembers}