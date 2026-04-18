<template>
  <div
      class="dispatch-main-container"
      id="dispatch-main-container"
  >

    <transition-group name="fade">

        <template v-if="appStore.$state.activeComponent === 'dispatches'">

          <dispatch-header />

          <template v-if="(dispatches.$state.search_phrase ==='' && dispatches.$state.total > 3) || dispatches.$state.search_phrase !==''">
            <dispatch-search
                @refreshlist="getDispatchesList(dispatches, redactDispatch, synchroStore, previewStore)"
            />
          </template>

          <template v-if="dispatches.$state.total>0">
            <dispatch-badges
                @refreshlist="getDispatchesList(dispatches, redactDispatch, synchroStore, previewStore)"
            />
          </template>

          <div
              v-if="dispatches.$state.dispatchesError && dispatches.$state.infoText !== ''"
              class="dispatch-main-error-panel"
          >
            <error-panel
                :text="dispatches.$state.infoText"
                :font-size="16"
            />
          </div>


          <template v-if="dispatches.$state.total>10">
            <dispatch-page-count
                @refreshlist="getDispatchesList(dispatches, redactDispatch, synchroStore, previewStore)"
            />
          </template>


          <template v-if="dispatches.$state.total>0">
            <dispatch-main-table
                @refreshlist="getDispatchesList(dispatches, redactDispatch, synchroStore, previewStore)"
            />
          </template>


          <template v-if="dispatches.$state.total === 0 && !dispatches.$state.dispatchesError && !dispatches.loadingDispatches">
            <dispatch-no-result
                @resetfilters="resetFilters()"
            />
          </template>

        </template>

    </transition-group>

    <transition name="fade" mode="out-in">
      <template v-if="appStore.$state.activeComponent === 'newdispatch' || appStore.$state.activeComponent === 'modifydispatch'">
        <dispatch-detail />
      </template>
    </transition>

    <div
        v-if="dispatches.$state.loadingDispatches"
        class="dispatch-main-container-loader"
    >
      <content-loader />
    </div>
  </div>
</template>

<script setup>
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import ContentLoader from "@/questions/components/ContentLoader/ContentLoader.vue";
import DispatchNoResult from "@/dispatches/components/DispatchNoResult.vue";
import DispatchMainTable from "@/dispatches/components/DispatchMainTable/DispatchMainTable.vue";
import DispatchPageCount from "@/dispatches/components/DispatchPageCount.vue";
import DispatchBadges from "@/dispatches/components/DispatchBadges.vue";
import DispatchSearch from "@/dispatches/components/DispatchSearch.vue";
import DispatchDetail from "@/dispatches/components/DispatchDetail/DispatchDetail.vue";
import {useAppStore} from "@/dispatches/store/app";
import {useDispatchesStore} from "@/dispatches/store/dispatches";
import {useRedactDispatchStore} from "@/dispatches/store/redactdispatch";
import DispatchHeader from "@/dispatches/components/DispatchHeader.vue";
import {getDispatchesList} from "@/dispatches/services/dispatcheslist";
import {onMounted, onUnmounted} from "vue";
import {app_config} from "@/dispatches/config/setconfig";
import {compareDispatchState} from "@/dispatches/services/comparestate";
import {useSynchroStore} from "@/dispatches/store/synchrostore";
import {usePreviewStore} from "@/dispatches/store/preview";

let timer;


// STORE
const appStore = useAppStore();
const dispatches = useDispatchesStore();
const redactDispatch = useRedactDispatchStore();
const synchroStore = useSynchroStore();
const previewStore = usePreviewStore();

// METHODS
const resetFilters = async ()=>{
  dispatches.$reset();
  await getDispatchesList(dispatches, redactDispatch, synchroStore, previewStore);
}

// const getTestDictionaries = async ()=>{
//   let infoResp = await fetch('http://kpispi2.test.emias.mos.ru/spi/nsi2/publication/v1/getCatalogItems.api', {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       'Content-Type': "application/json"
//     },
//     body: JSON.stringify({
//       id: 3308
//     })
//   });
//
//   let respStatus = Number(infoResp.status);
//   console.log("getTestDictionaries respStatus: ", respStatus);
//
//   let saveAnswer = await infoResp.json();
//   console.log("getTestDictionaries saveAnswer: ", saveAnswer);
//
// }

// LIFECYCLE
onMounted(async ()=>{
  // await getTestDictionaries();
  await getDispatchesList(dispatches, redactDispatch, synchroStore, previewStore);
  timer = await setInterval( function() { compareDispatchState(dispatches, synchroStore, redactDispatch, previewStore); }, app_config.compareStateInterval );
});

onUnmounted(async ()=>{
  if(timer){
    await clearInterval(timer);
  }
});

</script>
<style>
@import "@/css/reset_confluence.css";
@font-face {
  font-family: "OpenSans";
  /*src: url(http://127.0.0.1:5080/api/static/fonts/OpenSans-Medium.ttf) format("truetype");*/
  src: url(https://edu.emias.ru/edu-rest-api/dispatches/api/static/fonts/OpenSans-Medium.ttf) format("truetype");
}

#dispatches-app .wiki-content ul {
list-style: none !important;
}
</style>

<style scoped>
@import '../../node_modules/floating-vue/dist/style.css';
@import "@/css/tooltip.css";
@import "@/css/form-v1.css";
@import "@/css/fix/formfix.css";
@import "@/dispatches/css/common.css";
@import "@/dispatches/css/searchpanelfix.css";

.dispatch-main-container-loader {
  position: absolute;
  top: 50%;
  left: 50%
}

.dispatch-main-container {
  position: relative;
  width: 80%;
  margin: auto;
  font-family: OpenSans !important;
  font-size: 15px;
  font-weight: 400;
}

</style>