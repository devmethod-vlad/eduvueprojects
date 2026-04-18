<template>
  <div class="info-app-contact-item-wr">
    <div class="info-app-contact-item-icon">
      <contacts-phone-icon/>
    </div>

    <div class="info-app-contact-item-input">
      <div class="info-app-contact-item-input-wr">
        <input
            @focus="onFocus()"
            @focusout="onFocusOut()"
            type="text"
            class="vue-form-control"
            v-maska="maskedObject"
            v-model="phoneInput"
            :class="{'vue-input-error':errorStyle}"
            :name="'info-app-phone-item-input'+id.toString()" :id="'info-app-phone-item-input'+id.toString()"
            data-maska="+7 (###) ###-##-##"
            placeholder="Введите телефон"
        >
      </div>
      <template v-if="!errorStyle">
        <div
            @click.prevent.stop="changeBaseList(phones, props.id, props.index)"
            class="info-app-contact-item-base-wr"
            :class="{'contact-item-disabled': !phones.$state.runtime[props.index].valid}"
        >
          <div class="info-app-contact-item-base-checkbox">
            <custom-checkbox
                shape="circle"
                :id="id.toString()"
                :check-list="phones.$state.base"
            />
          </div>

          <div class="info-app-contact-item-base-text">
            Основной телефон
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
          @click.prevent.stop="deletePhoneItem()"
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
import CustomCheckbox from "@/common/ui/CustomCheckbox/CustomCheckbox.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ContactsPhoneIcon from "@/updateinfo/icons/ContactsPhoneIcon.vue";
import {computed, onMounted, reactive, ref, watch} from "vue";
import { vMaska } from "maska";
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import {usePhoneStore} from "@/updateinfo/store/phones";
import {useAppStore} from "@/updateinfo/store/app";
import {changeBaseList} from "@/updateinfo/services/changebaselist";
import {deleteItem} from "@/updateinfo/services/addeleteitem";
import {getNewItemId} from "@/updateinfo/services/getnewitemid";

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
      },

});

// STORE
const phones = usePhoneStore();
const app = useAppStore();

// DATA
const errorStyle = ref(false);
const phoneInput = ref('')
const maskedObject = reactive({});
const errorText = ref('');


// METHODS
const deletePhoneItem = ()=>{
  if(phones.$state.runtime.length === 1){
    phoneInput.value = '';
    phones.runtime[0].archive = 0;
    phones.runtime[0].base = 0;
    phones.runtime[0].id = 'new1';
    phones.base = [];
  }
  else {
    deleteItem('phone', phones, props.index, app)
  }
}


const onFocus = ()=>{
  errorStyle.value = false;
  errorText.value = '';
  app.submitError = false;
  app.submitErrorText = 'Убедитесь, что вы добавили хотя бы по одному контакту в поля email и телефон, поля заполнены правильно, и отмечены основные контакты';
}

const onFocusOut = ()=>{
  if(Object.keys(maskedObject).length > 0){
    if(!maskedObject.completed && maskedObject.unmasked !== ''){
      errorStyle.value = true;
      errorText.value = 'Неверный формат';
      app.submitform_list=[];
    }
  }
}

// WATCH
watch(
    maskedObject,
    () => {
      if (maskedObject.unmasked !==''){
        phones.runtime[props.index].phone ='+7'+maskedObject.unmasked;
      }
      else{
        phones.runtime[props.index].phone ='';
      }
      phones.runtime[props.index].valid = maskedObject.completed;
    },
    {deep: true}
);

// COMPUTED
const delIconActive = computed(()=>{
  let activeFlag = true;

  if (phones.$state.runtime.length === 1){
    if(!phones.$state.runtime[0].valid){
      activeFlag = false;
    }
  }
  return activeFlag;
});

const popperText = computed(()=>{
  if(phones.$state.runtime.length === 1){
    return 'Очистить';
  }
  else {
    return 'Удалить';
  }

});

// LIFECYCLE
onMounted(()=>{
  // console.log("onMounted phoneItem props.index: ", props.index);
  phoneInput.value = phones.$state.runtime[props.index].phone;
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