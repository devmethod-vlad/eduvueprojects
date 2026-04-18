<template>

  <template v-if="panelVisible">
    <modal-content-new
        modalsize="small"
        @close-modal="emits('returnToLoginForm'); panelVisible=false;"
        :ignore-elements="['em-auth-error-form-panel']"
    >
      <div class="em-auth-error-form-panel" id="em-auth-error-form-panel">
        <div class="em-auth-error-form-panel-icon">
          <template v-if="!panelError">
            <app-icon
                name="check-circle-big"
                :size="48"
                color="#79B821"
            />
          </template>
        </div>
        <div
            class="em-auth-error-form-panel-text"
            :class="{'auth-error-form-panel-text-normal': !panelError, 'auth-error-form-panel-text-error': panelError}"
        >
          Сообщение отправлено. Мы свяжемся с вами в ближайшее время
        </div>
      </div>
    </modal-content-new>
  </template>

  <template v-else>
      <div class="em-auth-error-form-modal">

        <modal-content-new
            @close-modal="app.resetToLoginForm = true"
            header-text="Сообщить об ошибке"
            :ignore-elements="['em-auth-error-form-container']"
        >
          <div class="em-auth-error-form-container" id="em-auth-error-form-container">

            <template v-if="app.$state.submitInfo.login !=='' || app.$state.submitInfo.snils !=='' || app.$state.submitInfo.fio !==''">

              <div class="auth-error-form-info-block">

                <div class="em-info-block-main-info">
                  <div
                      class="em-info-block-input-wr"
                      :class="{'em-info-block-input-wr-two-column':app.$state.submitInfo.fio !==''}"
                  >
                    <div class="em-info-block-title">
                      Введены данные:
                    </div>
                    <div
                        v-if="app.$state.submitInfo.login !==''"
                        class="em-info-block-login-info"
                    >
                      Логин:&nbsp;&nbsp;<span class="em-info-block-span">{{ app.$state.submitInfo.login }}</span>
                    </div>
                    <div
                        v-if="app.$state.submitInfo.snils !==''"
                        class="em-info-block-snils-info"
                    >
                      СНИЛС:&nbsp;&nbsp;<span class="em-info-block-span">{{ app.$state.submitInfo.snils }}</span>
                    </div>
                  </div>

                  <template v-if="app.$state.submitInfo.fio !==''">
                    <div
                        class="em-info-block-fio-wr'"
                        :class="{'em-info-block-fio-wr-two-column': app.$state.submitInfo.fio !==''}"
                    >
                      <div class="em-info-block-title">
                        Найден пользователь
                      </div>
                      <div
                          class="em-info-block-fio-info"
                      >
                        ФИО:&nbsp;&nbsp;<span class="em-info-block-span">{{ app.$state.submitInfo.fio }}</span>
                      </div>
                    </div>
                  </template>
                </div>

                <div class="em-info-block-disclaimer">
                  <div class="em-info-block-disc-icon">
                    <app-icon
                        name="info-fill"
                        :size="13"
                        color="#38A1D6"
                    />
                  </div>
                  <div class="em-info-block-disc-text">
                    Если вы ошиблись при вводе данных,<span @click="emits('returnToLoginForm');" class="em-info-block-return-span"> вернитесь к авторизациии</span>
                  </div>
                </div>
              </div>
            </template>

            <div class="em-auth-error-form-title">
              Укажите контакты для обратной связи
            </div>

            <div class="em-auth-error-form-workspace">
              <div
                  class="em-auth-error-form"
              >
                <div class="em-auth-error-form-fio-wr">
                  <label for="em-auth-error-form-fio-input" class="vue-form-label">Ваше ФИО*</label>
                  <input
                      @focus="onFocus('fio')"
                      type="text" class="vue-form-control"
                      :class="{'vue-input-error':errorStyleFio}"
                      name="em-auth-error-form-fio-input" id="em-auth-error-form-fio-input"
                      v-model="fioInput"
                      placeholder="Введите ФИО полностью"
                  >
                  <template v-if="errorStyleFio">
                    <div class="vue-input-alert">
                      <error-panel
                          :text="errorFioText"
                          :font-size="15"
                          font-color="#E04B37"
                          :icon-size="18"
                      />
                    </div>
                  </template>
                </div>

                <div class="em-auth-error-form-mo-wr">
                  <label for="em-auth-error-form-mo-input" class="vue-form-label">Название медорганизации*</label>
                  <input
                      @focus="onFocus('mo')"
                      type="text" class="vue-form-control"
                      :class="{'vue-input-error':errorStyleMo}"
                      name="em-auth-error-form-mo-input" id="em-auth-error-form-mo-input"
                      v-model="moInput"
                      placeholder="Введите название"
                  >
                  <template v-if="errorStyleMo">
                    <div class="vue-input-alert">
                      <error-panel
                          :text="errorMoText"
                          :font-size="15"
                          font-color="#E04B37"
                          :icon-size="18"
                      />
                    </div>
                  </template>
                </div>

                <div class ="em-auth-error-form-contact-group">
                  <div class="em-auth-error-form-mail-wr">
                    <div class="em-auth-error-form-mail-container">
                      <div class="em-auth-error-form-mail">
                        <label for="em-auth-error-form-mail-input" class="vue-form-label">Электронная почта*</label>
                        <input
                            @focus="onFocus('mail')"
                            type="text" class="vue-form-control"
                            :class="{'vue-input-error':errorStyleMail}"
                            name="em-auth-error-form-mail-input" id="em-auth-error-form-mail-input"
                            v-model="mailInput"
                            placeholder="Введите email"
                        >
                        <template v-if="errorStyleMail">
                          <div class="vue-input-alert">
                            <error-panel
                                :text="mailErrorText"
                                :font-size="15"
                                font-color="#E04B37"
                                :icon-size="18"
                            />
                          </div>
                        </template>
                      </div>
                    </div>

                  </div>

                  <div class="em-auth-error-form-phone-wr">
                    <div class="em-auth-error-form-phone-container">
                      <div class="em-auth-error-form-phone">
                        <label for="em-auth-error-form-phone-input" class="vue-form-label">Телефон*</label>
                        <input
                            @focus="onFocus('phone')"
                            @focusout="onFocusOut('phone')"
                            type="text"
                            class="vue-form-control"
                            :class="{'vue-input-error':errorStylePhone, 'em-auth-error-form-phone-input-focus': phoneInputFocus}"
                            name="em-auth-error-form-phone-input" id="em-auth-error-form-phone-input"
                            v-model="phoneInput"
                            v-maska="maskedObject"
                            data-maska="+7 ### ###-##-##"
                            :placeholder="phonePlaceHolder"
                        >
                        <template v-if="errorStylePhone">
                          <div class="vue-input-alert">
                            <error-panel
                                :text="phoneErrorText"
                                :font-size="15"
                                font-color="#E04B37"
                                :icon-size="18"
                            />
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>

                </div>


              </div>
            </div>
          </div>
          <div class="em-auth-error-form-footer">
            <div class="error-form-footer-buttons-wrapper">
              <button
                  class="vue-btn vue-btn-warn-wobg auth-error-form-cancel-button"
                  type="button"
                  @click.stop.prevent="app.resetToLoginForm = true"
              >
                Отменить
              </button>

              <button
                  class="vue-btn vue-btn-normal-wobg auth-error-form-confirm-button"
                  type="button"
                  @click.stop.prevent="validateErrorForm()"
              >
                Сообщить об ошибке
              </button>
            </div>
          </div>

        </modal-content-new>

      </div>
  </template>

</template>

<script setup>
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";
import {reactive, ref} from "vue";
import { vMaska } from "maska";
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {usePortalAuthAppStore} from "@/common/auth/PortalAuth/store/app";
import {useConfigStore} from "@/common/auth/PortalAuth/store/config";
import {sendReport} from "@/common/auth/PortalAuth/components/SubmitPanel/services/sendreport";

const errorFioTextInitial = "Обязательное поле";
const errorMoTextInitial = "Обязательное поле";
const phonePlaceholderInitial = "+7 ___ ___-__-__";

// EMITS
const emits = defineEmits(['returnToLoginForm'])


// STORE
const app = usePortalAuthAppStore();
const appConfig = useConfigStore()


// DATA
const panelError = ref(false);
const maskedObject = reactive({});
const phonePlaceHolder = ref(phonePlaceholderInitial);
const phoneInputFocus = ref(false);
const fioInput = ref('');
const errorStyleFio = ref(false);
const errorFioText = ref(errorFioTextInitial)
const moInput = ref('');
const errorStyleMo = ref(false);
const errorMoText = ref(errorMoTextInitial);
const mailInput = ref('');
const mailErrorText = ref('Обязательное поле');
const errorStyleMail = ref(false);
const phoneInput = ref('');
const phoneErrorText = ref('Обязательное поле');
const errorStylePhone = ref(false);
const panelVisible = ref(false);


// METHODS
const isCyrillicAndDigitsWithPunctuation = (input)=> {
  const regex = /^[А-Яа-яЁё0-9\s.,!?;:—"()№]+$/;
  return regex.test(input);
}

function isCyrillicAndSpacesOnly(input) {
  const regex = /^(?=.*[а-яА-Я])[а-яА-ЯёЁ\s-]+$/;
  return regex.test(input);
}

const isValidEmail = (email) =>{
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

const resetErrors = ()=>{
  errorStyleFio.value = false;
  errorFioText.value = errorFioTextInitial;
  errorStyleMo.value = false;
  errorMoText.value = errorMoTextInitial;
  mailErrorText.value = "Обязательное поле";
  errorStyleMail.value = false;
  errorStylePhone.value = false;
  phoneErrorText.value = "Обязательное поле";
}

const onFocusOut = (target) => {
  if (target === 'phone'){
    if(phoneInput.value === '+7 '){
      phoneInput.value = '';
    }
    phoneInputFocus.value = false;
    phonePlaceHolder.value=phonePlaceholderInitial;
  }
}

const onFocus = (target) =>{
  if (target === 'fio'){
    errorStyleFio.value = false;
    errorFioText.value = errorFioTextInitial;
  }
  if (target === 'mo'){
    errorStyleMo.value = false;
    errorMoText.value = errorMoTextInitial;
  }
  if (target === 'mail'){
    mailErrorText.value = "Обязательное поле";
    errorStyleMail.value = false;
  }
  if (target === 'phone'){
    if(phoneInput.value === ''){
      phoneInput.value = '+7 ';
    }
    phoneInputFocus.value = true;
    phonePlaceHolder.value="+7"
    errorStylePhone.value = false;
    phoneErrorText.value = "Обязательное поле";
  }

}

const validateErrorForm = ()=>{
  resetErrors();
  let sendFlag = true;

  let fioInputClear = fioInput.value.replace(/\s+/g, " ").replace(/\r+/g, " ");

  let fioInputValid = isCyrillicAndSpacesOnly(fioInputClear);

  let fioSpaceList = fioInputClear.trim().split(' ');

  if (fioInputClear.trim().length === 0 || !fioInputValid || fioSpaceList.length < 2) {
    errorStyleFio.value = true
    sendFlag = false;

    if (fioInputClear.length !== 0){
      if(!fioInputValid){
        errorFioText.value = "Пожалуйста, введите данные на русском языке";
      }
      else {
        if(fioSpaceList.length < 2){
          errorFioText.value = "Введите ФИО полностью";
        }
      }
    }
  }

  let moInputClear = moInput.value.replace(/\s+/g, " ").replace(/\r+/g, " ");

  let moInputValid = isCyrillicAndDigitsWithPunctuation(moInputClear);

  if(moInputClear.trim().length ===0 || !moInputValid){
    errorStyleMo.value = true;
    sendFlag = false;
    if (moInputClear.length !== 0){
      if(!moInputValid){
        errorMoText.value = "Пожалуйста, введите данные на русском языке";
      }
    }
  }

  if (mailInput.value === ''){
    errorStyleMail.value = true;
    mailErrorText.value = 'Обязательное поле';
    sendFlag = false;
  }

  if (!isValidEmail(mailInput.value) && mailInput.value !== ''){
    errorStyleMail.value = true;
    mailErrorText.value = 'Неверный формат';
    sendFlag = false;
  }
  if (phoneInput.value === ''){
    errorStylePhone.value = true;
    phoneErrorText.value = 'Обязательное поле';
    sendFlag = false;
  }

  if (phoneInput.value !== '' && !maskedObject.completed){
    errorStylePhone.value = true;
    phoneErrorText.value = 'Неверный формат';
    sendFlag = false;
  }
  if(sendFlag){
    sendMessage();
  }

}

const sendMessage = async ()=>{
  let reportMessage = "⚠ Пользователь веб-версии сообщил об ошибке авторизации: ";
  if (app.$state.submitInfo.fio !==''){
    reportMessage = reportMessage + 'ФИО пользователя в базе определено неверно';
  }
  else {
    reportMessage = reportMessage + 'введенная пара логин-СНИЛС отсутствует в базе';
  }
  reportMessage = reportMessage + '\n\n<b>Введены данные:</b>\n'
  if(app.$state.submitInfo.login !==''){
    reportMessage = reportMessage + '  • логин: '+ app.$state.submitInfo.login+'\n';
  }
  if(app.$state.submitInfo.snils !==''){
    reportMessage = reportMessage + '  • СНИЛС: '+ app.$state.submitInfo.snils+'\n';
  }
  if (app.$state.submitInfo.fio !==''){
    reportMessage = reportMessage + '<b>Найден пользователь:</b>\n  • ФИО: '+ app.$state.submitInfo.fio+'\n';
  }

  reportMessage = reportMessage + '\n<b>Контакты для обратной связи:</b>\n<blockquote><code>';

  reportMessage = reportMessage + '  • ФИО: '+ fioInput.value +'\n';
  reportMessage = reportMessage + '  • МО: '+ moInput.value +'\n';
  reportMessage = reportMessage + '  • email: '+ mailInput.value +'\n';
  reportMessage = reportMessage + '  • телефон: '+ phoneInput.value +'</code></blockquote>';

  await sendReport(appConfig.$state, reportMessage);
  panelVisible.value = true;
}


</script>

<style>
.em-auth-error-form-phone-input-focus::placeholder {
  color: #333333 !important;
}

.em-auth-error-form-modal .vue-modal-body {
  padding: unset !important;
}
</style>

<style scoped>
.em-info-block-input-wr {
  width: 100%;
}

.em-info-block-input-wr-two-column {
  width: 100%;
}

.em-info-block-fio-wr-two-column {
  width: 100%;
}

.em-info-block-fio-wr {
  width: 100%;
  margin-top: 4px;
}

.em-auth-error-form-panel-text {
  text-align: center;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
}

.em-auth-error-form-panel-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.em-auth-error-form-panel {
  padding-top: 40px;
}

.em-auth-error-form .vue-input-alert {
  margin-top: 8px;
}

.em-info-block-disc-text {
  color: #333333;
}

.em-info-block-disc-icon {
  padding-top: 1px;
  margin-right: 8px;
}

.auth-error-form-confirm-button {
  margin-left: unset;
  margin-top: 8px;
}

.em-auth-error-form-footer {
  padding-right: 24px;
  padding-left: 24px;
  display: flex;
  justify-content: flex-end;
  background-color: #F2F2F2;
  border-top: 1px #CCCCCC solid;
}


.error-form-footer-buttons-wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 16px;
  padding-bottom: 16px;
}

.em-auth-error-form-contact-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.em-auth-error-form-mail-container {
  display: flex;
  width: 100%;
}

.em-auth-error-form-mail-wr {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.em-auth-error-form-mail {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.em-auth-error-form-phone-container {
  width: 100%;
  display: flex;
}

.em-auth-error-form-phone-wr {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.em-auth-error-form-phone {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.em-auth-error-form-mo-wr {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.em-auth-error-form-fio-wr {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.em-auth-error-form {
  display: flex;
  flex-direction: column;
}

.em-auth-error-form-title {
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  line-height: 24px;
  margin-bottom: 16px;
}

.em-info-block-return-span {
  color: #1D8585;
  cursor: pointer;
}
.em-info-block-return-span:hover {
  color: #157171;
}

.em-info-block-disclaimer {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
}


.em-info-block-span {
  font-weight: 400 !important;
}

.em-info-block-fio-info {
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  color: #333333;
}

.em-info-block-snils-info {
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  color: #333333;
}

.em-info-block-login-info {
  display: flex;
  flex-wrap: wrap;
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  color: #333333;
}

.em-info-block-title {
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #757575;
}
.em-info-block-main-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.auth-error-form-info-block {
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #F2F2F2;
  border-radius: 4px;
  margin-bottom: 16px;
}


.em-auth-error-form-container {
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
}

@media (min-width: 576px) {
  .error-form-footer-buttons-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .auth-error-form-confirm-button {
    margin-top: unset;
    margin-left: 16px;
  }
}

@media (min-width: 768px) {
  .em-info-block-input-wr-two-column {
    padding-right: 12px;
    width: 50%;
  }

  .em-info-block-fio-wr-two-column {
    padding-left: 12px;
    width: 50%;
  }

  .em-info-block-main-info {
    flex-direction: row;
  }
  .em-info-block-fio-wr {
    margin-top: unset;
  }
  .em-auth-error-form-contact-group {
    flex-direction: row;
    margin-bottom: 108px;
  }
  .em-auth-error-form-mail-wr {
    width: 50%;
  }
  .em-auth-error-form-phone-wr {
    width: 50%;
  }
  .em-auth-error-form-mail {
    margin-bottom: unset;
  }
  .em-auth-error-form-mail-container {
    width: 97.5%;
  }
  .em-auth-error-form-phone-container {
    width: 97.5%;
  }
}

@media (min-width: 992px) {

}

@media (min-width: 1200px) {

}

@media (min-width: 1400px) {

}

</style>