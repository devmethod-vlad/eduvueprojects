async function getGithubInfo(taskid){
    try{

        const gitResp = await fetch('/request-status/'+taskid+'/', {
            method: "GET"
        });

        return  await gitResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {getGithubInfo}