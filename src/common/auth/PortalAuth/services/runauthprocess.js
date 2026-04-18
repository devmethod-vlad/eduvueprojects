import {setUrlParams} from "@/common/auth/PortalAuth/services/seturlparams";
import {checkAccessLocalService} from "@/common/auth/PortalAuth/services/localhostauth";
import {processTelegramTransition} from "@/common/auth/PortalAuth/services/authtype/procteltransition";
import {processWikiAuth} from "@/common/auth/PortalAuth/services/authtype/procwikiauth";
import {processLocalhostAuth} from "@/common/auth/PortalAuth/services/authtype/proclocalauth";
import {processLocalTokenAuth} from "@/common/auth/PortalAuth/services/authtype/procloctokenauth";

const checkLocalHostService = async (userState, appConfig)=>{
    let localHostInfo = await checkAccessLocalService(appConfig.$state);

    if(localHostInfo.user){
        userState.localhostServiceEnable = true;
        userState.localhostServiceInfo = localHostInfo;
    }
}

async function runAuthProcess(app, appConfig, portalProps, userState, urlState) {
    app.loading = true;
    await setUrlParams(appConfig.$state, urlState);
    // console.log("portal auth urlState:", urlState.$state);
    userState.device_type = /Mobile|Tablet|iPad|iPhone|Android/.test(navigator.userAgent) ? 'mobile' : 'desktop';
    await checkLocalHostService(userState, appConfig);

    //Определяем порядок авторизации:

    //1. Авторизация по ссылке. Она нужна для перехода и автоматической авторизации
    //из бота или других приложений. При этом у пользователя нет ничего, кроме токена в url
    if (portalProps.$state.authByLink && !userState.$state.auth){

        // console.log("portalProps.$state.authByLink && !userState.$state.auth");
        //Проверяем наличие get параметр source - из какого приложения сделан переход
        if (urlState.$state.source !=='') {

            // console.log("urlState.$state.source !==''");
            //Обрабатываем случай, когда переход совершен из telegram
            if (urlState.$state.source === 'telegram' && urlState.$state.telegram.telegramtoken !=='') {
                // console.log("urlState.$state.source === 'telegram' && urlState.$state.telegram.telegramtoken !==''");

                let pttAnswer = await processTelegramTransition(urlState, appConfig.$state, userState);

                // console.log("processTelegramTransition answer: ", pttAnswer);

                if (pttAnswer.status === 'ok'){
                    app.setUserInfo = true;
                }
                else {
                    app.warningText = pttAnswer.info.warningText
                }

            }
        }
    }

    //2. Авторизация c помощью api портала учебных материалов.
    //Запрос на "rest/api/user/current" отдает информацию о том
    //зарегистрирован пользователь на портале или нет
    if (portalProps.$state.authByEdu && !userState.$state.auth){
        // console.log("portalProps.$state.authByEdu && !userState.$state.auth");

        let pwAnswer = await processWikiAuth(userState, appConfig.$state);

        // console.log("processWikiAuth answer : ", pwAnswer);

        if (pwAnswer.status === 'ok'){
            app.setUserInfo = true;
        }
        else {
            app.warningText = pwAnswer.info.warningText
        }
    }

    //3. Авторизация c помощью localhost сервиса. Сервис доступен с АРМов медработников
    //при обращении к локальному хосту отдаются данные пользователя - логин, ip и прочее
    if(portalProps.$state.localHostAuth && !userState.$state.auth){
        // console.log("portalProps.$state.localHostAuth && !userState.$state.auth");

        let lhAnswer = await processLocalhostAuth(userState, appConfig.$state);

        // console.log("processLocalhostAuth answer : ", lhAnswer);

        if (lhAnswer.status === 'ok'){
            if(portalProps.$state.submitLocalAuth){
                app.submitInfo.lastname = userState.$state.lastname;
                app.submitInfo.firstname = userState.$state.firstname;
                app.submitInfo.secondname = userState.$state.secondname;
                app.submitInfo.login = userState.$state.emiaslogin;
                app.localSubmitPanelVisible = true;
            }
            else{
                app.setUserInfo = true;
            }
        }
    }

    //4. Авторизация по токену в localStorage.
    if(portalProps.$state.authByStorageToken && !userState.$state.auth){

        // console.log("portalProps.$state.authByStorageToken && !userState.$state.auth");

        // console.log("авторизация по токену");
        //Проверяем, есть ли в localStorage данные с ключом userToken
        let storageKey = appConfig.$state.localStorage.userInfo.key;
        if (localStorage.getItem(storageKey)){
            // console.log("if (localStorage.getItem(storageKey))");
            let ltAnswer = await processLocalTokenAuth(userState.$state, appConfig.$state);
            // console.log("processLocalTokenAuth answer ", ltAnswer);
            if (ltAnswer.status === 'ok'){
                app.setUserInfo = true;
            }
        }

    }

    //Если авторизация не прошла, в качестве основной формы показываем
    //форму для регистрации мед.работников (логин+СНИЛС)
    if(!userState.$state.auth){
        if(portalProps.$state.showLoginForm){
            app.loginFormVisible = true;
        }
        else {
            app.unSuccessLogin = true;
        }
    }
    app.loading = false;
}

export {runAuthProcess}