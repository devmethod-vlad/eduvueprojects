<template>
  <div>
    <template v-if="props.panelType === 'page'">
      <div class="em-submit-panel-container">
        <div class="em-submit-panel">
          <div class="em-submit-panel-title">
            Авторизация
          </div>

          <div class="em-submit-panel-workspace">
            <div class="em-submit-panel-text-wr">
              {{ fio }} - это вы?
            </div>
            <div class="em-submit-panel-button-wr">
              <button
                  type="button" @click.stop.prevent="props.showBannerOnReject ? rejectAuthBannerVisible=true : showErrorForm()"
                  class="vue-btn vue-btn-warn-wobg em-submit-panel-button-no"
                  id="em-submit-panel-button-no"
              >
                Нет
              </button>

              <button type="button"
                      @click.prevent.stop="props.cancelSubmitAuth ? emits('cancelSubmitAuth') : submitAuthInfo()"
                      class="vue-btn vue-btn-normal em-submit-panel-button-yes"
              >
                Да
              </button>
            </div>
          </div>
        </div>
        <template v-if="rejectAuthBannerVisible">
          <submit-reject-banner
              @close-auth-banner-modal="rejectAuthBannerVisible=false"
              @cancel-on-banner="rejectAuthBannerVisible=false"
              @auth-on-banner="emits('authOnBanner')"
          />

        </template>
      </div>
    </template>

    <template v-if="props.panelType === 'modal'">
      <ModalContentNew
          modalsize="small"
          @close-modal="app.resetToLoginForm = true"
          :ignore-elements="['em-submit-panel-modal-container']"
      >
        <div
            class="em-submit-panel-modal-container"
            id="em-submit-panel-modal-container"
        >
          <div class="em-submit-panel-modal-text">
            {{ fio }} - это вы?
          </div>
          <div class="em-submit-panel-buttons">
            <button
                type="button" @click.stop.prevent="props.showBannerOnReject ? rejectAuthBannerVisible=true : showErrorForm()"
                class="vue-btn vue-btn-warn-wobg em-submit-panel-modal-button-no"
                id="em-submit-panel-button-no"
            >
              Нет
            </button>

            <button type="button"
                    @click.prevent.stop="props.cancelSubmitAuth ? emits('cancelSubmitAuth') : submitAuthInfo()"
                    class="vue-btn vue-btn-normal em-submit-panel-modal-button-yes"
            >
              Да
            </button>
          </div>
        </div>

      </ModalContentNew>
    </template>
  </div>
</template>
<script setup>
import SubmitRejectBanner
  from "@/common/auth/PortalAuth/components/SubmitPanel/components/SubmitRejectBanner/SubmitRejectBanner.vue";
import {submitAuth} from "./services/submitauth";
import {computed, ref} from "vue";
import {useConfigStore} from "@/common/auth/PortalAuth/store/config";
import {usePortalAuthAppStore} from "@/common/auth/PortalAuth/store/app";
import {useUrlStore} from "@/common/auth/PortalAuth/store/url";
import {useUserStore} from "@/common/auth/PortalAuth/store/user";
import ModalContentNew from "@/common/ui/ModalContentNew/ModalContentNew.vue";

// EMITS
const emits = defineEmits(
  [
    'startloading',
    'stoploading',
    'authOnBanner',
    'cancelSubmitAuth',
    'showErrorForm',
    'closeSubmitModal'
  ]);


// PROPS
const props = defineProps({
    showBannerOnReject: {
      type: Boolean,
      default: false
    },

    cancelSubmitAuth: {
      type: Boolean,
      default: false
    },

    panelType: {
      type: String,
      //modal page
      default: "page"
    }
});

// STORE
const appConfig = useConfigStore();
const app = usePortalAuthAppStore();
const urlState = useUrlStore();
const userState = useUserStore();


// DATA
const rejectAuthBannerVisible = ref(false);

// METHODS
const showErrorForm = ()=>{
  app.localSubmitPanelVisible=false;
  app.standaloneFormSubmitPanelVisible = false;
  app.tabsSubmitPanelVisible=false;
  app.submitInfo.fio = fio.value;
  app.errorFormVisible = true;
}


const submitAuthInfo = async () =>{
  // console.log("submitAuthInfo");
  await emits('startloading');

  if(urlState.$state.webapp.webappauthtelid !==''){
    app.submitInfo.usertelid=urlState.$state.webapp.webappauthtelid;
  }

  if(urlState.$state.webapp.webappauthtelname !==''){
    app.submitInfo.usertelname = urlState.$state.webapp.webappauthtelname;
  }

  let resp = await submitAuth(appConfig, app, userState);

  if (resp['status'] === 'ok'){
    let localInfo = {}
    localInfo[appConfig.$state.localStorage.userInfo.props.token] = await userState.$state.token;

    await localStorage.setItem(appConfig.$state.localStorage.userInfo.key, JSON.stringify(localInfo));
    app.setUserInfo = true;
  }
  else {
    app.unSuccessLogin = true;
  }
  await emits('stoploading');
}

//COMPUTED
const fio = computed(()=>{
    return app.$state.submitInfo.lastname + ' ' + app.$state.submitInfo.firstname + ' ' + app.$state.submitInfo.secondname;
})

</script>

<style scoped>
.em-submit-panel-modal-button-no{
  min-width: 45px;
}

.em-submit-panel-modal-button-yes{
  min-width: 45px;
  margin-left: 16px;
}

.em-submit-panel-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.em-submit-panel-modal-text {
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  color: #333333;
}

.em-submit-panel-modal-container {
  padding-top: 32px;
  padding-left: 75px;
  padding-right: 75px;
}

.em-submit-panel-workspace {
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: #F2F2F2;
}

.em-submit-panel-title {
  text-align: center;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  margin-bottom: 16px;
}

.em-submit-panel-button-yes {
    margin-left: 20px;
    min-width: 65px;
}

.em-submit-panel-button-no {
    min-width: 65px;
}

.em-submit-panel-button-wr {
    display: flex;
    align-items: center;
    justify-content: center;
}

.em-submit-panel-text-wr {
    text-align: center;
    color: #000000E5;
    font-size: 17px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 16px;
}

.em-submit-panel-container {
  //display: flex;
  //justify-content: center;
}

.em-submit-panel {
  //width: 40%;
}
</style>