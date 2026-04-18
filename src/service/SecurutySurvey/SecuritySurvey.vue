<template>
  <div class="vue-security-survey-container">
      <div v-if="loading" class="vue-security-survey-loading">
          <img :src="loadingSrc" alt="Загрузка..."/>
      </div>
      <template v-else>
          <div v-if="infoText !==''" class="vue-security-survey-info" :class="{'warning-text': warningActive}">
              {{infoText}}
          </div>
          <template v-else>
              <div class="vue-security-survey-disclaimer">
                  Какой-то вступительный текст для объяснения целей анкеты
              </div>
              <div class="vue-security-survey">
                  <div class="vue-security-survey-item">
                      <div class="vue-security-survey-input">
                          <input type="radio" v-model="answer" name="survey" value="webinar"/>
                      </div>
                      <div class="vue-security-survey-input-title">
                          На вебинаре
                      </div>
                  </div>
                  <div class="vue-security-survey-item">
                      <div class="vue-security-survey-input">
                          <input type="radio" v-model="answer" name="survey" value="record"/>
                      </div>
                      <div class="vue-security-survey-input-title">
                          В записи
                      </div>
                  </div>
                  <div class="vue-security-survey-button">
                      <button @click="sendResult()" type="button" class="vue-btn vue-btn-normal">Отправить</button>
                  </div>
              </div>

          </template>

      </template>

  </div>
</template>

<script>
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {sendResult} from "@/service/SecurutySurvey/services/sendresult";

export default {
    name: "SecuritySurvey",

    data(){
        return {

            loading: false,
            infoText: '',
            warningActive: false,
            answer:'webinar',
            userfingerprintid: '',
            userid: 0,
            emiaslogin: '',
            authtype: ''
        }
    },

    methods: {

        getLocalInfo(){
            console.log("Survey getLocalInfo");
            if(localStorage.getItem('em-secure-survey')){
                let localInfo = JSON.parse(localStorage.getItem('em-secure-survey'));
                if (localInfo.userid){
                    this.userid = Number(localInfo.userid);
                }
                if(localInfo.emiaslogin){
                    this.emiaslogin = localInfo.emiaslogin;
                }
                if(localInfo.authtype){
                    this.authtype = localInfo.authtype;
                }
            }
        },

        removeLocalInfo(){
            console.log("Survey remove localInfo");
            if(localStorage.getItem('em-secure-survey')){
                localStorage.removeItem('em-secure-survey')
            }
        },

        async sendResult(){
            console.log("Survey sendResult");
            this.loading = true;
            await this.getLocalInfo();
            if(Number(this.userid) !== 0 && this.emiaslogin !=='' && this.authtype !==''){
                let checkAnswer = await sendResult(this.params);

                console.log("Survey sendResult answer: ", checkAnswer);

                if(checkAnswer.status === 'ok'){
                    this.infoText = "Спасибо! Мы сохранили ваш ответ!";
                    await this.removeLocalInfo();
                }
                else {
                    this.infoText = "При попытке сохранить ответ произошла ошибка! Перегрузите страницу и попробуйте заново";
                    this.warningActive = true;
                    await this.removeLocalInfo();
                }
            }
            else {
                this.infoText = "При попытке сохранить ответ произошла ошибка! Перегрузите страницу и попробуйте заново";
                this.warningActive = true;
                await this.removeLocalInfo();
            }
            this.loading = false;

        },

        async getFingerPrint(){
            let fp = await FingerprintJS.load();
            const resultfp = await fp.get()
            await console.log("Survey print: ", resultfp);
            const { canvas, screenResolution, ...components } = resultfp.components
            await console.log(canvas, screenResolution);
            const visitorId = FingerprintJS.hashComponents(components)
            this.userfingerprintid = await visitorId;
        }
    },

    computed: {
        loadingSrc: function (){
            return this.globalApiUrl+"/static/imgs/loading.gif"
        },

        params: function() {
            return {
                apiurl: this.globalApiUrl,
                userid: this.userid,
                emiaslogin: this.emiaslogin,
                fingerprint: this.userfingerprintid,
                answer: this.answer,
                authtype: this.authtype
            }
        }
    },

    async mounted() {
        await this.getFingerPrint();
    }

}
</script>

<style scoped>
.warning-text {
    color: red !important;
}

.vue-security-survey-info {
    text-align: center;
    font-size: 1.4em;
    font-weight: bold;
    color: #1e8686;
}

.vue-security-survey-button {
    display: flex;
    justify-content: center;
}

.vue-security-survey-input-title {
    padding-left: 30px;
    font-size: 1.4em;
    font-weight: bold;
    color: #1e8686;
}
.vue-security-survey-input input {
    margin: unset !important;
}

.vue-security-survey-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
}

.vue-security-survey {
    display: flex;
    flex-direction: column;
}

.vue-security-survey-disclaimer {
    font-size: 1.4em;
    text-align: center;
    padding-top: 40px;
    padding-bottom: 40px;
    font-weight: bold;
    color: #1e8686;
}

.vue-security-survey-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}

.vue-security-survey-container {
    flex-direction: column;
    display: flex;
    margin: auto;
}


</style>