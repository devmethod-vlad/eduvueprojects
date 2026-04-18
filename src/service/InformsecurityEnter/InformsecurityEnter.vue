<template>
    <div class="vue-security-auth-wr">
        <template v-if="!isUserAuth">
            <PortalAuth
                    :api-url="apiUrl"
                    :local-host-auth="true"
                    :auth-by-link="true"
                    :auth-by-storage-token="true"
                    :auth-by-edu="true"
                    :manual-auth="false"
                    @setuserinfo="(userobject) => getUserInfo(userobject)"
            />
        </template>
    </div>
</template>

<script>
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import PortalAuth from "@/common/auth/PortalAuth/PortalAuth.vue";
import {user_object} from "@/objects/user";
import {sendResult} from "@/service/SecurutySurvey/services/sendresult";

export default {
    name: "AppInformsecurityEnter",
    components: {PortalAuth},

    data(){
        return {
            userObject: user_object,
            isUserAuth: false,
            userfingerprintid: ''
        }
    },
    computed:{
        apiUrl: function () {
            return this.globalApiUrl;
        },
        params: function() {
            return {
                apiurl: this.globalApiUrl,
                userid: this.userObject.userid,
                emiaslogin: this.userObject.emiaslogin,
                fingerprint: this.userfingerprintid,
                authtype: this.userObject.authSource
            }
        }
    },

    methods:{

        async getFingerPrint(){
            // await console.log("SurveyEnter get print");
            let fp = await FingerprintJS.load();
            const resultfp = await fp.get()
            // await console.log("SurveyEnter print: ", resultfp);
            const { canvas, screenResolution, ...components } = resultfp.components
            await console.log(canvas, screenResolution);
            const visitorId = FingerprintJS.hashComponents(components)
            this.userfingerprintid = await visitorId;
        },

        async getUserInfo(userObject){
            // console.log("SecureEnter getUserInfo userObject: ", userObject);
            if (userObject.auth){
                // console.log("SecureEnter getUserInfo auth true");
                this.userObject = await userObject;
                this.isUserAuth = true;
                await this.setLocalInfo(userObject);
                await this.getFingerPrint();
                await this.sendInfo(this.params);
            }
            else{
                // console.log("SecureEnter getUserInfo auth false");
                await this.removeLocalInfo();
            }
        },

        async sendInfo(){
            if(Number(this.userObject.userid) !==0 && this.userObject.emiaslogin !==''){
                let checkAnswer = await sendResult(this.params);

                // console.log("SurveyEnter sendInfo answer: ", checkAnswer);

                if (checkAnswer.status !== 'ok'){
                    await this.removeLocalInfo();
                }
            }
        },

        setLocalInfo(userObject){
            // console.log("SecureEnter setLocalInfo");
            localStorage.setItem('em-secure-survey', JSON.stringify({
                'authSource': userObject.authSource,
                'token': userObject.token,
                'telegram': userObject.appRegistration.telegram
            }))
        },

        removeLocalInfo(){
            // console.log("SecureEnter remove localInfo");
            if(localStorage.getItem('em-secure-survey')){
                localStorage.removeItem('em-secure-survey')
            }
        },

        hideSurvey(){

            // console.log("SecureEnter hideSurvey");
            let targetSection = document.getElementById("app-container");
            if(targetSection){
                targetSection.style.display = "none";
            }
        }

    },

    mounted() {
        // console.log("SecureEnter mounted");
        let targetSection = document.getElementById("main-content");
        // console.log("SecureEnter mounted targetSection: ", targetSection);
        if(targetSection){
            targetSection.style.display = "none";
        }
    },


    watch: {

        isUserAuth: {
            handler(newValue) {
                // console.log("SecureEnter isUserAuth change");
                let targetSection = document.getElementById("main-content");
                if(newValue) {
                    if(targetSection){
                        targetSection.style.display = "block";
                    }
                }
                else {
                    if(targetSection){
                        targetSection.style.display = "none";
                    }
                }
            },
            deep: true
        }
    }
}
</script>

<style scoped>

.vue-security-auth-wr {
    width: 100%;
    margin: auto;
    font-family: Helvetica;
    font-weight: bold;
    color: #1e8686;
}

@media (min-width: 576px) {
    .vue-security-auth-wr {
        width: 100%;
    }
}

@media (min-width: 768px) {
    .vue-security-auth-wr {
        width: 80%;
    }
}

@media (min-width: 992px) {
    .vue-security-auth-wr {
        width: 80%;
    }
}

@media (min-width: 1200px) {
    .vue-security-auth-wr {
        width: 60%;
    }
}


</style>