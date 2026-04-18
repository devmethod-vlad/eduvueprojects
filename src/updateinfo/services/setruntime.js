import {createNewItem} from "@/updateinfo/services/addeleteitem";

function setRuntime(mails, phones){
    let mailRuntime = [];

    let baseMail = [];

    let existMailCopy = JSON.parse(JSON.stringify(mails.$state.exist));

    if (existMailCopy.length > 0){
        existMailCopy = existMailCopy.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));

        existMailCopy.forEach((item)=>{
            if (Number(item.base)===1){
                baseMail.push(item.id.toString())
            }
            mailRuntime.push(item);
        })

    }
    else {
        let newMail = createNewItem('mail', 'new1');
        mailRuntime.push(newMail);
    }

    if(baseMail.length === 0 && mailRuntime.length === 1 && mailRuntime[0].valid){
        mailRuntime[0].base = 1;
        baseMail.push(mailRuntime[0].id);
    }

    mails.runtime = mailRuntime;

    mails.base = baseMail;

    let phoneRuntime = [];

    let basePhone = [];

    let existPhoneCopy = JSON.parse(JSON.stringify(phones.$state.exist));

    // console.log("existPhoneCopy: ", existPhoneCopy);

    if (existPhoneCopy.length > 0){
        existPhoneCopy = existPhoneCopy.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));

        existPhoneCopy.forEach((item)=>{
            if (Number(item.base)===1){
                basePhone.push(item.id.toString())
            }
            phoneRuntime.push(item);
        });
    }
    else {
        let newPhone = createNewItem('phone', 'new1');
        phoneRuntime.push(newPhone);
    }

    if(basePhone.length === 0 && phoneRuntime.length === 1 && phoneRuntime[0].valid){
        phoneRuntime[0].base = 1;
        basePhone.push(phoneRuntime[0].id);
    }

    // console.log("phoneRuntime: ", phoneRuntime);

    phones.runtime = phoneRuntime;

    phones.base = basePhone;
}

export {setRuntime}