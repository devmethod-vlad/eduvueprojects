<template>
  <div class="subscription-container">
      <div class="subsc-info" :class="{'subs-warn-text': warnStyle}">
          {{infoText}}
      </div>
      <div v-if="buttonsVisible" class="subs-buttons">
          <button type="button" @click="changeStatus" class="vue-btn vue-btn-normal">{{buttonSubmitText}}</button>
          <button type="button" @click="cancelAction" class="vue-btn vue-btn-warn cancel-button">{{buttonCancelText}}</button>
      </div>
  </div>
</template>

<script>
import {changeMailStatus} from "@/service/MailSubscription/services/changemailstatus";

export default {

    name: "MailSubscription",

    data(){

        return{

            mailid: 0,
            mail: '',
            status: 1,

            infoText: '',
            buttonSubmitText: '',
            buttonCancelText: '',

            buttonsVisible: false,
            buttonAction: '',

            warnStyle: false
        }
    },

    methods:{

      setParams(){
          let domMailId = document.getElementById("subscription-mailid");

          if(domMailId){
              this.mailid = Number(domMailId.value);
          }

          let domMail = document.getElementById("subscription-mail");

          if(domMail){
              this.mail = domMail.value;
          }

          let domStatus = document.getElementById("subscription-status");

          if(domStatus){
              this.status = Number(domStatus.value);
          }
      },

      async changeStatus(){
          this.buttonsVisible = false;

          console.log("changeStatus this.globalApiUrl: ", this.globalApiUrl);
          let answer = await changeMailStatus(this.globalApiUrl, this.buttonAction, this.mail);
          if(answer['status']==='ok'){
              if (this.buttonAction==='subscribe'){
                  this.infoText="Спасибо! Вы успешно подписались на новости и уведомления!";
              }
              else if(this.buttonAction==='unsubscribe'){
                  this.infoText="Вы отписались от рассылки. Если передумаете, обратитесь в отдел обучения ЕМИАС по адресу emias_study@it.mos.ru, указав в письме ваш логин ЕМИАС и адрес электронной почты";
              }
          }
          else {
              this.warnStyle = true;
              this.infoText="В ходе работы с подписками и уведомлениями возникла ошибка. Попробуйте повторить процедуру заново!";
          }
      },

      cancelAction(){
          console.log("cancelAction");
          this.buttonsVisible = false;

          if (this.buttonAction === 'subscribe'){
              this.infoText = "Cпасибо!";
          }
          else if (this.buttonAction === 'unsubscribe'){
              this.infoText = "Cпасибо!";
          }
      },

      removeGetParams(){
          let url = new URL(document.location);
          const searchParams = url.searchParams;
          searchParams.delete("uuid");
          window.history.pushState({}, '', url.toString());
      }
    },


    mounted() {
        this.setParams();

        this.removeGetParams();

        if(Number(this.mailid) === 0 || this.mail === ''){
            this.infoText = "Такого адреса нет в наших данных или он уже не используется для отправки уведомлений!"
        }
        else {

            this.buttonsVisible = true;

            if(this.status === 0){
                this.infoText = 'Этот адрес уже не используется для отправки уведомлений. Вы хотите заново подписаться на получение новостей?';
                this.buttonSubmitText = 'Подписаться';
                this.buttonCancelText = 'Спасибо, не нужно';
                this.buttonAction = 'subscribe';
            }
            else if (this.status === 1){
                this.infoText = 'Вы точно хотите отписаться от рассылки уведомлений и новостей?';
                this.buttonSubmitText = 'Отписаться';
                this.buttonCancelText = 'Я еще подумаю';
                this.buttonAction = 'unsubscribe';
            }
        }
    }
}
</script>

<style scoped>
@import "@/css/form-v1.css";
.subs-warn-text {
    color: red !important;
}

.cancel-button {
    margin-left: 20px;
}

.subs-buttons {
    padding-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.subsc-info {
    text-align: center;
    font-size: 1.7em;
    font-weight: bold;
    color: #1e8686;
}

.subscription-container {
    font-family: Helvetica;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>