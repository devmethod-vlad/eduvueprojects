<template>
  <div class="edu-telegram-survey-container">
    <template v-if="isLoading">

      <div class="edu-telegram-survey-loading">
        <div class="edu-telegram-survey-loading-icon">
          <content-loader />
        </div>
        <div class="edu-telegram-survey-loading-text">
          Проверяем данные о пользователе...
        </div>
      </div>

    </template>

    <template v-else>

      <template v-if="infoText !==''">
        <div class="edu-telegram-survey-info-wr">
          <template v-if="infoTextWarn">
            <div class="edu-telegram-survey-info-icon">
              <app-icon
                  name="warning-fill"
                  color="#F05C46"
                  :size="16"
              />
            </div>
          </template>
          <div
              class="edu-telegram-survey-info-text"
              :class="{'survey-info-text-warn': infoTextWarn}"
          >
            {{ infoText }}
          </div>

        </div>
      </template>

      <template v-else>
        <SurveyRender
            :get-params-active="true"
        />
      </template>

    </template>

  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ContentLoader from "@/questions/components/ContentLoader/ContentLoader.vue";
import SurveyRender from "@/projects/SurveyRender/SurveyRender.vue";
import {useUserStore} from "@/projects/global/store/user";
import {onMounted, ref} from "vue";
import {userInfoByTelId} from "@/projects/WebAppSurvey/services/getuserinfobytelid";

// STORE
const userStore = useUserStore();

// DATA
const isLoading = ref(true);
const infoText = ref('');
const infoTextWarn = ref(false);

const surveyid = ref(0);
const telegramid = ref('');

// METHODS
const getParams = ()=>{

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.get('surveyid')) {
    surveyid.value = Number(urlParams.get('surveyid'));
  }

  if (urlParams.get('telegramid')) {
    telegramid.value = urlParams.get('telegramid');
  }

  if (surveyid.value === 0 || telegramid.value === ''){
    isLoading.value = false;
    infoText.value = 'Возникла ошибка при получении данных о пользователе. Попробуйте повторить позже';
    infoTextWarn.value = true;
  }
}

const setUserInfo = (userInfo)=>{
  userStore.auth = true;
  userStore.authSource = 'telegram';
  userStore.userid = userInfo.info.userinfo.userid;
  userStore.userrole.name = userInfo.info.userinfo.userrole.name;
  userStore.userrole.id = userInfo.info.userinfo.userrole.id;
  userStore.lastname = userInfo.info.userinfo.userlastname;
  userStore.firstname = userInfo.info.userinfo.userfirstname;
  userStore.secondname = userInfo.info.userinfo.usersecondname;
  userStore.wikilogin = userInfo.info.userinfo.wikilogin;
  userStore.emiaslogin = userInfo.info.userinfo.emiaslogin;
  userStore.adminlogin = userInfo.info.userinfo.adminlogin;
  userStore.appRegistration.telegram = 1;
}


const getUserInfo = async ()=>{

  let userInfo = await userInfoByTelId(telegramid.value);

  console.log("getUserInfo userInfo: ", userInfo)

  if (userInfo.status === 'ok'){
    await setUserInfo(userInfo);
  }
  else {
    isLoading.value = false;
    infoText.value = 'У вас нет доступа до данной активности. Попробуйте повторить позже';
    infoTextWarn.value = true;
  }
}


// LIFECYCLE
onMounted(async ()=>{
  await getParams();

  if(!infoTextWarn.value){
    await getUserInfo();
  }
  if(!infoTextWarn.value){
    isLoading.value = false;
  }

})


</script>

<style>
@import "@/css/form-v1.css";

@font-face {
  font-family: "OpenSans";
  /*Для prod*/
  src: url(https://edu.example.com/edu-rest-api/projects/static/fonts/OpenSans-Medium.ttf) format("truetype");
  /*src: url(http://127.0.0.1:5000/eduportal/projects/static/fonts/OpenSans-Medium.ttf) format("truetype");*/
}
.edu-telegram-survey-container .vue-survey-results-wr {
  display: flex;
  align-items: center;
  font-family: OpenSans;
  font-size: 20px !important;
  line-height: 25px;
  font-weight: 600 !important;
  padding: unset !important;
  color: #1D8585 !important;
}

.edu-telegram-survey-container .vue-survey-attempts-text {
  font-family: OpenSans;
  font-size: 20px !important;
  line-height: 25px;
  font-weight: 600 !important;
  color: #1D8585 !important;
}

.edu-telegram-survey-container .vue-survey-loading-wr {
  min-height: 450px;
  font-family: OpenSans;
  font-size: 20px !important;
  line-height: 25px;
  font-weight: 600 !important;
  padding: unset !important;
}

.edu-telegram-survey-container .vue-survey-loading-text {
  font-family: OpenSans;
  font-size: 20px !important;
  line-height: 25px;
  font-weight: 600 !important;
}

.edu-telegram-survey-container .vue-survey-errors {
  font-family: OpenSans;
  font-size: 20px !important;
  line-height: 25px;
  font-weight: 600 !important;
}


</style>

<style scoped>
.survey-info-text-warn {
  color: #F05C46 !important;
}

.edu-telegram-survey-info-wr {
  font-weight: 600;
  min-height: 450px;
  display: flex;
  align-items: center;
  color: #1D8585;
  font-family: OpenSans;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
}


.edu-telegram-survey-loading-text {
  font-weight: 600;
  margin-top: 24px;
  color: #1D8585;
  font-family: OpenSans;
  font-size: 20px;
  line-height: 25px;
  text-align: center;

}

.edu-telegram-survey-loading {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

}

</style>