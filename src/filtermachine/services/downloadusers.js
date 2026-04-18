import * as dayjs from "dayjs";

async function downloadUsersInfo(machine, filter){

    machine.downloadActive = true;

    try{

        const dwnldResp = await fetch(machine.$state.usersDownloadUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(filter.$state)
        });
        // console.log("filterResp: ", dwnldResp);

        let respStatus = Number(dwnldResp.status);

        if (respStatus === 200){
            let repAnswer = await dwnldResp.blob();

            let fileUrl = URL.createObjectURL(repAnswer);

            let link = document.createElement("a");

            link.href = fileUrl;

            let timePostfix = dayjs().format('DD_MM_YYYY');

            link.download = "Пользователи_" + timePostfix + ".xlsx";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            machine.downloadActive = false;
        }
        else{
            machine.downloadActive = false;
        }

    }
    catch(error) {
        machine.downloadActive = false;
        console.log(error);
    }

}

export {downloadUsersInfo}