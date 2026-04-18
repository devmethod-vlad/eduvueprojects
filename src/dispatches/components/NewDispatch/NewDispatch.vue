<template>
  <div class="new-dispatch-container">

    <div class="new-dispatch-back-button-wr">
      <button
          type="button"
          class="vue-btn vue-btn-normal"
          @click="clickBackButton()"
      >
        Назад
      </button>
    </div>

    <div class="new-dispatch-set-wr">
      <div class="new-dispatch-setparams-wr">
        <div
            class="new-dispatch-method-wr"
            :class="{'new-dispatch-method-margin-bottom': !newDispatch.$state.methodError}"
        >

          <div class="new-dispatch-method-maintitle">
            Способ отправки:
          </div>

          <div class="new-dispatch-method-items-wr">
            <div
                class="new-dispatch-method-item"
            >
              <div class="dispatch-method-item-checkbox">
                <custom-checkbox
                    id="telegram"
                    :check-list="newDispatch.$state.methodList"
                    @active="newDispatch.methodList=['telegram']"
                    @inactive="newDispatch.methodList=['telegram']"
                />
              </div>

              <div class="dispatch-method-item-title">
                Телеграм
              </div>

            </div>
            <div
                class="new-dispatch-method-item em-disabled-style"
            >
              <div class="dispatch-method-item-checkbox">
                <custom-checkbox
                    id="arm"
                    :check-list="newDispatch.$state.methodList"
                />
              </div>
              <div class="dispatch-method-item-title">
                Арм
              </div>
            </div>
            <div
                class="new-dispatch-method-item em-disabled-style"
            >
              <div class="dispatch-method-item-checkbox">
                <custom-checkbox
                    id="mail"
                    :check-list="newDispatch.$state.methodList"
                />
              </div>
              <div class="dispatch-method-item-title">
                Почта
              </div>
            </div>
          </div>
        </div>

        <template v-if="newDispatch.$state.methodError && newDispatch.$state.methodInfoText !==''">

          <div class="telegram-setcontent-error-wr error-margin-top error-margin-bottom-24">
            <error-panel
                :text="newDispatch.$state.methodInfoText"
            />
          </div>

        </template>

        <div class="new-dispatch-schedule">

          <div class="new-dispatch-schedule-maintitle">
            График отправки:
          </div>

          <div class="new-dispatch-schedule-type">

            <div
                class="dispatch-schedule-type-item"
                @click="switchScheduleType('rightaway')"
                :class="{'schedule-active-type': newDispatch.$state.scheduleType === 'rightaway'}"
            >
              Сразу
            </div>

            <div
                class="dispatch-schedule-type-item left-border-none"
                @click="switchScheduleType('scheduled')"
                :class="{'schedule-active-type': newDispatch.$state.scheduleType === 'scheduled'}"
            >
              По расписанию
            </div>
          </div>

          <div
              class="dispatch-schedule-datepicker-wr"
              :class="{'em-disabled-style': newDispatch.$state.scheduleType === 'rightaway'}"
          >

            <edu-date-picker
                @setdate="(formattedDate)=>{newDispatch.dispatchDate=formattedDate}"
            />

          </div>

          <template v-if="newDispatch.$state.dateError && newDispatch.$state.dateInfoText !==''">

            <div class="telegram-setcontent-error-wr">
              <error-panel
                  :text="newDispatch.$state.dateInfoText"
              />
            </div>

          </template>

          <div
              class="dispatch-schedule-timepicker-wr"
              :class="{'em-disabled-style': newDispatch.$state.scheduleType === 'rightaway'}"
          >

            <edu-time-picker
                @settime="(dTime)=>{newDispatch.dispatchTime=dTime}"
            />

          </div>

          <template v-if="newDispatch.$state.timeError && newDispatch.$state.timeInfoText !==''">

            <div class="telegram-setcontent-error-wr error-margin-top">
              <error-panel
                  :text="newDispatch.$state.timeInfoText"
              />
            </div>

          </template>

        </div>

        <div
            class="new-dispatch-actuality-wr"
            :class="{'actuality-disable': !actualitySet}"
        >

          <div class="new-dispatch-actuality-maintitle">
            Актуальность
          </div>

          <div class="new-dispatch-actuality-choice">

            <div class="new-dispatch-actuality-choice-item">
              Не задавать дату
            </div>

            <div
                class="new-dispatch-actuality-choice-item left-border-none"
            >
              Задать дату
            </div>

          </div>

        </div>

      </div>

      <div class="new-dispatch-setcontent-wr">

        <template v-if="appStore.$state.method === 'telegram'">

          <div class="telegram-setcontent-title">

            <div class="telegram-setcontent-title-lable">
              Заголовок сообщения
            </div>

            <div class="telegram-setcontent-title-input-wr">
              <input
                  @focus="onFocus('title')"
                  type="text"
                  placeholder="Введите текст"
                  class="vue-form-control"
                  v-model="reactNewDispatch.title.value"
                  :class="{'vue-input-error': newDispatch.$state.titleError}"
              />
            </div>

            <template v-if="newDispatch.$state.titleError && newDispatch.$state.titleInfoText !==''">

              <div class="telegram-setcontent-error-wr error-margin-top">
                <error-panel
                    :text="newDispatch.$state.titleInfoText"
                />
              </div>

            </template>

          </div>

          <div class="telegram-setcontent-message">

            <div class="telegram-setcontent-message-lable">
              Текст сообщения
            </div>

            <div class="telegram-setcontent-message-badges">
              <div class="setcontent-badge-item">
                <badge-component
                    badge-text="Ж"
                    :show-mode="true"
                    badge-color="#2699991A"
                    active-badge-color="#2699991A"
                    @clickonbadge="insertTag(telegramtextarea, 'bold')"
                />
              </div>

              <div class="setcontent-badge-item">
                <badge-component
                    badge-text="<i>К</i>"
                    :show-mode="true"
                    badge-color="#2699991A"
                    active-badge-color="#2699991A"
                    @clickonbadge="insertTag(telegramtextarea,'italic')"
                />
              </div>

              <div class="setcontent-badge-item">
                <badge-component
                    badge-text="<u>Ч</u>"
                    badge-color="#2699991A"
                    active-badge-color="#2699991A"
                    :show-mode="true"
                    @clickonbadge="insertTag(telegramtextarea,'underline')"
                />
              </div>

              <div class="setcontent-badge-item">
                <badge-component
                    badge-text="<s>abc</s>"
                    badge-color="#2699991A"
                    active-badge-color="#2699991A"
                    :show-mode="true"
                    @clickonbadge="insertTag(telegramtextarea,'cross')"
                />
              </div>

              <div class="setcontent-badge-item">
                <badge-component
                    badge-text="ссылка"
                    badge-color="#2699991A"
                    active-badge-color="#2699991A"
                    :show-mode="true"
                    @clickonbadge="insertTag(telegramtextarea,'link')"
                />
              </div>

            </div>

            <div class="telegram-setcontent-message-textarea">
              <textarea
                  @focus="onFocus('telmessage')"
                  placeholder="Введите текст"
                  class="vue-form-control"
                  rows="9"
                  ref="telegramtextarea"
                  v-model="reactNewDispatch.telegram_text.value"
                  :class="{'vue-input-error': newDispatch.$state.telMessageError}"
              />
            </div>

            <template v-if="newDispatch.$state.telMessageError">
              <div class="telegram-setcontent-error-wr error-margin-top">
                <error-panel
                    :text="newDispatch.$state.telMessageInfoText"
                />
              </div>
            </template>

          </div>

          <div
              :class="{'new-dispatch-upload-inactive': newDispatch.$state.upload_files.length >=1}"
          >
            <dispatch-upload-file />
          </div>
        </template>
      </div>
    </div>

    <div class="new-dispatch-actions-wr">
      <div
          class="new-dispatch-actions-item"
      >
        <button
            @click.stop.prevent="validateNewDispatch('draft')"
            type="button"
            class="vue-btn vue-btn-normal-wobg-wobrd save-draft-dispatch-button"
        >
          Сохранить черновик
        </button>
      </div>
      <div class="new-dispatch-actions-item">
        <button
            @click.stop.prevent="validateNewDispatch('test')"
            type="button"
            class="vue-btn vue-btn-normal-wobg send-testdispatch-button"
        >
          Отправить тест
        </button>
      </div>
      <div class="new-dispatch-actions-item">
        <button
            @click.stop.prevent="validateNewDispatch('dispatch')"
            type="button"
            class="vue-btn vue-btn-normal send-dispatch-button"
        >
          Отправить рассылку
        </button>
      </div>
    </div>

    <div class="new-dispatch-filtermachine-wr">
      <filter-machine
          filter-url="http://127.0.0.1:8000/filter/"
          role-filter-url="http://127.0.0.1:8000/role/"
          role-download-url="http://127.0.0.1:8000/role/download/"
          spec-filter-url="http://127.0.0.1:8000/spec/"
          spec-download-url="http://127.0.0.1:8000/spec/download/"
          mo-filter-url="http://127.0.0.1:8000/mo/"
          mo-download-url="http://127.0.0.1:8000/mo/download/"
          mo-name-category-url="http://127.0.0.1:8000/mo/nameorcategory/"
          mu-filter-url="http://127.0.0.1:8000/mu/"
          mu-download-url="http://127.0.0.1:8000/mu/download/"
          mu-name-category-url="http://127.0.0.1:8000/mu/nameorcategory/"
          :send-methods-include="true"
          @machine-ready="()=>{console.log('MACHINE READY')}"
          @set-filters="()=>{console.log('SET FILTERS')}"
      />
    </div>

    <template v-if="newDispatch.modalVisible">
      <new-dispatch-modal
          @close-dispatch-modal="closeDispatchModal()"
          @confirm-yes="processConfirm()"
          @confirm-no="closeDispatchModal()"
      />
    </template>
  </div>
</template>

<script setup>
import NewDispatchModal from "@/dispatches/components/NewDispatch/components/NewDispatchModal.vue";
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import EduTimePicker from "@/common/ui/EduTimePicker/EduTimePicker.vue";
import EduDatePicker from "@/common/ui/EduDatePicker/EduDatePicker.vue";
import FilterMachine from "@/filtermachine/FilterMachine.vue";
import CustomCheckbox from "@/common/ui/CustomCheckbox/CustomCheckbox.vue";
import BadgeComponent from "@/common/ui/BadgeComponent/BadgeComponent.vue";
import {useAppStore} from "@/dispatches/store/app";
import {useNewDispatchStore} from "@/dispatches/store/newdispatch";
import {useNewDispatchFilterStore} from "@/dispatches/store/newdispatchfilter";
import {ref} from "vue";
import {insertTag} from "@/dispatches/components/DispatchDetail/services/inserttags";
import DispatchUploadFile from "@/dispatches/components/NewDispatch/components/DispatchUploadFile.vue";
import { storeToRefs } from 'pinia';
import {saveDispatchInfo} from "@/dispatches/components/DispatchDetail/services/savedispatch";

// STORE
const appStore = useAppStore();
const newDispatch = useNewDispatchStore();
const newDispatchFilter = useNewDispatchFilterStore();

const reactNewDispatch = storeToRefs(useNewDispatchStore());

// DATA
const telegramtextarea = ref(null);
const actualitySet = ref(false);


// METHODS
const switchScheduleType = (scheduleType)=>{
  newDispatch.scheduleType = scheduleType;
  newDispatch.dateError = false;
  newDispatch.dateInfoText = '';
  newDispatch.timeError = false;
  newDispatch.timeInfoText = '';
}

const onFocus = (target)=>{
  if(target === 'title'){
    newDispatch.titleError = false;
    newDispatch.titleInfoText = '';
  }
  else if(target === 'telmessage'){
    newDispatch.telMessageError = false;
    newDispatch.telMessageInfoText = '';
  }
}

const resetInfoErrors = ()=>{
  newDispatch.timeError = false;
  newDispatch.titleInfoText = '';
  newDispatch.dateError = false;
  newDispatch.dateInfoText = '';
  newDispatch.telMessageError = false;
  newDispatch.telMessageInfoText = '';
}

const cleanTextInput = (text)=>{
  return text.replace(/\s+/g, "").replace(/\r+/g, "");
}


const validateNewDispatch = (target)=>{

  resetInfoErrors();

  let valid = true;

  if(newDispatch.$state.methodList.length === 0){
    newDispatch.methodError = true;
    newDispatch.methodInfoText = "Укажите хотя бы один метод отправки!";
    valid = false;
  }

  if(newDispatch.$state.scheduleType === 'scheduled' && newDispatch.$state.dispatchDate === ''){
    newDispatch.dateError = true;
    newDispatch.dateInfoText = 'Укажите дату отправки';
    valid = false;
  }

  if(newDispatch.$state.scheduleType === 'scheduled' && newDispatch.$state.dispatchTime === ''){
    newDispatch.timeError = true;
    newDispatch.timeInfoText = 'Укажите время отправки';
    valid = false;
  }

  let cleanTitle = cleanTextInput(newDispatch.$state.title);

  let cleanTelMessage = cleanTextInput(newDispatch.$state.telegram_text);

  if (cleanTitle === ''){
    newDispatch.titleError = true;
    newDispatch.titleInfoText = 'Добавьте заголовок к рассылке';
    valid = false;
  }
  if (cleanTitle !== '' && cleanTitle < 5){
    newDispatch.titleError = true;
    newDispatch.titleInfoText = 'Заголовок рассылки должен быть не менее 5 символов';
    valid = false;
  }

  if (cleanTelMessage === ''){
    newDispatch.telMessageError = true;
    newDispatch.telMessageInfoText = 'Добавьте текст рассылки';
    valid = false;
  }
  if (cleanTelMessage !== '' && cleanTelMessage < 5){
    newDispatch.telMessageError = true;
    newDispatch.telMessageInfoText = 'Текст рассылки должен быть не менее 5 символов';
    valid = false;
  }

  if(valid){
    if(target === 'draft'){
      confirmDraft();
    }
    else if(target === 'test'){
      confirmTest();
    }
    else if(target === 'dispatch'){
      confirmDispatch();
    }
  }

}


const confirmDraft = ()=>{

  newDispatch.modalPurpose = 'confirmation';
  newDispatch.modalText = 'Сохранить рассылку в черновики?';
  newDispatch.modalTarget = 'draft';
  newDispatch.modalVisible = true;

}

const confirmTest = ()=>{

  newDispatch.modalPurpose = 'confirmation';
  newDispatch.modalText = 'Отправить тестовую рассылку?';
  newDispatch.modalTarget = 'test';
  newDispatch.modalVisible = true;

}

const confirmDispatch = ()=>{

  newDispatch.modalPurpose = 'confirmation';
  newDispatch.modalText = 'Отправить рассылку?';
  newDispatch.modalTarget = 'dispatch';
  newDispatch.modalVisible = true;

}

const processConfirm = ()=>{
  saveDispatch(newDispatch.$state.modalTarget);
}

const clickBackButton = ()=>{
  newDispatch.$reset();
  appStore.activeComponent = 'dispatches';
}

const closeDispatchModal = () =>{
  if (newDispatch.modalPurpose === 'success'){
    newDispatch.$reset();
    appStore.activeComponent = 'dispatches';
  }
  else {
    newDispatch.modalPurpose = '';
    newDispatch.modalText = '';
    newDispatch.modalTarget = '';
    newDispatch.modalVisible = false;
  }
}

const saveDispatch = async (target)=>{
  // console.log("saveDispatch target: ", target);
  await saveDispatchInfo(target, newDispatch, newDispatchFilter);

}

</script>

<style scoped>
.new-dispatch-back-button-wr {
  margin-bottom: 24px;
}

.error-margin-bottom-48 {
  margin-bottom: 24px;
}

.error-margin-top {
  margin-top: 12px;
}

.telegram-setcontent-title-input-wr {
  display: flex;
}

.telegram-setcontent-message-textarea {
  display: flex;
}

.dispatch-schedule-datepicker-wr {
  margin-bottom: 12px;
}

.send-testdispatch-button {
  margin-left: 16px;
}

.send-dispatch-button {
  margin-left: 16px;
}

.new-dispatch-actions-wr {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 40px;
}

.new-dispatch-actuality-choice-item {
  cursor: pointer;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px #999999 solid;
}

.new-dispatch-actuality-choice {
  display: flex;
  justify-content: flex-start;
}

.new-dispatch-actuality-maintitle {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
}

.new-dispatch-actuality-wr {
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
  border: 1px #CCCCCC solid;
}

.actuality-disable {
  pointer-events: none;
  background-color: #F2F2F2 !important;
  color: #999999 !important;
}

.left-border-none {
  border-left: none !important;
}
.schedule-active-type {
  background-color: #FFF199;
}

.dispatch-schedule-type-item:hover {
  background-color: #FFF199;
}

.dispatch-schedule-type-item {
  cursor: pointer;
  border: 1px #999999 solid;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.new-dispatch-schedule-type {
  margin-bottom: 12px;
  display: flex;
  justify-content: flex-start;
}

.new-dispatch-schedule {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px #757575 solid;
  padding-top: 16px;
  padding-bottom: 10px;
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 62px;
}

.dispatch-method-item-title {
  padding-left: 8px;
}

.new-dispatch-schedule-maintitle {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
}

.new-dispatch-method-maintitle {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
}

.new-dispatch-method-item {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.new-dispatch-method-items-wr {
  display: flex;
}

.new-dispatch-method-margin-bottom {
  margin-bottom: 48px;
}

.new-dispatch-method-wr {
  border: 1px #757575 solid;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 24px;
  padding-left: 24px;
  display: flex;
  flex-direction: column;

}

.setcontent-badge-item {
  margin-right: 8px;
}

.telegram-setcontent-message-lable {
  font-weight: 600;
  margin-bottom: 12px;
}

.telegram-setcontent-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
}

.new-dispatch-setcontent-wr input {
  width: 100%;
}

.new-dispatch-setcontent-wr textarea {
  width: 100%;
}

.telegram-setcontent-title-lable {
  font-weight: 600;
  margin-bottom: 8px;
}

.new-dispatch-setcontent-wr {
  width: 60%;
  padding-left: 48px;
}

.new-dispatch-setparams-wr {
  display: flex;
  flex-direction: column;
  width: 40%;
  padding-right: 48px;
}

.telegram-setcontent-message {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.telegram-setcontent-message-badges {
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
}

.new-dispatch-set-wr {
  display: flex;
  flex-direction: row;
  margin-bottom: 56px;
}

.new-dispatch-container {
  display: flex;
  flex-direction: column;
}
</style>