<template>
    <div class="em-bot-connect-wr">

        <div class="em-bot-connect-info">



            <div class="em-bot-connect-info-wr">

                <div class="em-bot-connect-info-rigth">

                    <div v-if="linkText" class="em-bot-connect-qr-wr">
                        <div class="em-bot-connect-qr-text">
                          Вход с QR-кодом
                        </div>
                        <qr-code :text="linkText" size="220"></qr-code>
                    </div>
                </div>
                <div v-if="authSource !=='localhostservice'" class="em-bot-connect-link-wr">
                    <a :href="linkText"><button type="button" class="vue-btn vue-btn-normal">Вход без QR-кода</button></a>
                </div>

                <div class="em-bot-connect-info-toptext">

                    Бот позволяет:

                </div>

                <div class="em-bot-connect-info-left">

                    <div class="em-bot-connect-disclaimer">
                        <p class="em-bot-connect-p">
                          • искать по материалам, размещенным на портале для пользователей ЕМИАС;
                        </p>
                        <p class="em-bot-connect-p">
                          • направлять вопросы по работе с продуктами ЕМИАС, бот проинформирует, как только поступит ответ;
                        </p>
                        <p class="em-bot-connect-p">
                          • получать уведомления об обновлениях функционала используемых ролей ЕМИАС;
                        </p>
                    </div>

                    <div class="em-bot-connect-left-link-mobile">
                        <a :href="infoLink">Подробнее</a>
                    </div>

                </div>

                <div class="em-bot-connect-info-bottomtext">
                    <a :href="infoLink">Прочитать подробнее</a>
                </div>

            </div>
        </div>



    </div>

</template>

<script>

import {userObject} from "@/global/objects/userobject";

const initialLink = 'https://t.me/EMIASkBot';

const infoLink = "https://edu.example.com/x/yZ-9Ag";

let timer;

export default {
    name: "BotConnect",

    data(){
        return{

            linkText: initialLink,
            infoLink: infoLink,
            authSource: '',
            token: '',
            telegram: 0
        }
    },

    props:{
        localStoreKey: {
            type: String,
            default: "em-secure-survey"
        },

        userInfo: {
            type: Object,
            default(){
                return userObject;
            }
        }

    },

    methods: {
        checkInfo(){
            this.setInfo();
            this.setLinkText();
        },

        setInfo(){
            // console.log("BotConnect setInfo");
            if (this.localStoreKey !==''){
                // console.log("BotConnect this.localStoreKey !==''");
                if(localStorage.getItem(this.localStoreKey)){
                    let localInfo = JSON.parse(localStorage.getItem(this.localStoreKey));
                    if (localInfo.authSource){
                        this.authSource = localInfo.authSource;
                    }
                    if (localInfo.token){
                        this.token = localInfo.token;
                    }
                    if (localInfo.telegram){
                        this.telegram = localInfo.telegram;
                    }
                }
            }
            else {
                // console.log("BotConnect use userObject");
                if(this.userInfo.authSource){
                    if(this.userInfo.authSource !==''){
                        this.authSource = this.userInfo.authSource;
                    }
                }
                if(this.userInfo.token){
                    if(this.userInfo.token !==''){
                        this.token = this.userInfo.token;
                    }
                }
                if(this.userInfo.appRegistration.telegram){
                    if(Number(this.userInfo.appRegistration.telegram) !==0){
                        this.telegram = this.userInfo.appRegistration.telegram;
                    }
                }
            }
        },

        setLinkText(){
            // console.log("BotConnect setLinkText");
            // console.log("BotConnect setLinkText this.authSource: ", this.authSource);
            // console.log("BotConnect setLinkText this.token: ", this.token);
            // console.log("BotConnect setLinkText this.telegram: ", this.telegram);
            if(this.authSource !=='' && this.token !=='' && this.authSource !=='wiki' && Number(this.telegram) === 0){
                this.linkText = initialLink+'?start='+this.token
            }
            else{
                this.linkText = initialLink;
            }
        }
    },

    mounted() {
        timer = setInterval(this.checkInfo, 3000);
    },

    unmounted() {
        if(timer){
            window.clearInterval(timer);
        }
    }
}
</script>

<style scoped>
@import "@/css/form-v1.css";

.em-bot-connect-info-toptext {
    text-align: left;
    font-weight: 400;
    color: #000000 !important;
    font-size: 1em;
    margin-bottom: 20px;
}

.em-bot-connect-info-bottomtext {
    display: flex;
    justify-content: center;
    margin-bottom: 45px;
    margin-top: 15px;
}
.em-bot-connect-info-bottomtext a{
    text-decoration: none !important;
    color: #269999 !important;
    font-weight: 600 !important;
    font-size: 1em !important;
}

.em-bot-connect-info {
    margin: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.em-bot-connect-p {
    line-height: 1.5;
    margin-bottom: 0.7rem !important;
    font-weight: 400;
    color: #000000 !important;
    font-size: 1em !important;
}
.em-bot-connect-left-link-mobile {
    display: flex;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    color: #3a80bd;
    justify-content: center;
}

.em-bot-connect-left-link-mobile a {
    text-decoration: underline;
    color: #3a80bd;
    font-size: 1.1em;
    font-weight: 500;
}

.em-bot-connect-left-link {
    display: flex;
    width: 50%;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    color: #3a80bd;
    justify-content: center;
}

.em-bot-connect-left-link a {
    text-decoration: underline;
    color: #3a80bd;
    font-size: 1.1em;
    font-weight: 500;
}

.em-bot-connect-info-rigth {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.em-bot-connect-info-left {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: center;
}

.em-bot-connect-qr-text {
    text-align: center;
    font-weight: bold;
    font-size: 1em;
    width: 220px;
    margin-bottom: 9px;

}

.em-bot-connect-link-wr {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 70px;
}
.em-bot-connect-link-wr button{
    margin-top: 17px;
    width: 220px;
    font-size: 1em !important;
    font-weight: 600 !important;
}

.em-bot-connect-wr {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    font-family: Helvetica;
    padding-bottom: 30px;
    min-height: 400px;
}

.em-bot-connect-disclaimer {
    line-height: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.em-bot-connect-qr-wr {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.em-bot-connect-info-wr {
    flex-wrap: wrap;
    width: 100%;
    display: flex;
    flex-direction: column;
}

@media (min-width: 576px) {
    .em-bot-connect-info {
        width: 100%;
    }

    .em-bot-connect-info-wr {
        flex-direction: column;
    }
    .em-bot-connect-info-left {
        width: 100%;
    }
    .em-bot-connect-info-rigth {
        width: 100%;
    }
    .em-bot-connect-disclaimer {
        align-items: center;
    }
}

@media (min-width: 768px) {
    .em-bot-connect-left-link-mobile {
        display: none;
    }
    .em-bot-connect-info {
        width: 100%;
    }

    .em-bot-connect-p {
        font-size: 1em !important;
    }

    .em-bot-connect-info-wr {
        flex-direction: column;
    }
    .em-bot-connect-info-left {
        width: 100%;
    }
    .em-bot-connect-info-rigth {
        width: 100%;
    }
    .em-bot-connect-disclaimer {
        align-items: flex-start;
    }
}

@media (min-width: 992px) {
    .em-bot-connect-left-link-mobile {
        display: none;
    }
    .em-bot-connect-info {
        width: 100%;
    }

    .em-bot-connect-p {
        font-size: 1em;
    }

    .em-bot-connect-info-wr {
        flex-direction: column;
    }
    .em-bot-connect-info-left {
        width: 100%;
    }
    .em-bot-connect-info-rigth {
        width: 100%;
    }
    .em-bot-connect-disclaimer {
        align-items: flex-start;
    }
}

@media (min-width: 1200px) {

    .em-bot-connect-left-link-mobile {
        display: none;
    }
    .em-bot-connect-info {
        width: 70%;
    }

    .em-bot-connect-p {
        font-size: 1em !important;
    }

    .em-bot-connect-info-wr {
        flex-direction: column;
    }
    .em-bot-connect-info-left {
        width: 100%;
    }
    .em-bot-connect-info-rigth {
        width: 100%;
    }
    .em-bot-connect-disclaimer {
        align-items: flex-start;
    }
}

</style>