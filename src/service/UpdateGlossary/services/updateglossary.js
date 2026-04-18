
export default async function updateGlossary(apiurl){
    try{
        let updResp = await fetch(apiurl);
        if (Number(updResp.status) === 200){
            return  {'status': 'ok'};
        }

        else {
            return {'status': 'error'}
        }

    }
    catch (e){
        return {'status':'error'}
    }

}