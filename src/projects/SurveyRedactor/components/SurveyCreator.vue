<template>

  <div v-if="isLoading" class="survey-creator-loading">
    <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка..." />
  </div>


  <div v-if="saveStateError !== '' " class="survey-creator-error">
      {{ saveStateError }}
  </div>

  <div ref="creatorcontainer" id="creator-container"
       :class="{'survey-creator-disable': disableStyle}">
    <SurveyCreatorComponent :model="creator" />
  </div>

</template>

<script setup>
import { SurveyCreatorModel } from "survey-creator-core";
import { SurveyCreatorComponent } from "survey-creator-vue";
import "survey-creator-core/i18n/russian";
import {useSurveyStore} from "@/projects/global/store/survey";
import {saveCreatorState} from "@/projects/SurveyRedactor/services/savecreatorstate";
import {onMounted, ref} from "vue";
import {app_config} from "@/projects/config/setconfig";

const options = {
  showEmbededSurveyTab : true
};
const creator = new SurveyCreatorModel(options);

// STORE
const surveyStore = useSurveyStore();

// DATA
const isLoading = ref(true);
const saveStateError = ref('');
const disableStyle = ref(false);

// METHODS
const saveState = async(content)=>{
  disableStyle.value = true;
  let saveResp = await saveCreatorState(surveyStore.$state.id, content);
  if (saveResp['status'] !== 'ok'){
    saveStateError.value = 'Внимание! При попытке сохранить прогресс изменений произошла ошибка!';
  }
  disableStyle.value = false;
}

// LEFECYCLE
onMounted(async ()=>{
  disableStyle.value = true;
  creator.locale = "ru";
  creator.isAutoSave = true;
  creator.showState = true;
  creator.text = await surveyStore.$state.content;
  disableStyle.value = false;
  creator.saveSurveyFunc = ()=>{saveState(creator.text)};
  isLoading.value = false;
})


</script>
<style>
@import 'survey-core/defaultV2.min.css';
@import "survey-creator-core/survey-creator-core.min.css";

label.sv-boolean {
  display: flex;
}
span.svc-creator__non-commercial-text {
  display: none;
}

.svc-full-container {
  min-height: 900px;
}

.unicon {
  display: flex !important;
}

ul.navbar-default.container-fluid.nav.nav-tabs.editor-tabs.svd-tabs.svd-light-bg-color {
  display: flex !important;
  list-style-type: none;
  padding: 0;
  margin-bottom: 0;
}
.svd_commercial_container {
  display: none !important;
}
.survey-creator-disable {
  pointer-events: none;
  opacity: 0.4;
}
span#svd-state {
  display: none !important;
}
</style>

<style scoped>
.survey-creator-loading {
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.survey-creator-error {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.3em;
  color: #dc3545;
}

</style>