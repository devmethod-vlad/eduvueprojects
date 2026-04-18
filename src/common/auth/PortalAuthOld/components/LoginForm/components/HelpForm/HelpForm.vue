<template>
<div class="vue-help-container">
  <div class="vue-help-button-wr">
    <button
      @click.prevent.stop="openHelpModal()" type="button"
      class="vue-btn vue-btn-warn">
      <strong>
        Отправить сообщение в поддержку
      </strong>
    </button>
  </div>

  <template v-if="sendFormMessVisible">
    <ModalWindow
        header-text="Сообщение в поддержку"
        @closemodal="closeHelpMessModal()">

      <template v-if="sendFormSuccesVisible">
        <div class="vue-sendhelpmess-success">
          Ваше сообщение в поддержку успешно отправлено!
        </div>
      </template>

      <template v-else>
        <template v-if="loadingActive">
          <div class="vue-sendhelpform-loading">
            <img :src="loadingSrc" alt="Загузка" />
          </div>
        </template>
        <template v-else>
          <div class="vue-sendhelpform-container">
            <form
              @submit.prevent="validateForm()"
              method="post"
              class="vue-sendhelpform">
              <fieldset class="vue-fieldset">
                <div class="vue-form-item vue-sendhelpform-fio-wr">
                  <label for="vue-sendhelpform-input" class="vue-form-label"><strong>ФИО:</strong></label>
                  <input
                    @focus="processOnFosus(fioInput)"
                    type="text" name ="vue-sendhelpform-input"
                    class="vue-form-control"
                    :class="{'vue-input-error':errorStyleFio}" id="vue-sendhelpform-input"
                    v-model="fioInput"
                  >
                </div>
                <div class="vue-form-item vue-sendhelpform-muname-wr">
                  <label for="vue-sendhelpform-muname-input" class="vue-form-label"><strong>Название МУ:</strong></label>
                  <input
                    @focus="processOnFosus(muInput)"
                    name ="vue-sendhelpform-muname-input" type="text"
                    class="vue-form-control" :class="{'vue-input-error':errorStyleMu}"
                    id="vue-sendhelpform-muname-input"
                    v-model="muInput"
                  >
                </div>
                <div class="vue-form-item vue-sendhelpform-login-wr">
                  <label for="vue-sendhelpform-login-input" class="vue-form-label"><strong>Логин в ЕМИАС:</strong></label>
                  <input
                    @focus="processOnFosus(loginInput)" name ="vue-sendhelpform-login-input"
                    type="text" class="vue-form-control"
                    :class="{'vue-input-error':errorStyleLogin}" id="vue-sendhelpform-login-input"
                    v-model="loginInput"
                  >
                </div>
                <div class="vue-form-item vue-sendhelpform-message-wr">
                  <label for="vue-sendhelpform-message-input" class="vue-form-label"><strong>Описание проблемы:</strong></label>
                  <textarea
                    rows="7" @focus="processOnFosus(messInput)"
                    name ="vue-sendhelpform-message-input" class="vue-form-control"
                    :class="{'vue-input-error':errorStyleMess}" id="vue-sendhelpform-message-input"
                    v-model="messInput"
                  >
                  </textarea>
                </div>
                <div class="vue-form-item vue-sendhelpform-contacts-title">
                  Укажите хотя бы один из контактов:
                </div>
                <div class="vue-form-item vue-sendhelpform-telusername-wr">
                  <label for="vue-sendhelpform-telusername-input" class="vue-form-label"><strong>Ваш username в telegram (если известно):</strong></label>
                  <input
                    type="text" @focus="processOnFosus(telusInput)"
                    name ="vue-sendhelpform-telusername-input" class="vue-form-control"
                    :class="{'vue-input-error':errorStyleTelus}" id="vue-sendhelpform-telusername-input"
                    v-model="telusInput"
                  >
                </div>
                <div class="vue-form-item vue-sendhelpform-email-wr">
                  <label for="vue-sendhelpform-email-input" class="vue-form-label"><strong>Ваша почта:</strong></label>
                  <input
                    type="text" @focus="processOnFosus(mailInput)"
                    name ="vue-sendhelpform-email-input" class="vue-form-control"
                    :class="{'vue-input-error':errorStyleMail}" id="vue-sendhelpform-email-input"
                    v-model="mailInput"
                  >
                </div>
                <div class="vue-form-item vue-sendhelpform-button-wr">
                  <button type="submit" class="vue-btn vue-btn-normal vue-sendhelpform-button">
                    <strong>Отправить</strong>
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
          <div v-if="sendFormInfoText!==''" class="vue-helpform-info-wr">
            {{ sendFormInfoText }}
          </div>
        </template>
      </template>

    </ModalWindow>
  </template>
</div>
</template>

<script>
import ModalWindow from "@/questions/global/components/ModalWindow/ModalWindow";
import {useAppStore} from "@/global/store/app";
import { mapStores } from 'pinia'

export default {
  name: "HelpForm",
  components: {
    ModalWindow
  },
  props: {

    loginInfo :{
      type: String,
      default: ''
    },
    snilsInfo: {
      type: String,
      default: ''
    },
    lastnameInfo: {
      type: String,
      default: ''
    },
    firstnameInfo: {
      type: String,
      default: ''
    },
    secondnameInfo: {
      type: String,
      default: ''
    }

  },
  data(){
    return{
      fioInput:'',
      muInput: '',
      loginInput: '',
      messInput: '',
      telusInput: '',
      mailInput: '',

      errorStyleFio: false,
      errorStyleMu: false,
      errorStyleLogin: false,
      errorStyleMess: false,
      errorStyleTelus: false,
      errorStyleMail: false,

      sendFormMessVisible: false,
      sendFormSuccesVisible: false,
      sendFormInfoText:'',

      loadingActive: false

    }
  },
  methods:{
    processOnFosus(input){
      if(input === 'Укажите ваше ФИО'){
        this.fioInput = '';
        this.errorStyleFio = false;
      }
      else if (input === 'Укажите название МУ'){
        this.muInput = '';
        this.errorStyleMu = false;
      }
      else if (input === 'Укажите ваш логин в ЕМИАС'){
        this.loginInput='';
        this.errorStyleLogin = false;
      }
      else if (input === 'Опишите вашу проблему'){
        this.messInput='';
        this.errorStyleMess = false;
      }
      else if (input === 'Введите свой username в telegram'){
        this.telusInput = '';
        this.errorStyleTelus = false;
      }
      else if (input === 'Укажите свою почту' || input === 'Почта указана неверно'){
        this.mailInput='';
        this.errorStyleMail = false;
      }
    },
    validateForm(){
      let sendFlag=true;
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      if (this.fioInput==='' || this.fioInput==='Укажите ваше ФИО'){
        this.fioInput = 'Укажите ваше ФИО';
        this.errorStyleFio = true;
        sendFlag=false;
      }
      if (this.muInput==='' || this.muInput==='Укажите название МУ'){
        this.muInput = 'Укажите название МУ';
        this.errorStyleMu = true;
        sendFlag=false;
      }
      if (this.loginInput==='' || this.loginInput==='Укажите ваш логин в ЕМИАС'){
        this.loginInput = 'Укажите ваш логин в ЕМИАС';
        this.errorStyleLogin = true;
        sendFlag=false;
      }
      if (this.messInput==='' || this.messInput==='Опишите вашу проблему'){
        this.messInput = 'Опишите вашу проблему';
        this.errorStyleMess = true;
        sendFlag=false;
      }
      if(this.mailInput !=='' && !this.mailInput.match(mailformat)){
        this.mailInput = 'Почта указана неверно';
        this.errorStyleMail = true;
        sendFlag=false;
      }
      if(this.mailInput === '' ||  this.mailInput === 'Почта указана неверно' || this.mailInput === 'Укажите свою почту'){
        if (this.telusInput==='' || this.telusInput==='Введите свой username в telegram'){
          sendFlag=false;
          if (this.mailInput === ''){
            this.mailInput = 'Укажите свою почту';
          }
          this.errorStyleMail = true;
          this.telusInput = 'Введите свой username в telegram';
          this.errorStyleTelus = true;
        }
      }
      if(this.telusInput==='' || this.telusInput==='Введите свой username в telegram'){
        if (this.mailInput === '' ||  this.mailInput === 'Почта указана неверно' || this.mailInput === 'Укажите свою почту'){
          sendFlag=false;
          if (this.mailInput === ''){
            this.mailInput = 'Укажите свою почту';
          }
          this.errorStyleMail = true;
          this.telusInput = 'Введите свой username в telegram';
          this.errorStyleTelus = true;
        }
      }
      if (sendFlag){
        this.sendHelpMessage();
      }
    },
    async sendHelpMessage(){
      this.loadingActive = true;
      try{
        let resp = await fetch(this.globalApiUrl+'/sendhelpmessage/', {
          method: "POST",
          headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
          },
          body: JSON.stringify({"fio":this.fioInput, "muname":this.muInput, "message":this.messInput, "telusername":this.telusInput, "usermail":this.mailInput, "login":this.loginInput, 'spacekey':this.appStore.$state.eduSpaceKey})
        });
        let answer = await resp.json();
        if (answer['status']==='ok'){
          this.sendFormSuccesVisible = true;
        }
        else {
          this.sendFormInfoText = "Ошибка при отправке сообщения в техподдержку! Обновите страницу или попробуйте зайти немного позже!";
          await console.log(answer['error_mess']);
        }
      }
      catch (error) {
        this.sendFormInfoText = "Ошибка при отправке сообщения в техподдержку! Обновите страницу или попробуйте зайти немного позже!";
        await console.log(error);
      }
      this.loadingActive = false;
    },
    openHelpModal(){
      this.sendFormMessVisible=true;
    },
    closeHelpMessModal(){
      this.$emit('closehelp');
      console.log("close modal");
      this.sendFormMessVisible=false;
      this.fioInput = '';
      this.muInput = '';
      this.loginInput = '';
      this.messInput = '';
      this.telusInput = '';
      this.mailInput = '';
      this.errorStyleFio = false;
      this.errorStyleMu = false;
      this.errorStyleLogin = false;
      this.errorStyleMess = false;
      this.errorStyleTelus = false;
      this.errorStyleMail = false;
      this.sendFormSuccesVisible = false;
      this.sendFormInfoText = '';
      this.loadingActive = false;
    }
  },
  computed:{
    loadingSrc: function (){
      return this.globalApiUrl+"/static/imgs/loading.gif"
    },
    ...mapStores(useAppStore)
  },
}
</script>

<style scoped>
.vue-sendhelpform-contacts-title {
  font-size: 1.2em;
  font-weight: bold;
  color: #1e8686;
  text-align: left;
}
.vue-helpform-info-wr {
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  color: #dc3545;
  padding-bottom: 20px;
}
.vue-help-button-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>