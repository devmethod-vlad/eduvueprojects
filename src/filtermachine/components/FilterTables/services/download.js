
async function downloadInfo(params, panelElement){
    try{

        // console.log("download params: ", params);

        params.machine.downloadActive = true;

        let data = {
            'target': params.target,
            'prefill': params.prefill,
            'info_list': params.prefill === 1 ? params.reverseList : params.list,
        }

        if (params.category_list) {
            data.category_list = params.category_list;
        }

        if (params.mo_list) {
            data.mo_list = params.mo_list;
        }

        if (params.mo_prefill) {
            data.mo_prefill = params.mo_prefill;
        }

        if (params.mo_category_list) {
            data.mo_category_list = params.mo_category_list;
        }

        // console.log("download params data: ", data);

        const dwnldResp = await fetch(params.url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },

            body: JSON.stringify(data)
        });

        // console.log("dwnldResp: ", dwnldResp)

        if(dwnldResp.status.toString() !== '200'){
            params.machine.downloadActive = false;
            console.log("ERROR");
        }
        else{

            let repAnswer = await dwnldResp.blob();

            let fileUrl = URL.createObjectURL(repAnswer);

            let link = document.createElement("a");
            link.href = fileUrl;

            link.download = params.filename + ".xlsx";

            panelElement.appendChild(link);
            link.click();
            panelElement.removeChild(link);

            params.machine.downloadActive = false;
        }
    }
    catch(e) {
        params.machine.downloadActive = false;

        console.log(e);
    }
}

export {downloadInfo}