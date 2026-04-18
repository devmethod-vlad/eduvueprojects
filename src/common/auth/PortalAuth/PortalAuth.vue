<template>
    <div
      class="portalauth-component-container"
      :style="minAuthPanelHeightStyle">


      <template v-if="app.$state.errorText !==''">
        <div
            class="portalauth-component-global-error-wr"
            :style="minAuthPanelHeightStyle"
        >
          <warning-panel
              :title="app.$state.errorText"
          />
        </div>
      </template>

      <template v-else>
        <div
            v-show="app.$state.loading"
            class="portalauth-loading-wr">
          <div class="portalauth-loading-text">
            {{ app.$state.loadingText }}
          </div>

          <div class="portalauth-loading-icon">
            <content-loader />
          </div>
        </div>

        <template v-if="!app.$state.loading">
          <div v-if="app.$state.warningText !=='' && portalProps.$state.isVerbal" class="portalauth-warntext-wrapper">
            <error-panel
                :text="app.$state.warningText"
                :font-size="18"
            />
          </div>

          <template v-if="app.$state.loginFormVisible">

            <template v-if="portalProps.$state.showAnonymForm">

              <TabPanel
              >
                <template #anonymform>
                  <slot name="anonymform"></slot>
                </template>
              </TabPanel>

            </template>

            <template v-else>
              <StandaloneForm
              />
            </template>

          </template>

          <template v-if="app.$state.errorFormVisible">
            <auth-error-form
                @return-to-login-form="resetToLoginForm()"
            />
          </template>

          <template v-if="app.$state.localSubmitPanelVisible">
            <submit-panel
                v-show="!app.$state.loading"
                :show-banner-on-reject="true"
                :cancel-submit-auth="true"
                @auth-on-banner="resetToLoginForm(false)"
                @cancel-submit-auth="()=>{app.localSubmitPanelVisible=false; app.setUserInfo = true}"
            />
          </template>

        </template>
      </template>
    </div>
</template>
<script setup>
import WarningPanel from "@/common/ui/WarningPanel/WarningPanel.vue";
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import StandaloneForm from "@/common/auth/PortalAuth/components/StandaloneForm/StandaloneForm.vue";
import AuthErrorForm from "@/common/auth/PortalAuth/components/AuthErrorForm/AuthErrorForm.vue";
import TabPanel from "./components/TabPanel/TabPanel.vue";
import ContentLoader from "@/common/ui/ContentLoader/ContentLoader.vue";
import {portalConfigObject} from "@/objects/portalauthappconfig";
import {computed, onMounted, watch} from "vue";
import SubmitPanel from "./components/SubmitPanel/SubmitPanel.vue";
import {usePortalAuthAppStore} from "@/common/auth/PortalAuth/store/app";
import {useUserStore} from "@/common/auth/PortalAuth/store/user";
import {useUrlStore} from "@/common/auth/PortalAuth/store/url";
import {useConfigStore} from "@/common/auth/PortalAuth/store/config";
import {usePropsStore} from "@/common/auth/PortalAuth/store/props";
import {useLoginFormStore} from "@/common/auth/PortalAuth/store/loginform";
import {runAuthProcess} from "@/common/auth/PortalAuth/services/runauthprocess";


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
  },

  submitLocalAuth: {
    type: Boolean,
    default: false
  },

  showTabTitle:
      {
        type: Boolean,
        default: true
      },

  tabTitle:
      {
        type: String,
        default: 'Вопросы и ответы'
      }

})

// STORE
const app = usePortalAuthAppStore();
const userState = useUserStore();
const urlState = useUrlStore();
const appConfig = useConfigStore();
const portalProps = usePropsStore();
const loginForm = useLoginFormStore();


// METHODS
const setPropsStore = ()=>{
  let propsCopy = JSON.parse(JSON.stringify(props));
  delete propsCopy.appConfig;
  portalProps.$patch({...propsCopy});
}

const resetToLoginForm = (substitute=true) => {
  let submitInfoCopy = JSON.parse(JSON.stringify(app.$state.submitInfo));
  let loginFormCopy = JSON.parse(JSON.stringify(loginForm.$state));
  userState.$reset()
  app.$reset();
  loginForm.$reset();
  app.loginFormVisible = true;
  let storageKey = appConfig.$state.localStorage.userInfo.key;
  localStorage.removeItem(storageKey);
  if (substitute){
    if (submitInfoCopy.login !==''){
      loginForm.loginInput = submitInfoCopy.login;
    }
    if(submitInfoCopy.snils !==''){
      loginForm.snilsInput = submitInfoCopy.snils;
    }
    if(loginFormCopy.formError){
      loginForm.formError = true;
    }
  }
}

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
onMounted(async () => {
    // console.log("portal auth mount");
    // console.log("portal auth appConfig:", props.appConfig);
    // console.log("portal auth app:", app.$state);
    if(!app.$state.resetToLoginForm){
      app.loading = true;
      await setPropsStore()
      appConfig.$patch({...props.appConfig});
      app.loadingText = props.loadingText;
      await runAuthProcess(app, appConfig, portalProps, userState, urlState);
    }
    else {
      resetToLoginForm();
    }

})

// WATCH
watch(
    () => app.setUserInfo,
    (newVal) => {
      if(newVal){
        emits('setuserinfo', userState.$state, urlState.$state);
      }
    }
);

watch(
    () => app.unSuccessLogin,
    (newVal) => {
      if(newVal){
        emits('unsuccesslogin');
      }
    }
);

watch(
    () => app.resetToLoginForm,
    (newVal) => {
      // console.log("watch resetToLoginForm: ", newVal);
      if(newVal){
        resetToLoginForm();
      }
    },
    // {immediate: true}
);


</script>


<style scoped>
@import "css/portalauth.css";
</style>