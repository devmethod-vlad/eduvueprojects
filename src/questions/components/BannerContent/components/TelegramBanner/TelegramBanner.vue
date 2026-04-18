<template>
  <div
      ref="banner"
      class="qst-telbanner-wr">
    <div class="qst-telbanner-top">
      <div class="qst-telbanner-top-text">
        У нас есть телеграм-бот, через него вы можете получать уведомления о статусе вопроса. Telegram @{{ appStore.$state.botName }}
      </div>
    </div>
    <div class="qst-telbanner-bottom">
      <div class="qst-telbanner-bottom-text">
        <template v-if="userStore.$state.authSource !=='localhostservice'">
          <div style="text-align: center;">
            Перейти в Telegram <a :href="botUrl">@{{ appStore.$state.botName }}</a>
          </div>
          или<br>
        </template>

        <span class="qst-telbanner-bottom-text-span" @click="qrVisible=!qrVisible">
          Подключить через QR-код
        </span>

      </div>

      <div class="qst-telbanner-bottom-image">
        <Transition name="qst-fade">
            <div v-if="qrVisible" class="qst-telbanner-qr-wr">

                 <qr-code :text="botUrl" :size="150"></qr-code>
            </div>


            <img
                v-else
                alt="Баннер телеграм"
                :src="app_config.apiUrl+app_config.staticUrls.telbanner+'tel-banner-2.png'"
            >
        </Transition>

      </div>

    </div>

  </div>
</template>

<script setup>
import {app_config} from "@/questions/config/setconfig";
import {computed, ref, watch} from "vue";
import {useUserStore} from "@/questions/store/user";
import {useAppStore} from "@/questions/store/app";

// STORE
const userStore = useUserStore();
const appStore = useAppStore();

// DATA
const qrVisible = ref(false);
const banner = ref(null);


// COMPUTED
const botUrl = computed(()=>{
  if (userStore.$state.auth){
    if (Number(userStore.$state.appRegistration.telegram)===1){
      return 'https://t.me/'+appStore.$state.botName;
    }
    else {
      return 'https://t.me/'+appStore.$state.botName+'?start='+userStore.$state.token
    }
  }
  else {
    return 'https://t.me/'+appStore.$state.botName;
  }
});

watch(
    banner,
    () => {
      if(banner.value){
        appStore.bannerElem = banner.value;
      }
    },
    {immediate: true}
);

</script>

<style scoped>
@import "@/questions/components/BannerContent/components/TelegramBanner/css/telbanner.css";
</style>