import {app_config} from "@/questions/config/setconfig";

async function getNewUserStats (download, timePeriod){
    let resp = await fetch(app_config.apiUrl+app_config.statUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "action": "getbotstat",
            "botstatskind":"newusers",
            "botimeperiod":timePeriod,
            "botdownloadflag": download ? 1 : 0
        })
    });
    if (download){
        let repAnswer = await resp.blob();
        let fileUrl = URL.createObjectURL(repAnswer);
        let link = document.createElement("a");
        link.href = fileUrl;
        link.download = "newusers.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    else {
        let answer =  await resp.json();
        // await console.log("getNewUserStats answer: ", answer);
        if (answer['status']==='ok'){
            return answer;
        }
        else {
            return {'status': 'error'}
        }
    }
}

export {getNewUserStats}