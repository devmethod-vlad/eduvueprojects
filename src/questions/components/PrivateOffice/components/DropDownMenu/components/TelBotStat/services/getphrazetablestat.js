import {app_config} from "@/questions/config/setconfig";

async function getPhrazeTableStat(download, timePeriod){
    let tableResp = await fetch(app_config.apiUrl+app_config.statUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "action": "getbotstat",
            "botstatskind":"phrazestats",
            "botimeperiod":timePeriod,
            "botdownloadflag": download ? 1 : 0
        })
    })
    if (download){
        let repAnswer = await tableResp.blob();
        let fileUrl = URL.createObjectURL(repAnswer);
        let link = document.createElement("a");
        link.href = fileUrl;
        link.download = "phrazesstats.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    else {
        let tableAnswer =  await tableResp.json();
        // await console.log("TABLE ANSWER: ", tableAnswer);

        if (tableAnswer['status']==='ok'){
            return tableAnswer;
        }
        else {
            return {'status': 'error'}
        }
    }
}

export {getPhrazeTableStat}