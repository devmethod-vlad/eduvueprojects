<template>
  <div
      class="update-app-resultpage-container"
      :class="{'update-app-resultpage-container-justify':Number(user.$state.appRegistration.telegram) === 1}"
      ref="resultpageContainer"
  >
    <div class="update-app-resultpage-info">
      <div class="update-app-resultpage-info-icon">
        <app-icon
            name="check-circle-big"
            :size="44"
            color="#79B821"
        />
      </div>
      <div class="update-app-resultpage-info-icon-text">
        Данные успешно сохранены
      </div>
      <div
          class="update-app-resultpage-info-return-text"
      >
        Вы можете <span @click.stop.prevent="returnToForm()" class="resultpage-return-text-span">проверить и скорректировать</span> их при необходимости
      </div>

    </div>

    <template v-if="Number(user.$state.appRegistration.telegram) === 0">
      <div class="update-app-resultpage-qr-block">
        <div class="update-app-qr-block-title">
          Подпишитесь на телеграм-бот @EMIASkBot
        </div>
        <div class="update-app-qr-block-text">
          • ищите инструкции, термины и аббревиатуры ЕМИАС<br>
          • направляйте вопросы и оперативно получайте ответы<br>
          • получайте уведомления об обновлениях и изменениях
        </div>
        <div class="update-app-qr-block-prompt">
          <div class="qr-block-prompt-tooltip">
            Отсканируйте QR-код или нажмите на него
          </div>
        </div>
        <div
            class="update-app-qr-block-code-wr"
        >
          <template v-if="linkEnable">
            <a :href="botUrl" target="_blank">
              <div
                  class="update-app-qr-block-code"
                  @mouseenter="qrCodeHoverOn()"
                  @mouseleave="qrCodeHoverOff()"
                  ref="qrCodeWr"
              >
              </div>
            </a>
          </template>
          <template v-else>
            <div
                class="update-app-qr-block-code"
                @mouseenter="qrCodeHoverOn()"
                @mouseleave="qrCodeHoverOff()"
                ref="qrCodeWr"
            >
            </div>
          </template>
        </div>
      </div>
    </template>

  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {computed, onMounted, ref} from "vue";
import QRCodeStyling from 'qr-code-styling';
import {app_config} from "@/updateinfo/config/setconfig";
import {useUserStore} from "@/updateinfo/store/user";
import {useAppStore} from "@/updateinfo/store/app";

// STORE
const user = useUserStore();
const app = useAppStore();


let qrCode;

// DATA
const qrCodeWr = ref(null);
const linkEnable = ref(true);
const resultpageContainer = ref(null);

const options = ref({
  width: 150,
  height: 150,
  type: 'svg',
  data: '',
  image: app_config.qrCodeImageUrl,
  margin: 0,
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'Q'
  },
  imageOptions: {
    hideBackgroundDots: false,
    imageSize: 0.8,
    margin: 0,
    crossOrigin: 'anonymous',
  },
  dotsOptions: {
    color: '#333333',
    type: 'rounded'
  },
  backgroundOptions: {
    color: '#ffffff'
  },
  cornersSquareOptions: {
    color: '#35495E',
    // type: 'extra-rounded'
  },
  cornersDotOptions: {
    color: '#56B7B7',
    type: 'square'
  }
});

// METHODS
const returnToForm = () =>{
  app.showResult = false;
};

const setContainerHeight = () => {
  let mainElems = document.getElementsByTagName('main');
  if (mainElems.length > 0) {
    let mainHeight = mainElems[0].offsetHeight;
    if(mainHeight){
      if(Number(mainHeight)>0){
        if(resultpageContainer.value){
          resultpageContainer.value.style.minHeight = mainHeight+'px';
        }
      }
    }
  }
}

const qrCodeHoverOn = ()=>{
  // options.value.backgroundOptions.color = "#EBF8F8";
  // if (qrCode){
  //   qrCode.update(options.value);
  // }
}

const qrCodeHoverOff = ()=>{
  // options.value.backgroundOptions.color = "#ffffff";
  // if (qrCode){
  //   qrCode.update(options.value);
  // }
}

// COMPUTED
const botUrl = computed(() =>{
  return 'https://t.me/'+app_config.botName+'?start='+user.$state.token;
});


//LIFECYCLE
onMounted(()=>{
  if (Number(user.$state.appRegistration.telegram)===0){
    if(user.$state.localhostServiceEnable){
      linkEnable.value = false;
    }
  }
  options.value.data = botUrl.value;
  qrCode = new QRCodeStyling(options.value);
  qrCode.append(qrCodeWr.value);
  setContainerHeight();
})

</script>

<style scoped>
.qr-block-prompt-tooltip {
  position: relative;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  padding: 8px 16px 8px 16px;
  border-radius: 2px;
  background-color: #FFFFFF;
  margin-bottom: 8px;
  box-shadow: 0px 4px 8px 0px #00000014;
}

.qr-block-prompt-tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #ffffff transparent transparent transparent;
}

.update-app-qr-block-prompt {
  display: flex;
  justify-content: center;
}

.update-app-qr-block-code {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  border: 4px #56B7B7 solid;
  background-color: #ffffff;
}
.update-app-qr-block-code:hover {
  background-color: #EBF8F8;
  border: 4px #3f8686 solid;
}

.update-app-qr-block-code-wr {
  display: flex;
  justify-content: center;
}

.update-app-qr-block-text {
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  color: #333333;
  margin-bottom: 16px;
}

.update-app-qr-block-title {
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  margin-bottom: 4px;
  color: #333333;
}

.resultpage-return-text-span {
  cursor: pointer;
  color: #1D8585;
}

.resultpage-return-text-span:hover {
  color: #157171;
}

.update-app-resultpage-qr-block {
  display: flex;
  flex-direction: column;
  padding: 16px 24px 16px 24px;
  border-radius: 4px;
  background-color: #F2F2F2;
}

.update-app-resultpage-info-return-text {
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #333333;
  margin-bottom: 16px;
}

.update-app-resultpage-info-icon-text {
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  color: #333333;
  margin-bottom: 4px;
}

.update-app-resultpage-info-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}

.update-app-resultpage-info {
  display: flex;
  flex-direction: column;
}

.update-app-resultpage-container {
  margin: auto;
  display: flex;
  flex-direction: column;
}
.update-app-resultpage-container-justify {
  justify-content: center;
}

</style>