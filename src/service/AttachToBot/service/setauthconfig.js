import {attachbot_config} from "@/service/AttachToBot/config/setconfig";
import {portalConfigObject} from "@/objects/portalauthappconfig";

function setAttachToBotAuthConfig(){
    let config = {...portalConfigObject};

    config.prod = attachbot_config.prod;
    config.apiUrl = attachbot_config.apiUrl;
    config.portalUrl = attachbot_config.portalUrl;
    config.enableFakeEduAuth = attachbot_config.enableFakeEduAuth;
    config.eduFakeDisplayName = attachbot_config.eduFakeDisplayName;
    config.eduFakeUserName = attachbot_config.eduFakeUserName;
    config.fakeLocalAuth = attachbot_config.fakeLocalAuth;
    config.fakeLocalLogin = attachbot_config.fakeLocalLogin;
    config.getParams = attachbot_config.getParams;
    config.localStorage = attachbot_config.localStorage;
    config.minAuthPanelHeight = attachbot_config.minAuthPanelHeight;
    config.authUrl = attachbot_config.authUrl;
    config.tlgrmNotifyList = attachbot_config.tlgrmNotifyList;
    config.botToken = attachbot_config.botToken;

    return config;
}

export {setAttachToBotAuthConfig}