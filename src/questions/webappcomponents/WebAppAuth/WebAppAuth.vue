<template>
  <template v-if="errorText!==''">
    <div class="edu-tel-webapp-error-container">
      {{errorText}}
    </div>
  </template>
  <template v-else>
    <div class="edu-tel-webapp-auth-container">
      <template v-if="!userStore.$state.auth">
        <div class="qst-app-auth-container">
          <portal-auth
              v-if="Object.keys(portalAuthConfig).length !== 0"
              :show-anonym-form="false"
              :local-host-auth="false"
              :auth-by-storage-token="false"
              :auth-by-link="false"
              :app-config="portalAuthConfig"
              @setuserinfo="(userInfo, urlState)=>{getUserInfo(userInfo, urlState)}"
              @unsuccesslogin="unSuccessSubmit()"
          />
        </div>
      </template>
      <template v-else>
        <div class="edu-tel-webapp-auth-success">
          Процедура авторизации была успешно завершена!
        </div>
      </template>
    </div>
  </template>

</template>
<script setup>
import PortalAuth from "@/common/auth/PortalAuth/PortalAuth.vue";
import {setPortalAuthConfig} from "@/questions/services/setportalauthconfig";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/questions/store/user";
import {sendSuccessMess} from "@/questions/webappcomponents/WebAppAuth/services/sendsuccessmess";

const initialErrorText = 'Во время авторизации возникли трудности. Попробуйте повторить процедуру позднее. Закройте окно приложения'

// STORE
const userStore = useUserStore();

//DATA
const portalAuthConfig = ref({});
const errorText = ref('');

// METHODS
const getUserInfo = async (userInfo, urlState)=>{

  await userStore.$patch(userInfo);

  if(urlState.webapp.webappauthtelid !==''){
    await sendSuccessMess(urlState.webapp.webappauthtelid);
  }

  if(window.Telegram){
    if(window.Telegram.WebApp){
      await window.Telegram.WebApp.close();
    }
  }
}

const unSuccessSubmit = ()=>{
  errorText.value=initialErrorText;
}

// LIFECYCLE
onMounted(() => {
  portalAuthConfig.value = setPortalAuthConfig();
})

</script>

<style>
.edu-webapp-already-auth {
  text-align: center;
  height: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
  color: #269999;
  font-family: OpenSans;
}

.edu-webapp-no-params {
  text-align: center;
  height: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
  color: #F05C46;
  font-family: OpenSans;
}

</style>

<style scoped>
@font-face {
  font-family: "OpenSans";
  /*src: url(http://127.0.0.1:5000/eduportal/questions/static/fonts/OpenSans-Medium.ttf) format("truetype");*/
  src: url(https://edu.emias.ru/edu-rest-api/questions/static/fonts/OpenSans-Medium.ttf) format("truetype");
}

@import "@/css/form-v1.css";

.edu-tel-webapp-error-container {
  text-align: center;
  height: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
  color: #F05C46;
  font-family: OpenSans;
}

.edu-tel-webapp-auth-container {
 font-family: OpenSans;
}

.edu-tel-webapp-auth-success {
text-align: center;
height: 400px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
font-weight: 600;
font-size: 24px;
color: #269999;
}
</style>