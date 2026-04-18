<template>
  <div class="filter-spec-table-wr">

    <template v-if="spec.$state.requestError && spec.$state.requestErrorUserInfo !==''">
      <div class="filter-spec-table-error-panel">
        <error-panel
            :text="spec.$state.requestErrorUserInfo"
            :icon-size="16"
        />
      </div>
    </template>

    <template v-if="spec.$state.successInfo !==''">
      <div class="filter-spec-table-success-panel">
        <disappear-panel
            :text="spec.$state.successInfo"
            :icon-size="20"
            @hidepanel="spec.successInfo = ''"
        />
      </div>
    </template>

    <template v-if="spec.$state.total>0">
    <div
        class="filter-tables-marked-container"
    >
      <div
          class="filter-tables-marked-icon"
          @click="spec.$state.checkList.length !==0 ? changeFilter() : null"
      >
        <template v-if="spec.$state.checkList.length !==0">
          <template v-if="spec.$state.check_first === 0">
            <VTooltip theme="qst-arrow-tooltip-black">
            <app-icon
                name="filter-down"
                :size="28"
                color="#75757599"
            />
              <template #popper>Вывести отмеченные в начало списка</template>
            </VTooltip>
          </template>
          <template v-if="spec.$state.check_first === 1">
            <VTooltip theme="qst-arrow-tooltip-black">
            <app-icon
                name="filter-up"
                :size="28"
                color="#75757599"
            />
              <template #popper>Отмеченные в общем списке</template>
            </VTooltip>
          </template>
        </template>
      </div>
      <div class="filter-tables-marked-text-wr">
        <div class="filter-tables-marked-text">
          Отмечено строк:
        </div>
        <div class="filter-tables-marked-count">
          {{ markedCount.toString() }}
        </div>
      </div>

      <template v-if="spec.$state.total > 3">
        <template v-if="checkUncheckPageMode === 'uncheck'">
          <div
              class="filter-tables-marked-all"
              @click="unSelectAllPage()"
          >
            Cнять выделение со всех на странице
          </div>
        </template>

        <template v-if="checkUncheckPageMode === 'check'">
          <div
              class="filter-tables-marked-all"
              @click="selectAllPage()"
          >
            Отметить все на странице
          </div>
        </template>
      </template>

    </div>

    <div class="filter-spec-table-header">

      <div class="filter-spec-table-header-item spec-table-header-item-checkbox">
        <VTooltip theme="qst-arrow-tooltip-black">
          <custom-checkbox
              :id="spec.$state.selectAllCheckBoxId"
              @active="selectAll()"
              @inactive="unSelectAll()"
              :check-list="spec.$state.checkAllCheckBoxList"
          />

          <template v-if="spec.$state.prefill === 1" #popper>Снять выделение со всех</template>
          <template v-else #popper>Выделить все</template>
        </VTooltip>
      </div>
      <div class="filter-spec-table-header-item spec-table-header-item-name">
        <div class="spec-table-header-text">
          Наименование
        </div>
        <div
            class="spec-table-header-icon"
            @click="spec.$state.total>1 ? changeSort() : null"
        >
          <template v-if="spec.$state.total>1">
            <template v-if="spec.$state.sort.type === 'asc'">
              <VTooltip theme="qst-arrow-tooltip-black">
              <span>
                <app-icon
                    name="sorting-increase"
                    :size="16"
                    color="#269999"
                    hover-color="#1D8585"
                />
              </span>
                <template #popper>От Я до А</template>
              </VTooltip>
            </template>

            <template v-if="spec.$state.sort.type === 'desc'">
              <VTooltip theme="qst-arrow-tooltip-black">
              <span>
                <app-icon
                    name="sorting-decrease"
                    :size="16"
                    color="#269999"
                    hover-color="#1D8585"
                />
              </span>
                <template #popper>От А до Я</template>
              </VTooltip>
            </template>

          </template>
        </div>
      </div>

    </div>
      <div class="filter-spec-table-body">
        <div v-for="item in spec.$state.info_list"
             :key="item.specid"
             class="filter-spec-table-body-item">
          <div class="spec-table-body-item-checkbox">
            <custom-checkbox
                :id="item.specid.toString()"
                :check-list="reactSpec.checkList.value"
                @active="addToCheckList(spec, item.specid.toString(), spec.$state.prefill)"
                @inactive="removeFromCheckList(spec, item.specid.toString(), spec.$state.prefill)"
            />
          </div>
          <div class="spec-table-body-item-name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <filter-no-results
          @resetfilters="resetSpecFilters()"
      />
    </template>

    <template v-if="spec.$state.total>spec.$state.filter_pagecount">
      <div class="filter-spec-table-pagination">
        <vue-awesome-paginate
            :total-items="spec.$state.total"
            :items-per-page="spec.$state.filter_pagecount"
            v-model="reactSpec.filter_page_number.value"
            :on-click="clickPaginate"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import CustomCheckbox from "@/common/ui/CustomCheckbox/CustomCheckbox.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {useMachineStore} from "@/filtermachine/store/machine";
import {useFilterStore} from "@/filtermachine/store/filter";
import {useSpecStore} from "@/filtermachine/store/spec";
import {storeToRefs} from "pinia";
import {computed, onMounted, watch} from "vue";
import {getSpecInfo} from "@/filtermachine/components/FilterTables/components/SpecTable/services/getspecinfo";
import {
  addToCheckList,
  checkAllPage,
  removeFromCheckList,
  unCheckAllPage,
  prepareCheckBoxes, setCheckUncheckPageMode
} from "@/filtermachine/services/checklist";
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import {resetFilters} from "@/filtermachine/components/FilterTables/services/auxil";
import FilterNoResults from "@/filtermachine/components/FilterTables/components/FilterNoResults.vue";
import DisappearPanel from "@/common/ui/DisappearPanel/DisappearPanel.vue";

// STORE
const filter = useFilterStore();
const machine = useMachineStore();
const spec = useSpecStore();
const reactSpec = storeToRefs(useSpecStore());

// METHODS
const resetSpecFilters = async ()=>{
  await resetFilters(spec);
  spec.filter_search_phrase = '';
  await updateSpecInfo();
}

const clickPaginate = async ()=>{
  await updateSpecInfo();
}

const renderIdList = ()=>{
  let id_list = [];
  spec.$state.info_list.forEach((item)=>{
    id_list.push(item.specid.toString())
  });
  return id_list;
}

const selectAll = async ()=>{
  spec.prefill = 1;
  spec.checkList = [];
  spec.checkListReverse =[];
  spec.checkAllCheckBoxList = [spec.$state.selectAllCheckBoxId];
  await updateSpecInfo();
}

const unSelectAll = async ()=>{
  spec.checkAllCheckBoxList = [];
  spec.checkList = [];
  spec.checkListReverse =[];
  spec.prefill = 0;
  await updateSpecInfo();
}


const selectAllPage = async ()=>{
  let id_list = renderIdList();
  checkAllPage(spec, id_list, spec.$state.prefill);
}

const unSelectAllPage = async ()=>{
  let id_list = renderIdList();
  unCheckAllPage(spec, id_list, spec.$state.prefill);
}


const checkBoxState = ()=>{
  let id_list = renderIdList();
  prepareCheckBoxes(spec, id_list, spec.$state.prefill)
}

const updateSpecInfo = async ()=>{
  await getSpecInfo(machine, spec);
  checkBoxState();
}

const changeFilter = async ()=>{
  if(spec.$state.check_first === 1){
    spec.check_first = 0;
  }
  else {
    spec.check_first = 1;
  }
  spec.filter_page_number = 1;
  await updateSpecInfo();
}

const changeSort = async ()=>{
  if(spec.$state.sort.type === 'asc'){
    spec.sort.type = 'desc';
  }
  else {
    spec.sort.type = 'asc';
  }
  spec.filter_page_number = 1;
  await updateSpecInfo();
}


// COMPUTED
const markedCount = computed(()=>{
  let count = 0;

  if(spec.$state.prefill === 1){
    count = spec.total - spec.$state.checkListReverse.length;
  }
  else {
    count = spec.$state.checkList.length;
  }

  return count;
});

const checkUncheckPageMode = computed(()=>{
  return setCheckUncheckPageMode(spec, 'spec');
})

// LIFYCECLE
onMounted(async ()=>{
  await updateSpecInfo();
});

// WATCH
watch(
    () => spec.needUpdate,
    async (flag) => {
      if(flag){
        await updateSpecInfo();
      }
    }
);

</script>

<style>
.vue-side-modal-content {
  min-width: unset;
}

@media (min-width: 768px) {
  .vue-side-modal-content {
    min-width: 750px;
  }
}

</style>

<style scoped>
.filter-tables-marked-all {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #1D8585;
}

.filter-tables-marked-text {
  margin-right: 8px;
}

.filter-tables-marked-icon {
  cursor: pointer;
  margin-right: 24px;
  display: flex;
  align-items: center;
}

.filter-tables-marked-text-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 16px;
}

.filter-tables-marked-container {
  margin-bottom: 8px;
  margin-right: 16px;
  display: flex;
  justify-content: flex-start;
}

.filter-spec-table-pagination {
  display: flex;
  justify-content: center;
}

.spec-table-body-item-checkbox {
  padding-top: 12px;
  padding-bottom: 12px;
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.spec-table-body-item-name {
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 8px;
  padding-left: 8px;
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 2px #CCCCCC solid;
}

.spec-table-header-text {
  margin-right: 16px;
}

.spec-table-header-item-name {
  cursor: pointer;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 8px;
  padding-left: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 95%;
  border-bottom: 2px #CCCCCC solid;
}

.spec-table-header-item-checkbox {
  padding-top: 12px;
  padding-bottom: 12px;
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.filter-spec-table-body-item {
  display: flex;
}

.filter-spec-table-body-item:hover .spec-table-body-item-name{
  background-color: #EBF8F8;
}

.filter-spec-table-body {
  margin-bottom: 32px;
}

.filter-spec-table-wr {
  display: flex;
  flex-direction: column;
}

.filter-spec-table-header {
  width: 100%;
  display: flex;
}
</style>