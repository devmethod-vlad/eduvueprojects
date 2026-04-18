<template>
  <div
      class="edu-supdsurvey-container"
  >
    <div
        v-show="app.$state.loading"
        class="edu-supdsurvey-loading"
    >
      <content-loader />
    </div>

    <div v-show="!app.$state.loading">
      <template v-if="app.$state.globalText !==''">
        <div class="edu-supdsurvey-globaltext-wr">
          <template v-if="app.$state.globalWarnStyle">
            <div class="edu-supdsurvey-globaltext-warn-wr">
              <div class="edu-supdsurvey-globaltext-warn">
                <error-panel
                    :text="app.$state.globalText"
                    :icon-size="22"
                    :font-size="20"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="edu-supdsurvey-globaltext-normal-wr">
              <div class="edu-supdsurvey-globaltext-normal">
                {{ app.$state.globalText }}
              </div>
            </div>
          </template>
        </div>
      </template>

      <template v-else>

        <template v-if="!user.$state.auth">
          <div class="edu-supdsurvey-auth-wr">
            <portal-auth
                v-if="Object.keys(portalAuthConfig).length !== 0"
                :show-anonym-form="false"
                :auth-by-edu="true"
                :auth-by-storage-token="true"
                :manual-auth="false"
                :show-login-form="true"
                :local-host-auth="true"
                :submit-local-auth="true"
                :app-config="portalAuthConfig"
                @setuserinfo="(userInfo, urlState)=>{getUserInfo(userInfo, urlState)}"
            />
          </div>
        </template>
        <template v-else>
          <div>
            <survey-render
                :get-params-active="true"
                :survey-id="app_config.targetSurveyId"
            />
          </div>
        </template>

      </template>
    </div>
  </div>
</template>

<script setup>
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import {app_config} from "@/service/SupdSurvey/config/setconfig";
import PortalAuth from "@/common/auth/PortalAuth/PortalAuth.vue";
import ContentLoader from "@/common/ui/ContentLoader/ContentLoader.vue";
import {useAppStore} from "@/service/SupdSurvey/store/app";
import {useUserStore} from "@/projects/global/store/user";
import {onMounted, ref} from "vue";
import {setAuthConfig} from "@/service/SupdSurvey/services/setauthconfig";
import SurveyRender from "@/projects/SurveyRender/SurveyRender.vue";
import {userInfoByTelId} from "@/projects/WebAppSurvey/services/getuserinfobytelid";

// STORE
const app = useAppStore();
const user = useUserStore();

//DATA
const portalAuthConfig = ref({});
const telegramid = ref('');


// METHODS
const getUserInfo = async (userInfo, urlState)=>{
  await user.$patch(userInfo);
  console.log("getUserInfo: ", userInfo);
}

const getUrlParams = ()=>{

  if (app_config.authByTelId){
    telegramid.value = app_config.authTelId;
  }
  else {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get('telegramidinstant')) {
      telegramid.value = urlParams.get('telegramidinstant');
    }
  }

  if (telegramid.value !== ''){
    getUserInfoByTelId();
  }
  else {
    app.loading = false;
  }
}

const getUserInfoByTelId = async ()=>{

  let userInfo = await userInfoByTelId(telegramid.value);

  console.log("getUserInfoByTelId userInfo: ", userInfo)

  if (userInfo.status === 'ok'){
    await setUserInfo(userInfo);
  }
  app.loading = false;
}

const setUserInfo = (userInfo)=>{
  user.auth = true;
  user.authSource = 'telegram';
  user.userid = userInfo.info.userinfo.userid;
  user.userrole.name = userInfo.info.userinfo.userrole.name;
  user.userrole.id = userInfo.info.userinfo.userrole.id;
  user.lastname = userInfo.info.userinfo.userlastname;
  user.firstname = userInfo.info.userinfo.userfirstname;
  user.secondname = userInfo.info.userinfo.usersecondname;
  user.wikilogin = userInfo.info.userinfo.wikilogin;
  user.emiaslogin = userInfo.info.userinfo.emiaslogin;
  user.adminlogin = userInfo.info.userinfo.adminlogin;
  user.appRegistration.telegram = 1;
}

// LIFECYCLE
onMounted(  async () => {
  app.loading = true;
  portalAuthConfig.value = await setAuthConfig();
  getUrlParams();
})

</script>

<style>
@font-face {
  font-family: "OpenSans";
  src: url(https://edu.example.com/edu-rest-api/questions/static/fonts/OpenSans-Medium.ttf) format("truetype");
}


.edu-supd-survey-kt-image-wr {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edu-supd-survey-kt-image-wr img {
  width: 100%;
  height: auto;
}

.sd-root-modern {
  background-color: unset !important;
  font-family: OpenSans !important;
  color: #333333 !important;
}

.sd-html div, .sd-html p, .sd-html span, .sd-html td {
  font-family: OpenSans !important;
  color: #333333 !important;
}

.sv-string-viewer {
  font-family: OpenSans !important;
  color: #333333 !important;
}

.sd-completedpage::before {
  margin: unset !important;
  content: unset !important;
}

.sd-completedpage h2 {
  font-family: OpenSans !important;
  margin-top: unset !important;
  margin-bottom: unset !important;
}

.sd-root-modern h4 {
  margin-bottom: 40px !important;
}

.sd-root-modern .sd-row.sd-clearfix.sd-page__row {
  margin-top: unset !important;
}

.sd-root-modern ol li {
  font-family: OpenSans !important;
  padding-left: unset !important;
  color: #333333 !important;
}

.sd-root-modern ul li {
  font-family: OpenSans !important;
  padding-left: unset !important;
  color: #333333 !important;
}

.supd-survey-ul-list li::before {
  content: '' !important;
}

.supd-survey-ul-list {
  padding-left: 20px !important;
  margin-top: unset !important;
  margin-bottom: unset !important;
  list-style-type: disc !important;
}

.supd-survey-ul-list-nested::before {
  content: '' !important;
}

.supd-survey-ul-list-nested {
  padding-left: 20px !important;
  margin-top: unset !important;
  margin-bottom: unset !important;
  list-style-type: circle !important;
}

.supd-survey-success-wr {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.supd-survey-success-image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.supd-survey-success-text-top {
  text-align: center !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  font-family: OpenSans !important;
  line-height: 24px !important;
  color: #333333 !important;
}

.supd-survey-success-text-bottom {
  text-align: center !important;
  font-weight: 400 !important;
  font-size: 16px !important;
  font-family: OpenSans !important;
  line-height: 24px !important;
  color: #333333 !important;
}

.vue-survey-attempts-text {
  padding-top: 40px;
  padding-bottom: 40px;
  font-weight: 600 !important;
  line-height: 24px !important;
  font-size: 20px !important;
  text-align: center;
  color: #333333 !important;
  font-family: OpenSans !important;

}

.edu-supdsurvey-h4-wr h4 {
  font-size: 1.25em !important;
  text-align: center !important;
  color: #333333 !important;
  font-family: OpenSans !important;
}

h4.sd-title.sd-page__title {
  text-align: center;
}


input[readonly] {
  background-color: unset !important;
  cursor: pointer !important;
}
input:focus-visible {
  box-shadow: unset !important;
}

.em-table-pagination-wr ul {
  list-style-type: none !important;
}

[type='text'] {
  margin: unset !important;
  box-shadow: unset !important;
}
[type='text']:focus {
  border: none !important;
}

[type='password'] {
  margin: unset !important;
  box-shadow: unset !important;
}
[type='password']:focus {
  border: none !important;
}

.em-search-input-wr {
  padding: unset !important;
}

@media (min-width: 992px) {
  .supd-survey-ul-list-nested {
    padding-left: 40px !important;
  }
  .supd-survey-ul-list {
    padding-left: 40px !important;
  }
}

</style>

<style scoped>
@import "@/css/form-v1.css";
@import "@/css/tooltip.css";
@import "@/css/fix/formfix.css";
@import "@/css/fix/portalauthfix.css";
@import "@/css/fix/modal-new-fix.css";
@import "@/updateinfo/css/transitions.css";

.vue-survey-container {
  font-family: "OpenSans" !important;
}

.edu-supdsurvey-container {
  font-family: "OpenSans" !important;
}

.edu-supdsurvey-container .edu-supdsurvey-auth-wr {
  width: 100%;
  margin: auto;
}

.edu-supdsurvey-loading {
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edu-supdsurvey-globaltext-warn-wr {
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edu-supdsurvey-globaltext-warn{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edu-supdsurvey-globaltext-normal-wr {
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edu-supdsurvey-globaltext-normal {
  width: 100%;
  margin: auto;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #1D8585;
}

@media (min-width: 576px) {

}

@media (min-width: 768px) {

  .edu-supdsurvey-globaltext-normal {
    width: 80%;
  }

  .edu-supdsurvey-globaltext-warn {
    width: 80%;
  }

}

@media (min-width: 992px) {
  .edu-supdsurvey-globaltext-normal {
    width: 50%;
  }
  .edu-supdsurvey-globaltext-warn {
    width: 50%;
  }
}

@media (min-width: 1200px) {

}

@media (min-width: 1400px) {

}

</style>