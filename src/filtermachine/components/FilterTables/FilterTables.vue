<template>

  <div class="filter-tables-wr">
    <div class="filter-tables-body">

      <div
          class="filter-tables-body-closeicon-wr"
          @click.stop.prevent="emits('acceptFilters')"
      >
        <app-icon
            :size="40"
            name="close-circle"
            color="#26999919"
            hover-color="#26999933"
            press-color="#2699994C"
        />
      </div>

      <div
          class="filter-tables-body-resetext-wr"
          @click.stop.prevent="resetTableFilters()"
      >
        Сбросить
      </div>

      <div class="filter-tables-tabs">
        <div
            @click="switchTab('role')"
            class="filter-tables-tab-item"
            :class="{'filter-tables-active-tab-item': machine.$state.activeFilterTab === 'role'}"
        >
          Роль
        </div>

        <div
            @click="switchTab('mo')"
            class="filter-tables-tab-item"
            :class="{'filter-tables-active-tab-item': machine.$state.activeFilterTab === 'mo'}"
        >
          МО
        </div>

        <div
            @click="switchTab('mu')"
            class="filter-tables-tab-item"
            :class="{'filter-tables-active-tab-item': machine.$state.activeFilterTab === 'mu'}"
        >
          МУ
        </div>

        <div
            @click="switchTab('spec')"
            class="filter-tables-tab-item"
            :class="{'filter-tables-active-tab-item': machine.$state.activeFilterTab === 'spec'}"
        >
          Должность
        </div>

      </div>

      <div class="filter-tables-disclaimer">
        <template v-if="machine.$state.activeFilterTab === 'role'">
          {{ roleStore.$state.filter_disclaimer }}
        </template>

        <template v-if="machine.$state.activeFilterTab === 'spec'">
          {{ specStore.$state.filter_disclaimer }}
        </template>

        <template v-if="machine.$state.activeFilterTab === 'mo'">
          {{ moStore.$state.filter_disclaimer }}
        </template>

        <template v-if="machine.$state.activeFilterTab === 'mu'">
          {{ muStore.$state.filter_disclaimer }}
        </template>

      </div>

      <div class="filter-tables-panel">
        <div
            class="filter-tables-panel-search-wr"
            :class="{'em-disabled-style': isDisableByUpdate}"
        >
          <template v-if="machine.$state.activeFilterTab === 'role'">
            <search-panel-v2

                placeholder="Поиск"
                v-model="reactRole.filter_search_phrase.value"
                @resetsearch="resetSearch('role')"
                @search-button="()=>{roleStore.filter_pagecount=10; roleStore.filter_page_number=1; roleStore.needUpdate=true}"

            />
          </template>

          <template v-if="machine.$state.activeFilterTab === 'spec'">
            <search-panel-v2

                placeholder="Поиск"
                v-model="reactSpec.filter_search_phrase.value"
                @resetsearch="resetSearch('spec')"
                @search-button="()=>{specStore.filter_pagecount=10; specStore.filter_page_number=1; specStore.needUpdate=true}"
            />
          </template>

          <template v-if="machine.$state.activeFilterTab === 'mo'">
            <search-panel-v2

                placeholder="Поиск"
                v-model="reactMo.filter_search_phrase.value"
                @resetsearch="resetSearch('mo')"
                @search-button="()=>{moStore.filter_pagecount=10; moStore.filter_page_number=1; moStore.needUpdate=true}"

            />
          </template>

          <template v-if="machine.$state.activeFilterTab === 'mu'">
            <search-panel-v2

                placeholder="Поиск"
                v-model="reactMu.filter_search_phrase.value"
                @resetsearch="resetSearch('mu')"
                @search-button="()=>{muStore.filter_pagecount=10; muStore.filter_page_number=1; muStore.needUpdate=true}"

            />
          </template>
        </div>

        <div
            ref="downloadPanel"
            class="filter-tables-panel-download-wr"
            :class="{'em-disabled-style': isDisableByUpdate || machine.$state.downloadActive || isDisableByNullResults || isDisableByError}"
        >
          <div
              class="filter-tables-panel-download-item"
              @click.stop.prevent="downloadReport('all')"
          >
            <VTooltip theme="qst-arrow-tooltip-black">
              <app-icon
                name="download"
                :size="20"
                color="#1D8585"
                hover-color="#157171"
              />
              <template #popper>Выгрузить все</template>
            </VTooltip>
          </div>
          <div
              class="filter-tables-panel-download-item"
              @click.stop.prevent="downloadCheckedVisible ? downloadReport('checked') : null"
          >
            <template v-if="downloadCheckedVisible">
              <VTooltip theme="qst-arrow-tooltip-black">
                <app-icon
                    name="download-check"
                    :size="33"
                    color="#1D8585"
                    hover-color="#157171"
                />
                <template #popper>Выгрузить отмеченные</template>
              </VTooltip>
            </template>
          </div>
        </div>
      </div>

      <div
          v-if="pageCountVisibility(10)"
          class="filter-tables-page-count"
          :class="{'em-disabled-style': isDisableByUpdate || isDisableByNullResults || isDisableByError}"
      >
        <div class="filter-tables-page-count-text">
          Строк:
        </div>

        <div class="filter-tables-page-counts">

          <div
              v-if="pageCountVisibility(10)"
              @click.stop.prevent="changeFilterPageCount(10)"
              class="filter-tables-page-count-item"
              :class="{'filter-tables-pagecount-item-active': activeFilterPageCount === 10}"
          >
            10
          </div>

          <div
              v-if="pageCountVisibility(10)"
              @click.stop.prevent="changeFilterPageCount(25)"
              class="filter-tables-page-count-item"
              :class="{'filter-tables-pagecount-item-active': activeFilterPageCount === 25}"
          >
            25
          </div>

          <div
              v-if="pageCountVisibility(25)"
              @click.stop.prevent="changeFilterPageCount(50)"
              class="filter-tables-page-count-item"
              :class="{'filter-tables-pagecount-item-active': activeFilterPageCount === 50}"
          >
            50
          </div>

          <div
              v-if="pageCountVisibility(50)"
              @click.stop.prevent="changeFilterPageCount(100)"
              class="filter-tables-page-count-item"
              :class="{'filter-tables-pagecount-item-active': activeFilterPageCount === 100}"
          >
            100
          </div>
        </div>

      </div>

      <div
          class="filter-tables-workspace"
          :class="{'em-disabled-style': isDisableByUpdate}"
      >

        <template v-if="machine.$state.activeFilterTab === 'role'">
          <role-table />
        </template>

        <template v-if="machine.$state.activeFilterTab === 'spec'">
          <spec-table />
        </template>

        <template v-if="machine.$state.activeFilterTab === 'mo'">
          <mo-table />
        </template>

        <template v-if="machine.$state.activeFilterTab === 'mu'">
          <mu-table />
        </template>

      </div>

    </div>

      <template>
        <div class="filter-tables-footer">
        <div class="filter-tables-footer-buttons-wr">
          <button
              class="vue-btn vue-btn-warn-wobg"
              type="button"
              @click.stop.prevent="emits('closeSideModal')"
          >
            Отменить
          </button>
          <button
              class="vue-btn vue-btn-normal filter-tables-footer-button-accept"
              type="button"
              @click.stop.prevent="emits('acceptFilters')"
          >
            Применить
          </button>
        </div>
        </div>
      </template>

  </div>

</template>

<script setup>
import SearchPanelV2 from "@/common/ui/SearchPanelV2/SearchPanelV2.vue";
import RoleTable from "@/filtermachine/components/FilterTables/components/RoleTable/RoleTable.vue";
import SpecTable from "@/filtermachine/components/FilterTables/components/SpecTable/SpecTable.vue";
import MoTable from "@/filtermachine/components/FilterTables/components/MoTable/MoTable.vue";
import MuTable from "@/filtermachine/components/FilterTables/components/MuTable/MuTable.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {useMachineStore} from "@/filtermachine/store/machine";
import {useSpecStore} from "@/filtermachine/store/spec";
import {useRoleStore} from "@/filtermachine/store/role";
import {useMoStore} from "@/filtermachine/store/mo";
import {useMuStore} from "@/filtermachine/store/mu";
import {useFilterStore} from "@/filtermachine/store/filter";
import {useUsersStore} from "@/filtermachine/store/users";
import {computed, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {downloadInfo} from "@/filtermachine/components/FilterTables/services/download";
import * as dayjs from "dayjs";
import {resetFilters} from "@/filtermachine/components/FilterTables/services/auxil";


// EMITS
const emits = defineEmits(['closeSideModal', 'acceptFilters']);


// STORE
const machine = useMachineStore();
const specStore = useSpecStore();
const roleStore = useRoleStore();
const moStore = useMoStore();
const muStore = useMuStore();
const filter = useFilterStore();
const users = useUsersStore();

const reactRole = storeToRefs(useRoleStore());
const reactSpec = storeToRefs(useSpecStore());
const reactMo = storeToRefs(useMoStore());
const reactMu = storeToRefs(useMuStore());

// DATA
const downloadPanel = ref(null);


// METHODS
const changeFilterPageCount = (count)=>{
  if(machine.$state.activeFilterTab === 'role'){
    roleStore.filter_page_number = 1;
    roleStore.filter_pagecount = count;
    specStore.filter_pagecount = 10;
    muStore.filter_pagecount = 10;
    moStore.filter_pagecount = 10;
    roleStore.needUpdate = true;
  }
  else if(machine.$state.activeFilterTab === 'spec'){
    specStore.filter_page_number = 1;
    specStore.filter_pagecount = count;
    roleStore.filter_pagecount = 10;
    muStore.filter_pagecount = 10;
    moStore.filter_pagecount = 10;
    specStore.needUpdate = true;
  }
  else if(machine.$state.activeFilterTab === 'mo'){
    moStore.filter_pagecount = count;
    moStore.filter_page_number = 1;
    roleStore.filter_pagecount = 10;
    muStore.filter_pagecount = 10;
    specStore.filter_pagecount = 10;
    moStore.needUpdate = true;
  }
  else if(machine.$state.activeFilterTab === 'mu'){
    muStore.filter_pagecount = count;
    muStore.filter_page_number = 1;
    roleStore.filter_pagecount = 10;
    moStore.filter_pagecount = 10;
    specStore.filter_pagecount = 10;
    muStore.needUpdate = true;
  }
}

const resetTableFilters = ()=>{
  roleStore.$reset();
  specStore.$reset();
  moStore.$reset();
  muStore.$reset();
  users.$reset();

  if(machine.$state.activeFilterTab === 'role'){
    roleStore.needUpdate = true;
  }
  else if (machine.$state.activeFilterTab === 'spec'){
    specStore.needUpdate = true;
  }
  else if (machine.$state.activeFilterTab === 'mo'){
    moStore.needUpdate = true;
  }
  else if (machine.$state.activeFilterTab === 'mu'){
    muStore.needUpdate = true;
  }
}

const resetSearch = (target)=>{
  console.log("resetSearch");
  if(target === 'role'){
    resetFilters(roleStore);
    roleStore.needUpdate = true;
  }
  else if(target === 'spec'){
    resetFilters(specStore);
    specStore.needUpdate = true;
  }
  else if(target === 'mo'){
    resetFilters(moStore);
    moStore.needUpdate = true;
  }
  else if(target === 'mu'){
    resetFilters(muStore);
    muStore.needUpdate = true;
  }
}

const downloadReport = async (target) =>{
  let downloadParams = {
    target: target,
    url: '',
    prefill: 0,
    list: [],
    reverseList: [],
    machine: machine,
    store: undefined,
    filename: ''
  };

  let timePostfix = dayjs().format('DD_MM_YYYY');

  // console.log("downloadReport");

  if(machine.$state.activeFilterTab === 'role'){
    downloadParams.url = machine.$state.roleDownloadUrl;
    downloadParams.prefill = filter.$state.role_params.prefill;
    downloadParams.list = roleStore.$state.checkList;
    downloadParams.reverseList = roleStore.$state.checkListReverse;
    downloadParams.store = roleStore;

    if(target === 'all'){
      downloadParams.filename = "Все_роли_"+timePostfix;
    }
    else{
      downloadParams.filename = "Отмеченные_роли_"+timePostfix;
    }
  }
  else if(machine.$state.activeFilterTab === 'spec'){
    downloadParams.url = machine.$state.specDownloadUrl;
    downloadParams.prefill = filter.$state.spec_params.prefill;
    downloadParams.list = specStore.$state.checkList;
    downloadParams.reverseList = specStore.$state.checkListReverse;
    downloadParams.store = specStore;

    if(target === 'all'){
      downloadParams.filename = "Все_должности_"+timePostfix;
    }
    else{
      downloadParams.filename = "Отмеченные_должности_"+timePostfix;
    }

  }

  else if(machine.$state.activeFilterTab === 'mo'){

    downloadParams.url = machine.$state.moDownloadUrl;
    downloadParams.prefill = moStore.$state.prefill;
    downloadParams.list = moStore.$state.checkList;
    downloadParams.reverseList = moStore.$state.checkListReverse;
    downloadParams.store = moStore;
    downloadParams.category_list = moStore.$state.activeCategory;

    if(target === 'all'){
      downloadParams.filename = "МО_"+timePostfix;
    }
    else{
      downloadParams.filename = "Отмеченные_МО_"+timePostfix;
    }

  }

  else if(machine.$state.activeFilterTab === 'mu'){

    downloadParams.url = machine.$state.muDownloadUrl;
    downloadParams.prefill = muStore.$state.prefill;
    downloadParams.list = muStore.$state.checkList;
    downloadParams.reverseList = muStore.$state.checkListReverse;
    downloadParams.store = muStore;
    downloadParams.category_list = muStore.$state.activeCategory;
    downloadParams.mo_list = moStore.$state.prefill === 1 ? moStore.$state.checkListReverse : moStore.$state.checkList;
    downloadParams.mo_prefill = moStore.$state.prefill;
    downloadParams.mo_category_list = moStore.$state.activeCategory;

    if(target === 'all'){
      downloadParams.filename = "МУ_"+timePostfix;
    }
    else{
      downloadParams.filename = "Отмеченные_МУ_"+timePostfix;
    }

  }
  await downloadInfo(downloadParams, downloadPanel.value);
}

const switchTab = (target)=>{
  roleStore.filter_page_number = 1;
  specStore.filter_page_number = 1;
  moStore.filter_page_number = 1;
  muStore.filter_page_number = 1;
  machine.activeFilterTab = target;
}

const pageCountVisibility = (count)=>{
  let visible = false;
  if(machine.$state.activeFilterTab === 'role'){
    if(roleStore.$state.total > count){
      visible = true
    }
  }
  else if (machine.$state.activeFilterTab === 'spec'){
    if(specStore.$state.total > count){
      visible = true
    }
  }
  else if (machine.$state.activeFilterTab === 'mo'){
    if(moStore.$state.total > count){
      visible = true
    }
  }
  else if (machine.$state.activeFilterTab === 'mu'){
    if(muStore.$state.total > count){
      visible = true
    }
  }
  return visible;
}

// COMPUTED
const activeFilterPageCount = computed(()=>{
  if(machine.$state.activeFilterTab === 'role'){
    return roleStore.$state.filter_pagecount;
  }
  else if (machine.$state.activeFilterTab === 'spec'){
    return specStore.$state.filter_pagecount;
  }
  else if (machine.$state.activeFilterTab === 'mo'){
    return moStore.$state.filter_pagecount;
  }
  else if (machine.$state.activeFilterTab === 'mu'){
    return muStore.$state.filter_pagecount;
  }
  return 10;
});

const isDisableByUpdate = computed(()=>{
  let disable = false;
  if(
      roleStore.updateActive
      || specStore.updateActive
      || moStore.updateActive
      || muStore.updateActive
  )
  {
    disable = true

  }
  return disable;
});

const isDisableByNullResults = computed(()=>{
  let disable = false;

  if (machine.$state.activeFilterTab === 'role'){
    if(roleStore.$state.total === 0){
      disable = true;
    }
  }

  if (machine.$state.activeFilterTab === 'spec'){
    if(specStore.$state.total === 0){
      disable = true;
    }
  }

  if (machine.$state.activeFilterTab === 'mo'){
    if(moStore.$state.total === 0){
      disable = true;
    }
  }

  if (machine.$state.activeFilterTab === 'mu'){
    if(muStore.$state.total === 0){
      disable = true;
    }
  }

  return disable;
});

const isDisableByError = computed(()=>{
  let disable = false;

  if (machine.$state.activeFilterTab === 'role'){
    if(roleStore.$state.requestError){
      disable = true;
    }
  }

  if (machine.$state.activeFilterTab === 'spec'){
    if(specStore.$state.requestError){
      disable = true;
    }
  }

  if (machine.$state.activeFilterTab === 'mo'){
    if(moStore.$state.requestError){
      disable = true;
    }
  }

  if (machine.$state.activeFilterTab === 'mu'){
    if(muStore.$state.requestError){
      disable = true;
    }
  }

  return disable;
});

const downloadCheckedVisible = computed(()=>{
  let visible = true;
  if (machine.$state.activeFilterTab === 'role'){
    if (roleStore.$state.prefill === 0){
      if(roleStore.$state.checkList.length === 0){
        visible = false;
      }
    }
    else{
      if(roleStore.$state.checkListReverse.length === 0){
        visible = false;
      }
    }
  }

  if (machine.$state.activeFilterTab === 'spec'){
    if (specStore.$state.prefill === 0){
      if(specStore.$state.checkList.length === 0){
        visible = false;
      }
    }
    else{
      if(specStore.$state.checkListReverse.length === 0){
        visible = false;
      }
    }
  }

  if (machine.$state.activeFilterTab === 'mo'){
    if (moStore.$state.prefill === 0){
      if(moStore.$state.checkList.length === 0){
        visible = false;
      }
    }
    else{
      if(moStore.$state.checkListReverse.length === 0){
        visible = false;
      }
    }
  }

  if (machine.$state.activeFilterTab === 'mu'){
    if (muStore.$state.prefill === 0){
      if(muStore.$state.checkList.length === 0){
        visible = false;
      }
    }
    else{
      if(muStore.$state.checkListReverse.length === 0){
        visible = false;
      }
    }
  }

  return visible;
});

// WATCH
watch(
    () => roleStore.filter_search_phrase,
    (newVal, oldVal) => {
      if(machine.$state.activeFilterTab === 'role'){
        if(newVal === '' && oldVal !==''){
          resetSearch('role');
        }
      }
    }
);

watch(
    () => specStore.filter_search_phrase,
    (newVal, oldVal) => {
      if(machine.$state.activeFilterTab === 'spec'){
        if(newVal === '' && oldVal !==''){
          resetSearch('spec');
        }
      }
    }
);

watch(
    () => muStore.filter_search_phrase,
    (newVal, oldVal) => {
      if(machine.$state.activeFilterTab === 'mu'){
        if(newVal === '' && oldVal !==''){
          resetSearch('mu');
        }
      }
    }
);

watch(
    () => moStore.filter_search_phrase,
    (newVal, oldVal) => {
      if(machine.$state.activeFilterTab === 'mo'){
        if(newVal === '' && oldVal !==''){
          resetSearch('mo');
        }
      }
    }
);

</script>

<style scoped>
.filter-tables-wr {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.filter-tables-footer-button-accept {
  margin-left: 16px;
}

.filter-tables-footer-buttons-wr {
  display: flex;
  justify-content: flex-end;
}

.filter-tables-footer {
  background-color: #F2F2F2;
  border-top: 1px #00000033 solid;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 24px;
  padding-right: 24px;
}

.filter-tables-page-count-item {
  cursor: pointer;
  margin-right: 16px;
}

.filter-tables-page-count-text {
  margin-right: 16px;
}

.filter-tables-page-counts {
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.filter-tables-page-count {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-tables-pagecount-item-active {
  color: #1D8585 !important;
}

.filter-tables-body-resetext-wr {
  position: absolute;
  cursor: pointer;
  font-size: 15px;
  right: 32px;
  color: #1D8585;
  text-decoration: underline;
  text-decoration-style: dashed;
  text-underline-offset: 5px;
}

.filter-tables-body-resetext-wr:hover {
  color: #186d6d;
}

.filter-tables-body-closeicon-wr {
  position: absolute;
  cursor: pointer;
}

.filter-tables-body {
  position: relative;
  background-color: white;
  padding-right: 32px;
  padding-left: 32px;
  padding-top: 24px;
  padding-bottom: 24px;
  overflow-y: auto;
}

.filter-tables-panel-download-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.filter-tables-panel-download-wr {
  display: flex;
  justify-content: center;
  width: 20%;
}
.filter-tables-panel-search-wr {
  width: 80%;
}

.filter-tables-panel {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.filter-tables-disclaimer {
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 24px;
}

.filter-tables-active-tab-item {
  color: #333333 !important;
  border-bottom: 2px #FFCC00 solid;
}

.filter-tables-tab-item {
  cursor: pointer;
  padding-bottom: 12px;
  margin-right: 16px;
  font-size: 15px;
  font-weight: 600;
  color: #1D8585;
  line-height: 24px;
}

.filter-tables-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

</style>