<template>
  <div class="filter-mo-table-wr">

    <template v-if="mo.$state.requestError && mo.$state.requestErrorUserInfo !==''">
      <div class="filter-mo-table-error-panel">
        <error-panel
            :text="mo.$state.requestErrorUserInfo"
            :icon-size="16"
        />
      </div>
    </template>

    <template v-if="mo.$state.successInfo !==''">
      <div class="filter-mo-table-success-panel">
        <disappear-panel
            :text="mo.$state.successInfo"
            :icon-size="20"
            @hidepanel="mo.successInfo = ''"
        />
      </div>
    </template>

    <template v-if="mo.$state.total>0">
    <div
        class="filter-tables-marked-container"
    >
      <div
          class="filter-tables-marked-icon"
          @click="mo.$state.checkList.length !==0 ? changeFilter() : null"
      >
        <template v-if="mo.$state.checkList.length !==0">
          <template v-if="mo.$state.check_first === 0">
            <VTooltip theme="qst-arrow-tooltip-black">
            <app-icon
                name="filter-down"
                :size="28"
                color="#75757599"
            />
              <template #popper>Вывести отмеченные в начало списка</template>
            </VTooltip>
          </template>
          <template v-if="mo.$state.check_first === 1">
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

      <template v-if="mo.$state.total>3">

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

    <div class="filter-mo-table-header">
      <div class="filter-mo-table-header-item mo-table-header-item-checkbox">
        <VTooltip theme="qst-arrow-tooltip-black">
          <custom-checkbox
              :id="mo.$state.selectAllCheckBoxId"
              @active="selectAll()"
              @inactive="unSelectAll()"
              :check-list="mo.$state.checkAllCheckBoxList"
          />

          <template v-if="mo.$state.prefill === 1" #popper>Снять выделение со всех</template>
          <template v-else #popper>Выделить все</template>
        </VTooltip>

      </div>

      <div class="filter-mo-table-header-item mo-table-header-item-name">
        <div class="mo-table-header-text">
          Наименование
        </div>
        <div
            class="mo-table-header-icon"
            @click="mo.$state.total>1 ? changeSort('name') : null"
        >
          <template v-if="mo.$state.total>1">
            <template v-if="mo.$state.name_sort.type === 'asc'">
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

            <template v-if="mo.$state.name_sort.type === 'desc'">
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

      <div class="filter-mo-table-header-item mo-table-header-item-shortname">
        <div class="mo-table-header-text">
          Краткое наименование
        </div>

        <div
            class="mo-table-header-icon"
            @click="mo.$state.total>1 ? changeSort('shortname') : null"
        >

          <template v-if="mo.$state.total>1">
            <template v-if="mo.$state.shortname_sort.type === 'asc'">
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

            <template v-if="mo.$state.shortname_sort.type === 'desc'">
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

      <div class="filter-mo-table-header-item mo-table-header-item-category">
        <div class="mo-table-header-text">
          Категория МО
        </div>
        <div
            class="mo-table-header-icon"
            @click.prevent.stop="mo.$state.category.length > 1 ? dropDownVisible=!dropDownVisible : null"
        >
          <template v-if="mo.$state.category.length > 1">
            <template v-if="!dropDownVisible">
              <app-icon
                  name="chevron-down"
                  :size="16"
                  color="#75757599"
              />
            </template>
            <template v-else>
              <app-icon
                  name="chevron-up"
                  :size="16"
                  color="#75757599"
              />
            </template>
          </template>

        </div>
        <template v-if="dropDownVisible">
          <drop-down
              :active-item-list="mo.$state.activeCategory"
              :item-list="mo.$state.category"
              :viewport-width="machine.$state.windowWidth"
              @update-active-list="(activeList)=>{updateCategoryActiveList(activeList)}"
              @closedropdown="dropDownVisible=false"
          />
        </template>
      </div>

      <div class="filter-mo-table-header-item mo-table-header-item-redact">

      </div>

    </div>

      <div class="filter-mo-table-body">
        <div v-for="item in mo.$state.info_list"
             :key="item.moid"
             class="filter-mo-table-body-item"
             :class="{'body-item-redact-active': Number(activeRedactItemId) === Number(item.moid)}"
        >
          <div class="mo-table-body-item-checkbox">
            <custom-checkbox
                :id="item.moid.toString()"
                :check-list="reactMo.checkList.value"
                @active="addToMoCheckList(item)"
                @inactive="removeFromMoCheckList(item)"
            />
          </div>
          <div class="mo-table-body-item-name">
            {{ item.name }}
          </div>
          <div class="mo-table-body-item-shortname">
            <template v-if="Number(activeRedactItemId) === Number(item.moid)">
              <textarea
                  type="text"
                  rows="3"
                  class="vue-form-control"
                  v-model="activeRedactShortName"
                  />
            </template>
            <template v-else>
              {{ item.shortname }}
            </template>
          </div>
          <div class="mo-table-body-item-category">
            <template v-if="Number(activeRedactItemId) === Number(item.moid)">
              <input
                  type="text"
                  class="vue-form-control"
                  v-model="activeRedactCategoryName"
              />
            </template>
            <template v-else>
              {{ item.category_name }}
            </template>
          </div>
          <template v-if="Number(activeRedactItemId) !==Number(item.moid)">
            <div
                class="mo-table-body-item-redact"
                @click="setActiveRedactItem(Number(item.moid), item.category_name, item.shortname)"
            >

              <app-icon name="pencil"
                        :size="16"
                        color="#CCCCCC"
              />
            </div>
          </template>

          <template v-else>
            <div
                class="mo-table-body-item-redact redact-item-active"
                @click="saveChanges()"
            >

              <app-icon name="mark"
                        :size="16"
                        color="#CCCCCC"
              />
            </div>
          </template>

        </div>
      </div>
    </template>

    <template v-else>
      <filter-no-results
          @resetfilters="resetMoFilters()"
      />
    </template>

    <template v-if="mo.$state.total>mo.$state.filter_pagecount">
      <div class="filter-mo-table-pagination">
        <vue-awesome-paginate
            :total-items="mo.$state.total"
            :items-per-page="mo.$state.filter_pagecount"
            v-model="reactMo.filter_page_number.value"
            :on-click="clickPaginate"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import DisappearPanel from "@/common/ui/DisappearPanel/DisappearPanel.vue";
import DropDown from "@/common/ui/DropDown/DropDown.vue";
import CustomCheckbox from "@/common/ui/CustomCheckbox/CustomCheckbox.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {getMoInfo} from "@/filtermachine/components/FilterTables/components/MoTable/services/getmoinfo";
import {useMachineStore} from "@/filtermachine/store/machine";
import {useFilterStore} from "@/filtermachine/store/filter";
import {useMoStore} from "@/filtermachine/store/mo";
import {useMuStore} from "@/filtermachine/store/mu";
import {storeToRefs} from "pinia";
import {computed, onMounted, ref, watch} from "vue";
import {
  addToCheckList,
  removeFromCheckList,
  prepareCheckBoxes,
  checkAllPage,
  unCheckAllPage,
  setCheckUncheckPageMode
} from "@/filtermachine/services/checklist";
import {
    selectAllPageMuSynchro,
    unSelectAllPageMuSynchro,
    addToMoCheckListMuSynchro,
    removeFromMoCheckListMuSynchro
} from "@/filtermachine/components/FilterTables/components/MuTable/services/checklist";
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import {resetFilters} from "@/filtermachine/components/FilterTables/services/auxil";
import FilterNoResults from "@/filtermachine/components/FilterTables/components/FilterNoResults.vue";
import {saveNameCategory} from "@/filtermachine/components/FilterTables/services/namecategory";

// STORE
const filter = useFilterStore();
const machine = useMachineStore();
const mo = useMoStore();
const mu = useMuStore();
const reactMo = storeToRefs(useMoStore());

// DATA
const activeRedactItemId = ref(0);
const activeRedactCategoryName = ref('');
const activeRedactShortName = ref('');
const dropDownVisible = ref(false);

// METHODS
const resetMoFilters = async ()=>{
  await resetFilters(mo);
  mo.filter_search_phrase = '';
  await updateMoInfo();
}

const clickPaginate = async ()=>{
  await updateMoInfo();
}

const renderIdList = ()=>{
  let id_list = [];
  mo.$state.info_list.forEach((item)=>{
    id_list.push(item.moid.toString())
  });
  return id_list;
}

const selectAll = async ()=>{
  mo.prefill = 1;
  mo.checkList = [];
  mo.checkListReverse =[];
  mu.prefill = 1;
  mu.checkList = [];
  mu.checkListFull=[];
  mu.checkListReverse = [];
  mu.checkListReverseFull=[];
  mu.checkAllCheckBoxList = [mu.$state.selectAllCheckBoxId];
  mo.checkAllCheckBoxList = [mo.$state.selectAllCheckBoxId];
  await updateMoInfo();
}

const unSelectAll = async ()=>{
  mo.checkAllCheckBoxList = [];
  mo.checkList = [];
  mo.checkListReverse =[];
  mu.checkList = [];
  mu.checkListFull=[];
  mu.checkListReverse = [];
  mu.checkListReverseFull=[];
  mu.prefill = 0;
  mu.checkAllCheckBoxList=[];
  mo.prefill = 0;
  await updateMoInfo();
}

const selectAllPage = async ()=>{
  let id_list = renderIdList();
  checkAllPage(mo, id_list, mo.$state.prefill);
  selectAllPageMuSynchro(mo, mu, id_list);

}

const unSelectAllPage = async ()=>{
  let id_list = renderIdList();
  unCheckAllPage(mo, id_list, mo.$state.prefill);
  unSelectAllPageMuSynchro(mo, mu);

}

const checkBoxState = ()=>{
  let id_list = renderIdList();
  prepareCheckBoxes(mo, id_list, mo.$state.prefill)
}

const updateMoInfo = async ()=>{
  await getMoInfo(machine, mo);
  checkBoxState();
}

const changeFilter = async ()=>{
  if(mo.$state.check_first === 1){
    mo.check_first = 0;
  }
  else {
    mo.check_first = 1;
  }
  mo.filter_page_number = 1;
  await updateMoInfo();
}

const setActiveRedactItem = (itemid, categoryName, shortName)=>{
  activeRedactItemId.value = itemid;
  activeRedactCategoryName.value = categoryName;
  activeRedactShortName.value = shortName;
}

const saveChanges = async ()=>{
  await saveNameCategory(
      machine.moNameCategoryUrl,
      mo,
      activeRedactItemId.value,
      activeRedactCategoryName.value,
      activeRedactShortName.value
  );
  activeRedactItemId.value = 0;
  activeRedactCategoryName.value = ''
  activeRedactShortName.value = '';
  await updateMoInfo();
}

const changeSort = async (target) => {
  if(target === 'name'){
    mo.shortname_sort.active = 0;
    mo.name_sort.active = 1;
    if(mo.$state.name_sort.type === 'asc'){
      mo.name_sort.type = 'desc';
    }
    else {
      mo.name_sort.type = 'asc';
    }
  }
  if(target === 'shortname'){
    mo.name_sort.active = 0;
    mo.shortname_sort.active = 1;
    if(mo.$state.shortname_sort.type === 'asc'){
      mo.shortname_sort.type = 'desc';
    }
    else {
      mo.shortname_sort.type = 'asc';
    }
  }
  mo.filter_page_number = 1;
  await updateMoInfo();

}

const updateCategoryActiveList = async (activeList)=>{
  // console.log("updateCategoryActiveList activeList: ", activeList);
  mo.activeCategory=activeList;
  mo.filter_page_number = 1;
  await updateMoInfo();
}

const addToMoCheckList = (mo_item)=>{
  addToCheckList(mo, mo_item.moid.toString(), mo.$state.prefill);

  addToMoCheckListMuSynchro(mo_item, mu);
}

const removeFromMoCheckList = (mo_item)=>{
  removeFromCheckList(mo, mo_item.moid.toString(), mo.$state.prefill);

  removeFromMoCheckListMuSynchro(mo_item, mu);
}

// COMPUTED
const markedCount = computed(()=>{
  let count = 0;

  if(mo.$state.prefill === 1){
    count = mo.total - mo.$state.checkListReverse.length;
  }
  else {
    count = mo.$state.checkList.length;
  }

  return count;
});

const checkUncheckPageMode = computed(()=>{
  return setCheckUncheckPageMode(mo, 'mo');
})

// LIFYCECLE
onMounted(async ()=>{
  await updateMoInfo();
});


// WATCH
watch(
    () => mo.needUpdate,
    async (flag) => {
      if(flag){
        await updateMoInfo();
      }
    }
);

</script>

<style>
.edu-table-dropdown {
  right: 0!important;
  top: 45px !important;
  max-height: 350px !important;
}

.vue-side-modal-content {
  min-width: unset;
  width: auto;
}

@media (min-width: 992px) {
  .vue-side-modal-content {
    width: 900px;
  }
}

@media (min-width: 1200px) {
  .vue-side-modal-content {
    width: 1000px;
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

.filter-mo-table-pagination {
  display: flex;
  justify-content: center;
}

.mo-table-body-item-checkbox {
  padding-top: 12px;
  padding-bottom: 12px;
  width: 3%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.mo-table-body-item-redact {
  cursor: pointer;
  padding-top: 12px;
  padding-bottom: 12px;
  width: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px #CCCCCC solid;
}
.mo-table-body-item-redact:hover {
  background-color: #D7EFEF !important;
}

.mo-table-body-item-shortname {
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 8px;
  padding-left: 8px;
  width: 31%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 2px #CCCCCC solid;
}

.mo-table-body-item-name {
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 8px;
  padding-left: 8px;
  width: 31%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 2px #CCCCCC solid;
}

.mo-table-body-item-category {
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 8px;
  padding-left: 8px;
  width: 31%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 2px #CCCCCC solid;
}

.mo-table-header-icon {
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.mo-table-header-text {
  padding-right: 16px;
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.mo-table-header-item-name {
  cursor: pointer;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 8px;
  padding-left: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 31%;
  border-bottom: 2px #CCCCCC solid;
}

.mo-table-header-item-shortname {
  cursor: pointer;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 8px;
  padding-left: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 31%;
  border-bottom: 2px #CCCCCC solid;
}

.mo-table-header-item-category {
  position: relative;
  cursor: pointer;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 8px;
  padding-left: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 31%;
  border-bottom: 2px #CCCCCC solid;
}

.mo-table-header-item-redact {
  padding-top: 12px;
  padding-bottom: 12px;
  width: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px #CCCCCC solid;
}

.mo-table-header-item-checkbox {
  padding-top: 12px;
  padding-bottom: 12px;
  width: 3%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.filter-mo-table-body-item:hover .mo-table-body-item-shortname{
  background-color: #EBF8F8;
}
.filter-mo-table-body-item:hover .mo-table-body-item-name{
  background-color: #EBF8F8;
}
.filter-mo-table-body-item:hover .mo-table-body-item-category {
  background-color: #EBF8F8;
}

.filter-mo-table-body-item:hover .mo-table-body-item-redact {
  background-color: #EBF8F8;
}

.body-item-redact-active .mo-table-body-item-shortname{
  background-color: #FFF8CC !important;
}

.body-item-redact-active .mo-table-body-item-name{
  background-color: #FFF8CC !important;
}

.body-item-redact-active .mo-table-body-item-category{
  background-color: #FFF8CC !important;
}

.body-item-redact-active .mo-table-body-item-redact{
  background-color: #FFF8CC !important;
}

.filter-mo-table-body-item {
  display: flex;
}

.redact-item-active:hover {
  background-color: #FFED80 !important;
}

.filter-mo-table-body {
  margin-bottom: 32px;
}

.filter-mo-table-wr {
  display: flex;
  flex-direction: column;
}

.filter-mo-table-header {
  width: 100%;
  display: flex;
}

</style>