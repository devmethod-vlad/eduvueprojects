<template>

  <div class="dispatch-detail-container">

    <div
        class="dispatch-detail-back-button-wr"
        :class="{'em-disabled-style': machineDownloadActive}"
    >
      <button
          type="button"
          class="vue-btn vue-btn-normal"
          @click="clickBackButton()"
      >
        Назад
      </button>
    </div>

    <div class="dispatch-detail-set-wr">
      <div class="dispatch-detail-setparams-wr">

<!--        <dispatch-detail-method />-->

        <dispatch-detail-schedule />

        <dispatch-detail-actuality />

      </div>

      <div class="dispatch-detail-setcontent-wr">

        <dispatch-detail-title />

        <template v-if="newDispatch.$state.activeMethod === 'telegram' || redactDispatch.$state.activeMethod === 'telegram'">

          <detail-telegram-content />

        </template>

        <template v-if="appStore.$state.activeComponent === 'modifydispatch' && redactDispatch.$state.dispatch_files.length > 0">
          <div class="dispatch-detail-filegallery">
            <div
                class="dispatch-detail-file-item"
                v-for="(fileItem, fileIndex) of redactDispatch.$state.dispatch_files"
                :key="fileIndex"
            >

              <file-item-alternative
                  :file-size="fileItem.size"
                  :file-src="app_config.apiUrl+app_config.attachmentUrl+fileItem.dispatch_id.toString()+'/'+fileItem.filename"
                  :file-name="fileItem.filename"
                  :file-index="Number(fileIndex)"
                  :delete-action="true"
                  @delete-attachment="(index)=>deleteAttachment(index)"
              />
            </div>
          </div>
        </template>

        <template v-if="appStore.$state.activeComponent === 'newdispatch' && newDispatch.$state.dispatch_files.length > 0">
          <div class="dispatch-detail-filegallery">
            <div
                class="dispatch-detail-file-item"
                v-for="(fileItem, fileIndex) of newDispatch.$state.dispatch_files"
                :key="fileIndex"
            >

              <file-item-alternative
                  :file-size="fileItem.size"
                  :file-src="app_config.apiUrl+app_config.attachmentUrl+fileItem.dispatch_id.toString()+'/'+fileItem.filename"
                  :file-name="fileItem.filename"
                  :file-index="Number(fileIndex)"
                  :delete-action="true"
                  @delete-attachment="(index)=>deleteAttachment(index)"
              />
            </div>
          </div>
        </template>

        <template v-if="(appStore.$state.activeComponent === 'modifydispatch' && redactDispatch.$state.dispatch_files.length === 0) || (appStore.$state.activeComponent === 'newdispatch' && newDispatch.$state.dispatch_files.length === 0)">
          <dispatch-upload-file />
        </template>

      </div>

    </div>

    <div
        class="dispatch-detail-actions-wr"
        :class="{'em-disabled-style': machineDownloadActive}"
    >
      <div
          class="dispatch-detail-actions-item"
          v-if="saveDraftVisibilityButton"
      >
        <button
            @click.stop.prevent="validateProcess('draft')"
            type="button"
            class="vue-btn vue-btn-normal-wobg-wobrd save-draft-dispatch-button"
        >
          {{ draftButtonText }}
        </button>
      </div>

      <div class="dispatch-detail-actions-item">
        <button
            @click.stop.prevent="validateProcess('test')"
            type="button"
            class="vue-btn vue-btn-normal-wobg send-testdispatch-button"
        >
          Отправить тест
        </button>
      </div>

      <div class="dispatch-detail-actions-item">
        <button
            @click.stop.prevent="validateProcess('dispatch')"
            type="button"
            class="vue-btn vue-btn-normal send-dispatch-button"
        >
          {{ sendDispatchText }}
        </button>
      </div>
    </div>

    <div
        v-if="predefinedFilter !== null"
        class="dispatch-detail-filtermachine-wr"
    >
      <filter-machine
          :predefined-filter="predefinedFilter"
          :filter-url="app_config.filterUrl"
          :role-filter-url="app_config.roleFilterUrl"
          :role-download-url="app_config.roleDownloadUrl"
          :spec-filter-url="app_config.specFilterUrl"
          :spec-download-url="app_config.specDownloadUrl"
          :mo-filter-url="app_config.moFilterUrl"
          :mo-download-url="app_config.moDownloadUrl"
          :mo-name-category-url="app_config.moNameCategoryUrl"
          :mu-filter-url="app_config.muFilterUrl"
          :mu-download-url="app_config.muDownloadUrl"
          :mu-name-category-url="app_config.muNameCategoryUrl"
          :users-download-url="app_config.usersDownloadUrl"
          :send-methods-include="true"
          @machine-ready="()=>{console.log('MACHINE READY')}"
          @set-filters="(data)=>{processChangeFilterParams(data)}"
          @start-download="machineDownloadActive=true;"
          @end-download="machineDownloadActive=false;"
      />
    </div>

    <template v-if="newDispatch.$state.modalVisible || redactDispatch.$state.modalVisible">
      <div class="dispatch-detail-modal-modifier">
        <dispatch-detail-modal
            @close-dispatch-modal="processCloseModal()"
            @confirm-yes="processConfirm()"
            @confirm-no="processCloseModal()"
        />
      </div>

    </template>

  </div>

</template>

<script setup>
import DetailTelegramContent from "@/dispatches/components/DispatchDetail/components/DetailTelegramContent.vue";
import DispatchDetailTitle from "@/dispatches/components/DispatchDetail/components/DispatchDetailTitle.vue";
import DispatchDetailActuality from "@/dispatches/components/DispatchDetail/components/DispatchDetailActuality.vue";
import DispatchDetailSchedule from "@/dispatches/components/DispatchDetail/components/DispatchDetailSchedule.vue";
import {useNewDispatchStore} from "@/dispatches/store/newdispatch";
import {useRedactDispatchStore} from "@/dispatches/store/redactdispatch";
import {useAppStore} from "@/dispatches/store/app";
import {useNewDispatchFilterStore} from "@/dispatches/store/newdispatchfilter";
import {useRedactDispatchFilterStore} from "@/dispatches/store/redactdispatchfilter";
import {useDispatchesStore} from "@/dispatches/store/dispatches";
import DispatchUploadFile from "@/dispatches/components/DispatchDetail/components/DispatchUploadFile.vue";
import FilterMachine from "@/filtermachine/FilterMachine.vue";
import DispatchDetailModal from "@/dispatches/components/DispatchDetail/components/DispatchDetailModal.vue";
import {saveDispatchInfo} from "@/dispatches/components/DispatchDetail/services/savedispatch";
import {app_config} from "@/dispatches/config/setconfig";
import {deleteDispatchAttachment} from "@/dispatches/services/deleteattachment";
import {getDispatchesList} from "@/dispatches/services/dispatcheslist";
import {computed, onMounted, ref} from "vue";
import {sendTelegramTestDispatch} from "@/dispatches/components/DispatchDetail/services/sendteltest";
import {checkIfFilterSet} from "@/dispatches/services/checkiffilterset";
import {sendTelDispatch} from "@/dispatches/services/sendteldispatch";
import {useSynchroStore} from "@/dispatches/store/synchrostore";
import {usePreviewStore} from "@/dispatches/store/preview";
import {getDispatchFiltersInfo} from "@/dispatches/services/dispatchfiltersinfo";
import {setPredifinedFilters} from "@/dispatches/services/setpredifinedfilters";
import FileItemAlternative from "@/common/ui/FileItemAlternative/FileItemAlternative.vue";



// STORE
const newDispatch = useNewDispatchStore();
const redactDispatch = useRedactDispatchStore();
const appStore = useAppStore();
const newDispatchFilter = useNewDispatchFilterStore();
const redactDispatchFilter = useRedactDispatchFilterStore();
const dispatches = useDispatchesStore();
const synchroStore = useSynchroStore();
const previewStore = usePreviewStore();

// DATA
const machineDownloadActive = ref(false);
const predefinedFilter = ref(null);


// METHODS
const deleteAttachment = async (index)=>{
  if(appStore.$state.activeComponent === 'modifydispatch' && redactDispatch.$state.dispatch_id !==0){
    if(redactDispatch.$state.dispatch_files.length > 0){
      let deleteId = redactDispatch.$state.dispatch_files[Number(index)]['id'];
      let delAnswer = await deleteDispatchAttachment(redactDispatch.$state.dispatch_id, deleteId);
      if (delAnswer.status === 'ok'){
        await getDispatchesList(dispatches, redactDispatch, synchroStore, previewStore);
      }
    }
  }
  if(appStore.$state.activeComponent === 'newdispatch'){
    newDispatch.dispatch_files = [];
  }
}


const clickBackButton = ()=>{
  if(appStore.$state.activeComponent === 'newdispatch'){
    newDispatch.$reset();
    newDispatchFilter.$reset();
  }
  else if(appStore.$state.activeComponent === 'modifydispatch'){
    redactDispatch.$reset();
    redactDispatchFilter.$reset();
  }
  appStore.activeComponent = 'dispatches';
}


const cleanTextInput = (text)=>{
  return text.replace(/\s+/g, "").replace(/\r+/g, "");
}

const resetInfoErrors = ()=>{
  if (appStore.$state.activeComponent === 'newdispatch'){
    newDispatch.timeError = false;
    newDispatch.titleInfoText = '';
    newDispatch.dateError = false;
    newDispatch.dateInfoText = '';
    newDispatch.telMessageError = false;
    newDispatch.telMessageInfoText = '';
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    redactDispatch.timeError = false;
    redactDispatch.titleInfoText = '';
    redactDispatch.dateError = false;
    redactDispatch.dateInfoText = '';
    redactDispatch.telMessageError = false;
    redactDispatch.telMessageInfoText = '';
  }
}

const validateProcess = (target)=>{
  if (appStore.$state.activeComponent === 'newdispatch'){
    validateDispatch(target, newDispatch);
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    validateDispatch(target, redactDispatch);
  }
}

const validateDispatch = (target, dispatchStore)=>{
  resetInfoErrors();

  let valid = true;

  if(dispatchStore.$state.methodList.length === 0){
    dispatchStore.methodError = true;
    dispatchStore.methodInfoText = "Укажите хотя бы один метод отправки!";
    valid = false;
  }

  if (target !== 'test'){
    if(dispatchStore.$state.scheduleType === 'scheduled' && dispatchStore.$state.dispatchDate === ''){
      dispatchStore.dateError = true;
      dispatchStore.dateInfoText = 'Укажите дату отправки';
      valid = false;
    }

    if(dispatchStore.$state.scheduleType === 'scheduled' && dispatchStore.$state.dispatchTime === ''){
      dispatchStore.timeError = true;
      dispatchStore.timeInfoText = 'Укажите время отправки';
      valid = false;
    }
  }

  let cleanTitle = cleanTextInput(dispatchStore.$state.title);

  let cleanTelMessage = cleanTextInput(dispatchStore.$state.telegram_text);

  if (target !== 'test'){

    if (cleanTitle === ''){
      dispatchStore.titleError = true;
      dispatchStore.titleInfoText = 'Добавьте заголовок к рассылке';
      valid = false;
    }

    if (cleanTitle !== '' && cleanTitle < 5){
      dispatchStore.titleError = true;
      dispatchStore.titleInfoText = 'Заголовок рассылки должен быть не менее 5 символов';
      valid = false;
    }
  }

  if (cleanTelMessage === ''){
    dispatchStore.telMessageError = true;
    dispatchStore.telMessageInfoText = 'Добавьте текст рассылки';
    valid = false;
  }
  if (cleanTelMessage !== '' && cleanTelMessage < 5){
    dispatchStore.telMessageError = true;
    dispatchStore.telMessageInfoText = 'Текст рассылки должен быть не менее 5 символов';
    valid = false;
  }

  if(valid){
    if(target === 'draft'){
      confirmDraft(dispatchStore);
    }
    else if(target === 'test'){
      confirmTest(dispatchStore);
    }
    else if(target === 'dispatch'){
      confirmDispatch(dispatchStore);
    }
  }

}

const confirmDraft = (dispatchStore)=>{
  dispatchStore.modalPurpose = 'confirmation';
  dispatchStore.modalTarget = 'draft';
  dispatchStore.modalVisible = true;

  if (appStore.$state.activeComponent === 'newdispatch'){
    dispatchStore.modalText = 'Сохранить рассылку в черновики?';
  }
  if (appStore.$state.activeComponent === 'modifydispatch'){
    dispatchStore.modalText = 'Сохранить изменения в черновике?';
  }
}

const confirmTest = (dispatchStore)=>{

  dispatchStore.modalPurpose = 'confirmation';
  dispatchStore.modalText = 'Отправить тестовую рассылку?';
  dispatchStore.modalTarget = 'test';
  dispatchStore.modalVisible = true;

}

const confirmDispatch = (dispatchStore)=>{

  dispatchStore.modalPurpose = 'confirmation';
  dispatchStore.modalTarget = 'dispatch';
  dispatchStore.modalVisible = true;

  if (appStore.$state.activeComponent === 'newdispatch'){
    if(newDispatch.$state.scheduleType === 'rightaway'){
      dispatchStore.modalText = 'Отправить рассылку?';
    }
    if(newDispatch.$state.scheduleType === 'scheduled'){
      dispatchStore.modalText = 'Запланировать рассылку?';
    }
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    if(redactDispatch.$state.scheduleType === 'rightaway'){
      dispatchStore.modalText = 'Отправить рассылку?';
    }
    if(redactDispatch.$state.scheduleType === 'scheduled'){
      if(redactDispatch.$state.dispatchStatus.db_name === 'draft'){
        dispatchStore.modalText = 'Запланировать рассылку?';
      }
      else{
        dispatchStore.modalText = 'Сохранить изменения в запланированной рассылке?';
      }
    }
  }
}

const processCloseModal = ()=>{
  if (appStore.$state.activeComponent === 'newdispatch'){
    closeDispatchModal(newDispatch, newDispatchFilter);
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    closeDispatchModal(redactDispatch, redactDispatchFilter);
  }
}

const closeDispatchModal = (dispatchStore, filter) =>{
  // console.log("closeDispatchModal");
  if (dispatchStore.$state.modalPurpose === 'success'){

    // console.log("closeDispatchModal dispatchStore.$state.modalPurpose === 'success'");

    // console.log("closeDispatchModal dispatchStore.$state: ", dispatchStore.$state);

    let backFlag = true;
    
    if(dispatchStore.$state.modalTarget === 'test'){
      backFlag = false;
    }

    dispatchStore.modalPurpose = '';
    dispatchStore.modalText = '';
    dispatchStore.modalTarget = '';
    dispatchStore.modalVisible = false;

    if (dispatchStore.$state.dispatchStatus){
      // console.log("if (dispatchStore.$state.dispatchStatus)");
      if (['draft', 'pending'].includes(dispatchStore.$state.dispatchStatus.db_name)){
        backFlag = false;
      }
    }

    if(dispatchStore.$state.modalTarget ==='test'){
      // console.log("if(dispatchStore.$state.modalTarget ==='test'): ", dispatchStore.$state);
      backFlag = false;
    }

    // console.log("closeDispatchModal backFlag: ", backFlag);
    if (backFlag){
      dispatchStore.$reset();
      filter.$reset();
      appStore.activeComponent = 'dispatches';
    }
  }
  else {
    dispatchStore.modalPurpose = '';
    dispatchStore.modalText = '';
    dispatchStore.modalTarget = '';
    dispatchStore.modalVisible = false;
  }
}

const processConfirm = async ()=>{
  if (appStore.$state.activeComponent === 'newdispatch'){
    if (newDispatch.$state.modalTarget === 'test'){
      await sendTelegramTestDispatch(newDispatch, 'newdispatch');
    }
    else if (newDispatch.$state.modalTarget === 'draft'){
      await saveDispatch(newDispatch.$state.modalTarget);
    }
    else if (newDispatch.$state.modalTarget === 'dispatch'){
      if(newDispatch.$state.scheduleType === 'rightaway'){
        await telegramDispatch('dispatch', newDispatch, newDispatchFilter);
      }
      else {
        await saveDispatch(newDispatch.$state.modalTarget);
      }
    }
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    if (redactDispatch.$state.modalTarget === 'draft'){
      await saveDispatch(redactDispatch.$state.modalTarget);
    }
    else if (redactDispatch.$state.modalTarget === 'test'){
      await sendTelegramTestDispatch(redactDispatch, 'modifydispatch');
    }
    else if (redactDispatch.$state.modalTarget === 'dispatch'){
      if(redactDispatch.$state.scheduleType === 'rightaway'){
        await telegramDispatch('dispatch', redactDispatch, redactDispatchFilter);
      }
      else{
        await saveDispatch(redactDispatch.$state.modalTarget);
      }
    }
  }
}

const saveDispatch = async (target)=>{
  dispatches.pageNumber = 1;
  if (appStore.$state.activeComponent === 'newdispatch'){
    await saveDispatchInfo(target, newDispatch, newDispatchFilter);
    await getDispatchesList(dispatches, newDispatch, synchroStore, previewStore);
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    await saveDispatchInfo(target, redactDispatch, redactDispatchFilter);
    // console.log("redactDispatch.$state before etDispatchesList", redactDispatch.$state);
    await getDispatchesList(dispatches, redactDispatch, synchroStore, previewStore);
    // console.log("redactDispatch.$state after etDispatchesList", redactDispatch.$state);
  }
}

const telegramDispatch = async (target, store, filter)=>{
  dispatches.pageNumber = 1;
  await sendTelDispatch(target, store, filter);
  await getDispatchesList(dispatches, store, synchroStore, previewStore);
}


const processChangeFilterParams = (filter_data)=>{
  // console.log("SET FILTER DATA: ", filter_data);

  if (appStore.$state.activeComponent === 'newdispatch'){
    newDispatchFilter.$patch(filter_data);
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    redactDispatchFilter.$patch(filter_data);
  }
}

// COMPUTED
const sendDispatchText = computed(()=>{
  let sendtext ='';

  if (appStore.$state.activeComponent === 'newdispatch'){
    if (newDispatch.$state.scheduleType === 'rightaway'){
      sendtext = 'Отправить рассылку';
    }
    else{
      sendtext = 'Запланировать рассылку';
    }
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){
    if (redactDispatch.$state.scheduleType === 'rightaway'){
      sendtext = 'Отправить рассылку';
    }
    else{
      if (redactDispatch.$state.dispatchStatus.db_name === 'draft'){
        sendtext = 'Запланировать рассылку';
      }
      else {
        sendtext = 'Сохранить изменения';
      }
    }
  }

  return sendtext;
});

const saveDraftVisibilityButton = computed(()=>{
  let visibilityFlag = false;

  if (appStore.$state.activeComponent === 'newdispatch'){
    visibilityFlag = true;
  }

  if (appStore.$state.activeComponent === 'modifydispatch'){
    if(['draft', 'pending'].includes(redactDispatch.$state.dispatchStatus.db_name)){
      visibilityFlag = true;
    }
  }

  return visibilityFlag;
});

const draftButtonText = computed(()=>{
  let buttonText = "Сохранить черновик";

  if (appStore.$state.activeComponent === 'modifydispatch'){
    if (redactDispatch.$state.dispatchStatus.db_name === 'draft'){
      buttonText = "Сохранить изменения";
    }
  }

  return buttonText;
})

// LIFECYCLE
onMounted(async ()=>{
  // console.log("DispatchDetail onMounted");
  if (appStore.$state.activeComponent === 'newdispatch'){
    let isFilterSet = await checkIfFilterSet(newDispatchFilter);

    if (isFilterSet){
      predefinedFilter.value = await JSON.parse(JSON.stringify(newDispatchFilter.$state));
    }
    else {
      predefinedFilter.value={};
    }
  }
  else if (appStore.$state.activeComponent === 'modifydispatch'){

    let filters = await getDispatchFiltersInfo(redactDispatch.$state.dispatch_id);

    if(filters.status === 'ok'){

      await setPredifinedFilters(filters.filters, redactDispatchFilter);

      let isFilterSet = await checkIfFilterSet(redactDispatchFilter);

      if (isFilterSet){
        predefinedFilter.value = JSON.parse(JSON.stringify(redactDispatchFilter.$state));
        // Пока устанавливаем явно, так как всего один метод отправки
        predefinedFilter.value.methodList = redactDispatch.$state.methodList;
      }
      else {
        predefinedFilter.value={};
      }
    }
  }
})

</script>
<style>
 .dispatch-detail-modal-modifier .vue-modal-body{
   padding: 24px !important;
 }
 .dispatch-detail-modal-modifier .vue-modalwindow-header{
   display: none !important;
 }

</style>

<style scoped>
.dispatch-detail-file-item {
  margin-bottom: 30px;
}

.send-dispatch-button {
  margin-left: 16px;
}

.send-testdispatch-button {
  margin-left: 16px;
}

.dispatch-detail-actions-wr {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 40px;
}


.dispatch-detail-setcontent-wr input {
  width: 100%;
}

.dispatch-detail-setcontent-wr textarea {
  width: 100%;
}

.dispatch-detail-setcontent-wr {
  width: 60%;
  padding-left: 48px;
}

.dispatch-detail-setparams-wr {
  display: flex;
  flex-direction: column;
  width: 40%;
  padding-right: 48px;
}

.dispatch-detail-set-wr {
  display: flex;
  flex-direction: row;
  margin-bottom: 56px;
}

.dispatch-detail-back-button-wr {
  margin-bottom: 24px;
}

.dispatch-detail-container {
  display: flex;
  flex-direction: column;
}

</style>