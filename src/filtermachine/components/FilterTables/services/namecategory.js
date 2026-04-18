
async function saveNameCategory(url, store, moid, categoryName, shortName){
    try{

        const nameCatResp = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                category_name: categoryName,
                shortname: shortName,
                moid: moid
            })
        });
        // console.log("nameCatResp: ", nameCatResp);

        let respStatus = Number(nameCatResp.status);

        let answerBody = await nameCatResp.json();

        console.log("nameCatAnswerBody: ", answerBody);

        if (respStatus === 200){
            store.successInfo = 'Изменения успешно сохранены';
        }
        else{
            store.requestError = true;
            store.requestErrorInfo = answerBody.detail;
            store.requestErrorUserInfo = 'Возникли проблемы при сохранении данных по организации'
        }
    }
    catch(error) {
        store.requestError = true;
        store.requestErrorInfo = error;
        store.requestErrorUserInfo = 'Возникли проблемы при сохранении данных по организации'
    }
}

export {saveNameCategory}
