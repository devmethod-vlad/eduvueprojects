<template>
  <div
      class="edu-update-info-container"
      ref="educontainer"
  >

    <template v-if="!user.$state.auth">
      <div class="edu-update-info-auth-wr">
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
      <div
          v-show="app.$state.loading"
          ref = "updateapploading"
          class="edu-update-info-app-loading"
      >
        <content-loader />
      </div>

      <template v-if="!app.$state.loading">

        <template v-if="!app.$state.showResult">

          <main-page />

        </template>

        <template v-if="app.$state.showResult">
          <result-page
              @return-to-auth="console.log('RETURN TO AUTH EMIT')"
          />
        </template>
      </template>
    </template>
  </div>

</template>

<script setup>
import MainPage from "@/updateinfo/components/MainPage.vue";
import ResultPage from "@/updateinfo/components/ResultPage.vue";
import ContentLoader from "@/common/ui/ContentLoader/ContentLoader.vue";
import PortalAuth from "@/common/auth/PortalAuth/PortalAuth.vue";
import {useUserStore} from "@/updateinfo/store/user";
import {useAppStore} from "@/updateinfo/store/app";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {setAuthConfig} from "@/updateinfo/services/setauthconfig"
import {checkUserToken} from "@/common/services/checkusertoken";
import {app_config} from "@/updateinfo/config/setconfig";

let checkTokenTimer;

//STORE
const user = useUserStore();
const app = useAppStore();

//DATA
const portalAuthConfig = ref({});
const educontainer = ref(null);
const updateapploading = ref(null);

//METHODS
const checkToken = async ()=>{
  // console.log("checkToken");
  let respToken = await checkUserToken(app_config.apiUrl+app_config.authUrl, user.$state.token);
  // console.log("checkToken resp: ", respToken);
  if(respToken.status !=='ok'){
    await location.reload()
  }
}

const getUserInfo = async (userInfo, urlState)=>{
  await user.$patch(userInfo);
  checkTokenTimer = await window.setInterval(checkToken, 3000);
}

// WATCH
watch(
    ()=>app.prepareLoading,
    (newVal) => {
      if(educontainer.value){
        let containerWidth = educontainer.value.offsetWidth;
        let containerHeight = educontainer.value.offsetHeight
        if (updateapploading.value){
          updateapploading.value.style.width = containerWidth.toString()+"px";
          updateapploading.value.style.height = containerHeight.toString()+"px";
        }
      }
      app.loading = !!newVal;
    }
);

// LIFECYCLE
onMounted(  async () => {
  console.log("%c Обновление контактных данных. Версия 0.1.1", "color:green; font-size:16px;");
  portalAuthConfig.value = await setAuthConfig();
})

onUnmounted(()=>{
  if(checkTokenTimer){
    window.clearInterval(checkTokenTimer);
  }
})

</script>

<style>
@font-face {
  font-family: "OpenSans";
  /*src: url(http://127.0.0.1:5000/eduportal/serviceapi/static/fonts/OpenSans-Medium.ttf) format("truetype");*/
  src: url(https://edu.emias.ru/edu-rest-api/questions/static/fonts/OpenSans-Medium.ttf) format("truetype");
}
#update-info-app {
//height: 100vh;
  padding-top: 50px;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  position: relative !important;
}

#update-info-app .portalauth-tab-panel {
  width: 100% !important;
}
#update-info-app .standalone-login-form {
  width: 100% !important;
  padding-top: unset !important;
}

#update-info-app .edu-update-info-breadcrumbs-icon {
  padding-top: 4px;
  margin-right: 8px;
}

#update-info-app .edu-update-info-breadcrumbs-text {
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #333333 !important;
}

#update-info-app .edu-update-info-breadcrumbs {
  cursor: pointer;
  font-family: OpenSans;
  position: absolute;
  top:0;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.article__toc.show-for-xlarge {
  display: none !important;
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
</style>

<style scoped>
@import "@/css/form-v1.css";
@import '../../node_modules/floating-vue/dist/style.css';
@import "@/css/tooltip.css";
@import "@/css/fix/formfix.css";
@import "@/css/fix/portalauthfix.css";
@import "@/updateinfo/css/updateinfo.css";
@import "@/css/fix/modal-new-fix.css";
@import "@/updateinfo/css/transitions.css";
</style>