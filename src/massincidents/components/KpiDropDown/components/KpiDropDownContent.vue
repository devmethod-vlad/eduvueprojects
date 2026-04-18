<template>
  <div
      class="incident-dropdown-wr"
      id="incident-dropdown-wr"
  >
    <div
        v-for="item in appStore.$state.kpilist"
        class="incident-dropdown-item-wr"
        :key="item"
        :class="{'incident-dropdown-active-item': appStore.$state.activekpilist.includes(item)}"
    >
      <div class="incident-dropdown-item-checkbox">
        <custom-checkbox
            :id="item"
            @active="(id)=>{addToActiveKpiList(id)}"
            @inactive="(id)=>{removeFromActiveKpiList(id)}"
            :check-list="appStore.$state.activekpilist"
        />
      </div>
      <div class="incident-dropdown-item-text">
        {{ item }}
      </div>
    </div>

  </div>
</template>

<script setup>
import CustomCheckbox from "@/common/ui/CustomCheckbox/CustomCheckbox.vue";
import {makeKpiFilter} from "@/massincidents/service/makekpifilter";
import {performSearch} from "@/massincidents/service/search";
import {makeSort} from "@/massincidents/service/makesort";
import {useAppStore} from "@/massincidents/store/app";
import {useFreezeArrayStore} from "@/massincidents/store/freezearray";
import {watch} from "vue";
import {makeTypeFilter} from "@/massincidents/service/maketypefilter";

// STORE
const appStore = useAppStore();
const freezeArrStore = useFreezeArrayStore();

// METHODS
const addToActiveKpiList = (id)=>{
  if(!appStore.$state.activekpilist.includes(id)){
    appStore.activekpilist.push(id);
  }
};
const removeFromActiveKpiList= (id)=>{
  // let copyAppStore = {...appStore.$state};

  let idIndex = appStore.$state.activekpilist.indexOf(id);
  if(idIndex !== -1){
    appStore.activekpilist.splice(idIndex, 1);
  }
};

// WATCH
watch(
    () => appStore.activekpilist,
    (newValue) => {
      if(newValue.length === 0){
        console.log("newValue.length === 0 && oldValue.length !== 0");
        appStore.dataArr = JSON.parse(JSON.stringify(freezeArrStore.$state.dataArr));
      }
      if(newValue.length !==0){
        appStore.dataArr = makeKpiFilter(appStore, freezeArrStore);
      }
      if (appStore.$state.searchInput !==''){
        appStore.dataArr = performSearch(appStore, freezeArrStore, false);
      }
      makeTypeFilter(appStore, freezeArrStore);
      makeSort(appStore, freezeArrStore);
    },
    {deep: true}
);

</script>

<style scoped>
.incident-dropdown-item-checkbox {
  display: flex;
  align-items: center;
}

.incident-dropdown-active-item {
  background-color: #D4EBEB;
}

.incident-dropdown-item-text {
  margin-left: 20px;
}

.incident-dropdown-item-wr:hover {
  background-color: #EAF5F5;
}


.incident-dropdown-item-wr {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.incident-dropdown-wr {
  font-weight: 400;
  font-size: 16px;
  color: #757575;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>