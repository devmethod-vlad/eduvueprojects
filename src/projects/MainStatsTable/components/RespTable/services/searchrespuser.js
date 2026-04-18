
async function searchRespUser(params){
    try{

        const searchResp = await fetch(params.apiurl+'/enrolplugin/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"searchrespuser",
                "moid": params.moid, "searchscope": params.searchscope,
                "searchrespinputs": params.searchrespinputs, "sorting": params.sorting
            })
        });

        return  await searchResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {searchRespUser}