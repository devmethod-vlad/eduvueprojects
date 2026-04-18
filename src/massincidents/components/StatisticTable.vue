<template>
  <template v-if="appStore.$state.dataArr.length !==0">
    <div class="edu-massincident-statistic-table">
      <div class="edu-statistic-table-header">

        <div class="edu-statistic-table-header-item header-statistic-incident-item">
            Инцидент / Тип
        </div>
        <div
            class="edu-statistic-table-header-item header-statistic-product-item"
            id="edu-incident-product-container"
        >
          <div class="statistic-header-item-text">
            Продукт
          </div>
          <div @click.prevent.stop="(appStore.$state.kpilist.length !==0 && freezeArrStore.$state.dataArr.length >2) ? processKpiDropDown() : null" class="statistic-header-item-icon">
            <template v-if="kpiDropDownVisible">
              <app-icon
                  name="chevron-up"
                  :size="16"
                  color="#269999"
              />
            </template>
            <template v-else>
              <app-icon
                  name="chevron-down"
                  :size="16"
                  color="#269999"
              />
            </template>
          </div>
          <template v-if="kpiDropDownVisible">
              <kpi-drop-down
                  @closedropdown="kpiDropDownVisible = false"
              />
          </template>
        </div>
        <div class="edu-statistic-table-header-item  header-statistic-sdcount-item">
          <div class="statistic-header-item-text">
            Количество обращений
          </div>
          <div @click.stop.prevent="freezeArrStore.$state.dataArr.length > 2 ? changeSdSort() : null" class="statistic-header-item-icon">
            <template v-if="appStore.$state.dataArr.length > 2">
              <template v-if="sdCountOrder === 'asc'">

                <VTooltip theme="qst-arrow-tooltip-black">
                  <app-icon
                      name="sorting-increase"
                      :size="16"
                      color="#269999"
                  />
                  <template #popper>По возрастанию</template>
                </VTooltip>

              </template>
              <template v-else>

                <VTooltip theme="qst-arrow-tooltip-black">
                  <app-icon
                      name="sorting-decrease"
                      :size="16"
                      color="#269999"
                  />
                  <template #popper>По убыванию</template>
                </VTooltip>

              </template>
            </template>
          </div>
        </div>

        <div class="edu-statistic-table-header-item  header-statistic-votescount-item">
          <div class="statistic-header-item-text">
            Количество голосов
          </div>
          <div @click.stop.prevent="freezeArrStore.$state.dataArr.length > 2 ? changeVotesSort() : null" class="statistic-header-item-icon">
            <template v-if="appStore.$state.dataArr.length > 2">
              <template v-if="votesCountOrder === 'asc'">
                <VTooltip theme="qst-arrow-tooltip-black">
                  <app-icon
                      name="sorting-increase"
                      :size="16"
                      color="#269999"
                  />
                  <template #popper>По возрастанию</template>
                </VTooltip>

              </template>
              <template v-else>

                <VTooltip theme="qst-arrow-tooltip-black">
                  <app-icon
                      name="sorting-decrease"
                      :size="16"
                      color="#269999"
                  />
                  <template #popper>По убыванию</template>
                </VTooltip>

              </template>
            </template>

          </div>
        </div>

      </div>

      <div class="edu-statistic-table-body">

        <div
            v-for="item in appStore.$state.dataArr"
            :key="item.incident"
            class="edu-statistic-body-item-wr"
        >
          <div class="edu-statistic-body-item body-statistic-incident-item">
            <VTooltip theme="qst-arrow-tooltip-black">
              <div class="body-statistic-incident-dot">
                <template v-if="item.incident_type === 'problem'">
                  <span class="edu-dot edu-dot-problem"></span>
                </template>
                <template v-else>
                  <span class="edu-dot edu-dot-proposal"></span>
                </template>
              </div>

              <template v-if="item.incident_type === 'problem'" #popper>Проблема</template>
              <template v-else #popper>Предложение</template>
            </VTooltip>
            <div class="body-statistic-incident-text">
              {{ item.incident }}
            </div>
          </div>

          <div class="edu-statistic-body-item body-statistic-product-item">
            {{ item.incident_ke }}
          </div>

          <div class="edu-statistic-body-item body-statistic-sdcount-item">
            <template v-if="appStore.$state.statisticFilter === 'alltime'">
              {{ item.cnt_sd }}
            </template>
            <template v-if="appStore.$state.statisticFilter === 'monthly'">
              {{ item.month_count }}
            </template>
            <template v-if="appStore.$state.statisticFilter === 'weekly'">
              {{ item.week_count }}
            </template>
          </div>

          <div class="edu-statistic-body-item body-statistic-votescount-item">

            <template v-if="appStore.$state.statisticFilter === 'alltime'">
              {{ item.db_count }}
            </template>
            <template v-if="appStore.$state.statisticFilter === 'monthly'">
              {{ item.db_month_count }}
            </template>
            <template v-if="appStore.$state.statisticFilter === 'weekly'">
              {{ item.db_week_count }}
            </template>

          </div>

        </div>

      </div>
    </div>
  </template>
  <template v-else>
    <empty-info
        @resetfilters="emits('resetfilters')"
    />
  </template>
</template>

<script setup>
import EmptyInfo from "@/massincidents/components/EmptyInfo.vue";
import {useFreezeArrayStore} from "@/massincidents/store/freezearray";
import {useAppStore} from "@/massincidents/store/app";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {computed, ref} from "vue";
import {makeSort} from "@/massincidents/service/makesort";
import KpiDropDown from "@/massincidents/components/KpiDropDown/KpiDropDown.vue";

// EMITS
const emits = defineEmits('resetfilters');

// STORE
const appStore = useAppStore();
const freezeArrStore = useFreezeArrayStore();

// DATA
const kpiDropDownVisible = ref(false);


// METHODS
const processKpiDropDown = ()=>{
  kpiDropDownVisible.value = !kpiDropDownVisible.value;
}


const changeSdSort = ()=>{

  appStore.statisticAllVotesSort = null;
  appStore.statisticMonthVotesSort = null;
  appStore.statisticWeekVotesSort = null;

  if(appStore.statisticFilter === 'alltime'){
    appStore.statisticMonthSdSort = null;
    appStore.statisticWeekSdSort = null;
    if (appStore.$state.statisticAllSdSort === null || appStore.$state.statisticAllSdSort === 1){
      appStore.statisticAllSdSort = 0;
    }
    else if (appStore.$state.statisticAllSdSort === 0){
      appStore.statisticAllSdSort = 1;
    }
  }

  if(appStore.statisticFilter === 'monthly'){

    appStore.statisticAllSdSort = null;
    appStore.statisticWeekSdSort = null;

    if (appStore.$state.statisticMonthSdSort === null || appStore.$state.statisticMonthSdSort === 1){
      appStore.statisticMonthSdSort = 0;
    }
    else if (appStore.$state.statisticMonthSdSort === 0){
      appStore.statisticMonthSdSort = 1;
    }
  }

  if(appStore.statisticFilter === 'weekly'){

    appStore.statisticAllSdSort = null;
    appStore.statisticMonthSdSort = null;

    if (appStore.$state.statisticWeekSdSort === null || appStore.$state.statisticWeekSdSort === 1){
      appStore.statisticWeekSdSort = 0;
    }
    else if (appStore.$state.statisticWeekSdSort === 0){
      appStore.statisticWeekSdSort = 1;
    }
  }
  makeSort(appStore, freezeArrStore);
}

const changeVotesSort = () =>{
  // console.log("changeVotesSort");

  appStore.statisticAllSdSort = null;
  appStore.statisticMonthSdSort = null;
  appStore.statisticWeekSdSort = null

  if(appStore.statisticFilter === 'alltime'){

    appStore.statisticMonthVotesSort = null;
    appStore.statisticWeekVotesSort = null;

    if (appStore.$state.statisticAllVotesSort === null || appStore.$state.statisticAllVotesSort === 1){
      appStore.statisticAllVotesSort = 0;
    }
    else if (appStore.$state.statisticAllVotesSort === 0){
      appStore.statisticAllVotesSort = 1;
    }
  }

  if(appStore.statisticFilter === 'monthly'){

    appStore.statisticAllVotesSort = null;
    appStore.statisticWeekVotesSort = null;

    if (appStore.$state.statisticMonthVotesSort === null || appStore.$state.statisticMonthVotesSort === 1){
      appStore.statisticMonthVotesSort = 0;
    }
    else if (appStore.$state.statisticMonthVotesSort === 0){
      appStore.statisticMonthVotesSort = 1;
    }
  }

  if(appStore.statisticFilter === 'weekly'){

    appStore.statisticAllVotesSort = null;
    appStore.statisticMonthVotesSort = null;

    if (appStore.$state.statisticWeekVotesSort === null || appStore.$state.statisticWeekVotesSort === 1){
      appStore.statisticWeekVotesSort = 0;
    }
    else if (appStore.$state.statisticWeekVotesSort === 0){
      appStore.statisticWeekVotesSort = 1;
    }
  }

  makeSort(appStore, freezeArrStore);
}


// COMPUTED
let sdCountOrder = computed(()=>{
  let order = '';
  if(appStore.$state.statisticAllSdSort === null
     && appStore.$state.statisticMonthSdSort === null
     && appStore.$state.statisticWeekSdSort === null
  ){
    order = 'asc';
  }
  else {
    if (appStore.$state.statisticFilter === 'alltime'){
      if (appStore.$state.statisticAllSdSort === 1){
        order = 'asc';
      }
      else {
        order = 'desc';
      }
    }
    if (appStore.$state.statisticFilter === 'monthly'){
      if (appStore.$state.statisticMonthSdSort === 1){
        order = 'asc';
      }
      else {
        order = 'desc';
      }
    }
    if (appStore.$state.statisticFilter === 'weekly'){
      if (appStore.$state.statisticWeekSdSort === 1){
        order = 'asc';
      }
      else {
        order = 'desc';
      }
    }
  }
  return order;
});

let votesCountOrder = computed(()=>{
  let order = '';
  if(appStore.$state.statisticAllVotesSort === null
      && appStore.$state.statisticMonthVotesSort === null
      && appStore.$state.statisticWeekVotesSort === null
  ){
    order = 'asc';
  }
  else {
    if (appStore.$state.statisticFilter === 'alltime'){
      if (appStore.$state.statisticAllVotesSort === 1){
        order = 'asc';
      }
      else {
        order = 'desc';
      }
    }
    if (appStore.$state.statisticFilter === 'monthly'){
      if (appStore.$state.statisticMonthVotesSort === 1){
        order = 'asc';
      }
      else {
        order = 'desc';
      }
    }
    if (appStore.$state.statisticFilter === 'weekly'){
      if (appStore.$state.statisticWeekVotesSort === 1){
        order = 'asc';
      }
      else {
        order = 'desc';
      }
    }
  }
  return order;
})


</script>

<style scoped>
.body-statistic-incident-dot {
  cursor: pointer;
  margin-right: 30px;
}


.edu-dot {
  height: 10px;
  width: 10px;
  background-color: #F05C46;
  border-radius: 50%;
  display: inline-block;
}

.edu-dot-problem {
  background-color: #F05C46;
}

.edu-dot-proposal {
  background-color: #38A1D6;
}

.header-statistic-votescount-item .statistic-header-item-text{
  text-align: center;
}

.header-statistic-sdcount-item .statistic-header-item-text{
  text-align: center;
}

.statistic-header-item-text {
  width: 80%;
}

.statistic-header-item-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
}

.body-statistic-incident-item {
  width: 30%;
  display: flex;
  flex-direction: row;
}

.body-statistic-product-item {
  word-break: break-all;
  width: 30%;
}

.body-statistic-sdcount-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
}

.body-statistic-incident-text {
  word-break: break-all;
}

.body-statistic-votescount-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
}

.edu-statistic-body-item-wr {
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  width: 100%;
  flex-direction: row;
  border-bottom: 1px #CCCCCC solid;
}

.header-statistic-incident-item {
  color: #757575;
  width: 30%;
}
.header-statistic-product-item {
  position: relative;
  color: #269999;
  width: 30%;
}
.header-statistic-product-item .statistic-header-item-text {
  text-align: center;
}
.body-statistic-product-item {
  text-align: center;
}

.header-statistic-sdcount-item {
  color: #269999;
  width: 20%;
}

.header-statistic-votescount-item {
  color: #269999;
  width: 20%;
}

.edu-statistic-body-item {
  padding: 7px;
}

.edu-statistic-table-header-item {
  word-break: break-all;
  font-size: 12px;
  padding: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.edu-statistic-table-header {
  min-height: 70px;
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 2px #CCCCCC solid;
}

.edu-massincident-statistic-table {
  font-size: 13px;
  font-weight: 400;
  width: 100%;
  display: flex;
  flex-direction: column;
}

@media (min-width: 576px) {

}

@media (min-width: 768px) {

  .body-statistic-product-item {
    text-align: left;
  }

  .header-statistic-product-item .statistic-header-item-text {
    text-align: left;
  }

  .edu-massincident-statistic-table {
    font-size: 16px;
  }

  .body-statistic-product-item {
    word-break: break-word;
  }
  .body-statistic-incident-text {
    word-break: break-word;
  }
  .edu-statistic-table-header-item {
    word-break: break-word;
    font-size: 14px;
  }
}

@media (min-width: 992px) {
  .edu-statistic-table-header-item {
    font-size: 16px;
  }
}

@media (min-width: 1200px) {

}

</style>