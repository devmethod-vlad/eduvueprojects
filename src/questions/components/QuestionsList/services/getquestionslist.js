
async function getQuestionsList(params){
    // await console.log("getQuestionsList");
    try{

        const listResp = await fetch(params.apiurl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "userid": params.userid,
                "roleid": params.roleid,
                "spaceid": params.spaceid,
                "statusid": params.statusid,
                "perpagecount": params.perpagecount,
                "activepage": params.activepage,
                "datesort": params.datesort,
                "searchinput": params.searchinput,
                "enablesearch": params.enablesearch,
                "usertoken": params.usertoken,
                "forsynchroflag": params.forsynchroflag,
                "isfeedback": params.isfeedback,
                "showonlypublic": params.showonlypublic
            })
        });

        return  await listResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {getQuestionsList}