import {app_config} from "@/glossary/config/setconfig";

async function getGlossResults(input){
    try{

        const searchResp = await fetch(app_config.apiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"abbreviation":input.toString()})
        });

        if (Number(searchResp.status) === 200){
            const resp = await searchResp.json();

            return  {'status': 'ok', 'info': {'results': resp}};
        }
        else if(Number(searchResp.status) === 404){
            return  {'status': 'ok', 'info': {'results': []}};
        }

        else {
            return {'status': 'error'}
        }

    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {getGlossResults}