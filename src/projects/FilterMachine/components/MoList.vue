<template>
  <ModalWindow
      modal-size="large"
      @closemodal="emits('closemolist')"
  >
    <div v-if="globalInfoText !==''" class="fm-list-globalinfo">
      {{ globalInfoText }}
    </div>

    <template v-else>

      <div class="fm-list-wr">
        <div class="fm-list-title">
          Выбор МО (снимите галочку с тех МО, которые не будут участвовать в формировании списка)
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

            <input @keyup.enter="searchProcess()" placeholder="Поиск по названию МО"
                   class="em-search-input" type="text"
                   name="em-search-input"
                   v-model="searchInput"
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

          <div class="em-table-config-icon-wr">
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
                  <input @change="changeVisibilityFilters($event, 'activemo')" v-if="Number(visibilityFilters.showOnlyActiveMo) === 1"
                         checked type="checkbox"
                  >
                  <input @change="changeVisibilityFilters($event, 'activemo')" v-else
                         type="checkbox"
                  >
                </div>
                <div class="table-config-item-text">
                  Показывать только активные МО
                </div>
              </div>
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
            <button @click="downloadReport('moall')" class="vue-btn vue-btn-normal"
                    :class="{'em-disabled-style': exportActive}"
            >
              Скачать все
            </button>
            <button @click="downloadReport('moactive')" v-if="activeList.length !==0 || inactiveList.length !==0"
                    :class="{'em-disabled-style': exportActive}" class="vue-btn vue-btn-normal"
            >
              Скачать отмеченные
            </button>
          </div>

        </div>

        <template v-if="isLoading">

          <div class="fm-list-loading-wr" :style="'width: '+headerWidth+'px;'">
            <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка..." />
          </div>

        </template>

        <template v-else>

          <div class="fm-list-table-container">
            <div class="fm-list-table">

              <div class="fm-list-table-row">

                <div ref="categoryheader" class="fm-list-item fm-list-item-header category-item-header em-td-border"
                     style="flex: 0 0 270px;"
                >
                  <div class="header-item-text" id="table-cat-text">
                    <span @click="processOpenCategory()">
                      <app-icon name="chevron-up"
                                :size="20"
                                color="#1e8686"
                      />
                    </span>
                    <span @click="processOpenCategory()">
                      <app-icon name="chevron-down"
                                :size="20"
                                color="#1e8686"
                      />
                    </span>
                    &nbsp;&nbsp;<span @click="processOpenCategory()">КАТЕГОРИЯ МО</span>
                  </div>
                  <div @click="sortingProcess('cat')" class="header-item-icon">
                    <template v-if="sorting.cat === 'notset'">
                      <unicon name="sorting" width="20"
                              height="20" fill="#808080FF"
                              hover-fill="#4D4D4DFF"
                      />
                    </template>

                    <template v-else>
                      <unicon v-if="sorting.cat === 'desc'" name="sort-amount-down"
                              width="20" height="20"
                              fill="#1e8686" hover-fill="white"
                      />
                      <unicon v-else name="sort-amount-up"
                              width="20" height="20"
                              fill="#1e8686" hover-fill="white"
                      />
                    </template>
                  </div>

                  <template v-if="categoryList.length > 0">
                    <div style="display: none;" class="table-category-dropdown"
                         id="table-category-dropdown"
                    >
                      <div v-for="category in categoryList" class="category-dropdown-item"
                           :key="category.id"
                      >
                        <div @change="processCategoryClick()" class="dropdown-item-checkbox">
                          <input type="checkbox" :value="category.id"
                                 v-model="categoryFilterList"
                          />
                        </div>
                        <div class="dropdown-item-text">
                          {{ category.name }}
                        </div>
                      </div>

                    </div>
                  </template>
                </div>

                <div ref="checkboxheader" class="fm-list-item fm-list-item-header checkbox-item-header em-td-border"
                     style="flex: 0 0 100px;"
                >
                  <div v-if="inactiveList.length>0 || activeList.length>0" @click="filterProcess('check')"
                       id="em-filter-part-ident" class="header-item-icon"
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
                <div v-if="visibilityFilters.showMoFullname === '1'" ref="nameheader"
                     class="fm-list-item fm-list-item-header name-item-header em-td-border-left"
                     style="flex: 0 0 550px;"
                >
                  <div class="header-item-text">
                    НАЗВАНИЕ МО
                  </div>

                  <div v-if="Number(totalItems) >1" @click="sortingProcess('name')"
                       class="fm-list-header-icon"
                  >
                    <template v-if="sorting.name === 'notset'">
                      <unicon name="sorting" width="20"
                              height="20" fill="#808080FF"
                              hover-fill="#4D4D4DFF"
                      />
                    </template>

                    <template v-else>
                      <unicon v-if="sorting.name === 'desc'" name="sort-amount-down"
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

                <div ref="shortnameheader" class="fm-list-item fm-list-item-header shortname-item-header em-td-border"
                     style="flex: 0 0 300px;"
                >

                  <div class="header-item-text">
                    КРАТКОЕ НАЗВАНИЕ МО
                  </div>

                  <div v-if="Number(totalItems) >1" @click="sortingProcess('shortname')"
                       class="fm-list-header-icon"
                  >
                    <template v-if="sorting.shortname === 'notset'">
                      <unicon name="sorting" width="20"
                              height="20" fill="#808080FF"
                              hover-fill="#4D4D4DFF"
                      />
                    </template>

                    <template v-else>
                      <unicon v-if="sorting.shortname === 'desc'" name="sort-amount-down"
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

                <div v-if="visibilityFilters.showOnlyActiveMo === '0'" ref="activityheader"
                     class="fm-list-item fm-list-item-header activity-item-header em-td-border" style="flex: 0 0 150px;"
                >
                  Активная МО
                </div>

              </div>

              <template v-if="infoList.length === 0">

                <div class="fm-list-table-noresults" :style="'width: '+headerWidth+'px;'">
                  Нет данных
                </div>

              </template>

              <template v-else>

                <template v-for="(item, index) in infoList" :key="index">

                  <div class="fm-list-table-row">
                    <div class="fm-list-item category-item em-td-border-left" style="flex: 0 0 270px;"
                         :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                    >
                      <input :id="'mocategory-input-ident-'+item.dbid.toString()" @focusout="saveCategory($event, item.dbid, 'mocategory-input-ident-'+ item.dbid.toString())"
                             type="text" class="vue-form-control"
                             v-model="item.category"
                      />
                    </div>
                    <div class="fm-list-item checkbox-item em-td-border" style="flex: 0 0 100px;"
                         :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                    >
                      <input :id="'fm-list-mocheckbox-'+item.dbid.toString()" :value="Number(item.dbid)"
                             @change="processCheckbox($event, item.dbid)" type="checkbox"
                             v-model="realCheckboxes"
                      />
                    </div>
                    <div v-if="visibilityFilters.showMoFullname === '1'" class="fm-list-item name-item em-td-border"
                         style="flex: 0 0 550px;" :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                    >
                      {{ item.moname }}
                    </div>
                    <div class="fm-list-item name-item em-td-border-right" style="flex: 0 0 300px;"
                         :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                    >
                      {{ item.shortname }}
                    </div>

                    <div v-if="visibilityFilters.showOnlyActiveMo === '0'" class="fm-list-item activity-item em-td-border-right"
                         style="flex: 0 0 150px;" :class="{'em-even-color': Number(index) % 2 === 0, 'em-even-td-border': Number(index) % 2 === 0}"
                    >

                      <input v-if="Number(item.active) === 1" @change="activityCheckboxClick($event, item.dbid)"
                             checked type="checkbox"
                      />
                      <input v-else @change="activityCheckboxClick($event, item.dbid)"
                             type="checkbox"
                      />

                    </div>

                  </div>

                </template>

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
          </div>

        </template>

      </div>

    </template>

  </ModalWindow>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import ModalWindow from "@/projects/global/components/ModalWindow/ModalWindow.vue";
import {getMoList} from "@/projects/FilterMachine/services/getmolist";
import {useFmStore} from "@/projects/global/store/fm";
import * as dayjs from "dayjs";
import {saveMoCategory} from "@/projects/MoTable/services/savemocategory";
import {processMoActivity} from "@/projects/MoTable/services/processmoactivity";
import {compareArrays} from "@/projects/FilterMachine/services/comparearrays";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {app_config} from "@/projects/config/setconfig";

// EMITS
const emits = defineEmits(['closemolist', 'resetempdata']);

// STORE
const fmStore = useFmStore();


// DATA
const headerWidth = ref(0);

const exportActive = ref(false);

const globalInfoText = ref('');

const localInfoText = ref('');

const infoTextWarnStyle = ref(false);

const infoList = ref([]);

const infoListFreeze = ref([]);

const categoryFilterList = ref([]);

const disableAll = ref(false);

const activeList = ref([]);

const inactiveList = ref([]);

const categoryList = ref([]);

const realCheckboxes = ref([]);

const isLoading = ref(false);

const filters = ref({
  check: '0'
});

const sorting = ref({
  cat: '0',
  name: '0',
  shortname: '0'
});

const visibilityFilters = ref({
  showMoFullname: '1',
  showOnlyActiveMo: '1'
});

const totalItems = ref(0);

const pageCount = ref('10');

const activePage = ref(1);

const searchInput = ref('');

const categoryheader = ref(null);
const checkboxheader = ref(null);
const shortnameheader = ref(null);

const activityheader = ref(null);
const nameheader = ref(null);


// METHODS
const selectAllPage = ()=>{

  if(disableAll.value){

    infoList.value.forEach((item)=>{
      if (!activeList.value.includes(Number(item.dbid))){
        activeList.value.push(Number(item.dbid));
      }

    });

  }

  else {

    infoList.value.forEach((item)=>{
      let index = inactiveList.value.indexOf(Number(item.dbid));
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

      let index = activeList.value.indexOf(Number(item.dbid));
      if (index !== -1){
        activeList.value.splice(index, 1);
      }

    });

  }
  else {

    infoList.value.forEach((item)=>{

      if(!inactiveList.value.includes(Number(item.dbid))){
        inactiveList.value.push(Number(item.dbid))
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

const syncStorage = ()=>{

  let needResetTempData = false;

  let fmStoreCopy = {...fmStore.$state};

  if (fmStoreCopy.moState.disableAll !== disableAll.value){
    needResetTempData = true;
  }
  if (!compareArrays(fmStoreCopy.moState.activeList.sort(), activeList.value.sort())){
    needResetTempData = true;
  }
  if (!compareArrays(fmStoreCopy.moState.inactiveList.sort(), inactiveList.value.sort())){
    needResetTempData = true;
  }

  fmStoreCopy.moState.disableAll = disableAll.value;
  fmStoreCopy.moState.activeList = activeList.value;
  fmStoreCopy.moState.inactiveList = inactiveList.value;

  fmStore.$patch(fmStoreCopy);

  let localStore = {};
  disableAll.value ? localStore.disableAll=1: localStore.disableAll=0;
  disableAll.value ? localStore.list=activeList.value : localStore.list=inactiveList.value;

  if(fmStore.$state.saveState) {
    localStorage.setItem('em-fm-mos', JSON.stringify(localStore));
  }
  if (needResetTempData){
    emits('resetempdata');
  }

};

const inspectCheckBox = ()=>{

  realCheckboxes.value = [];

  if(disableAll.value){

    infoList.value.forEach((item)=>{
      if (activeList.value.includes(Number(item.dbid))){
        realCheckboxes.value.push(Number(item.dbid));
      }
    })

  }
  else {
    infoList.value.forEach((item)=>{
      if (!inactiveList.value.includes(Number(item.dbid))){
        realCheckboxes.value.push(Number(item.dbid));
      }
    })
  }

};

const initLocalList = ()=>{

  if(fmStore.$state.saveState){

    if (localStorage.getItem('em-fm-mos')){

      let localList = JSON.parse(localStorage.getItem('em-fm-mos'));

      let moList = localList.list;

      if (Number(localList.disableAll)=== 1){
        inactiveList.value = [];

        for (let item of moList){
          if (!activeList.value.includes(Number(item))){
            activeList.value.push(Number(item))
          }
        }

      }
      else {
        activeList.value = [];

        for (let item of moList){
          if (!inactiveList.value.includes(Number(item))){
            inactiveList.value.push(Number(item))
          }
        }
      }
    }
  }
  else {
    if(localStorage.getItem('em-fm-mos')){
      localStorage.setItem('em-fm-mos', JSON.stringify({'disableAll': 0, 'list':[]}))
    }
  }
};

const activityCheckboxClick = async(event, moid)=>{
  localInfoText.value = "";
  infoTextWarnStyle.value = false;

  let activityflag;

  event.target.checked ? activityflag = 1 : activityflag = 0;

  let answer = await processMoActivity(moid, activityflag);
  console.log("processMoActivity answer: ", answer);

  if(answer['status'] !== 'ok'){

    localInfoText.value = "При попытке изменить параметр активности МО произошла ошибка!";
    infoTextWarnStyle.value = true;
  }

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

const processCheckbox = (event, moid)=>{

  if(event.target.checked){
    if(!disableAll.value){

      if (inactiveList.value.includes(Number(moid))){
        let findIndex = inactiveList.value.indexOf(Number(moid));
        if (findIndex !== -1){
          inactiveList.value.splice(findIndex, 1);
        }
      }
    }
    else {
      if (!activeList.value.includes(Number(moid))){
        activeList.value.push(Number(moid))
      }
    }

  }
  else {

    if(disableAll.value){

      if (activeList.value.includes(Number(moid))){
        let findIndex = activeList.value.indexOf(Number(moid));
        if (findIndex !== -1){
          activeList.value.splice(findIndex, 1);
        }
      }

    }
    else{
      if (!inactiveList.value.includes(Number(moid))){
        inactiveList.value.push(Number(moid))
      }
    }
  }

  syncStorage();

};

const saveCategory = async(event, dbid, inputid)=>{
  localInfoText.value = "";
  enableInfoWarnStyle.value = false;

  let matchList = await infoListFreeze.value.filter(item => Number(item.dbid) === Number(dbid));

  if (matchList.length > 0){
    if(event.target.value.trim() !== matchList[0].category.trim()){

      let saveAnsw = await saveMoCategory(dbid, event.target.value.trim());

      await console.log("saveMoCategory answer: ", saveAnsw);

      if(saveAnsw['status'] === 'ok'){
        if(document.getElementById(inputid)){
          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(75 155 55 / 48%)";

        }
      }
      else {
        localInfoText.value = "При попытке сохранить изменения категории МО произошла ошибка!";
        infoTextWarnStyle.value = true;
        if(document.getElementById(inputid)){
          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(249 0 0 / 32%)";

        }
      }

      if(document.getElementById(inputid)){

        setTimeout(function() {
          if(document.getElementById(inputid)){
            document.getElementById(inputid).style.boxShadow = "unset";
          }
        }, 3000);

      }

    }
  }
};

const changeVisibilityFilters = async(event, target)=>{

  if(target === 'activemo'){
    filters.value.moActivity = 'notset';
    if(event.target.checked){
      visibilityFilters.value.showOnlyActiveMo = '1'
    }
    else {
      visibilityFilters.value.showOnlyActiveMo = '0'
    }
  }
  else if (target === 'mofullname'){

    sorting.value.name = 'notset';

    if(event.target.checked){
      visibilityFilters.value.showMoFullname = '1'
    }
    else {
      visibilityFilters.value.showMoFullname = '0'
    }
  }
  await getList();

  headerWidth.value = Number(categoryheader.value.offsetWidth)+Number(checkboxheader.value.offsetWidth)+ Number(shortnameheader.value.offsetWidth);

  if(visibilityFilters.value.showOnlyActiveMo === '0'){
    headerWidth.value = headerWidth.value + activityheader.value.offsetWidth;
  }
  if(visibilityFilters.value.showMoFullname === '1'){
    headerWidth.value = headerWidth.value + nameheader.value.offsetWidth;
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

const downloadReport = async(expType)=>{

  localInfoText.value = "";
  infoTextWarnStyle.value = false;

  exportActive.value = true;

  let dwnldParams = await requestParams.value

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

      if(expType === "moall"){
        link.download =  "Все_mo_"+dayjs().format('DD_MM_YYYY')+".xlsx";
      }
      else if(expType === "moactive"){
        link.download =  "Отмеченные_мо_"+dayjs().format('DD_MM_YYYY')+".xlsx";
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

const processCategoryClick = ()=>{
  localInfoText.value = "";
  infoTextWarnStyle.value = false;
  getList();
};

const processOpenCategory = ()=>{

  let catDropdown = document.getElementById('table-category-dropdown');
  let iconUp = document.getElementById('category-icon-up');
  let iconDown = document.getElementById('category-icon-down');

  if(catDropdown){
    if (catDropdown.style.display === 'none'){
      catDropdown.style.display = 'flex';
      iconDown.style.display = 'none';
      iconUp.style.display = 'block';
    }
    else {
      catDropdown.style.display = 'none';
      iconDown.style.display = 'block';
      iconUp.style.display = 'none';
    }
  }

};

const resetFiltersAndSorting = (exclude)=>{

  if(exclude !== 'check'){
    filters.value.check = 'notset';
  }
  if(!['cat', 'check'].includes(exclude)){
    sorting.value.cat = 'notset';
  }
  if(!['name', 'check'].includes(exclude)){
    sorting.value.name = 'notset';
  }
  if(!['shortname', 'check'].includes(exclude)){
    sorting.value.shortname = 'notset';
  }
};

const sortingProcess = (target)=>{
  activePage.value = 1;

  localInfoText.value = "";
  infoTextWarnStyle.value = false;

  resetFiltersAndSorting(target);

  if(target === 'name'){

    if(sorting.value.name === 'notset' || sorting.value.name === 'desc'){
      sorting.value.name = 'asc';
    }
    else {
      sorting.value.name = 'desc';
    }

  }
  else if(target === 'cat'){

    if(sorting.value.cat === 'notset' || sorting.value.cat === 'desc'){
      sorting.value.cat = 'asc';
    }
    else {
      sorting.value.cat = 'desc';
    }

  }

  else if(target === 'shortname'){

    if(sorting.value.shortname === 'notset' || sorting.value.shortname === 'desc'){
      sorting.value.shortname = 'asc';
    }
    else {
      sorting.value.shortname = 'desc';
    }

  }

  getList();

};

const getList = async()=>{

  localInfoText.value = '';
  infoTextWarnStyle.value = false;

  isLoading.value = true;

  let answer = await getMoList(requestParams.value);

  await console.log("getMoList answer :", answer);

  if (answer.status === 'ok'){
    infoList.value = await answer.info.result_list;
    totalItems.value = await answer.info.total_items;
    categoryList.value = await answer.info.category_list;
    infoListFreeze.value = await JSON.parse(JSON.stringify(infoList.value));
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

const handleOnClick = ()=>{

  let configDropDown = document.getElementById('em-table-config-dropdown');
  let configIcon = document.getElementById('em-table-config-icon');

  let catDropdown = document.getElementById('table-category-dropdown');
  let catText = document.getElementById('table-cat-text');
  let iconUp = document.getElementById('category-icon-up');
  let iconDown = document.getElementById('category-icon-down');

  if (configDropDown && configIcon){

    if (!configDropDown.contains(event.target) && !configIcon.contains(event.target) ) {
      configDropDown.style.display = 'none';
    }

  }

  if(catDropdown && catText && iconUp && iconDown){
    if (!catDropdown.contains(event.target) && !catText.contains(event.target) && !iconUp.contains(event.target) && !iconDown.contains(event.target)) {
      catDropdown.style.display = 'none';
    }
  }

};

const fullReset = ()=>{
  localInfoText.value = '';

  infoTextWarnStyle.value = false;

  activePage.value = 1;

  pageCount.value = '10';

  filters.value.check = 'notset';

  sorting.value.cat = 'notset';

  sorting.value.name = 'notset';

  sorting.value.shortname = 'notset';

  getList();
};

// COMPUTED
const resetIconVisibility = computed(()=>{
  let reset = false;

  if (filters.value.check !== '0' && filters.value.check !== 'notset'){
    reset = true;
  }

  if (categoryFilterList.value.length >0){
    reset = true;
  }

  if (sorting.value.cat !== '0' && sorting.value.cat !== 'notset'){
    reset = true;
  }

  if (sorting.value.name !== '0' && sorting.value.name !== 'notset'){
    reset = true;
  }

  if (sorting.value.shortname !== '0' && sorting.value.shortname !== 'notset'){
    reset = true;
  }

  return reset;
});

const selectArrow = computed(()=>{
  return app_config.apiUrl+"/static/imgs/arrow.svg";
});

const requestParams = computed(()=>{
  return {
    'action': 'getmolist',
    'apiurl': app_config.apiUrl,
    'mo_disableall': disableAll.value ? 1 : 0,
    'mo_activelist': activeList.value,
    'mo_inactivelist': inactiveList.value,
    'mo_searchinput': searchInput.value,
    'mo_activepage': activePage.value,
    'mo_sorting': sorting.value,
    'mo_filters': filters.value,
    'mo_pagecount': pageCount.value,
    'mo_categorylist': categoryFilterList.value,
    'mo_visibility_filters': visibilityFilters.value

  }
}) ;

// LIFECYCLE
onMounted(async ()=>{
  if(globalInfoText.value === ''){
    window.addEventListener('click', handleOnClick);

    filters.value.check= 'notset';
    sorting.value.cat = 'notset';
    sorting.value.name = 'notset';
    sorting.value.shortname = 'notset';
    sorting.value.name = 'notset';
    await initLocalList();
    await getList();

    headerWidth.value = Number(categoryheader.value.offsetWidth)+Number(checkboxheader.value.offsetWidth)+Number(nameheader.value.offsetWidth)+ Number(shortnameheader.value.offsetWidth);
  }
});

onUnmounted(()=>{
  window.removeEventListener('click', handleOnClick);
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
    disableAll,
    () => {
      inspectCheckBox();
    },
    {deep: true}
);

</script>

<style scoped>
.category-dropdown-item input {
  margin: unset !important;
}

.checkbox-item input {
  margin: unset !important;
}

.em-table-pagecount-select select {
  margin: unset !important;
}

.checkbox-item-header .header-item-icon {
  margin-left: 0 !important;
}

.fm-list-globalinfo {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4em;
  color: #dc3545;
}

.fm-list-warnstyle {
  color: #dc3545 !important;
}

.fm-list-localinfo {
  padding-top: 30px;
  padding-bottom: 30px;
  font-weight: bold;
  font-size: 1.2em;
  color: #1e8686;
  text-align: left;
}
.activity-item {
  display: flex;
  align-items: center;
  justify-content: center;
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

.fm-list-table-download-wr button {
  margin-left: 20px;
}

.em-table-reseticon-wr {
  margin-left: 20px;
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
  margin-left: 20px;
  cursor: pointer;
  position: relative;
}

.em-even-color {
  background-color: rgba(30, 134, 134, 0.46);
}

.fm-list-header-icon {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.name-item {
  cursor: pointer;
  color: #58616a;
}

.fm-list-loading-wr {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropdown-item-text {
  padding-left: 20px;
}
.category-dropdown-item {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.category-dropdown-item:hover {
  background-color: #b1b7bd;
}

.table-category-dropdown {
  box-sizing: border-box;
  background-color: white;
  position: absolute;
  top: 51px;
  flex-direction: column;
  overflow: auto;
  max-height: 300px;
  width: 272px;
  border-left: 1px solid #1e8686;
  border-right: 1px solid #1e8686;
  border-bottom: 1px solid #1e8686;
}

.header-item-icon {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.category-item-header {
  position: relative;
}

.category-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.checkbox-item {
  cursor: pointer;
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
.fm-list-item-header{
  color: #686868;
  cursor: pointer;
  border: 1px solid #ced4da;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fm-list-item-header:hover {
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

.fm-list-item {
  word-break: break-word;
  box-sizing: border-box;
  padding: 15px;
}

.fm-list-table-row {
  display: flex;
  justify-content: flex-start;
}

.fm-list-table {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  width: inherit;
  overflow: auto;
}

.fm-list-table-container {
  min-height: 400px;
  font-family: Helvetica;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-bottom: 40px;
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
  color: #58616a;
  font-weight: bold;
  font-size: 1.3em;
  margin-bottom: 30px;
}

.fm-list-wr {
  display: flex;
  flex-direction: column;
}
.em-table-pagination-wr {
  display: flex;
  justify-content: center;
}
.em-table-pagecount-container {
  display: flex;
  margin-bottom: 30px;
  align-items: center;
}

</style>