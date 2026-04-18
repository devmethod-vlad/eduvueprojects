export default function setUserinfoParams(respData, userState){
    if (respData['info']['userid']) {

        userState.userid = respData['info']['userid'];

    }
    if (respData['info']['userrole']) {

        userState.userrole = respData['info']['userrole'];

    }
    if (respData['info']['userlastname']) {

        userState.lastname = respData['info']['userlastname'];

    }
    if (respData['info']['userfirstname']) {

        userState.firstname = respData['info']['userlastname'];

    }
    if (respData['info']['usersecondname']) {

        userState.secondname = respData['info']['usersecondname'];

    }
    if (respData['info']['wikilogin']) {

        userState.wikilogin = respData['info']['wikilogin'];

    }
    if (respData['info']['emiaslogin']) {

        userState.emiaslogin = respData['info']['emiaslogin'];

    }
    if (respData['info']['adminlogin']) {

        userState.adminlogin = respData['info']['adminlogin'];

    }
    if (respData['info']['token']) {
        userState.token = respData['info']['token'];
    }
}