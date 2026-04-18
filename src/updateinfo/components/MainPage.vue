<template>
  <template v-if="!app.$state.accessToForm">
    <div class="update-info-app-access-denied">
      <warning-panel
          :icon-size="48"
          icon-color="#FF941A"
          :title="warningTitle"
          :text="warningText"
      />
    </div>
  </template>

  <template v-else>

    <div class="update-info-app-disclaimer">
      <div class="info-app-disclaimer-title">
        Контактные данные
      </div>

      <div class="info-app-disclaimer-text">
        Пожалуйста, укажите контактные данные, которые будут использоваться для связи с вами, и отметьте основные
      </div>
    </div>

    <div class="info-app-mail-space-container">
      <mail-space />
    </div>

    <div class="info-app-space-divider">

    </div>

    <div class="info-app-phone-space-container">
      <phone-space />
    </div>

    <div class="info-app-agreement">
      <div
          class="info-app-agreement-checkbox"
          @click.stop.prevent="processSubmitCheckBox('formsubmit')"
      >
        <custom-checkbox
            id="formsubmit"
            :check-list="app.$state.submitform_list"
        />
      </div>

      <div class="info-app-agreement-text-wr">
        <div class="info-app-agreement-text">
          {{ agreementText }}
        </div>
        <div
            @click.prevent.stop="rejectBannerVisible=true"
            class="info-app-agreement-notme"
        >
          {{ notMeText }}
        </div>
      </div>

    </div>

    <template v-if="app.$state.submitError">
      <div class="info-app-submit-error-panel">
        <error-panel
            :icon-size="15"
            :text="app.$state.submitErrorText"
        />
      </div>
    </template>

    <div
        class="info-app-send-button"
        :class="{'button-disabled': app.$state.submitform_list.length ===0}"
    >
      <button
          class="vue-btn vue-btn-normal"
          type="button"
          @click.stop.prevent="saveContacts()"
      >
        Отправить
      </button>
    </div>

    <template v-if="rejectBannerVisible">
      <reject-banner
          @close-reject-banner="rejectBannerVisible = false"
          @cancel-on-reject-banner="rejectBannerVisible = false"
          @submit-on-reject-banner="resetAuth()"
      />
    </template>

  </template>
</template>

<script setup>
// import ModalStickyFooter from "@/common/ui/ModalStickyFooter/ModalStickyFooter.vue";
import WarningPanel from "@/common/ui/WarningPanel/WarningPanel.vue";
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import PhoneSpace from "@/updateinfo/components/PhoneSpace.vue";
import CustomCheckbox from "@/common/ui/CustomCheckbox/CustomCheckbox.vue";
import MailSpace from "@/updateinfo/components/MailSpace.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useUserStore} from "@/updateinfo/store/user";
import {useAppStore} from "@/updateinfo/store/app";
import {useMailStore} from "@/updateinfo/store/mails";
import {usePhoneStore} from "@/updateinfo/store/phones";
import {usePortalAuthAppStore} from "@/common/auth/PortalAuth/store/app";
import RejectBanner from "@/updateinfo/components/RejectBanner.vue";
import {getUserFormInfo} from "@/updateinfo/services/getuserinfo";
import {setRuntime} from "@/updateinfo/services/setruntime";
import {validateContacts} from "@/updateinfo/services/validatecontacts";
import {prepareContactsInfoToSave} from "@/updateinfo/services/preparecontactstosave";
import {updateContactsInfo} from "@/updateinfo/services/updatecontacts";


const warningPanelText = `Для обновления контактов необходимо <a href="https://edu.emias.ru/logout.action">выйти из учетной записи</a> на EDU и снова перейти на эту страницу`
const warningPanelTitle = "Данная форма предназначена для пользователей ЕМИАС";

//STORE
const user = useUserStore();
const app = useAppStore();
const mails = useMailStore();
const phones = usePhoneStore();
const authAppStore = usePortalAuthAppStore();

// DATA
const warningText = ref(warningPanelText);
const warningTitle = ref(warningPanelTitle);
const rejectBannerVisible = ref(false);

//METHODS
const resetAuth = ()=>{
  user.$reset();
  app.$reset();
  mails.$reset();
  phones.$reset();
  authAppStore.resetToLoginForm = true;
}

const checkUserAccess = ()=>{
  if(user.$state.emiaslogin !== ''){
    app.accessToForm = true;
  }
}

const processSubmitCheckBox = (id)=>{
  if (!app.$state.submitform_list.includes(id)){
    if(validateContacts(app, mails, phones)){
      app.submitform_list=[id];
    }
    else {
      app.submitError = true;
    }
  }
  else {
    app.submitform_list=[];
  }
}


const saveContacts = async ()=>{
  let contactsInfo = await prepareContactsInfoToSave(mails, phones);
  app.prepareLoading = true;
  let updateInfo = await updateContactsInfo(user.$state.emiaslogin, contactsInfo);
  app.prepareLoading = false;
  if (updateInfo.status === 'ok'){
    app.showResult = true;
  }
  else{
    app.submitError = true;
    app.submitErrorText = 'В процессе обновления данных произошла ошибка. Обновите страницу или повторите попытку позже';
  }
}

// COMPUTED
const agreementText = computed(()=>{
  return "Я, "+user.$state.lastname + " "+ user.$state.firstname + " " +user.$state.secondname +", подтверждаю актуальность контактов и согласен на обработку персональных данных";
})

const notMeText = computed(()=>{
  return "Нет, я не "+user.$state.lastname + " "+ user.$state.firstname + " "+ user.$state.secondname;
})

// LIFECYCLE
onMounted(async ()=>{
  await checkUserAccess();

  if(app.$state.accessToForm){
    let resp = await getUserFormInfo(user, mails, phones);
    if (resp.status === 'ok'){
      await setRuntime(mails, phones);
    }
    else {
      warningTitle.value = 'Мы не смогли найти ваши данные в базе'
      warningText.value = '';
      app.accessToForm = false;
    }
  }
})

// WATCH
watch(
    ()=>mails.base,
    () => {
      if(mails.$state.base.length === 0){
        app.submitform_list = []
      }
    }
);

watch(
    ()=>phones.base,
    () => {
      if(phones.$state.base.length === 0){
        app.submitform_list = []
      }
    }
);

</script>

<style>
.info-app-submit-error-panel .edu-warn-panel-text{
  font-size: 13px !important;
  line-height: 18px;
}
</style>

<style scoped>
.update-info-app-access-denied {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 450px;
}

.button-disabled {
  pointer-events: none;
  opacity: 0.4;
}

</style>