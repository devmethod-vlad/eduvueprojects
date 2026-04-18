
async function saveUserCommentInfo(apiurl, projectid, userid, moid, comment){
    try{

        const commResp = await fetch(apiurl+'/enrolplugin/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"saveusercomment", "projectid":projectid,
                "userid": userid, "moid": moid, "usercomment": comment
            })
        });

        return  await commResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {saveUserCommentInfo}