import {dev_secrets} from "@/massincidents/secrets/dev";

export const app_config_dev = {

    prod: false,

    apiUrl: 'http://127.0.0.1:5000/edu-rest-api/api7',

    getEmiasDataUrl: '/getemiasdata/',

    getPollDataUrl: '/getpolldata/',

    sendMailUrl: '/sendmail/',

    saveVoteUrl: '/savevote/',

    disclaimerImgUrl: '/static/imgs/plus-icon.png',

    successImgUrl: '/static/imgs/success_icon.png',

    checkIpTimeout: 2000,

    checkIpUrl: 'https://api.ipify.org?format=json',

    fakeLocalAuth: false,

    fakeLocalLogin: dev_secrets.fakeLocalLogin,

    fakeLocalIpAddr: dev_secrets.fakeLocalIpAddr

}