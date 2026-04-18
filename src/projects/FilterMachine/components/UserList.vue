<template>

  <div class="fm-list-actions-wr" :class="{'em-disabled-style': isLoading}">
    <template v-if="infoList.length > 0">

      <span @click="selectAllProcess()" v-tippy="{ content: 'Выбрать все', placement : 'top-start' }"
            class="fm-action-icon"
      >
        <app-icon name="check-square"
                  :size="38"
                  color="#1e8686"
        />

    </span>
      <span @click="selectAllPage()" v-tippy="{ content: 'Выбрать все на странице', placement : 'top-start' }"
            class="fm-action-icon"
      >
        <app-icon name="file-check-alt"
                  :size="38"
                  color="#1e8686"
        />

    </span>
      <span @click="unSelectAllPage()" v-tippy="{ content: 'Снять выбор со всех на странице', placement : 'top-start' }"
            class="fm-action-icon"
      >
        <app-icon name="file-block-alt"
                  :size="38"
                  color="#1e8686"
        />

    </span>
      <span @click="unsSelectAllProcess()" v-tippy="{ content: 'Снять выбор со всех', placement : 'top-start' }"
            class="fm-action-icon"
      >
        <app-icon name="times-square"
                  :size="38"
                  color="#1e8686"
        />

    </span>

    </template>

    <div v-if="checkGetListReady" class="fm-list-getuserlist-button">
      <button @click="getList()" class="vue-btn vue-btn-normal">
        Сформировать список пользователей
      </button>
      <button @click="enrolByFmModal=true;" v-if="!isFirstRequest && checkGetListReady && infoList.length > 0"
              style="margin-left: 20px" class="vue-btn vue-btn-normal"
      >
        Записать на проект
      </button>
    </div>

  </div>

  <div class="em-table-pagecount-container" :class="{'em-disabled-style': isLoading}">
    <div v-if="Number(totalItems) >5" class="em-table-pagecount-select">
      <select :style="{ backgroundImage: 'url(' + selectArrow + ')'}"
              v-tippy="{ content: 'Кол-во элементов на странице',placement : 'top-start'}"
              class="vue-form-select"
              @change="onPageCountChange()"
              v-model="pageCount"
      >
        <option value="5">
          5
        </option>
        <option v-if="Number(totalItems) >5" value="10">
          10
        </option>
        <option v-if="Number(totalItems) >10" value="15">
          15
        </option>
        <option v-if="Number(totalItems) >15" value="20">
          20
        </option>

      </select>
    </div>

    <div v-if="!isFirstRequest" class="em-table-config-icon-wr">
      <span @click="handleConfigClick()" id="em-table-config-icon">
        <app-icon name="setting"
                  :size="38"
                  color="#1e8686"
        />
      </span>

      <div class="em-table-config-dropdown" id="em-table-config-dropdown"
           style="display: none;"
      >
        <div class="em-table-config-item">
          <div class="table-config-item-checkbox">
            <input @change="changeVisibilityFilters($event, 'mofullname')" v-if="Number(visibilityFilters.showMoFullname) === 1"
                   checked type="checkbox"
            >
            <input @change="changeVisibilityFilters($event, 'mofullname')" v-else
                   type="checkbox"
            >
          </div>
          <div class="table-config-item-text">
            Отображать полное название МО
          </div>
        </div>
      </div>

    </div>

    <div v-tippy="{ content: 'Сбросить фильтры и сортировки',placement : 'top-start'}" @click="fullReset()"
         v-if="resetIconVisibility" class="em-table-reseticon-wr"
    >
      <app-icon name="times-circle"
                :size="38"
                color="#dc3545"
      />

    </div>

    <div class="fm-list-table-download-wr">
      <button v-tippy="{ content: 'Внимание! Скачивание может занять длительное время!',placement : 'top-start'}" @click="downloadReport('userall')"
              class="vue-btn vue-btn-normal" :class="{'em-disabled-style': exportActive}"
      >
        Скачать все
      </button>
      <button style="margin-left: 20px;" @click="downloadReport('useractive')"
              v-if="activeList.length !==0 || inactiveList.length !==0"
              :class="{'em-disabled-style': exportActive}"
              class="vue-btn vue-btn-normal"
      >
        Скачать отмеченные
      </button>
    </div>

  </div>

  <div class="em-table-container">

    <div class="em-table-wr">

      <div class="em-body-item-row" :class="{'em-disabled-style': isLoading}">

        <div class="em-table-item" style="flex: 0 0 50px;">

        </div>

        <div class="em-table-item em-header-search-item" style="flex: 0 0 200px;">

          <div class="em-search-wr" :class="{'em-disabled-style': isLoading}">


            <div class="em-search-input-wr">

              <input @keyup.enter="infoList.length > 0 ? searchProcess('login') : null" @change="resetInput('login')"
                     class="em-search-input" type="text"
                     name="em-search-input" v-model="login_input"
              >

              <template v-if="login_input !==''">
                <div v-tippy="{ content: 'Сбросить поиск', placement : 'top-start' }" @click="resetSearch()"
                     class="em-search-close-icon"
                >
                  <app-icon name="times-circle"
                            :size="20"
                            color="#1e8686"
                  />
                </div>
              </template>
              <template v-else>
                <div class="em-search-close-icon">

                </div>
              </template>
            </div>

          </div>

        </div>

        <div class="em-table-item em-header-search-item" style="flex: 0 0 250px;">

          <div class="em-search-wr" :class="{'em-disabled-style': isLoading}">


            <div class="em-search-input-wr">

              <input @keyup.enter="infoList.length > 0 ? searchProcess('fio') : null" class="em-search-input"
                     @input="resetInput('fio')" type="text"
                     name="em-search-input" v-model="fio_input"
              >

              <template v-if="fio_input !==''">
                <div v-tippy="{ content: 'Сбросить поиск', placement : 'top-start' }" @click="resetSearch()"
                     class="em-search-close-icon"
                >
                  <app-icon name="times-circle"
                            :size="20"
                            color="#1e8686"
                  />
                </div>
              </template>
              <template v-else>
                <div class="em-search-close-icon">

                </div>
              </template>
            </div>

          </div>

        </div>

        <div class="em-table-item em-header-search-item" style="flex: 0 0 250px;">
          <div class="em-search-input-wr">

            <input @keyup.enter="infoList.length > 0 ? searchProcess('role') : null" @input="resetInput('role')"
                   class="em-search-input" type="text"
                   name="em-search-input" v-model="role_input"
            >

            <template v-if="role_input !==''">
              <div v-tippy="{ content: 'Сбросить поиск', placement : 'top-start' }" @click="resetSearch()"
                   class="em-search-close-icon"
              >
                <app-icon name="times-circle"
                          :size="20"
                          color="#1e8686"
                />
              </div>
            </template>
            <template v-else>
              <div class="em-search-close-icon">

              </div>
            </template>
          </div>
        </div>

        <div v-if="visibilityFilters.showMoFullname === '1'" class="em-table-item em-header-search-item"
             style="flex: 0 0 350px;"
        >
          <div class="em-search-input-wr">

            <input @keyup.enter="infoList.length > 0 ? searchProcess('moname') : null" @input="resetInput('moname')"
                   class="em-search-input" type="text"
                   name="em-search-input" v-model="moname_input"
            >

            <template v-if="moname_input !==''">
              <div v-tippy="{ content: 'Сбросить поиск', placement : 'top-start' }" @click="resetSearch()"
                   class="em-search-close-icon"
              >
                <unicon  name="times-circle" width="20"
                         height="20" fill="#1e8686"
                         hover-fill="#176C6CFF"
                />
              </div>
            </template>
            <template v-else>
              <div class="em-search-close-icon">

              </div>
            </template>
          </div>
        </div>

        <div class="em-table-item em-header-search-item" style="flex: 0 0 200px;">
          <div class="em-search-input-wr">

            <input @keyup.enter="infoList.length > 0 ? searchProcess('shortname') : null" @input="resetInput('shortname')"
                   class="em-search-input" type="text"
                   name="em-search-input" v-model="shortname_input"
            >

            <template v-if="shortname_input !==''">
              <div v-tippy="{ content: 'Сбросить поиск', placement : 'top-start' }" @click="resetSearch()"
                   class="em-search-close-icon"
              >
                <unicon  name="times-circle" width="20"
                         height="20" fill="#1e8686"
                         hover-fill="#176C6CFF"
                />
              </div>
            </template>
            <template v-else>
              <div class="em-search-close-icon">

              </div>
            </template>
          </div>
        </div>

        <div class="em-table-item em-header-search-item" style="flex: 0 0 300px;">
          <div class="em-search-input-wr">

            <input @keyup.enter="infoList.length > 0 ? searchProcess('spec') : null" @input="resetInput('spec')"
                   class="em-search-input" type="text"
                   name="em-search-input" v-model="spec_input"
            >

            <template v-if="spec_input !==''">
              <div v-tippy="{ content: 'Сбросить поиск', placement : 'top-start' }" @click="resetSearch()"
                   class="em-search-close-icon"
              >
                <unicon  name="times-circle" width="20"
                         height="20" fill="#1e8686"
                         hover-fill="#176C6CFF"
                />
              </div>
            </template>
            <template v-else>
              <div class="em-search-close-icon">

              </div>
            </template>
          </div>
        </div>

      </div >

      <div class="em-body-item-row" :class="{'em-disabled-style': isLoading}">

        <div ref="header_check" class="em-table-item em-header-item"
             style="flex: 0 0 50px;"
        >
          <div class="header-item-text">

          </div>

          <div v-if="activeList.length >0 || inactiveList.length >0" @click="filterProcess('check')"
               id="em-filter-part-ident" class="fm-list-header-icon"
          >

            <template v-if="filters.check === 'notset'">
              <unicon name="filter" width="20"
                      height="20" fill="#808080FF"
                      hover-fill="#4D4D4DFF"
              />
            </template>

            <template v-else>
              <unicon v-if="filters.check === '1'" name="filter-slash"
                      width="20" height="20"
                      fill="#1e8686" hover-fill="white"
              />
              <unicon v-else name="filter"
                      width="20" height="20"
                      fill="#1e8686" hover-fill="white"
              />
            </template>

          </div>

        </div>

        <div ref="header_login" class="em-table-item em-header-item"
             style="flex: 0 0 200px;"
        >
          <div class="header-item-text">
            ЛОГИН
          </div>

          <div v-if="Number(totalItems) >1" @click="sortingProcess('login')"
               class="fm-list-header-icon"
          >
            <template v-if="sorting.login === 'notset'">
              <unicon name="sorting" width="20"
                      height="20" fill="#808080FF"
                      hover-fill="#4D4D4DFF"
              />
            </template>

            <template v-else>
              <unicon v-if="sorting.login === 'desc'" name="sort-amount-down"
                      width="20" height="20"
                      fill="#1e8686" hover-fill="#145A5AFF"
              />
              <unicon v-else name="sort-amount-up"
                      width="20" height="20"
                      fill="#1e8686" hover-fill="#145A5AFF"
              />
            </template>
          </div>

        </div>

        <div ref="header_fio" class="em-table-item em-header-item"
             style="flex: 0 0 250px;"
        >
          <div class="header-item-text">
            ФИО
          </div>

          <div v-if="Number(totalItems) >1" @click="sortingProcess('fio')"
               class="fm-list-header-icon"
          >
            <template v-if="sorting.fio === 'notset'">
              <unicon name="sorting" width="20"
                      height="20" fill="#808080FF"
                      hover-fill="#4D4D4DFF"
              />
            </template>

            <template v-else>
              <unicon v-if="sorting.fio === 'desc'" name="sort-amount-down"
                      width="20" height="20"
                      fill="#1e8686" hover-fill="#145A5AFF"
              />
              <unicon v-else name="sort-amount-up"
                      width="20" height="20"
                      fill="#1e8686" hover-fill="#145A5AFF"
              />
            </template>
          </div>
        </div>

        <div ref="header_role" @click="emits('openrolelist')"
             class="em-table-item em-header-item" style="flex: 0 0 250px;"
        >
          <div class="header-item-text">
            РОЛЬ
          </div>
        </div>

        <div v-if="visibilityFilters.showMoFullname === '1'" ref="header_moname"
             @click="emits('openmolist')" class="em-table-item em-header-item"
             style="flex: 0 0 350px;"
        >
          <div class="header-item-text">
            ПОЛНОЕ НАЗВАНИЕ МО
          </div>
        </div>

        <div ref="header_shortname" @click="emits('openmolist')"
             class="em-table-item em-header-item" style="flex: 0 0 200px;"
        >
          <div class="header-item-text">
            КРАТКОЕ НАЗВАНИЕ МО
          </div>
        </div>

        <div ref="header_spec" @click="emits('openspeclist')"
             class="em-table-item em-header-item" style="flex: 0 0 300px;"
        >
          <div class="header-item-text">
            ДОЛЖНОСТЬ
          </div>
        </div>

      </div>

      <template v-if="isLoading">

        <div class="fm-list-loading-wr" :style="'width: '+headerWidth.toString()+'px;'">
          <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка..." />
        </div>

      </template>

      <template v-else>

        <template v-if="infoList.length === 0">

          <div class="fm-list-table-noresults" :style="'width: '+headerWidth.toString()+'px;'">
            Нет данных
          </div>

        </template>

        <template v-else>

          <template v-for="(item, index) in infoList" :key="index">

            <div class="em-body-item-row em-body-tem-row-fontcolor">

              <div class="em-table-item em-td-border-right em-table-checkbox-item" style="flex:0 0 50px;"
                   :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border-right': Number(index) % 2 === 0}"
              >
                <input :id="'fm-list-usercheckbox-'+item.uid.toString()" :value="Number(item.uid)"
                       @change="processCheckbox($event, item.uid)" type="checkbox"
                       v-model="realCheckboxes"
                />
              </div>

              <div class="em-table-item em-td-border em-table-login-item" style="flex: 0 0 200px;"
                   :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
              >
                {{ item.login }}
              </div>

              <div class="em-table-item em-td-border em-table-fio-item" style="flex: 0 0 250px;"
                   :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
              >
                {{ item.fio }}
              </div>

              <template v-if="item.user_role.length > 150">
                <div v-tippy="{ content: item.user_role ,placement : 'top-start'}" class="em-table-item em-td-border em-table-role-item"
                     style="flex: 0 0 250px;" :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                >
                  {{ item.user_role.slice(0, 150) }}.....
                </div>
              </template>

              <template v-else>
                <div class="em-table-item em-td-border em-table-role-item" style="flex: 0 0 250px;"
                     :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                >
                  {{ item.user_role }}
                </div>
              </template>

              <template v-if="item.moname.length > 150">
                <div v-tippy="{ content: item.moname ,placement : 'bottom-start'}" v-if="visibilityFilters.showMoFullname === '1'"
                     class="em-table-item em-td-border em-table-moname-item" style="flex: 0 0 350px;"
                     :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                >
                  {{ item.moname.slice(0, 150) }}.....
                </div>
              </template>

              <template v-else>
                <div v-if="visibilityFilters.showMoFullname === '1'" class="em-table-item em-td-border em-table-moname-item"
                     style="flex: 0 0 350px;" :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                >
                  {{ item.moname }}
                </div>
              </template>

              <template v-if="item.shortname.length > 150">
                <div v-tippy="{ content: item.shortname ,placement : 'bottom-start'}" class="em-table-item em-td-border em-table-shortname-item"
                     style="flex: 0 0 200px;" :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                >
                  {{ item.shortname.slice(0, 150) }}.....
                </div>
              </template>
              <template v-else>
                <div class="em-table-item em-td-border em-table-shortname-item" style="flex: 0 0 200px;"
                     :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                >
                  {{ item.shortname }}
                </div>
              </template>


              <template v-if="item.spec_name.length > 150">
                <div v-tippy="{ content: item.spec_name ,placement : 'top-start'}" class="em-table-item em-td-border em-table-spec-item"
                     style="flex: 0 0 300px;" :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                >
                  {{ item.spec_name.slice(0, 150) }}.....
                </div>
              </template>
              <template v-else>
                <div class="em-table-item em-td-border em-table-spec-item " style="flex: 0 0 300px;"
                     :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                >
                  {{ item.spec_name }}
                </div>
              </template>

            </div>

          </template>

        </template>

      </template>

    </div>


  </div>

  <div class="em-table-pagination-wr" v-if="totalItems > Number(pageCount) && !isLoading">
    <vue-awesome-paginate
        :total-items="totalItems"
        :items-per-page="Number(pageCount)"
        v-model="activePage"
        :on-click="getList"
    />
  </div>

  <ModalWindow
      v-if="enrolByFmModal"
      @closemodal="enrolByFmModal=false; enrolByFmModalInfoText=''; enrolByFmModalInfoWarn=false;"
      header-text=""

  >
    <div class="fm-enrolbyfm-modal-wr">

      <div v-if="enrolByFmModalLoading" class="fm-enrolbyfm-modal-loading">
        <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка..." />
      </div>

      <template v-else>

        <div v-if="enrolByFmModalInfoText !==''" class="fm-enrolbyfm-modal-info"
             :class="{'fm-warn-style': enrolByFmModalInfoWarn}"
        >

          {{ enrolByFmModalInfoText }}

        </div>

        <template v-else>

          <div class="fm-enrolbyfm-modal-text">
            Вы действительно хотите записать выбранных пользователей на проект?
          </div>
          <div class="fm-enrolbyfm-modal-buttons">
            <button @click="enrolToProject()" class="vue-btn vue-btn-normal">
              Записать
            </button>
            <button style="margin-left: 20px;" @click="enrolByFmModal=false"
                    class="vue-btn vue-btn-warn"
            >
              Отменить
            </button>
          </div>

        </template>

      </template>


    </div>

  </ModalWindow>

</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {useFmStore} from "@/projects/global/store/fm";
import * as dayjs from "dayjs";
import {getUserList} from "@/projects/FilterMachine/services/getuserlist";
import ModalWindow from "@/projects/global/components/ModalWindow/ModalWindow.vue";
import {enrolByFm} from "@/projects/FilterMachine/services/enroltoprojectbyfm";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {app_config} from "@/projects/config/setconfig";

// EMITS
const emits = defineEmits([
  'openrolelist',
  'openmolist',
  'openspeclist'
]);

// PROPS
const props = defineProps({
  projectIdProps: {
    type: Number,
    default: 0
  },

  globalResetState: {
    type: Boolean,
    default: false
  }
});

// STORE
const fmStore = useFmStore();

// DATA
const enrolByFmModal = ref(false);

const enrolByFmModalLoading = ref(false);

const enrolByFmModalInfoText = ref('');

const enrolByFmModalInfoWarn = ref(false);

const isFirstRequest = ref(true);

const headerWidth = ref(0);

const exportActive = ref(false);

const globalInfoText = ref('');

const localInfoText = ref('');

const infoTextWarnStyle = ref(false);

const infoList = ref([]);

const disableAll = ref(false);

const activeList = ref([]);

const inactiveList = ref([]);

const realCheckboxes = ref([]);

const isLoading = ref(false);

const filters = ref({
  check: '0'
});

const sorting = ref({
  login: '0',
  fio: '0',
});

const visibilityFilters = ref({
  showMoFullname: '1'
});

const totalItems = ref(0);

const pageCount = ref('10');

const activePage = ref(1);

const login_input = ref('');

const fio_input = ref('');

const moname_input = ref('');

const shortname_input = ref('');

const role_input = ref('');

const spec_input = ref('');

const header_check = ref(null);
const header_login = ref(null);
const header_fio = ref(null);
const header_role = ref(null);
const header_shortname = ref(null);
const header_spec = ref(null);
const header_moname = ref(null);

// METHODS
const enrolToProject = async()=>{

  enrolByFmModalLoading.value = true;

  let answer = await enrolByFm(requestParams.value, props.projectIdProps, fmStore.$state.rewriteSwitch);

  await console.log("enrolToProject answer: ", answer);

  if (answer['status'] === 'ok'){
    enrolByFmModalLoading.value = false;
    enrolByFmModalInfoText.value = 'Пользователи успешно добавлены в проект!';
  }
  else {
    enrolByFmModalLoading.value = false;
    enrolByFmModalInfoText.value = 'При добавлении пользователей в проект возникла ошибка! Попробуйте позже!';
    enrolByFmModalInfoWarn.value = true;
  }

};

const processCheckbox = (event, uid)=>{

  if(event.target.checked){
    if(!disableAll.value){

      if (inactiveList.value.includes(Number(uid))){
        let findIndex = inactiveList.value.indexOf(Number(uid));
        if (findIndex !== -1){
          inactiveList.value.splice(findIndex, 1);
        }
      }
    }
    else {
      if (!activeList.value.includes(Number(uid))){
        activeList.value.push(Number(uid))
      }
    }

  }
  else {

    if(disableAll.value){

      if (activeList.value.includes(Number(uid))){
        let findIndex = activeList.value.indexOf(Number(uid));
        if (findIndex !== -1){
          activeList.value.splice(findIndex, 1);
        }
      }

    }
    else{
      if (!inactiveList.value.includes(Number(uid))){
        inactiveList.value.push(Number(uid))
      }
    }
  }

  syncStorage();

};

const filterProcess = (target)=>{
  localInfoText.value = "";
  infoTextWarnStyle.value = false;
  activePage.value = 1;

  resetFiltersAndSorting(target);

  if(target === 'check'){
    if(filters.value.check === 'notset' || filters.value.check === '0'){
      filters.value.check = '1';
    }
    else {
      filters.value.check = '0';
    }
  }

  getList();
};

const resetInput = (target)=>{
  if(target !== 'login'){
    login_input.value = '';
  }
  if(target !== 'fio'){
    fio_input.value = '';
  }
  if(target !== 'role'){
    role_input.value = '';
  }
  if(target !== 'moname'){
    moname_input.value = '';
  }
  if(target !== 'shortname'){
    shortname_input.value = '';
  }
  if(target !== 'spec'){
    spec_input.value = '';
  }
};

const downloadReport = async(expType)=>{

  localInfoText.value = "";
  infoTextWarnStyle.value = false;

  exportActive.value = true;

  let dwnldParams = await requestParams.value;

  dwnldParams.action = "exportinfo";
  dwnldParams.exportarget = expType;


  try{

    const expResp = await fetch(app_config.apiUrl+app_config.filterMachineApiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },

      body: JSON.stringify(dwnldParams)
    });

    if(expResp.status.toString() !== '200'){

      localInfoText.value = 'При попытке экспорта данных возникла ошибка. Попробуйте повторить процедуру позже!';
      infoTextWarnStyle.value = true;
    }
    else{

      let repAnswer = await expResp.blob();

      let fileUrl = await URL.createObjectURL(repAnswer);

      let link = await document.createElement("a");
      link.href = fileUrl;

      if(expType === "userall"){
        link.download =  "Все_медработники_"+dayjs().format('DD_MM_YYYY')+".xlsx";
      }
      else if(expType === "useractive"){
        link.download =  "Отмеченные_медработники_"+dayjs().format('DD_MM_YYYY')+".xlsx";
      }

      await document.body.appendChild(link);
      await link.click();
      await document.body.removeChild(link);

    }
  }
  catch(e) {

    localInfoText.value = 'При попытке экспорта данных возникла ошибка. Попробуйте повторить процедуру позже!';
    infoTextWarnStyle.value = true;

  }
  exportActive.value = false;

};

const changeVisibilityFilters = async(event, target)=>{

  if (target === 'mofullname'){


    if(event.target.checked){
      visibilityFilters.value.showMoFullname = '1'
    }
    else {
      visibilityFilters.value.showMoFullname = '0'
    }
  }
  await getList();

  headerWidth.value = Number(header_check.value.offsetWidth)+Number(header_login.value.offsetWidth);
  headerWidth.value = headerWidth.value + Number(header_fio.value.offsetWidth)+ Number(header_role.value.offsetWidth);
  headerWidth.value = headerWidth.value + Number(header_shortname.value.offsetWidth) + Number(header_spec.value.offsetWidth);

  if(visibilityFilters.value.showMoFullname === '1'){
    headerWidth.value = headerWidth.value + header_moname.value.offsetWidth;
  }
};

const handleConfigClick = ()=>{
  let drop = document.getElementById('em-table-config-dropdown');

  if(drop.style.display === 'none'){
    drop.style.display = 'flex';
  }
  else {
    drop.style.display = 'none';
  }
};

const onPageCountChange = ()=>{

  activePage.value = 1;
  localInfoText.value = '';
  infoTextWarnStyle.value = false;
  getList();

};

const selectAllPage = ()=>{

  if(disableAll.value){

    infoList.value.forEach((item)=>{
      if (!activeList.value.includes(Number(item.uid))){
        activeList.value.push(Number(item.uid));
      }

    });

  }

  else {

    infoList.value.forEach((item)=>{
      let index = inactiveList.value.indexOf(Number(item.uid));
      if (index !== -1){
        inactiveList.value.splice(index, 1);
      }
    });

  }
  inspectCheckBox();
  syncStorage();

};

const unSelectAllPage = ()=>{

  if(disableAll.value){

    infoList.value.forEach((item)=>{

      let index = activeList.value.indexOf(Number(item.uid));
      if (index !== -1){
        activeList.value.splice(index, 1);
      }

    });

  }
  else {

    infoList.value.forEach((item)=>{

      if(!inactiveList.value.includes(Number(item.uid))){
        inactiveList.value.push(Number(item.uid))
      }

    });

  }

  inspectCheckBox();
  syncStorage();

};

const selectAllProcess = ()=>{

  disableAll.value = false;
  activeList.value = [];
  inactiveList.value = [];
  inspectCheckBox();
  syncStorage();

};

const unsSelectAllProcess = ()=>{

  disableAll.value = true;
  activeList.value = [];
  inactiveList.value = [];
  inspectCheckBox();
  syncStorage();

};

const inspectCheckBox = ()=>{

  realCheckboxes.value = [];

  if(disableAll.value){

    infoList.value.forEach((item)=>{
      if (activeList.value.includes(Number(item.uid))){
        realCheckboxes.value.push(Number(item.uid));
      }
    })

  }
  else {
    infoList.value.forEach((item)=>{
      if (!inactiveList.value.includes(Number(item.uid))){
        realCheckboxes.value.push(Number(item.uid));
      }
    })
  }

};

const initLocalList = ()=>{

  if(fmStore.$state.saveState){

    let copyFmStore = {...fmStore.$state};

    if (localStorage.getItem('em-fm-roles')){

      let rolesLocalList = JSON.parse(localStorage.getItem('em-fm-roles'));

      copyFmStore.roleState.activeAll = Number(rolesLocalList.activeAll);

      if (Number(rolesLocalList.activeAll)=== 1){
        copyFmStore.roleState.activeList = [];
        copyFmStore.roleState.inactiveList = rolesLocalList.list;

      }
      else {

        copyFmStore.roleState.inactiveList = [];
        copyFmStore.roleState.activeList = rolesLocalList.list;

      }
    }

    if (localStorage.getItem('em-fm-specs')){

      let specLocalList = JSON.parse(localStorage.getItem('em-fm-specs'));

      copyFmStore.specState.activeAll = Number(specLocalList.activeAll);

      if (Number(specLocalList.activeAll)=== 1){

        copyFmStore.specState.activeList = [];
        copyFmStore.specState.activeList = specLocalList.list;

      }
      else {

        copyFmStore.specState.inactiveList = [];
        copyFmStore.specState.inactiveList = specLocalList.list;

      }
    }

    if (localStorage.getItem('em-fm-mos')){

      let moLocalList = JSON.parse(localStorage.getItem('em-fm-mos'));

      copyFmStore.moState.disableAll = Number(moLocalList.disableAll);

      if (Number(moLocalList.disableAll)=== 1){
        copyFmStore.moState.inactiveList = [];
        copyFmStore.moState.activeList = moLocalList.list;

      }
      else {

        copyFmStore.moState.activeList = [];
        copyFmStore.moState.inactiveList = moLocalList.list;

      }
    }

  }
  else {
    if(localStorage.getItem('em-fm-mos')){
      localStorage.setItem('em-fm-mos', JSON.stringify({'disableAll': 0, 'list':[]}))
    }
    if(localStorage.getItem('em-fm-roles')){
      localStorage.setItem('em-fm-roles', JSON.stringify({'activeAll': 0, 'list':[]}))
    }
    if(localStorage.getItem('em-fm-specs')){
      localStorage.setItem('em-fm-specs', JSON.stringify({'activeAll': 0, 'list':[]}))
    }

  }

};

const syncStorage = ()=>{

  let fmStoreCopy = {...fmStore.$state};
  fmStoreCopy.userState.disableAll = disableAll.value;
  fmStoreCopy.userState.activeList = activeList.value;
  fmStoreCopy.userState.inactiveList = inactiveList.value;

  fmStore.$patch(fmStoreCopy);

};

const searchProcess = ()=>{

  activePage.value = 1;
  localInfoText.value = '';
  infoTextWarnStyle.value = false;
  getList();

};

const resetSearch = ()=>{

  activePage.value = 1;
  localInfoText.value = '';
  infoTextWarnStyle.value = false;
  login_input.value = '';
  fio_input.value = '';
  role_input.value = '';
  moname_input.value = '';
  shortname_input.value = '';
  spec_input.value = '';

  getList();

};

const handleOnClick =()=>{

  let configDropDown = document.getElementById('em-table-config-dropdown');
  let configIcon = document.getElementById('em-table-config-icon');

  if (configDropDown && configIcon){

    if (!configDropDown.contains(event.target) && !configIcon.contains(event.target) ) {
      configDropDown.style.display = 'none';
    }

  }

};

const resetFiltersAndSorting = (exclude)=>{

  if(exclude !== 'check'){
    filters.value.check = 'notset';
  }
  if(!['login', 'check'].includes(exclude)){
    sorting.value.login = 'notset';
  }
  if(!['fio', 'check'].includes(exclude)){
    sorting.value.fio = 'notset';
  }
};

const sortingProcess = (target)=>{

  activePage.value = 1;

  localInfoText.value = "";
  infoTextWarnStyle.value = false;

  resetFiltersAndSorting(target);

  if(target === 'login'){

    if(sorting.value.login === 'notset' || sorting.value.login === 'desc'){
      sorting.value.login = 'asc';
    }
    else {
      sorting.value.login = 'desc';
    }

  }
  else if(target === 'fio'){

    if(sorting.value.fio === 'notset' || sorting.value.fio === 'desc'){
      sorting.value.fio = 'asc';
    }
    else {
      sorting.value.fio = 'desc';
    }

  }

  getList();

};

const fullReset = ()=>{

  localInfoText.value = '';

  infoTextWarnStyle.value = false;

  activePage.value = 1;

  pageCount.value = '10';

  filters.value.check = 'notset';

  sorting.value.login= 'notset';

  sorting.value.fio = 'notset';

  getList();
};

const globalReset = ()=>{

  localInfoText.value= '';

  infoTextWarnStyle.value = false;

  activePage.value = 1;

  totalItems.value = 0;

  pageCount.value = '10';

  filters.value.check = 'notset';

  sorting.value.login= 'notset';

  sorting.value.fio = 'notset';

  login_input.value = '';

  fio_input.value = '';

  role_input.value = '';

  moname_input.value = '';

  shortname_input.value = '';

  spec_input.value = '';

  infoList.value = [];

  disableAll.value = false;

  activeList.value = [];

  inactiveList.value = [];

  realCheckboxes.value = [];

  isFirstRequest.value = true;

  exportActive.value = false;

};


const getList = async()=>{


  if(checkGetListReady.value){

    localInfoText.value = '';
    infoTextWarnStyle.value = false;

    isLoading.value = true;

    let tempUserKey='';

    if (localStorage.getItem('em-fm-userkey')){
      let tempObject = JSON.parse(localStorage.getItem('em-fm-userkey'));

      tempUserKey = tempObject.userkey;
    }

    let params = requestParams.value

    params['tempuserkey'] = tempUserKey

    let answer = await getUserList(params);

    await console.log("getUserList answer :", answer);

    if (answer.status === 'ok'){
      infoList.value = await answer.info.result_list;
      totalItems.value = await answer.info.total_items;
      if (Number(answer.info.use_tempdata) === 0){
        localStorage.setItem('em-fm-userkey', JSON.stringify({'userkey': answer.info.tempuserkey}))
      }
      await inspectCheckBox();
    }
    else {
      globalInfoText.value = "При получении данных произошла ошибка. Попробуйте перегрузить страницу или повторите процедуру позже!";
    }

    isLoading.value = false;

    if (isFirstRequest.value){
      isFirstRequest.value = false;
      let copyFmStore = {...fmStore.$state};
      copyFmStore.isFirstRequest = false;
      fmStore.$patch(copyFmStore);
    }

  }

};

// COMPUTED
const resetIconVisibility = computed(()=>{
  let reset = false;

  if (filters.value.check !== '0' && filters.value.check !== 'notset'){
    reset = true;
  }

  if (sorting.value.login !== '0' && sorting.value.login !== 'notset'){
    reset = true;
  }

  if (sorting.value.fio !== '0' && sorting.value.fio !== 'notset'){
    reset = true;
  }

  return reset;
});

const selectArrow = computed(()=>{
  return app_config.apiUrl+"/static/imgs/arrow.svg"
});

const checkGetListReady = ()=>{

  let rolesEmpty = false;
  let specsEmpty = false;
  let mosEmpty = false;

  if (fmStore.$state.roleState.inactiveList.length === 0 && fmStore.$state.roleState.activeList.length === 0){
    rolesEmpty = true;
  }

  if (fmStore.$state.specState.inactiveList.length === 0 && fmStore.$state.specState.activeList.length === 0){
    specsEmpty = true;
  }

  if (fmStore.$state.moState.inactiveList.length === 0 && fmStore.$state.moState.activeList.length === 0){
    mosEmpty = true;
  }

  return !(rolesEmpty && specsEmpty && mosEmpty);


};

const requestParams = computed(()=>{

  return {
    'action': 'getuserlist',
    'apiurl': app_config.apiUrl,
    'role_activeall': fmStore.$state.roleState.activeAll ? 1 : 0,
    'role_activelist': fmStore.$state.roleState.activeList,
    'role_inactivelist': fmStore.$state.roleState.inactiveList,
    'spec_activeall': fmStore.$state.specState.activeAll ? 1 : 0,
    'spec_activelist': fmStore.$state.specState.activeList,
    'spec_inactivelist': fmStore.$state.specState.inactiveList,
    'mo_disableall': fmStore.$state.moState.disableAll ? 1 : 0,
    'mo_activelist': fmStore.$state.moState.activeList,
    'mo_inactivelist': fmStore.$state.moState.inactiveList,

    'user_disableall': disableAll.value ? 1 : 0,
    'user_activelist': activeList.value,
    'user_inactivelist': inactiveList.value,
    'user_searchinput': {

      'login_input': login_input.value,
      'fio_input': fio_input.value,
      'moname_input': moname_input.value,
      'shortname_input': shortname_input.value,
      'spec_input': spec_input.value,
      'role_input': role_input.value

    },

    'user_activepage': activePage.value,
    'user_sorting': sorting.value,
    'user_filters': filters.value,
    'user_pagecount': pageCount.value,
    'user_visibility_filters': visibilityFilters.value

  }

});

// LIFECYCLE
onMounted(async ()=>{
  if(globalInfoText.value === ''){

    window.addEventListener('click', handleOnClick);

    filters.value.check= 'notset';
    sorting.value.fio = 'notset';
    sorting.value.login = 'notset';

    await initLocalList();

    headerWidth.value = Number(header_check.value.offsetWidth)+Number(header_login.value.offsetWidth);
    headerWidth.value = headerWidth.value + Number(header_fio.value.offsetWidth)+ Number(header_role.value.offsetWidth);
    headerWidth.value = headerWidth.value + Number(header_moname.value.offsetWidth)+ Number(header_shortname.value.offsetWidth);
    headerWidth.value = headerWidth.value + Number(header_spec.value.offsetWidth);
  }
});

onUnmounted(async ()=>{
  await window.removeEventListener('click', handleOnClick);
});

// WATCH
watch(
    globalResetState,
    (value) => {
      if(value){
        globalReset();
      }
    },
    {deep: true}
);

</script>

<style scoped>
.em-header-item {
  color: #686868;
  cursor: pointer;
  border: 1px solid #ced4da;
  display: flex;
  align-items: center;
  justify-content: center;
}
.em-header-item:hover {
  background-color: rgba(30, 134, 134, 0.46);
}

.em-even-color {
  background-color: rgba(30, 134, 134, 0.46);
}

.em-td-border-right {
  border-right: 1px solid #ced4da;
  border-left: none;
}
.em-td-border-left {
  border-right: none;
  border-left: 1px solid #ced4da;
}

.em-even-td-border-left {
  border-right: none !important;
  border-left: 1px solid white !important;
}
.em-even-td-border-right {
  border-right: 1px solid white !important;
  border-left: none !important;
}

.em-td-border {
  border-right: 1px solid #ced4da;
  border-left: 1px solid #ced4da;
}
.em-even-td-border {
  border-right: 1px solid white !important;
  border-left: 1px solid white !important;
}

.em-table-item input {
  margin: unset!important;
}

.fm-enrolbyfm-modal-buttons {

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

}

.fm-enrolbyfm-modal-info, .fm-enrolbyfm-modal-text {

  display: flex;
  font-weight: bold;
  color: #1e8686;
  font-size: 1.4em;
  padding-top: 50px;
  padding-bottom: 50px;
  text-align: center;
  justify-content: center;
  align-items: center;

}

.fm-enrolbyfm-modal-loading {

  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.fm-enrolbyfm-modal-wr {

  display: flex;
  flex-direction: column;

}

.fm-warn-style {
  color: #dc3545 !important;
}

.em-body-tem-row-fontcolor {
  color: #686869;
}

#em-filter-part-ident.fm-list-header-icon{
  margin-left: 0;
}

.fm-list-header-icon {

  margin-left: 20px;
  display: flex;
  align-items: center;

}

.fm-list-loading-wr {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.em-table-pagination-wr {
  display: flex;
  justify-content: center;
}

.fm-list-getuserlist-button {
  margin-left: 10px;
}

.em-table-pagecount-select {
  margin-right: 20px;
}
.em-search-input {
  width: 90%;
}

.em-search-input-wr {
  border-bottom-left-radius: 0.25rem !important;
  border-top-left-radius: 0.25rem !important;
}

.em-table-shortname-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.em-table-moname-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.em-table-spec-item {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.em-table-role-item {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.em-table-fio-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.em-table-login-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.em-table-checkbox-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fm-list-table-noresults {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #1e8686;
  font-size: 1.4em;
}

.em-table-reseticon-wr {
  margin-right: 20px;
  cursor: pointer;
}

.table-config-item-text {
  padding-left: 20px;
}

.em-table-config-item {
  margin-bottom: 20px;
  font-weight: bold;
  font-family: Helvetica;
  display: flex;
  align-items: center;
}

.em-table-config-dropdown {
  border: 1px solid #ced4da;
  padding: 15px;
  flex-direction: column;
  background-color: white;
  min-width: 300px;
  max-width: 400px;
  max-height: 600px;
  overflow: auto;
  position: absolute;
  z-index: 100;
}

.em-table-config-icon-wr {
  cursor: pointer;
  position: relative;
  padding-right: 20px;
}

.em-table-pagecount-container {
  display: flex;
  margin-bottom: 30px;
  justify-content: flex-start;
  align-items: center;
}

.em-table-pagecount-select select {
  margin: unset!important;
}

.fm-action-icon {
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
}

.fm-list-actions-wr {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.em-header-search-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-item-text {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}

.em-header-item {
  color: #686868;
  cursor: pointer;
  border: 1px solid #ced4da;
  display: flex;
  align-items: center;
  justify-content: center;
}
.em-header-item:hover {
  background-color: rgba(30, 134, 134, 0.46);
}

.em-table-item {
  word-break: break-word;
  box-sizing: border-box;
  padding: 4px;
}

.em-body-item-row {

  display: flex;
  justify-content: flex-start;
}

.em-table-wr {
  overflow: auto;
  display: flex;
  flex-direction: column;
  width: inherit;
}

.em-table-container {
  min-height: 400px;
  font-family: Helvetica;
  font-weight: bold;
  display: flex;
  width: 100%;
  position: relative;
  margin-bottom: 40px;
}

</style>