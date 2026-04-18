<template>
    <div ref="mainContainer" class="qst-app-container">
        <template v-if="!userStore.$state.auth">
            <div class="qst-app-auth-container">
              <template v-if="app_config.componentName === 'QuestionsWebApp'">
                <portal-auth-old
                    v-if="Object.keys(portalAuthConfig).length !== 0"
                    :show-anonym-form="false"
                    :auth-by-edu="false"
                    :auth-by-storage-token="false"
                    :manual-auth="false"
                    :show-login-form="false"
                    :local-host-auth="false"
                    :app-config="portalAuthConfig"
                    @setuserinfo="(userInfo, urlState)=>{getUserInfo(userInfo, urlState)}"
                />
              </template>

              <template v-if="app_config.componentName === 'Questions'">
                <portal-auth-old
                    v-if="Object.keys(portalAuthConfig).length !== 0"
                    :show-anonym-form="true"
                    :app-config="portalAuthConfig"
                    @setuserinfo="(userInfo, urlState)=>{getUserInfo(userInfo, urlState)}"
                >
                  <template #anonymform>
                    <anonym-form />
                  </template>
                </portal-auth-old>
              </template>
            </div>
        </template>

        <template v-else>

            <template v-if="blockErrorActive">
                <block-error
                  :height="blockErrorHeight"
                />
            </template>

            <template v-else>
                <div v-if="isLoading"
                     class="qst-main-loading"
                     :style="{height: `${loadingHeight.toString()}px`}"
                >
                    <div class="qst-main-loading-text">
                        Загрузка информации
                    </div>

                    <div class="qst-main-loading-icon">
                        <content-loader />
                    </div>
                </div>

                <template v-else>

                    <div class="qst-main">
                      <private-office />
                      <div class="qst-main-container">

                        <div class="qst-questions-list-container"
                             id="qst-questions-list-container"
                        >
                          <template v-if="infoErrorActive">
                            <info-error />
                          </template>

                          <add-question
                              :open="openNewQuestion"
                              @changeopenprop="openNewQuestion=false"
                          />
                          <questions-list />

                        </div>

                        <div
                            class="qst-service-space-container"
                            :class="{'qst-disable-style': activeQuestionStore.$state.is_update_active === 1}"
                        >
                            <banner-content />
                          <Transition name="qst-modal">
                            <template v-if="questionDetailShowMode === 'panel' && showQuestionDetail">
                              <question-detail-panel />
                            </template>
                          </Transition>
                        </div>

                      </div>

                    </div>

                    <template v-if="questionDetailShowMode === 'modal' && showQuestionDetail">
                        <question-detail-modal
                          target="editquestion"
                          @closedetailmodal="activeQuestionStore.$reset()"
                        />
                    </template>

                    <template v-if="submitMessageText !==''">
                        <submit-message
                          @closesubmitmessage="closeSubmitMessage()"
                        />
                    </template>

                </template>
            </template>

        </template>
    </div>
</template>

<script setup>
import PortalAuthOld from "@/common/auth/PortalAuthOld/PortalAuthOld.vue";
// import PortalAuth from "@/common/auth/PortalAuth/PortalAuth.vue";
import {setUrlParams} from "@/questions/services/seturlparams";
import AnonymForm from "@/questions/components/AnonymForm/AnonymForm.vue";
import {setPortalAuthConfig} from "@/questions/services/setportalauthconfig";
import ContentLoader from "@/questions/components/ContentLoader/ContentLoader.vue";
import AddQuestion from "@/questions/components/AddQuestion/AddQuestion.vue";
import BlockError from "@/questions/components/BlockError/BlockError.vue";
import InfoError from "@/questions/components/InfoError/InfoError.vue";
import QuestionsList from "@/questions/components/QuestionsList/QuestionsList.vue";
import QuestionDetailPanel from "@/questions/components/QuestionDetailPanel/QuestionDetailPanel.vue";
import QuestionDetailModal from "@/questions/components/QuestionDetailModal/QuestionDetailModal.vue";
import {useErrorsStore} from "@/questions/store/errors";
import {useAppStore} from "@/questions/store/app";
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {app_config} from "@/questions/config/setconfig";
import {useUserStore} from "@/questions/store/user";
import SubmitMessage from "@/questions/components/SubmitMessage/SubmitMessage.vue";
import {useSubmitMessageStore} from "@/questions/store/submitmessage";
import {useNewQuestionStore} from "@/questions/store/newquestion";
import {getAppConfigInfo} from "@/questions/services/getappconfig";
import BannerContent from "@/questions/components/BannerContent/BannerContent.vue";
import PrivateOffice from "@/questions/components/PrivateOffice/PrivateOffice.vue";
import {resetMaketSizes} from "@/questions/components/QuestionsList/services/resizemeasures";
import {processUrlSpaceKey} from "@/questions/services/processurlspacekey";

// STORE
const errorStore = useErrorsStore();
const appStore = useAppStore();
const activeQuestionStore = useActiveQuestionStore();
const userStore = useUserStore();
const submitStore = useSubmitMessageStore();
const newQuestion = useNewQuestionStore();

// DATA
const isLoading = ref(false);

const blockErrorActive = ref(false);
const blockErrorMessage = ref('');

const infoErrorActive = ref(false);
const infoErrorMessage = ref('');

const submitMessageText = ref('');

const questionDetailShowMode = ref('panel');
const showQuestionDetail = ref(false);

const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

const mainContainer = ref(null);
const mainContainerHeight = ref(0);
const mainContainerWidth = ref(0);

const loadingHeight = ref(0);
const blockErrorHeight = ref(0);

const portalAuthConfig = ref({});

const openNewQuestion = ref(false);

// METHODS
const handleResize = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
}

const getUserInfo = async (userInfo, urlState)=>{
    console.log("getUserInfo");
    await userStore.$patch(userInfo);
    // console.log("getUserInfo appStore.$state before: ", appStore.$state);
    await setUrlParams(urlState, appStore);
    // const currentUrl = await window.location.href.split('?')[0];
    // console.log("currentUrl: ", currentUrl);
    await processUrlParams();
    await setAppConfig();
    // console.log("getUserInfo appStore.$state after: ", appStore.$state);
}

const setAppConfig = async ()=>{
  let confAnswer = await getAppConfigInfo();
  console.log("confAnswer  :", confAnswer);
  if(confAnswer.status === 'ok'){
    appStore.botName = confAnswer.info.botname;
    appStore.uploadsize = Number(confAnswer.info.uploadsize);
    appStore.anonymuserid = Number(confAnswer.info.anonymuserid);
    appStore.maxuploadfiles = Number(confAnswer.info.maxfiles);
  }
}

const processUrlParams = ()=>{
  if(appStore.$state.urlParams.webapp.webappnewquestion === '1'){
    openNewQuestion.value = true;
  }
  processUrlSpaceKey(appStore);
}


const closeSubmitMessage = () =>{
    submitStore.$reset();
}


// WATCH
watch(
  mainContainerHeight,
  () => {
      appStore.containerHeight = mainContainerHeight.value;
  },
  {immediate: true}
);

watch(
  mainContainerHeight,
  () => {
      appStore.containerWidth = mainContainerWidth.value;
  },
  {immediate: true}
);

watch(
  questionDetailShowMode,
  (mode) => {
      if(Number(activeQuestionStore.$state.order_id)!==0){
          activeQuestionStore.$reset();
      }
      if (mode === 'modal'){
        resetMaketSizes(appStore);
      }
  }
);

watch(
  windowWidth,
  (newWidth) => {
      if(newWidth<992){
          questionDetailShowMode.value='modal';
          appStore.questionShowMode = 'modal';
      }
      else {
          questionDetailShowMode.value='panel';
          appStore.questionShowMode = 'panel';
      }

      appStore.windowWidth = newWidth;
  },
  {immediate: true}
);

watch(
  windowHeight,
  () => {
      appStore.windowHeight = windowHeight.value;
  },
  {immediate: true}
);

watch(
  () => activeQuestionStore.order_id,
  () => {
      showQuestionDetail.value = !Number(activeQuestionStore.$state.order_id === 0);
  },
  {immediate: true}
);

watch(
  () => appStore.isLoading,
  () => {
      if(appStore.containerHeight > app_config.minLoadingPanelHeight){
          loadingHeight.value = appStore.containerHeight;
      }
      else {
          loadingHeight.value = app_config.minLoadingPanelHeight;
      }

      isLoading.value = !!appStore.$state.isLoading;
  },
);
watch(
  () => errorStore.blockError.isActive,
  () => {
      blockErrorHeight.value = appStore.$state.containerHeight;
      if(errorStore.$state.blockError.isActive){
          blockErrorActive.value = true;
          blockErrorMessage.value = errorStore.$state.blockError.message;
      }
      else {
          blockErrorActive.value = false;
          blockErrorMessage.value = '';
      }
  },
);

watch(
  () => errorStore.infoError.isActive,
  () => {
      if(errorStore.$state.infoError.isActive){
          infoErrorActive.value = true;
          infoErrorMessage.value = errorStore.$state.infoError.message;
      }
      else {
          infoErrorActive.value = false;
          infoErrorMessage.value = '';
      }
  },
);

watch(
  () => submitStore.message,
  (mess) => {
      // console.log("watch submit mess: ", mess);
      if(mess !==''){
          // console.log("mess !==''");
          if(Number(activeQuestionStore.$state.order_id) !==0){
              activeQuestionStore.$reset();
          }
          if(newQuestion.$state.target !==''){
              newQuestion.$reset();
          }
          submitMessageText.value = mess;
          // console.log("submitMessageText.value: ", submitMessageText.value);
      }
      else {
          submitMessageText.value = '';
      }
  },
);


// LIFECYCLE
onMounted(  () => {
    portalAuthConfig.value = setPortalAuthConfig();
    // mainContainerObserver.observe(mainContainer.value);
    window.addEventListener('resize', handleResize);

  // const confResp = await fetch("https://edu-test.emias.ru/rest/api/space");
  //
  // const answ = await confResp.json();
  //
  // console.log("answ: ", answ);


})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

</script>

<style>
/*@font-face {*/
/*    font-family: "OpenSans";*/
/*    src: url(./global/fonts/OpenSans-Medium.ttf) format("truetype");*/
/*}*/
/*@import "@/css/reset_confluence.css";*/
@font-face {
  font-family: "OpenSans";
  /*src: url(http://127.0.0.1:5000/eduportal/questions/static/fonts/OpenSans-Medium.ttf) format("truetype");*/
  src: url(https://edu.emias.ru/edu-rest-api/questions/static/fonts/OpenSans-Medium.ttf) format("truetype");
}

</style>
<style scoped>
@import "@/questions/css/mainapp.css";
@import '../../../node_modules/floating-vue/dist/style.css';
@import "@/questions/css/tooltip.css";
@import "@/css/form-v1.css";
</style>