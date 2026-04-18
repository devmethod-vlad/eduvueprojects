<template>
    <div
      class="portalauth-component-container"
      :style="minAuthPanelHeightStyle">

        <template v-if="loading">
            <div class="portalauth-loading-wr">
                <div class="portalauth-loading-text">
                    {{ props.loadingText }}
                </div>

                <div class="portalauth-loading-icon">
                    <content-loader />
                </div>
            </div>
        </template>

        <template v-else>
            <div v-if="warningText !=='' && isVerbal" class="portalauth-warntext-wrapper">
                {{ warningText }}
            </div>

            <template v-if="loginFormVisible">

                <template v-if="props.showAnonymForm">

                        <TabPanel
                          :app-config="props.appConfig"
                          @emituserstate="(userInfo)=>{emits('setuserinfo', userInfo, urlState)}"
                        >
                            <template #anonymform>
                                <slot name="anonymform"></slot>
                            </template>
                        </TabPanel>

                </template>

                <template v-else>
                        <template v-if="Object.keys(submitInfo).length !== 0">

                            <div class="login-form-standalone-submit-panel">
                                <submit-panel v-show="!loading"
                                              :app-config="props.appConfig"
                                              :submit-info="submitInfo"
                                              :url-state="urlState"
                                              @closereportpanel="()=>{submitInfo={}}"
                                              @emituserstate="(userInfo)=>{emits('setuserinfo', userInfo, urlState)}"
                                              @unsuccessubmitapi="emits('unsuccesslogin')"
                                />
                            </div>
                        </template>
                        <template v-else>
                            <div class="standalone-login-form">
                                <LoginForm
                                  :app-config="props.appConfig"
                                  @submitdata="(submitObject)=>{submitInfo = submitObject}"
                                />
                            </div>
                        </template>

                </template>

            </template>

        </template>

    </div>
</template>
<script setup>
import TabPanel from "./components/TabPanel/TabPanel.vue";
import ContentLoader from "./components/ContentLoader/ContentLoader.vue";
import {portalAuthUrlObject} from "./objects/urlparams";
import {portalConfigObject} from "@/objects/portalauthappconfig";
import {user_object} from "@/objects/user";
import {computed, onMounted, reactive, ref} from "vue";
import {setUrlParams} from "./services/seturlparams";
import {processTelegramTransition} from "./services/authtype/procteltransition";
import {processWikiAuth} from "./services/authtype/procwikiauth";
import {processLocalhostAuth} from "./services/authtype/proclocalauth";
import {processLocalTokenAuth} from "./services/authtype/procloctokenauth";
import LoginForm from "./components/LoginForm/LoginForm.vue";
import SubmitPanel from "./components/SubmitPanel/SubmitPanel.vue";

// EMITS
const emits = defineEmits(['setuserinfo', 'unsuccesslogin']);

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

    localHostAuth: {
        type: Boolean,
        default: true
    },
    authByLink: {
        type: Boolean,
        default: true
    },
    authByStorageToken: {
        type: Boolean,
        default: true
    },
    authByEdu: {
        type: Boolean,
        default: true
    },
    manualAuth:{
        type: Boolean,
        default: false
    },

    showLoginForm: {
        type: Boolean,
        default: true
    },

    isVerbal: {
        type: Boolean,
        default: true
    },

		showAnonymForm: {
				type: Boolean,
				default: false,
				required: true
		},

    loadingText: {
        type: String,
        default: 'Инициализация данных...'
    }


})

// DATA
const userState = reactive({...user_object});
const urlState = reactive({...portalAuthUrlObject});

const submitInfo = ref({});

const warningText = ref('');
const loginFormVisible = ref(false);
const loading = ref(true);

// COMPUTED
const minAuthPanelHeightStyle = computed(()=>{
  let authStyle = '';
  if (props.appConfig.minAuthPanelHeight){
    if (Number(props.appConfig.minAuthPanelHeight)>0){
      authStyle = "min-height: "+props.appConfig.minAuthPanelHeight.toString()+"px;";
    }
  }
  return authStyle;
})


// LIFECYCLE
onMounted(async ()=>{
    console.log("portal auth mount");
    console.log("portal auth appConfig:", props.appConfig);
		await setUrlParams(props.appConfig, urlState);
    console.log("portal auth urlState:", urlState);

    //Определяем порядок авторизации:

    //1. Авторизация по ссылке. Она нужна для перехода и автоматической авторизации
    //из бота или других приложений. При этом у пользователя нет ничего, кроме токена в url
    if (props.authByLink && !userState.auth){

        console.log("props.authByLink && !userState.auth");
        //Проверяем наличие get параметр source - из какого приложения сделан переход
        if (urlState.source !=='') {

            console.log("urlState.source !==''");
            //Обрабатываем случай, когда переход совершен из telegram
            if (urlState.source === 'telegram' && urlState.telegram.telegramtoken !=='') {
              console.log("urlState.source === 'telegram' && urlState.telegram.telegramtoken !==''");

                let pttAnswer = await processTelegramTransition(urlState, props.appConfig, userState);

                console.log("processTelegramTransition answer: ", pttAnswer);

                if (pttAnswer.status === 'ok'){
                    emits('setuserinfo', userState, urlState);
								}
                else {
                    warningText.value = pttAnswer.info.warningText
								}

            }
        }
    }

    //2. Авторизация c помощью api портала учебных материалов.
    //Запрос на "rest/api/user/current" отдает информацию о том
    //зарегистрирован пользователь на портале или нет
    if (props.authByEdu && !userState.auth){
        console.log("props.authByEdu && !userState.auth");

        let pwAnswer = await processWikiAuth(userState, props.appConfig);

        console.log("processWikiAuth answer : ", pwAnswer);

        if (pwAnswer.status === 'ok'){
            emits('setuserinfo', userState, urlState);
        }
        else {
            warningText.value = pwAnswer.info.warningText
        }
    }

    //3. Авторизация c помощью localhost сервиса. Сервис доступен с АРМов медработников
    //при обращении к локальному хосту отдаются данные пользователя - логин, ip и прочее
    if(props.localHostAuth && !userState.auth){
        console.log("props.localHostAuth && !userState.auth");

				let lhAnswer = await processLocalhostAuth(userState, props.appConfig);

        console.log("processLocalhostAuth answer : ", lhAnswer);

        if (lhAnswer.status === 'ok'){
            emits('setuserinfo', userState, urlState);
        }
    }

    //4. Авторизация по токену в localStorage.
    if(props.authByStorageToken && !userState.auth){

        console.log("props.authByStorageToken && !userState.auth");

        // await console.log("авторизация по токену");
        //Проверяем, есть ли в localStorage данные с ключом userToken
        let storageKey = props.appConfig.localStorage.userInfo.key;
        if (localStorage.getItem(storageKey)){
            console.log("if (localStorage.getItem(storageKey))");
						let ltAnswer = await processLocalTokenAuth(userState, props.appConfig);
            console.log("processLocalTokenAuth answer ", ltAnswer);
            if (ltAnswer.status === 'ok'){
                emits('setuserinfo', userState, urlState);
            }
        }

    }

    //Если авторизация не прошла, в качестве основной формы показываем
    //форму для регистрации мед.работников (логин+СНИЛС)
    if(!userState.auth){
        if(props.showLoginForm){
            loginFormVisible.value = true;
        }
        else {
            emits('unsuccesslogin');
        }
    }
    loading.value = false;

})

</script>

<style scoped>
@import "css/portalauth.css";
</style>