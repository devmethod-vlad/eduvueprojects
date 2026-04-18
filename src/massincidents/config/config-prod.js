import {prod_secrets} from "@/massincidents/secrets/prod";

export const app_config_prod = {

    prod: true,

    apiUrl: 'https://edu.emias.ru/edu-rest-api/api7',

    getEmiasDataUrl: '/getemiasdata/',

    getPollDataUrl: '/getpolldata/',

    sendMailUrl: '/sendmail/',

    saveVoteUrl: '/savevote/',

    disclaimerImgUrl: '/static/imgs/plus-icon.png',

    successImgUrl: '/static/imgs/success_icon.png',

    checkIpTimeout: 2000,

    checkIpUrl: 'https://api.ipify.org?format=json',

    fakeLocalAuth: false,

    fakeLocalLogin: prod_secrets.fakeLocalLogin,

    fakeLocalIpAddr: prod_secrets.fakeLocalIpAddr

}