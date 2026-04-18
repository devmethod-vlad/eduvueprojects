
function validateContacts(app, mails, phones){
    app.submitError = false;
    app.submitErrorText = 'Убедитесь, что вы добавили хотя бы по одному контакту в поля email и телефон, поля заполнены правильно, и отмечены основные контакты';

    let validFlag = true;

    if(mails.$state.runtime.length === 0 || phones.$state.runtime.length === 0){
        validFlag = false;
    }

    let mailBaseList = [];
    let allMailsValid = true;

    let mailRuntimeData = JSON.parse(JSON.stringify(mails.$state.runtime));

    mailRuntimeData.forEach((item)=>{
        let isBlankNewMail = item.id.includes('new') && item.mail === '';

        if(Number(item.base)===1){
            mailBaseList.push(item.id);
        }
        if(!item.valid && !isBlankNewMail){
            allMailsValid = false;
        }
    });
    // console.log("validateContacts mailBaseList: ", mailBaseList);
    // console.log("validateContacts allMailsValid: ", allMailsValid);

    let phonesBaseList = [];
    let allPhonesValid = true;

    let phoneRuntimeData = JSON.parse(JSON.stringify(phones.$state.runtime));

    phoneRuntimeData.forEach((item)=>{
        let isBlankNewPhone = item.id.includes('new') && item.phone === '';
        if(Number(item.base)===1){
            phonesBaseList.push(item.id);
        }
        if(!item.valid && !isBlankNewPhone){
            allPhonesValid = false;
        }
    });

    // console.log("validateContacts phonesBaseList: ", phonesBaseList);
    // console.log("validateContacts allPhonesValid: ", allPhonesValid);

    if (mailBaseList.length ===0 || phonesBaseList.length ===0){
        validFlag = false;
    }

    if (mailBaseList.length > 1 || phonesBaseList.length > 1){
        validFlag = false;
    }

    if (!allMailsValid || !allPhonesValid){
        validFlag = false;
    }

    if(!validFlag){
        app.submitError = true;
    }

    // console.log("validateContacts validFlag: ", validFlag);

    return validFlag;
}

export {validateContacts}