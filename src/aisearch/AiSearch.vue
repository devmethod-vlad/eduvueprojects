<template>
  <div
      class="edu-aisearch-container"
  >
    <div
        class="aisearch-input-container"
        id="ai-search-element-id"
    >
      <search-expand
          placeholder="Подробно сформулируйте свой вопрос"
          v-model="reactiveApp.query.value"
          @search="searchResults()"
          @click-search-icon="searchResults()"
          @resetsearch="app.$reset()"
          :search-element-id="app_config.searchElemId"
          :input-limit-count="1000"
      />
      <template v-if="app.$state.resultPanelVisible">
        <ai-search-results-panel />
      </template>
    </div>


  </div>

</template>

<script setup>
import {app_config} from "@/aisearch/config/setconfig";
import SearchExpand from "@/common/ui/SearchExpand/SearchExpand.vue";
import AiSearchResultsPanel from "@/aisearch/components/AiSearchResultsPanel.vue";
import {storeToRefs} from "pinia";
import {useAppAiSearchStore} from "@/aisearch/store/appaisearch";
import {getSearchResults} from "@/aisearch/services/getresults";

// STORE
const app = useAppAiSearchStore();
const reactiveApp = storeToRefs(useAppAiSearchStore());

// METHODS
const searchResults = async () =>{
  // console.log("main searchResults");
  await getSearchResults(app);
}

</script>

<style>
/*@import "@/css/reset_confluence.css";*/
@import "@/aisearch/css/presentation-dev.css";
/*@import "@/aisearch/css/presentation-prod.css";*/

@font-face {
  font-family: "OpenSans";
  /*src: url(http://127.0.0.1:5000/eduportal/aisearch/static/fonts/OpenSans-Medium.ttf) format("truetype");*/
  src: url(https://edu.example.com/edu-rest-api/aisearch/static/fonts/OpenSans-Medium.ttf) format("truetype");
}

.aisearch-input-container .edu-search-expand-input-wr textarea {
  padding: unset !important;
  margin: unset !important;
  font-family: OpenSans !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
  color: #333333 !important;
  min-height: unset !important;
}

.aisearch-input-container .edu-search-expand-input-wr textarea::placeholder {
  font-family: OpenSans !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
  color: #999999 !important;
}

#content {
  min-height: 700px;
}

.edu-aisearch-container {
  font-family: "OpenSans";
}

.aisearch-input-container .em-search-find-icon{
  display: none !important;
}

.aisearch-input-container .em-search-input-wr {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  padding-right: 16px !important;
  padding-left: 16px !important;
  border: 1px #999999 solid !important;
}
.aisearch-input-container .em-search-input-wr:hover {
  border: 1px #757575 solid !important;
}

.aisearch-input-container .em-search-input {
  color: #333333 !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
}

.aisearch-input-container .em-search-input::placeholder {
  color: #999999 !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
}

.aisearch-input-container .em-search-text {
  color: #269999 !important;
  background-color: white !important;
  border-bottom: 1px #269999 solid !important;
  border-top: 1px #269999 solid !important;
  border-right: 1px #269999 solid !important;
  border-left: unset !important;
}

.aisearch-input-container .em-search-text:hover {
  color: #1D8585 !important;
  background-color: #D7F0F0 !important;
}

.aisearch-input-container .em-search-text:active {
  color: #1D8585 !important;
  background-color: #C2E8E8 !important;
}

.aisearch-input-container .em-search-input-wr:focus-within {
  border: 2px #3DCFCF solid !important;
  box-shadow: unset !important;
  color: #333333 !important;
}

.aisearch-input-container input:-webkit-autofill,
.aisearch-input-container input:-webkit-autofill:focus {
  transition: background-color 0s 600000s, color 0s 600000s !important;
}



</style>

<style scoped>
@import "@/css/form-v1.css";
@import '../../node_modules/floating-vue/dist/style.css';
@import "@/css/tooltip.css";
@import "@/css/fix/modal-new-fix.css";


.aisearch-input-container {
  position: relative;
}

.edu-aisearch-container {
  width: 90%;
  margin: auto;
}

@media (min-width: 576px) {

}

@media (min-width: 768px) {
  .edu-aisearch-container {
    width: 57%;
  }
}

@media (min-width: 992px) {
  .edu-aisearch-container {
    width: 58%;
  }
}

@media (min-width: 1200px) {
  .edu-aisearch-container {
    width: 67%;
  }
}

@media (min-width: 1400px) {

}

</style>
