<template>
  <div class="info-app-contact-item-wr">
      <div class="info-app-contact-item-icon">
        <contacts-mail-icon/>
      </div>

      <div class="info-app-contact-item-input">
        <div class="info-app-contact-item-input-wr">
          <input
              @focus="onFocus()"
              @focusout="onFocusOut()"
              type="text"
              class="vue-form-control"
              :class="{'vue-input-error':errorStyle}"
              :name="'info-app-mail-item-input'+id.toString()" :id="'info-app-mail-item-input'+id.toString()"
              placeholder="Введите email"
              v-model="mailInput"
          >
        </div>

        <template v-if="!errorStyle">
          <div
              @click.prevent.stop="changeBaseList(mails, props.id, props.index)"
              class="info-app-contact-item-base-wr"
              :class="{'contact-item-disabled': !mails.$state.runtime[props.index].valid}"
          >
            <div class="info-app-contact-item-base-checkbox">
              <custom-checkbox
                  shape="circle"
                  :id="id.toString()"
                  :check-list="mails.$state.base"
              />
            </div>

            <div class="info-app-contact-item-base-text">
              Основная почта
            </div>

          </div>
        </template>

        <template v-if="errorStyle">
          <div class="info-app-contact-item-errorpanel">
            <error-panel
                :text="errorText"
                :icon-size="15"
            />
          </div>
        </template>
      </div>

      <div
          class="info-app-contact-item-del"
          :class="{'contact-item-disabled': !delIconActive}"
          @click.prevent.stop="deleteMailItem()"
      >
          <VTooltip theme="qst-arrow-tooltip-black">
            <app-icon
                name="close"
                :size="12"
                color="#F05C46"
                hover-color="#CD3B2B"
            />
            <template #popper>{{ popperText }}</template>
          </VTooltip>
      </div>

  </div>
</template>

<script setup>
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import CustomCheckbox from "@/common/ui/CustomCheckbox/CustomCheckbox.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ContactsMailIcon from "@/updateinfo/icons/ContactsMailIcon.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useMailStore} from "@/updateinfo/store/mails";
import {useAppStore} from "@/updateinfo/store/app";
import {changeBaseList} from "@/updateinfo/services/changebaselist";
import {deleteItem} from "@/updateinfo/services/addeleteitem";

// PROPS
const props = defineProps({
  id:
      {
        type: String,
        default: '',
      },

  index:
      {
        type: Number,
        default: 0,
      }

});

// STORE
const mails = useMailStore();
const app = useAppStore();


// DATA
const errorStyle = ref(false);
const mailInput = ref('');
const errorText = ref('');

// METHODS
const deleteMailItem = ()=>{
  if(mails.$state.runtime.length === 1){
    mailInput.value = '';
    mails.runtime[0].archive = 0;
    mails.runtime[0].base = 0;
    mails.runtime[0].id = 'new1';
    mails.base = [];
  }
  else {
    deleteItem('mail', mails, props.index, app)
  }
}

const onFocus = ()=>{
  errorStyle.value = false;
  errorText.value = '';
  app.submitError = false;
  app.submitErrorText = 'Убедитесь, что вы добавили хотя бы по одному контакту в поля email и телефон, поля заполнены правильно, и отмечены основные контакты';
}

const onFocusOut = ()=>{
  if(!mails.$state.runtime[props.index].valid && mailInput.value !== ''){
    errorStyle.value = true;
    errorText.value = 'Неверный формат';
    app.submitform_list=[];
  }
}

const checkValid =(mail)=>{
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(mail);
}

// WATCH
watch(
    mailInput,
    () => {
      // console.log("watch mailInput");
      mails.runtime[props.index].mail =mailInput.value;
      mails.runtime[props.index].valid = checkValid(mails.$state.runtime[props.index].mail);
    }
);

// COMPUTED
const delIconActive = computed(()=>{
  let activeFlag = true;

  if (mails.$state.runtime.length === 1){
    if(!mails.$state.runtime[0].valid){
      activeFlag = false;
    }
  }
  return activeFlag;
})

const popperText = computed(()=>{
  if(mails.$state.runtime.length === 1){
    return 'Очистить';
  }
  else {
    return 'Удалить';
  }

});

// LIFECYCLE
onMounted(()=>{
  mailInput.value = mails.$state.runtime[props.index].mail
})


</script>

<style>
.info-app-contact-item-input-wr .vue-input-error {
  color: #333333 !important;
}
</style>

<style scoped>
@import "@/updateinfo/css/mail_phone_item.css";
</style>