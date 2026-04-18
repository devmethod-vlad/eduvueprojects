<template>
    <div v-if="loading && props.showLoading" class="em-login-form-loading">
        <div class="em-login-form-loading-text">
            Проверяем данные...
        </div>
        <div class="em-login-form-loading-icon">
            <content-loader />
        </div>
    </div>

    <div v-else class="em-login-form-container">
        <div v-if="helpFormVisible" class="em-login-form-help-container">
<!--            <help-form />-->
        </div>


            <div class="em-login-form-wr">
                    <form @submit.prevent="validateForm()"
                          method="post" class="em-login-form">
                            <div class="vue-form-item em-form-login-input-wr">
                                <label for="em-form-login-input" class="vue-form-label">Логин ЕМИАС</label>
                                <input
                                  @:focus="onFocus('login')"
                                  type="text" class="vue-form-control"
                                  :class="{'vue-input-error':errorStyleLogin}"
                                  name="em-form-login-input" id="em-form-login-input"
                                  v-model="loginInput"
                                >
                            </div>
                            <div class="vue-form-item em-form-snils-input-wr">
                                <label
                                  for="em-form-snils-input"
                                  class="vue-form-label">
                                    Последние 4 цифры СНИЛС
                                </label>
                                <input
                                  type="password" maxlength="4"
                                  @focus="onFocus('snils')" class="vue-form-control"
                                  :class="{'vue-passinput-error':errorStyleSnils}" name="em-form-snils-input"
                                  id="em-form-snils-input" v-model="snilsInput"
                                  autocomplete="off"
                                >
                            </div>
                            <div class="vue-form-item em-login-form-button-wr">
                                <button type="submit" class="vue-btn vue-btn-normal em-login-form-button">
                                    Войти
                                </button>
                            </div>
                    </form>
            </div>

            <div v-if="validationText !==''" class="em-form-login-validtext-wr">
              <div class="em-form-login-validtext-icon">
                <app-icon
                  name="warning"
                  :size="20"
                />
              </div>

              <div class="em-form-login-validtext">
                {{ validationText }}
              </div>
            </div>
    </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ContentLoader from "../ContentLoader/ContentLoader.vue";
import {portalConfigObject} from "@/objects/portalauthappconfig";
import {ref} from "vue";
import {getEmAuth} from "./services/getauth";

let validText = "Проверьте заполнение формы. Некоторые поля не заполнены или заполнены неверно";
// import HelpForm from "../../components/LoginForm/components/HelpForm/HelpForm.vue";

// EMITS
const emits = defineEmits(
  [
    'startloading',
    'stoploading',
    'submitdata',
    'unsuccesslogin'
  ]);

// PROPS
const props = defineProps({
    appConfig:
        {
            type: Object,
            default(){
                return {...portalConfigObject};
            },

            required: true

        },
    showLoading:
      {
            type: Boolean,
            default: true
      }
});

// DATA
const loginInput = ref('');
const snilsInput = ref('');
const errorStyleLogin = ref(false);
const errorStyleSnils = ref(false);
const loading = ref(false);

const validationText = ref('');

const helpFormVisible = ref(false);

// METHODS
const validateForm = ()=>{

    validationText.value = '';
    errorStyleSnils.value = false;
    errorStyleLogin.value = false;

    let saveFlag = true;

    if (snilsInput.value.length < 4){
        errorStyleSnils.value = true;
        saveFlag = false;
    }
    if (loginInput.value === ''){
        errorStyleLogin.value = true;
        saveFlag = false;
    }

    if (saveFlag){
        getAuth();
    }
    else {
      validationText.value = validText;
    }
}

const onFocus = (target)=>{
  validationText.value = '';
  if (target === 'login'){
    errorStyleLogin.value = false;
  }
  if (target === 'snils'){
    errorStyleSnils.value = false;
  }
}

const getAuth = async ()=>{
  loading.value = true;
  emits('startloading');
  let emAuthAnswer = await getEmAuth(props.appConfig, loginInput.value.trim(), snilsInput.value.trim());
  console.log("emAuthAnswer :", emAuthAnswer);

  if (emAuthAnswer['status'] === 'ok'){

    let submitObject = {};
    submitObject['lastname'] = emAuthAnswer['info']['userlastname'];
    submitObject['firstname'] = emAuthAnswer['info']['userfirstname'];
    submitObject['secondname'] = emAuthAnswer['info']['usersecondname'];
    submitObject['login'] = loginInput.value.trim();
    submitObject['snils'] = emAuthAnswer['info']['snils'];

    emits('submitdata', submitObject);
  }
  else {
    if(emAuthAnswer['info']['error_mess_user']){
      validationText.value = await emAuthAnswer['info']['error_mess_user'];
    }
    else {
      validationText.value = 'При получении данных возникла ошибка';
    }
  }
  loading.value = false;
  emits('stoploading');
}

</script>

<style scoped>
.em-login-form-loading-text {
  margin-bottom: 30px;
}

.em-login-form-loading {
  font-size: 20px;
  text-align: center;
  font-weight: 400;
  padding-top: 100px;
}

.em-form-login-validtext {
  font-size: 20px;
  font-weight: 400;
  color: #E04B37;
}

.em-form-login-validtext-icon {
  padding-top: 5px;
  padding-right: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.em-login-form {
    margin-top: 30px;
}

.em-form-login-validtext-wr{
  display: flex;
  justify-content: flex-start;
}
</style>