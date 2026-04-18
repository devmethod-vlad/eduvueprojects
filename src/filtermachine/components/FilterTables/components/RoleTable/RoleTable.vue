<template>
  <div class="filter-role-table-wr">

    <template v-if="role.$state.requestError && role.$state.requestErrorUserInfo !==''">
      <div class="filter-role-table-error-panel">
        <error-panel
            :text="role.$state.requestErrorUserInfo"
            :icon-size="16"
        />
      </div>
    </template>

    <template v-if="role.$state.successInfo !==''">
      <div class="filter-role-table-success-panel">
        <disappear-panel
            :text="role.$state.successInfo"
            :icon-size="20"
            @hidepanel="role.successInfo = ''"
        />
      </div>
    </template>

    <template v-if="role.$state.total > 0">
      <div
        class="filter-tables-marked-container"
    >
      <div
          class="filter-tables-marked-icon"
          @click="role.$state.checkList.length !==0 ? changeFilter() : null"
      >
        <template v-if="role.$state.checkList.length !==0">
          <template v-if="role.$state.check_first === 0">
            <VTooltip theme="qst-arrow-tooltip-black">
            <app-icon
                name="filter-down"
                :size="28"
                color="#75757599"
            />
              <template #popper>Вывести отмеченные в начало списка</template>
            </VTooltip>
          </template>
          <template v-if="role.$state.check_first === 1">
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

      <template v-if="role.$state.total > 3">
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

      <div class="filter-role-table-header">

      <div class="filter-role-table-header-item role-table-header-item-checkbox">
        <VTooltip theme="qst-arrow-tooltip-black">
          <custom-checkbox
              :id="role.$state.selectAllCheckBoxId"
              @active="selectAll()"
              @inactive="unSelectAll()"
              :check-list="role.$state.checkAllCheckBoxList"
          />

          <template v-if="role.$state.prefill === 1" #popper>Снять выделение со всех</template>
          <template v-else #popper>Выделить все</template>
        </VTooltip>
      </div>
      <div class="filter-role-table-header-item role-table-header-item-name">
        <div class="role-table-header-text">
          Наименование
        </div>
        <div
            class="role-table-header-icon"
            @click="role.$state.total>1 ? changeSort() : null"
        >
          <template v-if="role.$state.total>1">
            <template v-if="role.$state.sort.type === 'asc'">
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

            <template v-if="role.$state.sort.type === 'desc'">
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
      <div class="filter-role-table-body">
        <div v-for="item in role.$state.info_list"
             :key="item.roleid"
             class="filter-role-table-body-item">
          <div class="role-table-body-item-checkbox">
            <custom-checkbox
                :id="item.roleid.toString()"
                :check-list="role.checkList"
                @active="addToCheckList(role, item.roleid.toString(), role.$state.prefill)"
                @inactive="removeFromCheckList(role, item.roleid.toString(), role.$state.prefill)"
            />
          </div>
          <div class="role-table-body-item-name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <filter-no-results
          @resetfilters="resetRoleFilters()"
      />
    </template>

    <template v-if="role.$state.total > role.$state.filter_pagecount">
      <div class="filter-role-table-pagination">
        <vue-awesome-paginate
            :total-items="role.$state.total"
            :items-per-page="role.$state.filter_pagecount"
            v-model="reactRole.filter_page_number.value"
            :on-click="clickPaginate"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import ErrorPanel from "@/common/ui/ErrorPanel/ErrorPanel.vue";
import FilterNoResults from "@/filtermachine/components/FilterTables/components/FilterNoResults.vue";
import CustomCheckbox from "@/common/ui/CustomCheckbox/CustomCheckbox.vue";
import {getRoleInfo} from "@/filtermachine/components/FilterTables/components/RoleTable/services/getroleinfo";
import {computed, onMounted, watch} from "vue";
import {useFilterStore} from "@/filtermachine/store/filter";
import {useRoleStore} from "@/filtermachine/store/role";
import {useMachineStore} from "@/filtermachine/store/machine";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {storeToRefs} from "pinia";
import {
  addToCheckList, removeFromCheckList,
  checkAllPage, unCheckAllPage,
  prepareCheckBoxes, setCheckUncheckPageMode
} from "@/filtermachine/services/checklist";
import {resetFilters} from "@/filtermachine/components/FilterTables/services/auxil";
import DisappearPanel from "@/common/ui/DisappearPanel/DisappearPanel.vue";

// STORE
const machine = useMachineStore();
const filter = useFilterStore();
const role = useRoleStore();
const reactRole = storeToRefs(useRoleStore());


// METHODS
const resetRoleFilters  = async ()=>{
  await resetFilters(role);
  role.filter_search_phrase = '';
  await updateRoleInfo();
}

const clickPaginate = async ()=>{
  await updateRoleInfo();
}

const renderIdList = ()=>{
  let id_list = [];
  role.$state.info_list.forEach((item)=>{
    id_list.push(item.roleid.toString())
  });
  return id_list;
}

const selectAll = async ()=>{
  role.prefill = 1;
  role.checkList = [];
  role.checkListReverse =[];
  role.checkAllCheckBoxList = [role.$state.selectAllCheckBoxId];
  await updateRoleInfo();
}

const unSelectAll = async ()=>{
  role.checkAllCheckBoxList = [];
  role.checkList = [];
  role.checkListReverse =[];
  role.prefill = 0;
  await updateRoleInfo();
}

const selectAllPage = async ()=>{
  let id_list = await renderIdList();
  await checkAllPage(role, id_list, role.$state.prefill);
}

const unSelectAllPage = async ()=>{
  let id_list = await renderIdList();
  await unCheckAllPage(role, id_list, role.$state.prefill);
}


const checkBoxState = ()=>{
  let id_list = renderIdList();
  prepareCheckBoxes(role, id_list, role.$state.prefill);
}

const updateRoleInfo = async ()=>{
  await getRoleInfo(machine, role);
  checkBoxState();
}

const changeFilter = async ()=>{
  if(role.$state.check_first === 1){
    role.check_first = 0;
  }
  else {
    role.check_first = 1;
  }
  role.filter_page_number = 1;
  await updateRoleInfo();
}

const changeSort = async ()=>{
  if(role.$state.sort.type === 'asc'){
    role.sort.type = 'desc';
  }
  else {
    role.sort.type = 'asc';
  }
  role.filter_page_number = 1;
  await updateRoleInfo();
}


// COMPUTED
const markedCount = computed(()=>{
  let count = 0;

  if(role.$state.prefill === 1){
    count = role.total - role.$state.checkListReverse.length;
  }
  else {
    count = role.$state.checkList.length;
  }

  return count;
});

const checkUncheckPageMode = computed(()=>{
  return setCheckUncheckPageMode(role, 'role');
})

// LIFYCECLE
onMounted(async ()=>{
  await updateRoleInfo();
});


// WATCH
watch(
    () => role.needUpdate,
    async (flag) => {
      if(flag){
        await updateRoleInfo();
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

.filter-role-table-pagination {
  display: flex;
  justify-content: center;
}

.role-table-body-item-checkbox {
  padding-top: 12px;
  padding-bottom: 12px;
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.role-table-body-item-name {
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 8px;
  padding-right: 8px;
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 2px #CCCCCC solid;
}

.role-table-header-text {
  margin-right: 16px;
}

.role-table-header-item-name {
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

.role-table-header-item-checkbox {
  padding-top: 12px;
  padding-bottom: 12px;
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.filter-role-table-body-item {
  display: flex;
}

.filter-role-table-body-item:hover .role-table-body-item-name{
  background-color: #EBF8F8;
}

.filter-role-table-body {
  margin-bottom: 32px;
}

.filter-role-table-wr {
  display: flex;
  flex-direction: column;
}

.filter-role-table-header {
  width: 100%;
  display: flex;
}

</style>