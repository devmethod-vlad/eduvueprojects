<template>
  <div class="filter-machine-header">

    <div
        class="filter-machine-user-count-wr"
        v-if="!machine.$state.showMode && result.$state.total !==0"
    >
      <div class="filter-machine-user-count-icon">
        <app-icon
            name="group"
            :size="28"
        />
      </div>
      <div class="filter-machine-user-count">
        <div class="filter-machine-user-count-pickout">
          <badge-component
              :badge-text="pickOutUsersCount"
              font-color="#757575"
              badge-color="#C2E8E8"
              active-badge-color="#C2E8E8"
              :show-mode="true"
              :hover-active="false"
          />
        </div>
        <div class="filter-machine-user-count-divider">
          /
        </div>
        <div class="filter-machine-user-count-all">
          <badge-component
              :badge-text="usersCountAll"
              badge-color="#E6E6E6"
              font-color="#757575"
              active-badge-color="#E6E6E6"
              :show-mode="true"
              :hover-active="false"
          />
        </div>
      </div>
    </div>


    <div class="filter-machine-search-wr">
      <search-panel
          placeholder="Поиск"
          v-model="reactFilter.search_phrase.value"
          @resetsearch="()=>{emits('resetsearch')}"
          @search-button="()=>{emits('globalsearch')}"
      />
    </div>


    <div
        v-if="result.$state.total > 10"
        class="filter-machine-pagecount-wr"
    >
      <div class="filter-machine-pagecount-text">
        Строк:
      </div>
      <div class="filter-machine-pagecount-counts">
        <div
            v-if="result.$state.total > 10"
            @click="filter.$state.page_count !== 10 ? changePageCount(10) : null"
            class="filter-machine-pagecount-item"
            :class="{'pagecount-item-active': filter.$state.page_count === 10}"
        >
          10
        </div>
        <div
            v-if="result.$state.total > 10"
            @click="filter.$state.page_count !== 25 ? changePageCount(25) : null"
            class="filter-machine-pagecount-item"
            :class="{'pagecount-item-active': filter.$state.page_count === 25}"
        >
          25
        </div>
        <div
            v-if="result.$state.total > 25"
            @click="filter.$state.page_count !== 50 ? changePageCount(50) : null"
            class="filter-machine-pagecount-item"
            :class="{'pagecount-item-active': filter.$state.page_count === 50}"
        >
          50
        </div>
        <div
            v-if="result.$state.total > 50"
            @click="filter.$state.page_count !== 100 ? changePageCount(100) : null"
            class="filter-machine-pagecount-item"
            :class="{'pagecount-item-active': filter.$state.page_count === 100}"
        >
          100
        </div>
      </div>
    </div>
    <div
        class="filter-machine-download-wr"
        @click="downloadUsers()"
    >
      <app-icon
          name="download"
          :size="20"
          color="#269999"
      />
    </div>
  </div>
</template>

<script setup>
import SearchPanel from "@/common/ui/SearchPanel/SearchPanel.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import BadgeComponent from "@/common/ui/BadgeComponent/BadgeComponent.vue";
import {computed} from "vue";
import {useMachineStore} from "@/filtermachine/store/machine";
import {useFilterStore} from "@/filtermachine/store/filter";
import {useResultStore} from "@/filtermachine/store/result";
import {useUsersStore} from "@/filtermachine/store/users";
import {storeToRefs} from "pinia";
import {downloadUsersInfo} from "@/filtermachine/services/downloadusers";



// EMITS
const emits = defineEmits(['changePageCount', 'globalsearch', 'resetsearch']);

// STORE
const machine = useMachineStore();
const filter = useFilterStore();
const result = useResultStore();
const users = useUsersStore();

const reactFilter = storeToRefs(useFilterStore());

// METHODS
const changePageCount = (count)=>{
  filter.page_count = count;
  emits('changePageCount');
}

const downloadUsers = async ()=>{
  await downloadUsersInfo(machine, filter);
}

// COMPUTED
const pickOutUsersCount = computed(()=>{
  let count = 0;

  if (users.$state.prefill === 1){
    count = result.$state.total - users.$state.checkListReverse.length;
  }
  else {
    count = users.$state.checkList.length;
  }

  return '<b>'+count.toString()+'</b>'
});

const usersCountAll = computed(()=>{
  if(result.$state.totalWithoutMethods !==0){
    return '<b>'+result.$state.totalWithoutMethods.toString()+'</b>';
  }
  else{
    return '<b>'+result.$state.total.toString()+'</b>';
  }
})
</script>

<style scoped>
.filter-machine-download-wr {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.pagecount-item-active {
  color: #1D8585 !important;
}

.filter-machine-pagecount-item {
  cursor: pointer;
  margin-right: 16px;
}

.filter-machine-pagecount-text {
  margin-right: 16px;
}

.filter-machine-search-wr {
  width: 60%;
  margin-right: 40px;
}

.filter-machine-pagecount-wr {
  display: flex;
  align-items: center;
  margin-right: 24px;
}

.filter-machine-pagecount-counts {
  display: flex;
  justify-content: flex-start;
}

.em-search-container {
  margin-bottom: unset !important;
}

.filter-machine-user-count-divider {
  font-size: 20px;
  font-weight: 600;
  padding-right: 8px;
  padding-left: 8px;
}

.filter-machine-user-count-icon {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.filter-machine-user-count-wr {
  display: flex;
  margin-right: 40px;
}

.filter-machine-user-count {
  display: flex;
  align-items: center;
}

.filter-machine-header {
  display: flex;
  justify-content: center;

}
</style>