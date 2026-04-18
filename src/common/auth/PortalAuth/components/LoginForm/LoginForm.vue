<template>
    <div class="em-login-form-container">
      <div v-if="loginForm.$state.loading && props.showLoading" class="em-login-form-loading">
        <div class="em-login-form-loading-wr">
          <div class="em-login-form-loading-text">
            Проверяем данные...
          </div>
          <div class="em-login-form-loading-icon">
            <content-loader />
          </div>
        </div>
      </div>

      <template v-else>

        <div class="em-login-form-wr">
          <div class="em-login-form-title">
            Авторизация
          </div>
          <div class="em-login-form-title-divider">

          </div>

          <form @submit.prevent="validateForm()"
                method="post" class="em-login-form"
                autocomplete="off"
          >
            <div class="vue-form-item em-form-login-input-wr">
              <div class="form-login-input-container">
                <label for="em-form-login-input" class="vue-form-label">Логин ЕМИАС</label>
                <input
                    @:focus="onFocus('login')"
                    type="text" class="vue-form-control"
                    :class="{'vue-input-error': loginForm.$state.errorStyleLogin}"
                    name="em-form-login-input" id="em-form-login-input"
                    v-model="reactiveLoginForm.loginInput.value"
                    placeholder="Введите логин с учетом регистра"
                    autocomplete="off"
                >
              </div>
              <template v-if="loginForm.$state.errorStyleLogin">
                <div class="vue-input-alert">
                  <error-panel
                      text="Обязательное поле"
                      :font-size="15"
                      font-color="#E04B37"
                  />
                </div>
              </template>
            </div>

            <div class="vue-form-item">
              <div class="form-login-input-container">
                <pass-input
                    v-model="reactiveLoginForm.snilsInput.value"
                    @pass-press-key="(event)=>{processPassInput(event)}"
                    @on-input-event="(event)=>{processInputEvent(event)}"
                    :alert="loginForm.$state.errorStyleSnils"
                    @pass-focus-in="onFocus('snils')"
                    title="Последние 4 цифры СНИЛС"
                    placeholder="Введите последние 4 цифры СНИЛС"
                    input-id="edu-pass-input"
                />
                <template v-if="loginForm.$state.errorStyleSnils">
                  <div class="vue-input-alert">
                    <error-panel
                        text="Обязательное поле"
                        :font-size="15"
                        font-color="#E04B37"
                    />
                  </div>
                </template>
<!--                <template v-if="loginForm.$state.formError">-->
<!--                  <div class="em-form-alert-wr">-->
<!--                    <error-panel-->
<!--                        text="Ошибка авторизации. Проверьте правильность введенных данных"-->
<!--                        :font-size="15"-->
<!--                        :icon-size="14"-->
<!--                        font-color="#E04B37"-->
<!--                    />-->
<!--                  </div>-->
<!--                </template>-->
              </div>
            </div>

            <div class="em-login-form-info-wr">
              <div
                  class="em-login-form-info-title"
                  @mouseenter="chevronColor='#157171'"
                  @mouseleave="chevronColor='#1D8585'"
                  @click.stop.prevent="loginForm.showInfoBlock=!loginForm.$state.showInfoBlock"
              >
                <div class="em-login-form-info-title-icon">
                  <template v-if="!loginForm.$state.showInfoBlock">
                    <app-icon
                        name="chevron-right"
                        :size="16"
                        :color="chevronColor"
                    />
                  </template>
                  <template v-else>
                    <app-icon
                        name="chevron-down"
                        :size="16"
                        :color="chevronColor"
                    />
                  </template>
                </div>

                <div class="em-login-form-info-title-text">
                  Как найти логин ЕМИАС и СНИЛС
                </div>

              </div>

              <transition name="slide">
                <div
                    v-if="loginForm.$state.showInfoBlock"
                    class="em-login-form-info-img"
                >
                  <a :href="appConfig.$state.apiUrl+appConfig.$state.authStaticUrl+'imgs/login-snils.png'" download>
                    <img
                        alt="Как найти логин ЕМИАС и СНИЛС"
                        :src="appConfig.$state.apiUrl+appConfig.$state.authStaticUrl+'imgs/login-snils.png'"
                    />
                  </a>
                </div>
              </transition>
            </div>

            <div
                class="em-login-form-errorform-link-wr"
                v-if="loginForm.$state.formError"
            >
              Если не можете авторизоваться, <span @click.prevent.stop="showErrorForm()" class="em-errorform-link">сообщите об ошибке</span>
            </div>

            <div class="vue-form-item em-login-form-button-wr">
              <button type="submit" class="vue-btn vue-btn-normal em-login-form-button">
                Продолжить
              </button>
            </div>
          </form>
        </div>
      </template>
    </div>

  <template v-if="showErrorModal">
    <login-form-error-modal
        @close-auth-error-modal="showErrorModal = false"
    />
  </template>
</template>

<script setup>
import LoginFormErrorModal from "@/common/auth/PortalAuth/components/LoginForm/components/LoginFormErrorModal.vue";
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ContentLoader from "@/common/ui/ContentLoader/ContentLoader.vue";
import {ref} from "vue";
import {getEmAuth} from "./services/getauth";
import PassInput from "@/common/ui/PassInput/PassInput.vue";
import {useConfigStore} from "@/common/auth/PortalAuth/store/config";
import {usePortalAuthAppStore} from "@/common/auth/PortalAuth/store/app";
import {useUserStore} from "@/common/auth/PortalAuth/store/user";
import {useLoginFormStore} from "@/common/auth/PortalAuth/store/loginform";
import {storeToRefs} from "pinia";

// EMITS
const emits = defineEmits(['showSubmitPanel']);

// PROPS
const props = defineProps({

    showLoading:
      {
            type: Boolean,
            default: true
      }
});

// STORE
const appConfig = useConfigStore();
const app = usePortalAuthAppStore();
const userState = useUserStore();
const loginForm = useLoginFormStore();
const reactiveLoginForm = storeToRefs(useLoginFormStore());

// DATA
const chevronColor = ref('#1D8585')

const showErrorModal = ref(false);

// METHODS

const isNumeric = (input)=>{
  return /^\d+$/.test(input);
}

const processPassInput =(event)=>{
  const allowedKeys = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Tab',
    'Enter'
  ];

  if (allowedKeys.includes(event.key)) {
    return; // Если клавиша разрешена, выходим из функции
  }

  // Проверяем, является ли нажатая клавиша цифрой
  if (!/^\d$/.test(event.key)) {
    event.preventDefault(); // Если не цифра, отменяем действие
  }
}

const processInputEvent = (event)=>{
  if (!isNumeric(event.target.value)){
    let snilsCopy = JSON.parse(JSON.stringify(loginForm.$state.snilsInput));
    if(snilsCopy.length !==0){
      snilsCopy = snilsCopy.replace(/\D/g, '')
      reactiveLoginForm.snilsInput.value = snilsCopy;

      let passInput = document.getElementById('edu-pass-input');

      if(passInput){
        passInput.value = snilsCopy;
      }
    }
  }
}


const showErrorForm = ()=>{
  app.submitInfo.login = loginForm.$state.loginInput;
  app.submitInfo.snils = loginForm.$state.snilsInput;
  app.errorFormVisible = true;
}

const validateForm = ()=>{
    loginForm.errorStyleSnils = false;
    loginForm.errorStyleLogin = false;
    loginForm.formError = false;

    let saveFlag = true;

    if (loginForm.$state.snilsInput.length < 4){
        loginForm.errorStyleSnils = true;
        saveFlag = false;
    }
    if (loginForm.$state.loginInput === ''){
        loginForm.errorStyleLogin = true;
        saveFlag = false;
    }

    if (saveFlag){
        getAuth();
    }
}

const onFocus = (target)=>{
  loginForm.formError = false;
  if (target === 'login'){
    loginForm.errorStyleLogin = false;
  }
  if (target === 'snils'){
    loginForm.errorStyleSnils = false;
  }
}

const getAuth = async ()=>{
  loginForm.loading = true;
  let emAuthAnswer = await getEmAuth(appConfig, loginForm.$state.loginInput.trim(), loginForm.$state.snilsInput.trim());
  // console.log("emAuthAnswer :", emAuthAnswer);

  if (emAuthAnswer['status'] === 'ok'){

    app.submitInfo.lastname = emAuthAnswer['info']['userlastname'];
    app.submitInfo.firstname = emAuthAnswer['info']['userfirstname'];
    app.submitInfo.secondname = emAuthAnswer['info']['usersecondname'];
    app.submitInfo.login = loginForm.$state.loginInput.trim();
    app.submitInfo.snils = emAuthAnswer['info']['snils'];
    emits('showSubmitPanel');
  }
  else {
    showErrorModal.value = true;
    loginForm.formError = true;
  }
  loginForm.loading = false;
}

</script>

<style>
.vue-input-alert .edu-warn-panel-icon{
  padding-top: unset !important;
}
</style>

<style scoped>
.em-errorform-link {
  color: #1D8585;
  cursor: pointer;
}

.em-errorform-link:hover {
  color: #157171;
}

.em-login-form-errorform-link-wr {
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  color: #333333;
  margin-bottom: 16px;
}


.form-login-input-container .edu-warn-panel {
  margin-bottom: unset !important;
}

.em-form-alert-wr {
  margin-top: 8px;
}

.vue-input-alert {
  margin-top: 8px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
}

.form-login-input-container {
  display: flex;
  flex-direction: column;
}

.vue-form-label {
  font-size: 15px;
  line-height: 24px;
}

.em-login-form-info-img img {
  width: 100%;
  height: auto;
}

.em-login-form-info-img {
  display: flex;
}

.em-login-form-info-title-text {
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
  color: #1D8585;
}

.em-login-form-info-title-icon {
  cursor: pointer;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.em-login-form-info-title:hover .em-login-form-info-title-text{
  color: #157171;
}

.em-login-form-info-title {
  display: flex;
  justify-content: flex-start;
}

.em-login-form-info-wr {
  margin-bottom: 24px;
}

.em-login-form-title-divider {
  border-bottom: 1px #DFE1E6 solid;
  margin-bottom: 48px;
}

.em-login-form-title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
}

.em-login-form-loading-text {
  margin-bottom: 30px;
}
.em-login-form-container {
  position: relative;
}

.em-login-form-loading-wr {
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  position: absolute;
}


.em-login-form-loading {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  font-size: 20px;
  text-align: center;
  font-weight: 400;
  background-color: white;
  opacity: 0.8;
  pointer-events: none;
}

</style>