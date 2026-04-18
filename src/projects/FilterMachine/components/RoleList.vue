<template>
  <ModalWindow
      modal-size="large"
      @closemodal="resetState();$emit('closerolelist')"
  >

    <div v-if="globalInfoText !==''" class="fm-list-globalinfo">
      {{ globalInfoText }}
    </div>

    <template v-else>

      <div class="fm-list-wr">
        <div class="fm-list-title">
          Выбор Роли (отметьте те роли, которые будут участвовать в формировании списка)
        </div>

        <div class="em-search-wr" :class="{'em-disabled-style': isLoading}">

          <div @click="searchProcess()" v-tippy="{ content: 'Искать по слову или фразе', placement : 'top-start' }"
               class="em-search-icon"
          >
            <app-icon name="search"
                      :size="20"
                      color="#1e8686"
            />
          </div>

          <div class="em-search-input-wr">

            <input @keyup.enter="searchProcess()" placeholder="Поиск по названию роли"
                   class="em-search-input" type="text"
                   name="em-search-input" v-model="searchInput"
            >

            <template v-if="searchInput !==''">
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

        <div class="fm-list-actions-wr" :class="{'em-disabled-style': isLoading}">
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

        </div>

        <div v-if="localInfoText !==''" class="fm-list-localinfo"
             :class="{'fm-list-warnstyle':infoTextWarnStyle}"
        >
          {{ localInfoText }}
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

          <div v-tippy="{ content: 'Сбросить фильтры и сортировки',placement : 'top-start'}" @click="resetSortingAndFilters()"
               v-if="resetIconVisibility" class="fm-list-table-reseticon-wr"
          >
            <app-icon name="times-circle"
                      :size="38"
                      color="#dc3545"
            />
          </div>

          <div class="fm-list-table-download-wr">
            <button @click="downloadReport('roleall')" class="vue-btn vue-btn-normal"
                    :class="{'em-disabled-style': exportActive}"
            >
              Скачать все
            </button>
            <button @click="downloadReport('roleactive')" :class="{'em-disabled-style': exportActive}"
                    v-if="activeList.length !==0 || inactiveList.length !==0" class="vue-btn vue-btn-normal"
            >
              Скачать отмеченные
            </button>
          </div>
        </div>

        <template v-if="isLoading">

          <div class="fm-list-loading-wr">
            <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка..." />
          </div>

        </template>

        <template v-else>

          <div class="fm-list-table">

            <div class="fm-list-table-row">
              <div class="fm-list-item fm-list-item-header checkbox-item">
                <div v-if="activeList.length >0 || inactiveList.length>0" @click="processFilter()"
                     v-tippy="{ content: 'Отфильтровать выбранные', placement : 'top-start' }" id="em-filter-activity-ident"
                     class="header-item-icon"
                >

                  <template v-if="filters.check === 'notset'">
                    <app-icon name="filter"
                              :size="20"
                              color="#808080FF"
                    />

                  </template>

                  <template v-else>
                    <template v-if="filters.check === '1'">
                      <app-icon name="filter"
                                :size="20"
                                color="#1e8686"
                      />
                    </template>
                    <template v-else>
                      <app-icon name="filter-slash"
                                :size="20"
                                color="#1e8686"
                      />
                    </template>
                  </template>

                </div>
              </div>
              <div class="fm-list-item fm-list-item-header name-item">

                <div v-tippy="{ content: 'Отсортировать по названию', placement : 'top-start' }" v-if="Number(totalItems) >1"
                     @click="processSort()" class="fm-list-header-icon"
                >
                  <template v-if="sorting.name === 'notset'">
                    <app-icon name="sorting"
                              :size="20"
                              color="#808080FF"
                    />
                  </template>

                  <template v-else>
                    <template v-if="sorting.name === 'desc'">
                      <app-icon name="sort-amount-down"
                                :size="20"
                                color="#1e8686"
                      />
                    </template>
                    <template v-else>
                      <app-icon name="sort-amount-up"
                                :size="20"
                                color="#1e8686"
                      />
                    </template>

                  </template>
                </div>

              </div>
            </div>


            <template v-if="infoList.length === 0">

              <div class="fm-list-table-noresults">
                Нет данных
              </div>

            </template>
            <template v-else v-for="(item, index) in infoList"
                      :key="index"
            >

              <div class="fm-list-table-row">
                <div class="fm-list-item checkbox-item">
                  <input :id="'fm-list-rolecheckbox-'+item.id.toString()" :value="Number(item.id)"
                         name="fm-list-rolecheckbox" @change="processCheckbox($event, item.id)"
                         type="checkbox" v-model="realCheckboxes"
                  />
                </div>
                <div class="fm-list-item name-item">
                  {{ item.name }}
                </div>
              </div>

            </template>

          </div>

          <div class="em-table-pagination-wr" v-if="totalItems > Number(pageCount) && !isLoading">
            <vue-awesome-paginate
                :total-items="totalItems"
                :items-per-page="Number(pageCount)"
                v-model="activePage"
                :on-click="getList"
            />
          </div>

        </template>

      </div>

    </template>

  </ModalWindow>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ModalWindow from "@/projects/global/components/ModalWindow/ModalWindow.vue";
import {getRoleList} from "@/projects/FilterMachine/services/getrolelist";
import {useFmStore} from "@/projects/global/store/fm";
import * as dayjs from "dayjs";
import {compareArrays} from "@/projects/FilterMachine/services/comparearrays";
import {app_config} from "@/projects/config/setconfig";
import {computed, onMounted, watch} from "vue";

// EMITS
const emits = defineEmits(['closerolelist', 'resetempdata']);

// STORE
const fmStore = useFmStore();

// DATA
const exportActive = ref(false);

const globalInfoText = ref('');

const localInfoText = ref('');

const infoTextWarnStyle = ref(false);

const infoList = ref([]);

const sorting = ref({
  name: '0'
});

const filters = ref({
  check: '0'
});

const activeAll = ref(false);

const realCheckboxes = ref([]);

const activeList = ref([]);

const inactiveList = ref([]);

const isLoading = ref(false);

const totalItems = ref(0);

const pageCount = ref('10');

const activePage = ref(1);

const searchInput = ref('');

// METHODS
const downloadReport = async(expType)=>{

  infoText.value = "";
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

      infoText.value = 'При попытке экспорта данных возникла ошибка. Попробуйте повторить процедуру позже!';
      infoTextWarnStyle.value = true;
    }
    else{

      let repAnswer = await expResp.blob();

      let fileUrl = await URL.createObjectURL(repAnswer);

      let link = await document.createElement("a");
      link.href = fileUrl;

      if(expType === "roleall"){
        link.download =  "Все_роли_"+dayjs().format('DD_MM_YYYY')+".xlsx";
      }
      else if(expType === "roleactive"){
        link.download =  "Отмеченные_роли_"+dayjs().format('DD_MM_YYYY')+".xlsx";
      }

      await document.body.appendChild(link);
      await link.click();
      await document.body.removeChild(link);

    }
  }
  catch(e) {

    infoText.value = 'При попытке экспорта данных возникла ошибка. Попробуйте повторить процедуру позже!';
    infoTextWarnStyle.value = true;

  }
  exportActive.value = false;

};

const resetSortingAndFilters = ()=>{

  localInfoText.value = "";
  infoTextWarnStyle.value = false;
  activePage.value = 1;
  sorting.value.name = 'notset';
  filters.value.check = 'notset';

  getList();

};

const selectAllPage = ()=>{

  if(activeAll.value){

    infoList.value.forEach((item)=>{
      let index = inactiveList.value.indexOf(Number(item.id));
      if (index !== -1){
        inactiveList.value.splice(index, 1);
      }
    });

  }

  else {

    infoList.value.forEach((item)=>{
      if (!activeList.value.includes(Number(item.id))){
        activeList.value.push(Number(item.id));
      }

    });

  }
  inspectCheckBox();
  syncStorage();

};

const unSelectAllPage = ()=>{

  if(activeAll.value){

    infoList.value.forEach((item)=>{

      if(!inactiveList.value.includes(Number(item.id))){
        inactiveList.value.push(Number(item.id))
      }

    });

  }
  else {

    infoList.value.forEach((item)=>{

      let index = activeList.value.indexOf(Number(item.id));
      if (index !== -1){
        activeList.value.splice(index, 1);
      }

    });

  }

  inspectCheckBox();
  syncStorage();

};

const selectAllProcess = ()=>{

  activeAll.value = true;
  activeList.value = [];
  inactiveList.value = [];
  inspectCheckBox();
  syncStorage();

};

const unsSelectAllProcess = ()=>{

  activeAll.value = false;
  activeList.value = [];
  inactiveList.value = [];
  inspectCheckBox();
  syncStorage();

};

const syncStorage = ()=>{

  let needResetTempData = false;

  let fmStoreCopy = {...fmStore.$state};

  if (fmStoreCopy.roleState.activeAll !== this.activeAll){
    needResetTempData = true;
  }
  if (!compareArrays(fmStoreCopy.roleState.activeList.sort(), activeList.value.sort())){
    needResetTempData = true;
  }
  if (!compareArrays(fmStoreCopy.roleState.inactiveList.sort(), inactiveList.value.sort())){
    needResetTempData = true;
  }

  fmStoreCopy.roleState.activeAll = activeAll.value;
  fmStoreCopy.roleState.activeList = activeList.value;
  fmStoreCopy.roleState.inactiveList = inactiveList.value;

  fmStore.$patch(fmStoreCopy);

  let localStore = {};
  activeAll.value ? localStore.activeAll=1: localStore.activeAll=0;
  activeAll.value ? localStore.list=inactiveList.value : localStore.list=activeList.value;

  if(fmStore.$state.saveState) {
    localStorage.setItem('em-fm-roles', JSON.stringify(localStore));
  }

  if (needResetTempData){
    emits('resetempdata');
  }

};

const processCheckbox = (event, roleid)=>{

  if(event.target.checked){
    if(!activeAll.value){
      if (!activeList.value.includes(Number(roleid))){
        activeList.value.push(Number(roleid))
      }
    }
    else {
      if (inactiveList.value.includes(Number(roleid))){
        let findIndex = inactiveList.value.indexOf(Number(roleid));
        if (findIndex !== -1){
          inactiveList.value.splice(findIndex, 1);
        }
      }
    }

  }
  else {

    if(activeAll.value){
      if (!inactiveList.value.includes(Number(roleid))){
        inactiveList.value.push(Number(roleid))
      }
    }
    else{
      if (activeList.value.includes(Number(roleid))){
        let findIndex = activeList.value.indexOf(Number(roleid));
        if (findIndex !== -1){
          activeList.value.splice(findIndex, 1);
        }
      }
    }
  }

  syncStorage();

};

const inspectCheckBox = ()=>{

  realCheckboxes.value = [];

  if(activeAll.value){

    infoList.value.forEach((item)=>{
      if (!inactiveList.value.includes(Number(item.id))){
        realCheckboxes.value.push(Number(item.id));
      }
    })

  }
  else {
    infoList.value.forEach((item)=>{
      if (activeList.value.includes(Number(item.id))){
        realCheckboxes.value.push(Number(item.id));
      }
    })
  }

};

const initLocalList = ()=>{

  if(fmStore.$state.saveState){

    if (localStorage.getItem('em-fm-roles')){

      let localList = JSON.parse(localStorage.getItem('em-fm-roles'));

      let roleList = localList.list;

      if (Number(localList.activeAll)=== 1){
        activeList.value = [];

        for (let item of roleList){
          if (!inactiveList.value.includes(Number(item))){
            inactiveList.value.push(Number(item))
          }
        }

      }
      else {
        inactiveList.value = [];

        for (let item of roleList){
          if (!activeList.value.includes(Number(item))){
            activeList.value.push(Number(item))
          }
        }
      }
    }
  }
  else {
    if(localStorage.getItem('em-fm-roles')){
      localStorage.setItem('em-fm-roles', JSON.stringify({'activeAll': 0, 'list':[]}))
    }
  }
};

const processFilter = ()=>{

  activePage.value = 1;

  localInfoText.value = "";
  infoTextWarnStyle.value = false;

  if(filters.value.check === 'notset' || filters.value.check === '0'){
    filters.value.check = '1';
  }
  else {
    filters.value.check = '0';
  }

  getList();

};

const processSort = ()=>{
  activePage.value = 1;

  localInfoText.value = "";
  infoTextWarnStyle.value = false;

  if(sorting.value.name === 'notset' || sorting.value.name === 'desc'){
    sorting.value.name = 'asc';
  }
  else {
    sorting.value.name = 'desc';
  }

  getList();

};

const getList = async()=>{

  localInfoText.value = '';
  infoTextWarnStyle.value = false;

  isLoading.value = true;

  let answer = await getRoleList(requestParams.value);

  await console.log("getList answer :", answer);

  if (answer.status === 'ok'){
    infoList.value = await answer.info.result_list;
    totalItems.value = await answer.info.total_items;
    await inspectCheckBox();
  }
  else {
    globalInfoText.value = "При получении данных произошла ошибка. Попробуйте перегрузить страницу или повторите процедуру позже!";
  }

  isLoading.value = false;

};

const searchProcess = ()=>{

  activePage.value = 1;
  localInfoText.value = '';
  infoTextWarnStyle.value = false;

  if(searchInput.value !== ''){
    getList();
  }

};

const resetSearch = ()=>{

  activePage.value = 1;
  localInfoText.value = '';
  infoTextWarnStyle.value = false;
  searchInput.value = '';

  getList();

};

const onPageCountChange = ()=>{

  activePage.value = 1;
  localInfoText.value = '';
  infoTextWarnStyle.value = false;

  getList();

};

const resetState = ()=>{

  globalInfoText.value = '';

  localInfoText.value = '';

  infoTextWarnStyle.value = false;

  infoList.value = [];

  sorting.value = {
    name: '0'
  };

  filters.value = {
    check: '0'
  };

  activeAll.value = false;

  activeList.value =  [];

  inactiveList.value = [];

  isLoading.value =false;

  totalItems.value = 0;

  pageCount.value =  '10';

  activePage.value= 1;

  searchInput.value =  '';
};

// COMPUTED
const resetIconVisibility = computed(()=>{
  return filters.value.check === '1' || sorting.value.name !== 'notset';
});

const selectArrow = computed(()=>{
  return app_config.apiUrl+"/static/imgs/arrow.svg"
});

const requestParams = computed(()=>{

  return {
    'action': 'getrolelist',
    'apiurl': app_config.apiUrl,
    'role_activeall': activeAll.value ? 1 : 0,
    'role_activelist': activeList.value,
    'role_inactivelist': inactiveList.value,
    'role_searchinput': searchInput.value,
    'role_activepage': activePage.value,
    'role_sorting': sorting.value,
    'role_filters': filters.value,
    'role_pagecount': pageCount.value
  }

});

// LIFECYCLE
onMounted(async ()=>{
  sorting.value.name = 'notset';
  filters.value.check = 'notset';
  await initLocalList();
  await getList();
});

// WATCH
watch(
    activeList,
    () => {
      inspectCheckBox();
    },
    {deep: true}
);

watch(
    inactiveList,
    () => {
      inspectCheckBox();
    },
    {deep: true}
);

watch(
    activeAll,
    () => {
      inspectCheckBox();
    },
    {deep: true}
);

</script>

<style scoped>
.fm-list-item input {
  margin: unset!important;
}

.em-table-pagecount-select select {
  margin: unset!important;
}

.fm-list-table-download-wr {
  display: flex;
  justify-content: flex-start;
}
.fm-list-table-download-wr button{
  margin-left: 20px;
}

.fm-list-table-reseticon-wr {
  margin-left: 20px;
  cursor: pointer;
}

.fm-list-table-noresults {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
}

.em-table-pagecount-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.fm-list-loading-wr {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-item-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.em-table-pagination-wr {
  display: flex;
  justify-content: center;
}
.fm-list-header-icon {
  cursor: pointer;
}

.fm-list-localinfo {
  color: #1e8686;
  font-weight: bold;
  text-align: left;
  padding-top: 30px;
  padding-bottom: 30px;
}

.fm-list-warnstyle {
  color: #dc3545 !important;
}

.fm-list-globalinfo {
  padding-top: 40px;
  padding-bottom: 40px;
  font-weight: bold;
  font-size: 1.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #dc3545;
}

.fm-list-item {
  padding: 15px;
}

.checkbox-item {
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.name-item {
  cursor: pointer;
  font-weight: bold;
  color: #959595;
  font-size: 1.2em;
  width: 95%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.fm-list-table-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.fm-list-table {
  min-height: 400px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}

.vue-form-select {
  width: unset;
}

.fm-list-actions-wr {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.em-search-wr {
  margin-bottom: 30px;
  width: 50%;
}

.fm-action-icon {
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
}

.fm-list-title{
  color: #1e8686;
  font-weight: bold;
  font-size: 1.3em;
  margin-bottom: 30px;
}

.fm-list-wr {
  display: flex;
  flex-direction: column;
}
</style>