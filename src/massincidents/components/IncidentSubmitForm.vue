<template>

  <template v-if="isLoading">
    <div class="edu-incident-submit-form-loading">
      <content-loader/>
    </div>
  </template>
  <template v-else>

    <template v-if="successSubmit">
      <div class="edu-incident-submit-form-success">
        <div class="edu-submit-form-success-text">
          Вы подтвердили наличие данной проблемы
        </div>
        <div class="edu-submit-form-success-image">
          <img
              :src="app_config.apiUrl+app_config.successImgUrl"
              alt="Успех"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="edu-incident-submit-form-wr" id="edu-incident-submit-form">
        <div class="edu-incident-form-title">
          Укажите контактные данные
        </div>
        <div class="edu-incident-form-disclaimer">
          Заполните форму ниже и нажмите кнопку Отправить
        </div>
        <form
            @submit.prevent="validateForm()"
            method="post"
            class="edu-incident-submit-form"
        >
          <template v-if="appStore.$state.emiasData.fio === ''">

            <div class="vue-form-item">
              <label
                  for="edu-incident-fio-input"
                  class="vue-form-label">
                Как вас зовут <span class="edu-red-star-span">*</span>:
              </label>
              <input
                  :class="{'vue-input-error': fioErrorStyle}"
                  @focus="onFocus('fio')"
                  type="text"
                  placeholder="пример: Иванов Иван Иванович"
                  name="edu-incident-fio-input"
                  class="vue-form-control"
                  id="edu-incident-fio-input"
                  v-model="reactAppStore.fioInput.value"
              >
            </div>

          </template>

          <template v-if="!appStore.$state.isUserFromArm">
            <div class="vue-form-item">
              <label
                  for="edu-incident-role-input"
                  class="vue-form-label">
                Ваша роль в ЕМИАС или должность в МО <span class="edu-red-star-span">*</span>:
              </label>
              <input
                  :class="{'vue-input-error': roleErrorStyle}"
                  @focus="onFocus('role')"
                  type="text"
                  placeholder="пример: Регистратор"
                  name="edu-incident-role-input"
                  class="vue-form-control"
                  id="edu-incident-role-input"
                  v-model="reactAppStore.roleInput.value"
              >
            </div>
          </template>

          <template v-if="appStore.$state.emiasData.mo === ''">
            <div class="vue-form-item">
              <label
                  for="edu-incident-mo-input"
                  class="vue-form-label">
                Медицинская организация, филиал <span class="edu-red-star-span">*</span>:
              </label>
              <input
                  :class="{'vue-input-error': moErrorStyle}"
                  @focus="onFocus('mo')"
                  type="text"
                  placeholder="пример: ГП12, филиал 1"
                  name="edu-incident-mo-input"
                  class="vue-form-control"
                  id="edu-incident-mo-input"
                  v-model="reactAppStore.moInput.value"
              >
            </div>
          </template>


          <div class="edu-incident-contacts-title">
            Укажите хотя бы один из своих контактов:
          </div>


          <div class="edu-incident-contacts-wr">

            <div class="vue-form-item edu-incident-form-mail">
              <label
                  for="edu-incident-mail-input"
                  class="vue-form-label">
                Электронная почта
              </label>
              <input
                  :class="{'vue-input-error': mailErrorStyle}"
                  @focus="onFocus('mail')"
                  type="text"
                  placeholder="example@mail.ru"
                  name="edu-incident-mail-input"
                  class="vue-form-control"
                  id="edu-incident-mail-input"
                  v-model="reactAppStore.mailInput.value"
              >
            </div>

            <div class="vue-form-item edu-incident-form-phone">

              <label
                  for="edu-incident-phone-input"
                  class="vue-form-label">
                Телефон
              </label>
              <input
                  :class="{'vue-input-error': phoneErrorStyle}"
                  v-maska="maskedObject"
                  @focus="onFocus('phone')"
                  type="text"
                  data-maska="+7(###)###-##-##"
                  placeholder="+7 (___) ___-__-__"
                  name="edu-incident-phone-input"
                  class="vue-form-control"
                  id="edu-incident-phone-input"
                  v-model="reactAppStore.phoneInput.value"
              >
            </div>

          </div>

          <template v-if="infoText !==''">

            <div class="vue-form-item">

              <div class="edu-incident-form-info-text-wr"
                   :class="{'incident-form-info-text-warn': infoTextWarnStyle}"
              >
                <div class="edu-incident-form-info-icon">
                  <app-icon
                      name="warning-fill"
                      color="#e04b37"
                      :size="15"
                  />
                </div>
                <div class="edu-incident-form-info-text">
                  {{ infoText }}
                </div>
              </div>

            </div>

          </template>

          <template v-if="!appStore.$state.isUserFromArm">
            <div class="vue-form-item">
              <div class="edu-incident-form-disclaimer">
                <span class="edu-red-star-span">*</span> - Поля, обязательные для заполнения
              </div>
            </div>
          </template>

          <div class="vue-form-item">
            <div class="edu-incident-form-buttons-wr">
              <button
                  type="button"
                  class="vue-btn vue-btn-warn-wobg"
                  @click="emits('closemodal')"
              >
                Отменить
              </button>
              <button
                  type="submit"
                  class="vue-btn vue-btn-normal edu-incident-form-submit-button"
              >
                Отправить
              </button>
            </div>
          </div>

        </form>
      </div>

    </template>

  </template>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ContentLoader from "@/common/ui/ContentLoader/ContentLoader.vue";
import { vMaska } from "maska";
import { storeToRefs } from 'pinia';
import { useAppStore } from "@/massincidents/store/app";
import {reactive, ref} from "vue";
import {app_config} from "@/massincidents/config/setconfig";

// EMITS
const emits = defineEmits(['sendsuccess', 'closemodal']);


// STORE
const reactAppStore = storeToRefs(useAppStore());
const appStore = useAppStore();

// DATA
const maskedObject = reactive({});

const infoTextWarnStyle = ref(false);
const fioErrorStyle = ref(false);
const roleErrorStyle = ref(false);
const moErrorStyle = ref(false);
const mailErrorStyle = ref(false);
const phoneErrorStyle = ref(false);

const infoText = ref('');

const successSubmit = ref(false);

const isLoading = ref(false);


// METHODS

const resetWarn = ()=>{

  infoTextWarnStyle.value = false;
  fioErrorStyle.value = false;
  roleErrorStyle.value = false;
  moErrorStyle.value = false;
  mailErrorStyle.value = false;
  phoneErrorStyle.value = false;
  infoText.value = '';
}

const resetInputs = ()=>{
  appStore.fioInput = '';
  appStore.roleInput = '';
  appStore.moInput = '';
  appStore.mailInput = '';
  appStore.phoneInput = '';
}

const cleanInputText = (text)=>{
  return text.replace(/\s+/g, "").replace(/\r+/g, "").replace( /(<([^>]+)>)/ig, "");
}

const validateForm = ()=>{
  resetWarn();

  let validFlag = true;

  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let mailMatchFlag = true;

  if(!appStore.$state.mailInput.match(mailformat)){
    mailMatchFlag = false;
  }

  let cleanFio = cleanInputText(appStore.$state.fioInput);
  let cleanRole = cleanInputText(appStore.$state.roleInput);
  let cleanMo = cleanInputText(appStore.$state.moInput);

  if (appStore.$state.emiasData.fio === ''){
    if (cleanFio ===''){
      fioErrorStyle.value = true;
      validFlag = false;
    }
  }

  if (appStore.$state.emiasData.mo === ''){
    if (cleanMo ===''){
      moErrorStyle.value = true;
      validFlag = false;
    }
  }

  if (!appStore.$state.isUserFromArm){
    if (cleanRole ===''){
      roleErrorStyle.value = true;
      validFlag = false;
    }
  }
  let mailValid = true;

  if(appStore.$state.mailInput === ''){
    mailValid = false
  }

  if(appStore.$state.mailInput !== '' && !mailMatchFlag){
    mailValid = false
  }

  let phoneValid = true;

  if(maskedObject.unmasked ==='') {
    phoneValid = false;
  }

  if (maskedObject.unmasked !=='' && !maskedObject.completed){
    phoneValid = false;
  }

  if(!mailValid && !phoneValid){
    validFlag = false;
    phoneErrorStyle.value = true;
    mailErrorStyle.value = true;
  }
  else{
    phoneErrorStyle.value = false;
    mailErrorStyle.value = false;
  }


  if(validFlag){
    sendMail();
  }
  else {
    infoText.value = 'Проверьте заполнение формы. Некоторые поля не заполнены или заполнены неверно.';
  }

}

const onFocus = (target)=>{
  if(target==='fio'){
    fioErrorStyle.value = false;
    if (appStore.$state.fioInput === 'Укажите как вас зовут'){
      appStore.fioInput = '';
    }
  }
  if(target==='role'){
    roleErrorStyle.value = false;
    if (appStore.$state.roleInput === 'Укажите вашу роль ЕМИАС или должность'){
      appStore.roleInput = '';
    }
  }
  if(target==='mo'){
    moErrorStyle.value = false;
    if (appStore.$state.moInput === 'Укажите название мед. организации, филиал'){
      appStore.moInput = '';
    }
  }
  if(target==='phone'){
    phoneErrorStyle.value = false;
  }
  if(target==='mail'){
    mailErrorStyle.value = false;
  }
}

const sendMail = async ()=>{
  isLoading.value = true;
  // console.log("sendMail");

  let mailData = {};

  if(!appStore.$state.isUserFromArm){
    mailData['source'] = 'anonym';
    mailData['anonfio'] = appStore.$state.fioInput;
    mailData['anonmo'] = appStore.$state.moInput;
    mailData['anonrole'] = appStore.$state.roleInput;
  }
  else {
    mailData['source'] = 'emias';
    mailData['fio'] = appStore.$state.emiasData.fio;
    mailData['mo'] = appStore.$state.emiasData.mo;
    mailData['emiaslogin'] = appStore.$state.emiasData.login;
  }
  mailData['incident'] = appStore.$state.targetIncident.incident;
  mailData['incidenttext'] = appStore.$state.targetIncident.description;
  mailData['incidentkpi']= appStore.$state.targetIncident.incident_ke;
  mailData['phone']= appStore.$state.phoneInput;
  mailData['email']= appStore.$state.mailInput;

  try {
    let postData = await fetch(app_config.apiUrl + app_config.sendMailUrl, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify(mailData)
    });
    let postAnswer = await postData.json();

    // console.log("postAnswer: ", postAnswer);

    if (postAnswer['status']==='ok'){
      await sendVote();
    }
    else {
      isLoading.value = false;
      infoText.value = 'При попытке отослать сообщение произошла ошибка. Попробуйте повторить процедуру позже!';
      infoTextWarnStyle.value = true;
    }

  }
  catch (e) {
    isLoading.value = false;
    infoText.value = 'При попытке отослать сообщение произошла ошибка. Попробуйте повторить процедуру позже!';
    infoTextWarnStyle.value = true;
  }

}

async function sendVote(){
  let saveResp = await saveVote();
  // console.log("saveResp: ", saveResp);
  if(saveResp['status']==='ok'){
    resetInputs();
    emits('sendsuccess');
    isLoading.value = false;
    successSubmit.value = true;
  }
  else {
    isLoading.value = false;
    infoText.value = 'При попытке отослать сообщение произошла ошибка. Попробуйте повторить процедуру позже!';
    infoTextWarnStyle.value = true;
  }
}

const saveVote = async () =>{
  let postData = await fetch(app_config.apiUrl + app_config.saveVoteUrl, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      "userprint":appStore.$state.userfingerprintid,
      'incident':appStore.$state.targetIncident.incident,
      'userip':appStore.$state.userip
    })
  });
  return await postData.json()
}


</script>
<style>
.vue-modal-body {
  padding-top: 0 !important;
  padding-right: 1rem !important;
  padding-left: 1rem !important;
  padding-bottom: 1rem !important;
}
</style>

<style scoped>
.edu-incident-form-info-icon {
  padding-right: 10px;
}

.edu-incident-form-info-text-wr {
  display: flex;
  justify-content: flex-start;
  color: #e04b37;
}

.edu-incident-submit-form .vue-btn-warn-wobg:hover {
  background-color:  #fde4df !important;
}

.edu-incident-submit-form .vue-form-control:hover{
  border-color: #757575 !important;
}
.edu-incident-submit-form .vue-form-control:focus{
  box-shadow: unset !important;
  border-color: #3dcfcf !important;
}

.edu-incident-submit-form-loading {
  display: flex;
  min-height: 400px;
  justify-content: center;
  align-items: center;
}

.edu-submit-form-success-text {
  font-size: 20px;
  margin-bottom: 30px;
}

.edu-incident-submit-form-success {
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.edu-incident-form-disclaimer {
  color: #757575;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
}

.edu-incident-form-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}

.edu-incident-contacts-title {
  font-size: 16px;
  color: #757575;
  margin-bottom: 20px;
}

.edu-incident-contacts-wr {
  flex-direction: column;
  display: flex;
  justify-content: space-between;
}

.edu-red-star-span {
  color: #F05C46 !important;
}

.vue-form-item label {
  font-size: 16px !important;
}

::placeholder {
  font-weight: 400 !important;
}

.edu-incident-form-submit-button {
  margin-left: 20px;
}

.edu-incident-form-buttons-wr {
  display: flex;
  justify-content: flex-end;
}

@media (min-width: 576px) {

}

@media (min-width: 768px) {

}

@media (min-width: 992px) {
  .edu-incident-contacts-wr {
    flex-direction: row;
  }
  .edu-incident-form-mail {
    width: 40%;
  }
  .edu-incident-form-phone {
    width: 40%;
  }
}

@media (min-width: 1200px) {

}

</style>