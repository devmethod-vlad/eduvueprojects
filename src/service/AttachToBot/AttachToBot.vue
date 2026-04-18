<template>
  <div class="em-attach-tobot-wr">

      <PortalAuth
          v-if="Object.keys(portalAuthConfig).length !== 0"
          :local-host-auth="true"
          :auth-by-link="false"
          :auth-by-storage-token="true"
          :auth-by-edu="true"
          :manual-auth="false"
          :show-login-form="false"
          :is-verbal="false"
          :show-anonym-form="false"
          :app-config="portalAuthConfig"
          loading-text="Подготавливаем данные....."
          @setuserinfo="(userInfo,  urlState) => getUserInfo(userInfo,  urlState)"
          @unsuccesslogin = "workSpaceVisible = true"
      />

    <div v-if="workSpaceVisible" class="em-attach-tobot-info">

      <div class="em-attach-tobot-info-toptext">

        <p class="em-attach-tobot-p">
          Позволяет:
        </p>

      </div>

      <div class="em-attach-tobot-info-wr">

        <div class="em-attach-tobot-info-left">

          <div class="em-attach-tobot-disclaimer">
            <p class="em-attach-tobot-p">
              • искать по материалам и глоссарию, размещенным на портале для пользователей ЕМИАС;
            </p>
            <p class="em-attach-tobot-p">
              • направлять вопросы по работе с продуктами ЕМИАС, бот проинформирует, как только поступит ответ;
            </p>
            <p class="em-attach-tobot-p">
              • получать уведомления об обновлениях функционала используемых ролей ЕМИАС;
            </p>
          </div>

          <div class="em-attach-tobot-left-link-mobile">
            <a :href="attachbot_config.eduInfoPageLink">Подробнее</a>
          </div>

        </div>

        <div class="em-attach-tobot-info-rigth">

          <div v-if="qrText" class="em-attach-tobot-qr-wr">
            <vue-qrcode :value="qrText" :options="{ width: 200 }">
            </vue-qrcode>
            <div class="em-attach-tobot-qr-text">
              <p class="em-attach-tobot-p">
                Сканировать с телефона</p>
            </div>
          </div>
        </div>

      </div>

      <div class="em-attach-tobot-info-bottomtext">

        <div class="em-attach-tobot-left-link">
          <a :href="attachbot_config.eduInfoPageLink">Подробнее</a>
        </div>
        <div class="em-attach-tobot-rigth-blank">

        </div>

      </div>

    </div>

    <div v-if="userStore.$state.authSource !=='localhostservice'" class="em-attach-tobot-link-wr">
      <a :href="qrText"><button type="button" class="vue-btn vue-btn-normal">Подключить</button></a>
    </div>

    </div>

</template>

<script setup>
import {setAttachToBotAuthConfig} from "@/service/AttachToBot/service/setauthconfig";
import PortalAuth from "@/common/auth/PortalAuth/PortalAuth.vue";
import {onMounted, ref} from "vue";
import {attachbot_config} from "@/service/AttachToBot/config/setconfig";
import {useUserStore} from "@/service/AttachToBot/store/user";

// STORE
const userStore = useUserStore();

// DATA
const portalAuthConfig = ref({});
const qrText = ref('https://t.me/'+attachbot_config.botName);
const workSpaceVisible = ref(false);

// METHODS
const getUserInfo = async (userInfo, urlState) =>{
  workSpaceVisible.value = true;
  await userStore.$patch(userInfo);

  // console.log("getUserInfo userStore.$state: ", userStore.$state);

  if (userStore.$state.auth){
    if (userStore.$state.auth && (userStore.$state.authSource === 'wiki' || userStore.$state.authSource === 'localhostservice' || userStore.$state.authSource === 'localtoken')){
      qrText.value='https://t.me/'+attachbot_config.botName+'?start='+userStore.$state.token;
    }
  }
}

// LIFECYCLE
onMounted(() => {
  portalAuthConfig.value = setAttachToBotAuthConfig();
})

</script>

<style scoped>
@import "@/css/form-v1.css";

.em-attach-tobot-info-bottomtext {
  display: none;
  margin-bottom: 25px;
}

.em-attach-tobot-info {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.em-attach-tobot-p {
  margin-bottom: 0.7rem !important;
  font-weight: 500;
  font-size: 1.2em;
}
.em-attach-tobot-left-link-mobile {
  display: flex;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  color: #3a80bd;
  justify-content: center;
}

.em-attach-tobot-left-link-mobile a {
  text-decoration: underline;
  color: #3a80bd;
  font-size: 1.1em;
  font-weight: 500;
}

.em-attach-tobot-left-link {
  display: flex;
  width: 50%;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  color: #3a80bd;
  justify-content: center;
}

.em-attach-tobot-left-link a {
  text-decoration: underline;
  color: #3a80bd;
  font-size: 1.1em;
  font-weight: 500;
}

.em-attach-tobot-info-rigth {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.em-attach-tobot-info-left {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
}

.em-attach-tobot-qr-text {
  font-weight: bold;
  font-size: 1em;
}

.em-attach-tobot-link-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.em-attach-tobot-wr {
  font-family: Helvetica;
  padding-bottom: 30px;
  min-height: 400px;
}

.em-attach-tobot-disclaimer {
  line-height: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.em-attach-tobot-qr-wr {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.em-attach-tobot-info-wr {
  flex-wrap: wrap;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.em-attach-tobot-wr {
  width: 100%;
  display: flex;
  flex-direction: column;
}

@media (min-width: 576px) {
  .em-attach-tobot-info-bottomtext {
    display: none;
  }

  .em-attach-tobot-info-wr {
    flex-direction: column;
  }
  .em-attach-tobot-info-left {
    width: 100%;
  }
  .em-attach-tobot-info-rigth {
    width: 100%;
  }
  .em-attach-tobot-disclaimer {
    align-items: center;
  }
}

@media (min-width: 768px) {
  .em-attach-tobot-left-link-mobile {
    display: none;
  }

  .em-attach-tobot-info-bottomtext {
    display: flex;
  }

  .em-attach-tobot-p {
    font-size: 1.1em;
  }

  .em-attach-tobot-info-wr {
    flex-direction: row;
  }
  .em-attach-tobot-info-left {
    width: 50%;
  }
  .em-attach-tobot-info-rigth {
    width: 50%;
  }
  .em-attach-tobot-disclaimer {
    align-items: flex-start;
  }
}

@media (min-width: 992px) {
  .em-attach-tobot-left-link-mobile {
    display: none;
  }

  .em-attach-tobot-info-bottomtext {
    display: flex;
  }

  .em-attach-tobot-p {
    font-size: 1.2em;
  }

  .em-attach-tobot-info-wr {
    flex-direction: row;
  }
  .em-attach-tobot-info-left {
    width: 50%;
  }
  .em-attach-tobot-info-rigth {
    width: 50%;
  }
  .em-attach-tobot-disclaimer {
    align-items: flex-start;
  }
}

@media (min-width: 1200px) {

  .em-attach-tobot-left-link-mobile {
    display: none;
  }

  .em-attach-tobot-info-bottomtext {
    display: flex;
  }

  .em-attach-tobot-p {
    font-size: 1.2em;
  }

  .em-attach-tobot-info-wr {
    flex-direction: row;
  }
  .em-attach-tobot-info-left {
    width: 50%;
  }
  .em-attach-tobot-info-rigth {
    width: 50%;
  }
  .em-attach-tobot-disclaimer {
    align-items: flex-start;
  }
}

</style>