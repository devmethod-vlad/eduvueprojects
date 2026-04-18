<template>
  <div class="edu-supdform-container">
    <template v-if="appStore.$state.loading">
      <div class="edu-supdform-loading">
        <content-loader />
      </div>
    </template>

    <template v-else>

      <div class="edu-supdform-disclaimer">
        <div class="edu-supdform-edu-supdform-disclaimer-text">
          <span class="edu-red-star-span">*</span> - Поля, обязательные для заполнения
        </div>
      </div>

      <div class="edu-supdform-wr">
        <form
            @submit.prevent="validateForm()"
            method="post"
            class="edu-supdform"
        >

          <template v-if="appStore.$state.getParams.login === ''">

            <div class="vue-form-item">
              <label
                  for="edu-supdform-fio-input"
                  class="vue-form-label">
                Фамилия Имя Отчество <span class="edu-red-star-span">*</span>:
              </label>
              <input
                  :class="{'vue-input-error': appStore.$state.fioErrorStyle}"
                  @focus="onFocus('fio')"
                  type="text"
                  placeholder="пример: Иванов Иван Иванович"
                  name="edu-supdform-fio-input"
                  class="vue-form-control"
                  id="edu-supdform-fio-input"
                  v-model="reactAppStore.fioInput.value"
              >
            </div>

            <div class="vue-form-item">
              <label
                  for="edu-supdform-login-input"
                  class="vue-form-label">
                Логин в ЕМИАС (если знаете) :
              </label>
              <input
                  :class="{'vue-input-error': appStore.$state.loginErrorStyle}"
                  @focus="onFocus('login')"
                  type="text"
                  placeholder="пример: TaEfremova"
                  name="edu-supdform-login-input"
                  class="vue-form-control"
                  id="edu-supdform-login-input"
                  v-model="reactAppStore.loginInput.value"
              >
            </div>

          </template>

          <template v-if="appStore.$state.getParams.moId === ''">
            <div class="vue-form-item">
              <label
                  for="edu-supdform-moid-input"
                  class="vue-form-label">
                Медицинская организация (с указанием филиала) <span class="edu-red-star-span">*</span>:
              </label>
              <input
                  :class="{'vue-input-error': appStore.$state.moErrorStyle}"
                  @focus="onFocus('mo')"
                  type="text"
                  placeholder="пример: ДГП 111, филиал 3 (м. Новослободская)"
                  name="edu-supdform-moid-input"
                  class="vue-form-control"
                  id="edu-supdform-moid-input"
                  v-model="reactAppStore.moInput.value"
              >
            </div>
          </template>

          <div class="edu-supdform-contacts-wr">

            <div class="vue-form-item edu-supdform-mail">
              <label
                  for="edu-supdform-mail-input"
                  class="vue-form-label">
                Электронная почта <span class="edu-red-star-span">*</span>:
              </label>
              <input
                  class="vue-form-control"
                  :class="{'vue-input-error': appStore.$state.mailErrorStyle}"
                  @focus="onFocus('mail')"
                  type="text"
                  placeholder="example@mail.ru"
                  name="edu-supdform-mail-input"
                  id="edu-supdform-mail-input"
                  v-model="reactAppStore.mailInput.value"
              >
            </div>

            <div class="vue-form-item edu-supdform-phone">

              <label
                  for="edu-supdform-phone-input"
                  class="vue-form-label">
                Телефон:
              </label>
              <input
                  :class="{'vue-input-error': appStore.$state.phoneErrorStyle}"
                  v-maska="maskedObject"
                  @focus="onFocus('phone')"
                  type="text"
                  data-maska="+7(###)###-##-##"
                  placeholder="+7 (___) ___-__-__"
                  name="edu-supdform-phone-input"
                  class="vue-form-control"
                  id="edu-supdform-phone-input"
                  v-model="reactAppStore.phoneInput.value"
              >
            </div>

          </div>

          <div class="vue-form-item vue-form-item-message">
            <label
                for="edu-supdform-message-input"
                class="vue-form-label">
              Сообщение <span class="edu-red-star-span">*</span>:
            </label>
            <textarea
                :class="{'vue-input-error': appStore.$state.messErrorStyle}"
                @focus="onFocus('message')"
                rows="5"
                type="text"
                style="resize: none;"
                placeholder="Опишите вашу проблему"
                name="edu-supdform-message-input"
                class="vue-form-control"
                id="edu-supdform-message-input"
                v-model="reactAppStore.messInput.value"
            >

          </textarea>
          </div>


          <file-zone
                :new-files="appStore.$state.upload_files"
                :deny-files="appStore.$state.deny_upload_files"
                :info-arr="appStore.$state.upload_infoarray"
                @deleteitem="(index)=>{deleteFileItem(index)}"
                @deletedenyitem="(index)=>{deleteDenyFileItem(index)}"
                @resetinfoarr="resetInfoAndDeny(false)"
          />

          <div class="vue-form-item">
            <upload-file
                @uploadfiles="(uploadFilesObject)=>{onUpload(uploadFilesObject)}"
                @handledrop="resetInfoAndDeny(true)"
                @handlebutton="resetInfoAndDeny(true)"
                :initstore="{
                    new_files: appStore.$state.upload_files,
                    deny_files: appStore.$state.deny_upload_files,
                    info_array: appStore.$state.upload_infoarray
                }"
                :current-attachs="[]"
                :current-simul-attachs="appStore.$state.simul_files"
                @emitsimulattachs="(count)=>appStore.simul_files = count"
            />
          </div>

          <template v-if="appStore.$state.infoText !==''">
            <div class="vue-form-item">
              <div
                  class="edu-supdform-infotext-wr"
                  :class="{'supdform-infotext-warn-style': appStore.$state.infoTextWarn}"
              >
                <div class="edu-supdform-infotext-icon">
                  <app-icon
                      name="warning-fill"
                      :size="15"
                      color="#F05C46"
                  />
                </div>
                <div class="edu-supdform-infotext-text">
                  {{ appStore.$state.infoText }}
                </div>
              </div>
            </div>
          </template>

          <div class="vue-form-item">
            <div class="edu-supdform-form-buttons-wr">
              <button
                  @click.stop.prevent="openResetModal=true"
                  type="button"
                  class="vue-btn vue-btn-warn-wobg edu-supdform-clear-button"
              >
                Очистить форму
              </button>
              <button
                  type="submit"
                  class="vue-btn vue-btn-normal edu-supdform-submit-button"
              >
                Отправить
              </button>
            </div>
          </div>

        </form>
      </div>
      <template v-if="openResetModal">
        <ModalContentNew v-if="openResetModal"
            modalsize="small"
            @close-modal="openResetModal=false"
            header-text="Очистить форму?"
            :ignore-elements="['edu-supdform-reset']"
        >
          <div id="edu-supdform-reset" class="edu-supdform-reset-modal-wr">
            <div class="edu-supdform-reset-modal-text">
              Все поля формы обращения будут очищены
            </div>
            <div class="edu-supdform-reset-modal-buttons">
              <button
                  type="button"
                  class="vue-btn vue-btn-warn-wobg edu-supdform-reset-cancel-button"
                  @click="openResetModal=false"
              >
                Нет
              </button>
              <button
                  @click="resetState()"
                  type="submit"
                  class="vue-btn vue-btn-normal edu-supdform-reset-submit-button"
              >
                Да
              </button>
            </div>
          </div>
        </ModalContentNew>
      </template>

    </template>
  </div>
  <template v-if="appStore.$state.successSend">
    <ModalContentNew
        modalsize="small"
        @close-modal="closeSuccessModal()"
        :ignore-elements="['edu-supdform-success']"
    >
      <div id="edu-supdform-success" class="edu-supdform-success">
        <div class="edu-submit-form-success-image">
          <img
              :src="app_config.apiUrl+app_config.successImgUrl"
              alt="Успех"
          />
        </div>
        <div class="edu-supdform-success-text">
          Обращение успешно отправлено
        </div>
      </div>
    </ModalContentNew>
  </template>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";
import ContentLoader from "@/questions/components/ContentLoader/ContentLoader.vue";
import {useAppStore} from "@/supdform/store/app";
import {onMounted, reactive, ref} from "vue";
import { storeToRefs } from 'pinia';
import { vMaska } from "maska";
import UploadFile from "@/common/ui/UploadFile/UploadFile.vue";
import FileZone from "@/common/ui/FileZone/FileZone.vue";
import {app_config} from "@/supdform/config/setconfig";


// STORE
const reactAppStore = storeToRefs(useAppStore());
const appStore = useAppStore();

//DATA
const maskedObject = reactive({});
const openResetModal = ref(false);

// METHODS
const processGetParams = ()=>{
  if (app_config.enableFakeData){
    appStore.getParams.login = app_config.fakeLogin;
    appStore.getParams.moId = app_config.fakeMoId;
  }
  else {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    if (urlParams.get('login')) {
      appStore.getParams.login = urlParams.get('login');
    }
    if (urlParams.get('moId')) {
      appStore.getParams.moId = urlParams.get('moId');
    }
    if (urlParams.get('muId')) {
      appStore.getParams.muId = urlParams.get('muId');
    }
    if (urlParams.get('version')) {
      appStore.getParams.version = urlParams.get('version');
    }
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    }
  }
};

const resetWarn = ()=>{
  appStore.fioErrorStyle = false;
  appStore.loginErrorStyle = false;
  appStore.moErrorStyle = false;
  appStore.mailErrorStyle = false;
  appStore.phoneErrorStyle = false;
  appStore.messErrorStyle = false;
  appStore.infoTextWarn = false;
  appStore.infoText = '';
}

const onUpload = (uploadFilesObject)=>{
  appStore.upload_files = uploadFilesObject.newFiles;
  appStore.deny_upload_files = uploadFilesObject.denyFiles;
  appStore.upload_infoarray = uploadFilesObject.infoTextArr;
}

const resetInfoAndDeny = (resetFiles=false) =>{
    appStore.upload_infoarray = [];
    if(resetFiles){
      appStore.deny_upload_files = [];
    }
}

const deleteFileItem = (index)=>{
  let copyAppStore = {...appStore.$state};
  copyAppStore.upload_files.splice(index, 1);
  if(copyAppStore.simul_files !==0 ){
    copyAppStore.simul_files = copyAppStore.order_simul_files - 1;
  }
  appStore.$patch(copyAppStore);
  resetInfoAndDeny(true);
}

const deleteDenyFileItem = (index)=>{
  let copyAppStore = {...appStore.$state};
  copyAppStore.deny_upload_files.splice(index, 1);
  copyAppStore.upload_infoarray = [];
  appStore.$patch(copyAppStore);
  resetInfoAndDeny(true);
}

const onFocus = (target)=>{
  if(target==='fio'){
    appStore.fioErrorStyle = false;
  }
  else if(target==='login'){
    appStore.loginErrorStyle = false;
  }
  else if (target==='mo'){
    appStore.moErrorStyle = false;
  }
  else if (target==='phone'){
    appStore.phoneErrorStyle = false;
  }
  else if (target==='mail'){
    appStore.mailErrorStyle = false;
  }
  else if (target==='message'){
    appStore.messErrorStyle = false;
  }
}

const validateForm = ()=>{
  resetWarn();

  let saveFlag = true;

  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let mailMatchFlag = true;

  if(!appStore.$state.mailInput.match(mailformat)){
    mailMatchFlag = false;
  }

  if (appStore.$state.getParams.login === ''){
    if (appStore.$state.fioInput ===''){
      appStore.fioErrorStyle =  true;
      saveFlag=false;
    }
  }
  if (appStore.$state.getParams.moId===''){
    if (appStore.$state.moInput === ''){
      appStore.moErrorStyle = true;
      saveFlag=false;
    }
  }
  if (appStore.$state.messInput.replace(/\s+/g, " ").replace(/\r+/g, " ") === ''){
    appStore.messErrorStyle = true;
    saveFlag=false;
  }

  if(appStore.$state.mailInput === ''){
    saveFlag = false;
    appStore.mailErrorStyle = true;
  }

  if(appStore.$state.mailInput !== '' && !mailMatchFlag){
    saveFlag = false;
    appStore.mailErrorStyle = true;
  }

  if (appStore.$state.phoneInput !=='' && !maskedObject.completed){
    appStore.phoneErrorStyle = true;
  }

  if (saveFlag){
    sendMail();
  }
  else {
    appStore.infoText = 'Проверьте заполнение формы. некоторые поля не заполнены или заполнены неправильно!';
    appStore.infoTextWarn = true;
  }

}

const resetState = ()=>{
  openResetModal.value = false;
  let copyAppStore = JSON.parse(JSON.stringify(appStore.$state));
  appStore.$reset();
  appStore.getParams = copyAppStore.getParams;
  appStore.successSend = copyAppStore.successSend;
}

const closeSuccessModal = ()=>{
  appStore.successSend = false;
  resetState();
}

const sendMail = async ()=>{

  appStore.loading = true;
  appStore.infoText = '';
  appStore.infoTextWarn = false;

  let formData = new FormData();

  for (let fileItem of appStore.upload_files) {
    formData.append('file[]', fileItem);
  }
  formData.append("message", appStore.$state.messInput.replace(/\s+/g, " ").replace(/\r+/g, " "));
  formData.append("getlogin", appStore.$state.getParams.login);
  formData.append("getmoid", appStore.$state.getParams.moId);
  formData.append("getmuid", appStore.$state.getParams.muId);
  formData.append("getversion", appStore.$state.getParams.version);
  formData.append("fioinput", appStore.$state.fioInput);
  formData.append("logininput", appStore.$state.loginInput);
  formData.append("moinput", appStore.$state.moInput);
  formData.append("phone", appStore.$state.phoneInput);
  formData.append("mail", appStore.$state.mailInput);

  try {
    let upload = await fetch(app_config.apiUrl + '/sendmail/', {
      method: 'POST',
      body: formData
    })
    let messResp = await upload.json()

    console.log("sendmessage resp: ", messResp);

    if (messResp['status'] === 'ok') {
      appStore.loading = false;
      appStore.successSend = true;
      resetState();

    }
    else {
      appStore.loading = false;
      appStore.infoText = 'В процессе отправки произошла ошибка. Попробуйте повторить позже!';
      appStore.infoTextWarn = true;
    }

  }
  catch (error) {
    await console.log(error);
    appStore.loading = false;
    appStore.infoText = 'В процессе отправки произошла ошибка. Попробуйте повторить позже!';
    appStore.infoTextWarn = true;
  }
}

// LIFECYCLE
onMounted(()=>{
  processGetParams();
})


</script>
<style>
@font-face {
  font-family: "OpenSans";
  /*src: url(https://edu.example.com/edu-rest-api/api8/static/fonts/OpenSans-Medium.ttf) format("truetype");*/
  src: url(http://127.0.0.1:5000/edu-rest-api/api8/static/fonts/OpenSans-Medium.ttf) format("truetype");
}
.vue-modalwindow-header-text {
font-size: 20px !important;
}

.cell.large-2.article__navigation.show-for-large {
display: none !important;
}

.cell.xlarge-2.article__toc.show-for-xlarge {
display: none !important;
}

.qst-filezone-files-item-text {
font-size: 16px !important;
}
.qst-filezone-warninfo-item-text {
font-size: 16px !important;
}

.qst-detail-filezone-files-title {
font-size: 16px !important;
}

.edu-supdform .qst-uploader-droparea-label-text-top {
font-size: 16px !important;
font-weight: 400 !important;
color: #999999 !important;
text-align: center;
}
.edu-supdform .vue-form-control:hover {
  border-color: #757575 !important;
}

.edu-supdform .vue-form-control:focus {
  border-width: 2px !important;
  border-color: #3dcfcf !important;
  box-shadow: unset !important;
}

.edu-supdform .qst-uploader-droparea-label-text-bottom {
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #999999 !important;
  text-align: center;
}
.edu-supdform .qst-uploader-droparea-label-span {
  color: #1D8585 !important;
}

.edu-supdform .qst-detail-upload-dpoparea-wr label {
  border-color: #269999 !important;
  border-radius: 7px !important;
}

.edu-supdform .qst-detail-uploader-droparea-label {
  flex-direction: column !important;
}
.edu-supdform .qst-uploader-droparea-label-icon {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.edu-supdform .qst-uploader-droparea-label-text-wr {
  width: 100%;
}

</style>


<style scoped>
@import "@/css/form-v1.css";
@import '../../node_modules/floating-vue/dist/style.css';
@import "@/css/tooltip.css";

.edu-supdform-clear-button:hover {
  background-color: #fde4df !important;
}

.vue-form-item-message {
  margin-bottom: 16px !important;
}

.edu-supdform-reset-submit-button {
  margin-left: 20px;
}
.edu-supdform-reset-modal-buttons button {
  min-width: 100px;
}

.edu-supdform-reset-modal-buttons {
  display: flex;
  justify-content: flex-end;
}

.edu-supdform-reset-modal-text {
  min-height: 100px;
  display: flex;
  align-items: center;
  text-align: left;
}

.edu-supdform-reset-modal-wr {
  display: flex;
  flex-direction: column;
}

.edu-submit-form-success-image {
  margin-bottom: 30px;
}

.edu-supdform-success-text {
  display: flex;
  text-align: center;
}

.edu-supdform-success {
  font-family: OpenSans;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}


.supdform-infotext-warn-style {
  color: #F05C46 !important;
}

.edu-supdform-infotext-icon {
  padding-top: 3px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-right: 15px;
}

.edu-supdform-infotext-wr {
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  font-weight: 400;
}

.edu-supdform-loading {
  display: flex;
  min-height: 450px;
  justify-content: center;
  align-items: center;
}

textarea#edu-supdform-message-input::placeholder {
  font-size: 16px !important;
}

.edu-supdform-disclaimer {
  font-size: 14px;
  font-weight: 400;
  color: #757575;
  margin-bottom: 30px;
}

.edu-supdform-form-buttons-wr {
  display: flex;
  justify-content: flex-end;
}


.edu-supdform-submit-button {
  margin-left: 30px;
  font-size: 16px !important;
  font-weight: 600 !important;
}

.edu-supdform-clear-button {
  font-size: 16px !important;
  font-weight: 600 !important;
}

.edu-supdform-contacts-wr {
  display: flex;
  flex-direction: column;
}

.edu-supdform-mail {
  width: 100%;
}

.edu-supdform-phone {
  width: 100%;
}

.edu-red-star-span {
  color: #F05C46;
}
.edu-supdform .vue-input-error {
  font-size: 16px !important;
  font-weight: 400 !important;

}

.edu-supdform .vue-form-label {
  font-weight: 400 !important;
  font-size: 16px !important;
}

.edu-supdform .vue-form-control {
  border-color: #999999;
  font-weight: 400 !important;
}

.edu-supdform-container {
  font-family: OpenSans;
  width: 95%;
  margin: auto;
}
::placeholder {
  font-size: 16px !important;
  font-weight: 400 !important;
  color: #999999 !important;
}

@media (min-width: 576px) {
  .edu-supdform-contacts-wr {
    flex-direction: row;
    justify-content: space-between;
  }
  .edu-supdform-mail {
    width: 40%;
  }

  .edu-supdform-phone {
    width: 40%;
  }
}

@media (min-width: 768px) {
  .edu-supdform-container {
    width: 80%;
  }
}

@media (min-width: 992px) {
  .edu-supdform-container {
    width: 80%;
  }
}

@media (min-width: 1200px) {
  .edu-supdform-container {
    width: 60%;
  }
}

@media (min-width: 1400px) {
  .edu-supdform-container {
    width: 40%;
  }
}

</style>