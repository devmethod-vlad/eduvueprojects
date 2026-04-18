<template>
  <div ref="bannerContent" class="qst-banner-content"
       style="height: auto;"
  >
    <template v-if="telBannerVisibility">
      <TelegramBanner />
    </template>
  </div>

</template>

<script setup>
import ElnBanner from "@/questions/components/BannerContent/components/ElnBanner/ElnBanner.vue";
import TelegramBanner from "@/questions/components/BannerContent/components/TelegramBanner/TelegramBanner.vue";
import {computed, ref, watch} from "vue";
import {app_config} from "@/questions/config/setconfig";
import {useAppStore} from "@/questions/store/app";

// STORE
const appStore = useAppStore();


// DATA
const bannerContent = ref(null);

// COMPUTED
const telBannerVisibility = computed(()=>{
  let visible = true;
  if (app_config.isWebApp){
    if(app_config.isWebApp === true){
      visible = false;
    }
  }
  return visible;
});

// WATCH
watch(
    bannerContent,
    () => {
      if(bannerContent.value){
        appStore.bannerContentElem = bannerContent.value;
      }
    },
    {immediate: true}
);


</script>

<style scoped>
.qst-banner-content {
  display: flex;
  flex-direction: column;
}
</style>