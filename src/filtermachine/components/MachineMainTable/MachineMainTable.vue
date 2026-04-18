<template>
  <div class="filter-machine-maintable">

    <div
        class="machine-maintable-header"
        v-if="!machine.$state.showMode && result.$state.total !== 0"
    >
      <div
          class="machine-maintable-header-icon"
          @click="clickCheckFilter()"
          :style="'min-width: '+ machine.$state.checkboxWidth.toString()+'px;'"

      >
        <template v-if="filter.$state.user_params.user_list.length > 0">

          <template v-if="filter.$state.user_params.check_first === 0">
            <VTooltip theme="qst-arrow-tooltip-black">
              <app-icon
                name="filter-down"
                :size="28"
                color="#75757599"
              />
              <template #popper>Вывести отмеченные в начало списка</template>
            </VTooltip>
          </template>

          <template v-if="filter.$state.user_params.check_first === 1">
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

      <div class="machine-maintable-marked">

        <div class="maintable-marked-text">
          Отмечено строк:
        </div>
        <div class="maintable-marked-count">
          {{ markedUserCount.toString() }}
        </div>
        <div class="maintable-marked-divider">
          из
        </div>
        <div class="maintable-marked-all">
          {{ result.$state.total }}
        </div>

      </div>


      <template v-if="users.$state.checkAllCheckBoxList.includes(users.$state.selectAllCheckBoxId)">
        <div
            class="machine-maintable-remove-mark"
            @click="unSelectAllPage()"
        >
          Снять выделение со всех на странице
        </div>
      </template>
      <template v-else>
        <div
            class="machine-maintable-remove-mark"
            @click="selectAllPage()"
        >
          Отметить все на странице
        </div>
      </template>

    </div>


    <div class="machine-maintable">
      <div
          class="maintable-header"
      >


        <div
            v-if="!machine.$state.showMode"
            class="maintable-header-item machine-header-checkbox"
            :class="{'em-disabled-style': result.$state.total === 0}"
            :style="'flex: 0 0 '+ machine.$state.checkboxWidth.toString()+'px;'"
        >
          <VTooltip theme="qst-arrow-tooltip-black">
            <custom-checkbox
              :id="users.$state.selectAllCheckBoxId"
              @active="selectAll()"
              @inactive="unSelectAll()"
              :check-list="users.$state.checkAllCheckBoxList"
            />
            <template v-if="users.$state.prefill === 1" #popper>Снять выделение со всех</template>
            <template v-else #popper>Выделить все</template>
          </VTooltip>
        </div>


        <div
            class="maintable-header-item machine-header-login"
            :style="'flex: 0 0 '+ machine.$state.loginWidth.toString()+'px;'"
        >
          <div
              class="maintable-header-item-text"
          >
            Логин
          </div>
          <div
              class="maintable-header-item-icon"
              @click="changeTableSort('login', filter)"
              :class="{'em-disabled-style': result.$state.total === 0}"
          >
            <template v-if="filter.$state.login_sort.active === 0">
              <app-icon
                  name="sorting-increase"
                  :size="14"
                  color="#75757599"
              />
            </template>
            <template v-if="filter.$state.login_sort.active === 1">
              <template v-if="filter.$state.login_sort.type === 'asc'">
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

              <template v-if="filter.$state.login_sort.type === 'desc'">
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

        <div
            id="machine-header-fio"
            class="maintable-header-item machine-header-fio"
            :style="'flex: 0 0 '+ machine.$state.fioWidth.toString()+'px;'"
            :class="{'em-disabled-style': result.$state.total === 0}"
        >
          <div
              class="maintable-header-item-text"
          >
            ФИО
          </div>
          <div
              class="maintable-header-item-icon"
              @click="changeTableSort('fio', filter)"
          >
            <template v-if="filter.$state.fio_sort.active === 0">
              <app-icon
                  name="sorting-increase"
                  :size="14"
                  color="#75757599"
              />
            </template>
            <template v-if="filter.$state.fio_sort.active === 1">
              <template v-if="filter.$state.fio_sort.type === 'asc'">
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

              <template v-if="filter.$state.fio_sort.type === 'desc'">
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

        <div
            id="machine-header-role"
            class="maintable-header-item machine-header-role"
            :style="'flex: 0 0 '+ machine.$state.roleWidth.toString()+'px;'"
        >
          <div
              class="maintable-header-item-text header-item-text-hover"
              @click="!machine.$state.showMode ? openFilterTable('role') : null"
          >
            Роль
          </div>
          <div
              class="maintable-header-item-icon"
              @click="changeTableSort('role', filter)"
              :class="{'em-disabled-style': result.$state.total === 0}"
          >
            <template v-if="filter.$state.role_sort.active === 0">
              <app-icon
                  name="sorting-increase"
                  :size="14"
                  color="#75757599"
              />
            </template>
            <template v-if="filter.$state.role_sort.active === 1">
              <template v-if="filter.$state.role_sort.type === 'asc'">
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

              <template v-if="filter.$state.role_sort.type === 'desc'">
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

        <div
            id="machine-header-spec"
            class="maintable-header-item machine-header-spec"
            :style="'flex: 0 0 '+ machine.$state.specWidth.toString()+'px;'"
        >
          <div
              class="maintable-header-item-text header-item-text-hover"
              @click="!machine.$state.showMode ? openFilterTable('spec') : null"
          >
            Должность
          </div>
          <div
              class="maintable-header-item-icon"
              @click="changeTableSort('spec', filter)"
              :class="{'em-disabled-style': result.$state.total === 0}"
          >
            <template v-if="filter.$state.spec_sort.active === 0">
              <app-icon
                  name="sorting-increase"
                  :size="14"
                  color="#75757599"
              />
            </template>
            <template v-if="filter.$state.spec_sort.active === 1">
              <template v-if="filter.$state.spec_sort.type === 'asc'">
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

              <template v-if="filter.$state.spec_sort.type === 'desc'">
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
        <div
            id="machine-header-mo"
            class="maintable-header-item machine-header-mo"
            :style="'flex: 0 0 '+ machine.$state.moWidth.toString()+'px;'"
        >
          <div
              class="maintable-header-item-text header-item-text-hover"
              @click="!machine.$state.showMode ? openFilterTable('mo') : null"
          >
            МО
          </div>
          <div
              class="maintable-header-item-icon"
              @click="changeTableSort('mo', filter)"
              :class="{'em-disabled-style': result.$state.total === 0}"
          >
            <template v-if="filter.$state.mo_name_sort.active === 0">
              <app-icon
                  name="sorting-increase"
                  :size="14"
                  color="#75757599"
              />
            </template>
            <template v-if="filter.$state.mo_name_sort.active === 1">
              <template v-if="filter.$state.mo_name_sort.type === 'asc'">
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

              <template v-if="filter.$state.mo_name_sort.type === 'desc'">
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
        <div
            id="machine-header-mu"
            class="maintable-header-item machine-header-mu"
            :style="'flex: 0 0 '+ machine.$state.muWidth.toString()+'px;'"
        >
          <div
              class="maintable-header-item-text header-item-text-hover"
              @click="!machine.$state.showMode ? openFilterTable('mu') : null"
          >
            МУ
          </div>
          <div
              class="maintable-header-item-icon"
              @click="changeTableSort('mu', filter)"
              :class="{'em-disabled-style': result.$state.total === 0}"
          >
            <template v-if="filter.$state.mu_name_sort.active === 0">
              <app-icon
                  name="sorting-increase"
                  :size="14"
                  color="#75757599"
              />
            </template>
            <template v-if="filter.$state.mu_name_sort.active === 1">
              <template v-if="filter.$state.mu_name_sort.type === 'asc'">
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

              <template v-if="filter.$state.mu_name_sort.type === 'desc'">
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

      <template v-if="result.$state.users.length !== 0">

        <div class="maintable-body">

          <div v-for="user in result.$state.users"
               :key="user.userid"
               class="maintable-body-item-wr"
          >
            <div
                v-if="!machine.$state.showMode"
                class="maintable-body-item machine-body-checkbox"
                :style="'flex: 0 0 '+ machine.$state.checkboxWidth.toString()+'px;'"
            >
              <custom-checkbox
                  :id="user.userid.toString()"
                  :check-list="users.$state.checkList"
                  @active="addToCheckList(users, user.userid.toString(), filter.$state.user_params.prefill)"
                  @inactive="removeFromCheckList(users, user.userid.toString(), filter.$state.user_params.prefill)"
              />
            </div>

            <div
                class="maintable-body-item machine-body-login"
                :style="'flex: 0 0 '+ machine.$state.loginWidth.toLocaleString().toString()+'px;'"
            >
              <div class="maintable-body-item-login-text">
                {{ user.login }}
              </div>
              <div class="maintable-body-item-login-icons">
                <template v-if="user.dispatch_info.telegram.telegram_id !==''">
                  <div class="login-icons-item-wr">
                    <telegram-method-icon />
                  </div>
                </template>

                <template v-if="user.dispatch_info.mail.mail !==''">
                  <div class="login-icons-item-wr">
                    <mail-method-icon />
                  </div>
                </template>
              </div>
            </div>

            <div
                class="maintable-body-item machine-body-fio"
                :style="'flex: 0 0 '+ machine.$state.fioWidth.toLocaleString().toString()+'px;'"
            >
              <div class="maintable-body-item-text">
                {{ user.fio }}
              </div>
            </div>

            <div
                class="maintable-body-item machine-body-role"
                :style="'flex: 0 0 '+ machine.$state.roleWidth.toLocaleString().toString()+'px;'"
            >
              <div class="maintable-body-item-text">
                <template v-if="user.role <= 60">
                  {{ user.role }}
                </template>
                <template v-else>
                  <VTooltip theme="qst-arrow-tooltip-black">
                    <span style="cursor: pointer;">
                      {{ user.role.substring(0, 60)+'...' }}
                    </span>
                    <template #popper>{{ user.role }}</template>
                  </VTooltip>
                </template>
              </div>
            </div>

            <div
                class="maintable-body-item machine-body-spec"
                :style="'flex: 0 0 '+ machine.$state.specWidth.toLocaleString().toString()+'px;'"
            >
              <div class="maintable-body-item-text">
                <template v-if="user.spec <= 60">
                  {{ user.spec }}
                </template>
                <template v-else>
                  <VTooltip theme="qst-arrow-tooltip-black">
                    <span style="cursor: pointer;">
                      {{ user.spec.substring(0, 60)+'...' }}
                    </span>
                    <template #popper>{{ user.spec }}</template>
                  </VTooltip>
                </template>
              </div>
            </div>

            <div
                class="maintable-body-item machine-body-mo"
                :style="'flex: 0 0 '+ machine.$state.moWidth.toLocaleString().toString()+'px;'"
            >
              <div class="maintable-body-item-text">
                <template v-if="user.mo_name <= 60">
                  {{ user.mo_name }}
                </template>
                <template v-else>
                  <VTooltip theme="qst-arrow-tooltip-black">
                    <span style="cursor: pointer;">
                      {{ user.mo_name.substring(0, 60)+'...' }}
                    </span>
                    <template #popper>{{ user.mo_name }}</template>
                  </VTooltip>
                </template>
              </div>
            </div>

            <div
                class="maintable-body-item machine-body-mu"
                :style="'flex: 0 0 '+ machine.$state.muWidth.toLocaleString().toString()+'px;'"
            >
              <div class="maintable-body-item-text">
                <template v-if="user.mu_name <= 60">
                  {{ user.mu_name }}
                </template>
                <template v-else>
                  <VTooltip theme="qst-arrow-tooltip-black">
                    <span style="cursor: pointer;">
                      {{ user.mu_name.substring(0, 60)+'...' }}
                    </span>
                    <template #popper>{{ user.mu_name }}</template>
                  </VTooltip>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>

    </div>

    <template v-if="sideModalVisible">
      <side-modal
          @close-modal="()=>{closeModal()}"
          :ignore-elements="['machine-header-fio', 'machine-header-role', 'machine-header-spec', 'machine-header-mo', 'machine-header-mu']"
          :ignore-elements-class="['v-popper__wrapper']"
      >
        <filter-tables
            @close-side-modal="()=>{closeModal()}"
            @accept-filters="()=>{closeModal()}"

        />
      </side-modal>
    </template>
  </div>
  <div
      class="filter-machine-maintable-pagination"
      v-if="result.$state.total > filter.$state.page_count"
  >
    <vue-awesome-paginate
        :total-items="result.$state.total"
        :items-per-page="filter.$state.page_count"
        v-model="reactFilter.page_number.value"
        :on-click="clickPaginate"
    />
  </div>
</template>

<script setup>
import FilterTables from "@/filtermachine/components/FilterTables/FilterTables.vue";
import SideModal from "@/common/ui/SideModal/SideModal.vue";
import CustomCheckbox from "@/common/ui/CustomCheckbox/CustomCheckbox.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {useMachineStore} from "@/filtermachine/store/machine";
import {useResultStore} from "@/filtermachine/store/result";
import {useFilterStore} from "@/filtermachine/store/filter";
import {useRoleStore} from "@/filtermachine/store/role";
import {useSpecStore} from "@/filtermachine/store/spec";
import {useMoStore} from "@/filtermachine/store/mo";
import {useMuStore} from "@/filtermachine/store/mu";
import {storeToRefs} from "pinia";
import {ref, watch} from "vue";
import TelegramMethodIcon from "@/dispatches/components/icons/TelegramMethodIcon.vue";
import MailMethodIcon from "@/dispatches/components/icons/MailMethodIcon.vue";
import {changeSort} from "@/filtermachine/services/changesort";
import {useUsersStore} from "@/filtermachine/store/users";
import {
  addToCheckList,
  checkAllPage, prepareCheckBoxes,
  removeFromCheckList,
  unCheckAllPage
} from "@/filtermachine/services/checklist";
import {resetSort} from "@/filtermachine/services/resetsort";

// EMITS
const emits = defineEmits(['updateinfo', 'acceptfilter']);

// STORE
const machine= useMachineStore();
const result = useResultStore();
const filter = useFilterStore();

const role = useRoleStore();
const spec = useSpecStore();
const mo = useMoStore();
const mu = useMuStore();
const users = useUsersStore();

const reactFilter = storeToRefs(useFilterStore());


// DATA
const sideModalVisible = ref(false);
const markedUserCount = ref(0);


// METHODS
const clickCheckFilter = ()=>{
  if (filter.$state.user_params.check_first === 1){
    filter.user_params.check_first = 0;
  }
  else{
    filter.user_params.check_first = 1;
  }
  filter.page_number = 1;
  emits('updateinfo');
}


const clickPaginate = () =>{
  emits('updateinfo');
}


const openFilterTable = (target)=>{
  machine.activeFilterTab = target;
  sideModalVisible.value = true;
}

const closeModalWithReset = ()=>{
  resetSort(filter);
  filter.login_sort.active = 1;
  sideModalVisible.value = false;
  emits('updateinfo');
}

const closeModal = ()=>{
  resetSort(filter);
  users.$reset();
  filter.login_sort.active = 1;
  sideModalVisible.value = false;
  emits('acceptfilter');
}

const changeTableSort = (target)=>{
  changeSort(target, filter);
  emits('updateinfo');
}

const renderIdList = ()=>{
  let id_list = [];
  result.$state.users.forEach((item)=>{
    id_list.push(item.userid.toString())
  });
  return id_list;
}

const selectAll = ()=>{
  users.prefill = 1;
  users.checkList = [];
  users.checkListReverse =[];
  users.checkAllCheckBoxList = [users.$state.selectAllCheckBoxId];
  let id_list = renderIdList();
  prepareCheckBoxes(users, id_list, users.$state.prefill);
}

const unSelectAll = ()=>{
  users.prefill = 0;
  users.checkList = [];
  users.checkListReverse =[];
  users.checkAllCheckBoxList = [];
  let id_list = renderIdList();
  prepareCheckBoxes(users, id_list, users.$state.prefill);
}

const selectAllPage = ()=>{
  let id_list = renderIdList();
  checkAllPage(users, id_list, users.$state.prefill);
  users.checkAllCheckBoxList = [users.$state.selectAllCheckBoxId];
}

const unSelectAllPage = ()=>{
  let id_list = renderIdList();
  unCheckAllPage(users, id_list, users.$state.prefill);
  users.checkAllCheckBoxList = [];
}


// WATCH
watch(
    () => [...users.$state.checkList],
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        if (filter.$state.user_params.prefill === 1){
          filter.user_params.user_list = users.$state.checkListReverse;
        }
        else {
          filter.user_params.user_list = users.$state.checkList;
        }

        if (result.$state.total > 0){
          if (filter.$state.user_params.prefill === 1){
            markedUserCount.value = result.$state.total - users.$state.checkListReverse.length;
          }
          else {
            markedUserCount.value = users.$state.checkList.length;
          }
        }
      }
    },
    {immediate: true, deep: true}
);

watch(
    () => [...users.$state.checkListReverse],
    (newVal, oldVal) => {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        if (filter.$state.user_params.prefill === 1){
          filter.user_params.user_list = users.$state.checkListReverse;
        }
        else {
          filter.user_params.user_list = users.$state.checkList;
        }

        if (result.$state.total > 0){
          if (filter.$state.user_params.prefill === 1){
            markedUserCount.value = result.$state.total - users.$state.checkListReverse.length;
          }
          else {
            markedUserCount.value = users.$state.checkList.length;
          }
        }
      }
    },
    {immediate: true, deep: true}
);

watch(
    () => users.prefill,
    (newVal, oldVal) => {
      if(newVal !== oldVal){
        filter.user_params.prefill = users.$state.prefill;
      }
    }
);

</script>

<style scoped>
@import "@/css/pagination.css";
@import "@/dispatches/css/paginationfix.css";

.header-item-text-hover:hover {
  color: #269999;
}

.maintable-body-item {
  word-break: break-word;
}

.maintable-body-item-login-text {
  margin-bottom: 4px;
}

.login-icons-item-wr {
  margin-right: 8px;
}

.maintable-body-item-login-icons {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.filter-machine-maintable {
  overflow-x: auto;
}

.filter-machine-maintable-pagination {
  display: flex;
  justify-content: center;
}

.machine-maintable {
  margin-bottom: 48px;
}

.machine-body-login {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.maintable-body-item-wr {
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 2px #E6E6E6 solid;
}

.maintable-body-item-text {
  padding-left: 8px;
  padding-right: 8px;
}

.machine-header-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.machine-body-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.maintable-header-item-text {
  cursor: pointer;
  font-weight: 400;
  font-size: 15px;
  color: #757575;
  padding-right: 8px;
  padding-left: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
}

.maintable-header-item-icon {
  cursor: pointer;
  padding-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
}

.maintable-header-item {
  width: 100%;
  display: flex;
}

.maintable-body-item-wr {
  display: flex;
  flex-direction: row;
}

.maintable-body {
  display: flex;
  flex-direction: column;
}

.maintable-header {
  border-bottom: 2px #E6E6E6 solid;
  padding-bottom: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.maintable-marked-divider {
  margin-right: 5px;
}

.maintable-marked-count {
  margin-right: 5px;
}

.maintable-marked-text {
  margin-right: 5px;
}

.machine-maintable-remove-mark {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #1D8585;
}

.machine-maintable-header-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 24px;
}

.machine-maintable-marked {
  font-size: 14px;
  font-weight: 400;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 16px;
}

.machine-maintable-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

</style>