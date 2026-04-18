function containsKeyValue(objectsArray, key, value) {
    if(key==='mail' || key==='phone'){
        return objectsArray.some(obj => obj[key].trim().toLowerCase() === value.trim().toLowerCase());
    }
    else{
        return objectsArray.some(obj => obj[key] === value);
    }
}

function findObjectByKey(arr, key, value) {
    if(key==='mail' || key==='phone'){
        return arr.find(obj => obj[key].trim().toLowerCase() === value.trim().toLowerCase());
    }
    else{
        return arr.find(obj => obj[key] === value);
    }
}


async function prepareContactsInfoToSave(mails, phones){
    let new_mails = [];
    let del_mails=[];
    let mails_change_base = []

    let mailRuntimeData = JSON.parse(JSON.stringify(mails.$state.runtime));
    let mailExistData = JSON.parse(JSON.stringify(mails.$state.exist));

    mailRuntimeData.forEach((item)=>{
        if (!containsKeyValue(mailExistData, 'mail', item.mail) && item.valid){
            if (!containsKeyValue(new_mails, 'mail', item.mail)){
                new_mails.push(item);
            }
        }
        else {
            let targetItem = findObjectByKey(mailExistData, 'mail', item.mail);

            if (targetItem){
                if(Number(targetItem.base) !== Number(item.base)){
                    if (!containsKeyValue(mails_change_base, 'mail', item.mail)){
                        mails_change_base.push(item);
                    }
                }
            }
        }
    });

    mailExistData.forEach((item)=>{
        if (!containsKeyValue(mailRuntimeData, 'mail', item.mail)){
            if (!containsKeyValue(del_mails, 'mail', item.mail)){
                del_mails.push(item);
            }
        }
    });

    let new_phones = [];
    let del_phones = [];
    let phones_change_base = [];

    let phoneRuntimeData = JSON.parse(JSON.stringify(phones.$state.runtime));
    let phoneExistData = JSON.parse(JSON.stringify(phones.$state.exist));

    phoneRuntimeData.forEach((item)=>{
        if (!containsKeyValue(phoneExistData, 'phone', item.phone) && item.valid){
            if (!containsKeyValue(new_phones, 'phone', item.phone)){
                new_phones.push(item);
            }
        }
        else {
            let targetItem = findObjectByKey(phoneExistData, 'phone', item.phone);

            if (targetItem){
                if(Number(targetItem.base) !== Number(item.base)){
                    if (!containsKeyValue(phones_change_base, 'phone', item.phone)){
                        phones_change_base.push(item);
                    }
                }
            }
        }
    });

    phoneExistData.forEach((item)=>{
        if (!containsKeyValue(phoneRuntimeData, 'phone', item.phone)){
            if (!containsKeyValue(del_phones, 'phone', item.phone)){
                del_phones.push(item);
            }
        }
    });

    // console.log("new_mails: ", new_mails);
    // console.log("del_mails: ", del_mails);
    // console.log("mails_change_base: ", mails_change_base);
    // console.log("new_phones: ", new_phones);
    // console.log("del_phones: ", del_phones);
    // console.log("phones_change_base: ", phones_change_base);

    return {
        new_mails: new_mails,
        del_mails: del_mails,
        mails_change_base: mails_change_base,
        new_phones: new_phones,
        del_phones: del_phones,
        phones_change_base: phones_change_base
    }
}

export {prepareContactsInfoToSave}