<template>
  <div class="edu-massincident-main-container">
    <template v-if="isLoading">
      <div class="edu-massincident-loading">
        <div class="edu-massincident-loading-text">
          Загрузка информации
        </div>

        <div class="edu-massincident-loading-icon">
          <content-loader />
        </div>
      </div>
    </template>

    <template v-else>

      <template v-if="appErrorInfo !== ''">
        <div class="edu-massincident-error-wr">
          {{ appErrorInfo }}
        </div>
      </template>

      <template v-else>
        <div class="edu-massincident-container">
          <div class="edu-massincident-tabs-title-container">
            <div
                @click="changeActiveTab('table')"
                id="incident-tab"
                class="edu-massincident-tab incident-tab"
                :class="{'incident-active-tab': activeTab === 'table'}"
            >
              Проблемы и предложения
            </div>
            <div
                @click="changeActiveTab('statistic')"
                id="statistic-tab"
                class="edu-massincident-tab statistic-tab"
                :class="{'incident-active-tab': activeTab === 'statistic'}"
            >
              Статистика
            </div>
          </div>

          <div class="edu-massincident-workspace">

            <template v-if="activeTab === 'table'">
              <div v-html="disclaimer" class="edu-incident-tab-disclaimer">
              </div>
            </template>

            <div class="edu-massincident-search">
              <search-panel
                  placeholder="Поиск"
                  v-model="reactiveAppStore.searchInput.value"
                  @resetsearch="resetSearch"
              />
            </div>

            <div
                v-if="appStore.$state.dataArr.length !==0"
                class="edu-massincident-badge-wr">
              <div class="massincident-type-badge-wr">
                <div class="massincident-type-badge-title">
                  Тип обращения
                </div>
                <div class="massincident-type-badge">
                  <div>
                    <badge-component
                        badge-text="Проблемы"
                        group-id="problems"
                        :active-id-in-group="appStore.$state.incidentFilter"
                        @badgeactive="(id)=>onActiveIncidentFilter(id)"
                        @badgeinactive="(id)=>onInActiveIncidentFilter(id)"

                    />
                  </div>

                  <div class="massincident-badge-leftmargin-wr">
                    <badge-component
                        badge-text="Предложения"
                        group-id="proposals"
                        :active-id-in-group="appStore.$state.incidentFilter"
                        @badgeactive="(id)=>onActiveIncidentFilter(id)"
                        @badgeinactive="(id)=>onInActiveIncidentFilter(id)"
                    />
                  </div>
                </div>
              </div>

              <div class="massincident-period-badge-wr">
                <template v-if="activeTab === 'statistic'">
                  <div class="massincident-period-badge-title">
                    Период
                  </div>
                  <div class="massincident-period-badge">
                    <div>
                      <badge-component
                          badge-text="За все время"
                          group-id="alltime"
                          default-group-id="alltime"
                          :active-id-in-group="appStore.$state.statisticFilter"
                          @badgeactive="(id)=>onActiveStatisticFilter(id)"
                          @badgeinactive="(id)=>onInActiveStatisticFilter(id)"
                      />
                    </div>
                    <div class="massincident-badge-leftmargin-wr">
                      <badge-component
                          badge-text="За месяц"
                          group-id="monthly"
                          :active-id-in-group="appStore.$state.statisticFilter"
                          @badgeactive="(id)=>onActiveStatisticFilter(id)"
                          @badgeinactive="(id)=>onInActiveStatisticFilter(id)"
                      />
                    </div>
                    <div class="massincident-badge-leftmargin-wr">
                      <badge-component
                          badge-text="За неделю"
                          group-id="weekly"
                          :active-id-in-group="appStore.$state.statisticFilter"
                          @badgeactive="(id)=>onActiveStatisticFilter(id)"
                          @badgeinactive="(id)=>onInActiveStatisticFilter(id)"
                      />
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div class="edu-massincident-tab-content">

              <template v-if="activeTab === 'table'">
                <div class="edu-incident-tab-content">
                  <incident-table
                      @sendsuccess="getInitialData()"
                      @resetfilters="getInitialData()"
                  />
                </div>
              </template>

              <template v-else>
                <div class="edu-statistic-tab-content">
                  <statistic-table
                      @resetfilters="getInitialData()"
                  />
                </div>
              </template>

            </div>

          </div>

        </div>
      </template>
    </template>
  </div>
</template>

<script setup>
import {useAppStore} from "@/massincidents/store/app";
import {useFreezeArrayStore} from "@/massincidents/store/freezearray";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {onMounted, onUnmounted, ref, watch} from "vue";
import {disclaimer} from "@/massincidents/components/disclaimer";
import SearchPanel from "@/common/ui/SearchPanel/SearchPanel.vue";
import BadgeComponent from "@/common/ui/BadgeComponent/BadgeComponent.vue";
import IncidentTable from "@/massincidents/components/IncidentTable.vue";
import StatisticTable from "@/massincidents/components/StatisticTable.vue";
import ContentLoader from "@/questions/components/ContentLoader/ContentLoader.vue";
import {getLocalHostInfo} from "@/massincidents/service/getlocalhostinfo";
import {getEmiasInfo} from "@/massincidents/service/getemiasinfo";
import {app_config} from "@/massincidents/config/setconfig";
import {getPollData} from "@/massincidents/service/getpolldata";
import {performSearch} from "@/massincidents/service/search";
import {makeSort} from "@/massincidents/service/makesort";
import {makeKpiFilter} from "@/massincidents/service/makekpifilter";
import {storeToRefs} from "pinia";
import {makeTypeFilter} from "@/massincidents/service/maketypefilter";
import {fetchPublicIpSoft} from "@/massincidents/service/ipify";


// STORE
const appStore = useAppStore();
const freezeArrStore = useFreezeArrayStore();
const reactiveAppStore = storeToRefs(useAppStore());

// DATA

const isLoading = ref(false);

const appErrorInfo = ref('');

// table statistic
const activeTab = ref('table');


// METHODS


const getInitialData = () =>{
  appStore.searchInput = '';
  appStore.activekpilist = [];
  appStore.incidentFilter = '';
  resetSort();
  getPollData(appStore, freezeArrStore);
}

const resetSort = ()=>{
  appStore.openTimeSort = 0;
  appStore.cntCountSort = null;

  appStore.statisticFilter = 'alltime';
  appStore.statisticAllSdSort = null;
  appStore.statisticMonthSdSort = null;
  appStore.statisticWeekSdSort = null;
  appStore.statisticAllVotesSort = null;
  appStore.statisticMonthVotesSort = null;
  appStore.statisticWeekVotesSort = null;
}

const changeActiveTab = (target)=>{

  resetSort();

  appStore.dataArr = freezeArrStore.$state.dataArr;

  performChange();

  appStore.activeTab = target;

  if (target !== activeTab.value){
    activeTab.value = target;
  }
}

const onActiveIncidentFilter = (id)=>{
  appStore.incidentFilter = id;
}
const onInActiveIncidentFilter = (id)=>{
  if(appStore.$state.incidentFilter === id){
    appStore.incidentFilter = '';
  }
}

const onActiveStatisticFilter = (id) =>{
  appStore.statisticFilter = id
}

const onInActiveStatisticFilter = (id)=>{
    if(appStore.$state.statisticFilter === id){
      appStore.statisticFilter = 'alltime';
    }
}

const getFingerPrint = async ()=>{
  // console.log("getFingerPrint");
  let fp = await FingerprintJS.load();
  const resultfp = await fp.get();
  const { canvas, screenResolution, ...components } = resultfp.components;
  appStore.userfingerprintid = FingerprintJS.hashComponents(components);
  // console.log("appStore.userfingerprintid: ", appStore.$state.userfingerprintid);
}

const checkInitialData = ()=>{
  // console.log("checkInitialData");
  let validateInfo = true;
  if (appStore.$state.userfingerprintid === ''){
    validateInfo = false;
  }
  if(appStore.isUserFromArm && appStore.$state.localHostInfo.login === ''){
    validateInfo = false;
  }
  if(appStore.isUserFromArm && appStore.$state.emiasData.login === ''){
    validateInfo = false;
  }
  // console.log("checkInitialData validateInfo: ", validateInfo);
  return validateInfo;
}

const checkEmiasData = async ()=>{
  if (appStore.isUserFromArm && appStore.$state.localHostInfo.login !== ''){
    // console.log("checkEmiasData");
    let emiasInfo = await getEmiasInfo(appStore);

    // console.log("checkEmiasData emiasInfo :", emiasInfo);

    if(emiasInfo.status === 'ok'){

      appStore.emiasData.login = await emiasInfo['info']['login'];
      appStore.emiasData.fio = await emiasInfo['info']['fio'];
      appStore.emiasData.mo = await emiasInfo['info']['mo'];

    }
  }
}

const checkUserIp = async ()=>{
  // console.log("checkUserIp");
  if(appStore.$state.userip === ''){
    let fetchIp = await fetchPublicIpSoft(
    { timeoutMs: app_config.checkIpTimeout }
    );
    if(fetchIp){
      appStore.userip = fetchIp;
    }
  }
}

const resetSearch = ()=>{
  resetSort();
  appStore.searchInput = '';
  performChange();
}

const performChange = ()=>{
  // console.log("performChange");
  appStore.dataArr = makeTypeFilter(appStore,freezeArrStore, true);
  // console.log("performChange appStore.dataArr after makeTypeFilter: ", appStore.$state.dataArr);
  if(appStore.$state.activekpilist.length !==0){
    appStore.dataArr = makeKpiFilter(appStore,freezeArrStore, false);
    // console.log("performChange appStore.dataArr after makeKpiFilter: ", appStore.$state.dataArr);
  }
  if (appStore.$state.searchInput !==''){
    appStore.dataArr = performSearch(appStore, freezeArrStore, false);
    // console.log("performChange appStore.dataArr after performSearch: ", appStore.$state.dataArr);
  }
  makeSort(appStore, freezeArrStore);
  // console.log("performChange appStore.dataArr after makeSort: ", appStore.$state.dataArr);
};

const handleResize = () => {
  appStore.windowWidth = window.innerWidth
  appStore.windowHeight = window.innerHeight
}


// LIFECYCLE
onMounted(async ()=>{
  handleResize();
  isLoading.value = true;
  await getFingerPrint();
  await getLocalHostInfo(appStore);
  await checkEmiasData();
  await checkUserIp()

  let validate = await checkInitialData();

  if (validate){
    await getPollData(appStore, freezeArrStore);
  }
  else {
    appErrorInfo.value = 'ВНИМАНИЕ! Произошла проблема при получении необходимых данных. Повторите попытку позже.';
  }
  isLoading.value = false;
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// WATCH
watch(
    () => appStore.searchInput,
    () => {
      // console.log("change search")
      performChange();
    }
);

watch(
    () => appStore.incidentFilter,
    () => {
      performChange();
    }
);

</script>

<style>
@font-face {
  font-family: "OpenSans";
  /*Для prod*/
   src: url(https://edu.emias.ru/edu-rest-api/api7/static/fonts/OpenSans-Medium.ttf) format("truetype");
  /*src: url(http://127.0.0.1:5000/edu-rest-api/api7/static/fonts/OpenSans-Medium.ttf) format("truetype");*/
}
#edu-incident-product-container .vue-modal-body {
 padding: 0 !important;
}

.incident-inline-icon img {
 /*Для dev*/
  /*position: absolute;*/
  top: -5px;
}

.incident-inline-icon {
position: relative;
}

.cell.xlarge-2.article__toc.show-for-xlarge {
display: none !important;
}

.incident-table-icon img {
  max-width: unset !important;
}

[type='text'] {
  margin: unset !important;
  box-shadow: unset !important;
}
[type='text']:focus {
  border: none !important;
}
.em-search-input-wr {
  padding: unset !important;
}

.em-search-text:hover {
  background-color: #d7f0f0 !important;
}

.edu-massincident-search .em-search-input-wr:hover {
  border-color: #757575 !important;
}

.edu-massincident-search .em-search-input-wr:focus-within {
  border-width: 2px !important;
  border-color: #3dcfcf !important;
  box-shadow: unset !important;
  border-right: 2px #3dcfcf solid !important;
}
.edu-incident-tab-disclaimer p {
  margin-bottom: 4px !important;
  margin-top: 4px !important;
}

</style>

<style scoped>
@import '../../node_modules/floating-vue/dist/style.css';
@import "@/css/form-v1.css";
@import "@/css/tooltip.css";

.edu-massincident-error-wr {
  font-size: 20px;
  min-height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #F05C46;
}

.edu-massincident-loading-text {
  font-size: 20px;
  margin-bottom: 40px;
}

.edu-massincident-loading {
  min-height: 350px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edu-statistic-tab-content {
  margin-top: 40px;
}

.edu-incident-tab-content {
  margin-top: 40px;
}

.edu-massincident-search {
  margin-top: 30px;
}

.massincident-period-badge {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
}

.massincident-badge-leftmargin-wr {
  margin-left: 20px;
}

.massincident-period-badge-wr {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.massincident-type-badge {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
}

.massincident-type-badge-wr {
  margin-bottom: 25px;
  width: 50%;
  display: flex;
  flex-direction: column;
}

.edu-massincident-badge-wr {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.edu-incident-tab-disclaimer {
  font-size: 16px;
  font-weight: 400;
  margin-top: 40px;
  margin-bottom: 40px;
}

.edu-incident-tab-disclaimer p{
  font-size: 16px !important;
  font-weight: 400 !important;
}

.incident-active-tab {
  color: #333333 !important;
  border-bottom: 2px #FFCC00 solid;
}

.edu-massincident-tab {
  margin-right: 20px;
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #1E8686;
}

.edu-massincident-tabs-title-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.edu-massincident-container {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.edu-massincident-main-container {
  font-family: OpenSans;
  display: flex;
  width: 100%;
  flex-direction: column;
}

@media (min-width: 576px) {

}

@media (min-width: 768px) {
  .edu-massincident-badge-wr {
    flex-direction: row;
    margin-bottom: unset;
  }
}

@media (min-width: 992px) {

}

@media (min-width: 1200px) {

}


</style>