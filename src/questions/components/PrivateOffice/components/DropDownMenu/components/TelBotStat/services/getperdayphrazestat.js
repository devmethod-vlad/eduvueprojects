import {app_config} from "@/questions/config/setconfig";

async function getPerDayPhrazeStat(download, timePeriod){
    let perDayResp = await fetch(app_config.apiUrl+app_config.statUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "action": "getbotstat",
            "botstatskind":"phrazesperday",
            "botimeperiod":timePeriod,
            "botdownloadflag": download ? 1 : 0
        })
    })
    if (download){
        let repAnswer = await perDayResp.blob();
        let fileUrl = URL.createObjectURL(repAnswer);
        let link = document.createElement("a");
        link.href = fileUrl;
        link.download = "phrazesperday.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    else {
        let perDayAnswer =  await perDayResp.json();

        // await console.log("PERDAY STATS ANSWER: ", perDayAnswer);

        if (perDayAnswer['status']==='ok'){
            return perDayAnswer;
        }
        else {
            return {'status': 'ok'}
        }
    }
}

export {getPerDayPhrazeStat}