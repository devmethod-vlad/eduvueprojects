
async function changeMailStatus(apiurl, action, mail){
    try{

        const statResp = await fetch(apiurl+'/mailstatus/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":action, "mail":mail,
            })
        });

        return  await statResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {changeMailStatus}