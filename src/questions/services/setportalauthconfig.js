import {app_config} from "@/questions/config/setconfig";
import {portalConfigObject} from "@/objects/portalauthappconfig";

function setPortalAuthConfig(){
    let config = {...portalConfigObject};

    config.prod = app_config.prod;
    config.apiUrl = app_config.apiUrl;
    config.portalUrl = app_config.portalUrl;
    config.enableFakeEduAuth = app_config.enableFakeEduAuth;
    config.eduFakeDisplayName = app_config.eduFakeDisplayName;
    config.eduFakeUserName = app_config.eduFakeUserName;
    config.fakeLocalAuth = app_config.fakeLocalAuth;
    config.fakeLocalLogin = app_config.fakeLocalLogin;
    config.getParams = app_config.getParams;
    config.localStorage = app_config.localStorage;
    config.minAuthPanelHeight = app_config.minAuthPanelHeight;
    config.authUrl = app_config.authUrl;
    config.tlgrmNotifyList = app_config.tlgrmNotifyList;
    config.botToken = app_config.botToken;

    return config;
}

export {setPortalAuthConfig}