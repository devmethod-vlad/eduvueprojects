<template>
  <div v-if="globalTableInfoText !==''" class="em-globaltable-info-wr"
       :class="{'em-table-warn-style': globaltTableInfoWarnStyle}"
  >
    {{ globalTableInfoText }}
  </div>

  <template v-else>

    <div v-if="infoText !==''" class="em-table-info-container"
         :class="{'em-table-warn-style':enableInfoWarnStyle}"
    >
      {{ infoText }}
    </div>

    <div class="em-molist-navigation-wr">
      <a :href="projectStatUrl">
        <div class="em-molist-navigation-item">
          К статистике проекта
        </div>
      </a>

      <a :href="app_config.projectListUrl">
        <div class="em-molist-navigation-item">
          К списку проектов
        </div>
      </a>
    </div>

    <div v-if="projectName !==''" class="em-molist-projectname">
      {{ projectName }}
    </div>
    <div class="em-table-search-container" :class="{'em-disabled-style': searchDisableStyle}">

      <div class="em-search-wr">

        <div @click="searchProcess()" v-tippy="{ content: 'Искать по слову или фразе', placement : 'top-start' }"
             class="em-search-icon"
        >
          <app-icon name="search"
                    :size="20"
                    color="#1e8686"
          />
        </div>

        <div class="em-search-input-wr">

          <input @keyup.enter="searchProcess()" class="em-search-input"
                 type="text" name="em-search-input"
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
    </div>

    <div class="em-table-pagecount-container" :class="{'em-disabled-style': searchDisableStyle}">

      <div v-if="Number(totalItems) >5" class="em-table-pagecount-select">
        <select :style="{ backgroundImage: 'url(' + selectArrow + ')'}"
                :class="{'select-background-position': !app_config.prod}"
                v-tippy="{ content: 'Кол-во элементов на странице',placement : 'top-start'}"
                class="vue-form-select"
                @change="onPageCountChange()"
                v-model="pageCount"
        >

          <option value="все">
            все
          </option>
          <option value="5">
            5
          </option>
          <option v-if="Number(totalItems) >10" value="10">
            10
          </option>
          <option v-if="Number(totalItems) >15" value="15">
            15
          </option>
          <option v-if="Number(totalItems) >20" value="20">
            20
          </option>

        </select>
      </div>

      <div v-if="Number(totalItems) !==0" class="em-table-config-icon-wr"
           :class="{'em-disabled-style': searchDisableStyle}"
      >
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
    </div>

    <div class="em-table-container">
      <div class="em-table-wr" ref="tablecontainer"
           id="table-container" @scroll="handleScroll"
           :class="pageCount === 'все' ? 'em-table-wr-scroll' : 'em-table-wr-scrollauto'"
      >

        <div class="em-body-item-row" :class="{'em-disabled-style':tableHeaderDisableStyle}">

          <div class="em-table-item em-header-item" style="flex:0 0 160px;">

            <div @click="Number(totalItems) > 3 ? emulateClick('em-filter-part-ident'): null" class="header-item-text">
              Участие в проекте
            </div>
            <div @click="Number(totalItems) > 3 ? filterProcess('projpart') : null" id="em-filter-part-ident"
                 class="header-item-icon"
            >

              <template v-if="filters.projPart === 'notset'">
                <app-icon name="filter"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="filters.projPart === '1'">
                  <app-icon name="filter-slash"
                            :size="20"
                            color="#1e8686"
                  />
                </template>
                <template v-else>
                  <app-icon name="filter"
                            :size="20"
                            color="#1e8686"
                  />
                </template>

              </template>

            </div>
          </div>

          <div v-if="Number(visibilityFilters.showOnlyActiveMo) !== 1 " class="em-table-item em-header-item"
               style="flex: 0 0 200px;"
          >
            <div @click="emulateClick('em-filter-activity-ident')" class="header-item-text">
              Активная МО
            </div>

            <div @click="Number(totalItems) > 3 ? filterProcess('moactivity') : null" id="em-filter-activity-ident"
                 class="header-item-icon"
            >

              <template v-if="filters.moActivity === 'notset'">
                <app-icon name="filter"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="filters.moActivity === '1'">
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

          <div ref="tablecategory" class="em-table-item em-header-item category-header-tem"
               style="flex: 0 0 200px;"
          >
            <div @click.stop.prevent="(Number(totalItems) !== 0 && categoryList.length>0) ? processOpenCategory() : null" class="header-item-text"
                 id="table-cat-text"
            >
              <template v-if="openCategoryList">
                <app-icon name="chevron-up"
                          :size="13"
                          color="#1e8686"
                />
              </template>
              <template v-else>
                <app-icon name="chevron-down"
                          :size="13"
                          color="#1e8686"
                />
              </template>
              &nbsp;&nbsp;Категория
            </div>
            <div @click="(Number(totalItems) > 3 && categoryList.length>0) ? sortingProcess('mocat') : null" class="header-item-icon">
              <template v-if="sorting.moCat === 'notset'">
                <app-icon name="sorting"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="sorting.moCat === 'desc'">
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

            <template v-if="categoryList.length > 0">
              <div style="display: none;" class="table-category-dropdown"
                   id="table-category-dropdown"
              >
                <div v-for="category in categoryList" class="category-dropdown-item"
                     :key="category.id"
                >
                  <div @change="processCategoryClick()" class="dropdown-item-checkbox">
                    <input type="checkbox" :value="category.name"
                           v-model="filtersList.category"
                    />
                  </div>
                  <div @click="emulateCategoryClick(category.name)" class="dropdown-item-text">
                    {{ category.name }}
                  </div>
                </div>

              </div>
            </template>
          </div>

          <div v-if="Number(visibilityFilters.showMoFullname) === 1" class="em-table-item em-header-item"
               style="flex: 0 0 400px;"
          >
            <div @click="Number(totalItems) > 3 ? emulateClick('em-sorting-moname-ident') : null" class="header-item-text">
              Название МО в базе
            </div>
            <div @click="Number(totalItems) > 3 ? sortingProcess('modbname') : null" id="em-sorting-moname-ident"
                 class="header-item-icon"
            >
              <template v-if="sorting.moDbName === 'notset'">
                <app-icon name="sorting"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="sorting.moDbName === 'desc'">
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

          <div class="em-table-item em-header-item" style="flex: 0 0 250px;">
            <div @click="Number(totalItems) > 3 ? emulateClick('em-sorting-shortname-ident') : null" class="header-item-text">
              Краткое название
            </div>
            <div @click="Number(totalItems) > 3 ? sortingProcess('moshortname') : null" id="em-sorting-shortname-ident"
                 class="header-item-icon"
            >
              <template v-if="sorting.moShortName === 'notset'">
                <app-icon name="sorting"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="sorting.moShortName === 'desc'">
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

          <div class="em-table-item em-header-item" style="flex: 0 0 150px;">
            <div @click="Number(totalItems) > 3 ? emulateClick('em-sorting-emiasid-ident') : null" class="header-item-text">
              ID в базе
            </div>
            <div @click="Number(totalItems) > 3 ? sortingProcess('modbid') : null" id="em-sorting-emiasid-ident"
                 class="header-item-icon"
            >
              <template v-if="sorting.moDbId === 'notset'">
                <app-icon name="sorting"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="sorting.moDbId === 'desc'">
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

          <div class="em-table-item em-header-item" style="flex: 0 0 300px;">
            <div class="header-item-text">
              Эл. почта
            </div>
          </div>
        </div>

        <template v-if="tableLoadingActive">
          <div class="em-table-loading-wr" :style="'width: '+tablecontainer.offsetWidth.toString()+'px;'">
            <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка" />
          </div>
        </template>
        <template v-else>
          <div v-if="noResultsVisible" class="em-table-noresults-wr">
            Нет результатов
          </div>
          <template v-else v-for="(mo, moIndex) in moList"
                    :key="mo.moid"
          >
            <div class="em-body-item-row" :class="{'em-disabled-style': tableBodyDisableStyle}">
              <div class="em-table-item table-parts-checkbox-wr em-td-border-right" style="flex:0 0 160px;"
                   :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border-right': Number(moIndex) % 2 === 0}"
              >
                <input v-if="Number(mo.is_part) === 1" checked
                       :id="'parts-checkbox-'+mo.moid.toString()" @change="partsCheckboxClick($event, mo.moid)"
                       type="checkbox"
                />
                <input v-else :id="'parts-checkbox-'+mo.moid.toString()"
                       @change="partsCheckboxClick($event, mo.moid)" type="checkbox"
                />
              </div>

              <div v-if="Number(visibilityFilters.showOnlyActiveMo) !== 1 " class="em-table-item table-activity-checkbox-wr em-td-border"
                   style="flex: 0 0 200px;" :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border': Number(moIndex) % 2 === 0}"
              >
                <input v-if="Number(mo.is_active) === 1" checked
                       :id="'activity-checkbox-'+mo.moid.toString()" type="checkbox"
                       @change="activityCheckboxClick($event, mo.moid)"
                />
                <input v-else :id="'activity-checkbox-'+mo.moid.toString()"
                       type="checkbox" @change="activityCheckboxClick($event, mo.moid)"
                />
              </div>

              <div class="em-table-item table-category-wr em-td-border" style="flex: 0 0 200px; text-align: center;"
                   :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border': Number(moIndex) % 2 === 0}"
              >
                <input :id="'mocategory-input-ident-'+mo.moid.toString()" @focusout="saveCategory($event, mo.moid, 'mocategory-input-ident-'+mo.moid.toString())"
                       type="text" :data-categoryid="mo.category.id"
                       class="vue-form-control" v-model="mo.category.name"
                />
              </div>

              <div v-if="Number(visibilityFilters.showMoFullname) === 1" class="em-table-item table-name-wr em-td-border"
                   style="flex: 0 0 400px;" :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border': Number(moIndex) % 2 === 0}"
              >
                {{ mo.name }}
              </div>

              <div class="em-table-item table-shortname-wr em-td-border" style="flex: 0 0 250px;"
                   :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border': Number(moIndex) % 2 === 0}"
              >
                <textarea :id="'moshortname-input-ident-'+mo.moid.toString()" @focusout="saveShortName($event, mo.moid, 'moshortname-input-ident-'+mo.moid.toString())"
                          rows="2" v-model="mo.shortname"
                          class="vue-form-control"
                >

                </textarea>
              </div>

              <div class="em-table-item table-emiasid-wr em-td-border" style="flex: 0 0 150px; text-align: center;"
                   :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border': Number(moIndex) % 2 === 0}"
              >
                {{ mo.emiasid }}
              </div>

              <div class="em-table-item table-email-wr em-td-border-left" style="flex: 0 0 300px;"
                   :class="{'em-even-color': Number(moIndex) % 2 === 0, 'em-even-td-border-left': Number(moIndex) % 2 === 0}"
              >
                <textarea :id="'momail-input-ident-'+mo.moid.toString()" @focusout="saveMail($event, mo.moid, 'momail-input-ident-'+mo.moid.toString())"
                          rows="1" class="vue-form-control"
                          v-model="mo.mail"
                >

                </textarea>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>

    <div class="em-table-pagination-wr" v-if="servicePageCount !==0 && totalItems > servicePageCount && !tableLoadingActive">
      <vue-awesome-paginate
          :total-items="totalItems"
          :items-per-page="servicePageCount"
          v-model="activePage"
          :on-click="getMoList"
      />
    </div>

  </template>

</template>

<script setup>
import {getMoListInfo} from "@/projects/MoTable/services/getmolist";
import {processMoPart} from "@/projects/MoTable/services/processmopart";
import {processMoActivity} from "@/projects/MoTable/services/processmoactivity";
import {saveMoShortName} from "@/projects/MoTable/services/saveshortname";
import {saveMoMail} from "@/projects/MoTable/services/savemomail";
import {saveMoCategory} from "@/projects/MoTable/services/savemocategory";
import {useUserStore} from "@/projects/global/store/user";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {app_config} from "@/projects/config/setconfig";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";

// PROPS
const props = defineProps({
  projectIdProps: {
    type: Number,
    default: 0
  },

  getParamActive: {
    type: Boolean,
    default: false
  }
});


// STORE
const userStore = useUserStore();


// DATA
const projectId = ref(0);

const projectName = ref('');

const globalTableInfoText = ref('');

const globaltTableInfoWarnStyle = ref(false);

const noResultsVisible = ref(false);

const openConfig = ref(false);

const enableInfoWarnStyle = ref(false);

const infoText = ref('');

const noPaginOffset = ref(0);

const activePage = ref(1);

const totalItems = ref(0);

const searchInput = ref('');

const pageCount = ref('5');

const moList = ref([]);

const moListFreeze = ref([]);

const categoryList = ref([]);

const openCategoryList = ref(false);

const tableLoadingActive = ref(false);

const searchDisableStyle = ref(false);

const tableHeaderDisableStyle = ref(false);

const tableBodyDisableStyle = ref(false);

const filters = ref({
  projPart: '0',
  moActivity: '0',
});

const visibilityFilters = ref({
  showMoFullname: '1',
  showOnlyActiveMo: '1'
});

const filtersList = ref({
  category: []
});

const sorting = ref({
  moCat:'0',
  moDbName: '0',
  moShortName: '0',
  moDbId: '0'

});

const tablecontainer = ref(null);

// METHODS
const checkAccess = ()=>{

  if([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){

    if (props.getParamActive){

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      if (urlParams.get('projectid')) {
        projectId.value = Number(urlParams.get('projectid'));
      }
    }
    else {
      projectId.value = props.projectIdProps;
    }

    if(!app_config.prod) {
      if (projectId.value === 0){
        projectId.value = 19;
      }
    }

    if (projectId.value !== 0){
      getMoList();
    }

    else {
      globalTableInfoText.value = 'Нет информации для отображения!';
    }
  }
  else {
    globalTableInfoText.value = 'Нет информации для отображения!';
  }

};

const changeVisibilityFilters = (event, target)=>{
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
    sorting.value.moDbName = 'notset';
    if(event.target.checked){
      visibilityFilters.value.showMoFullname = '1'
    }
    else {
      visibilityFilters.value.showMoFullname = '0'
    }
  }
  getMoList();
};

const saveCategory = async(event, moid, inputid)=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;
  let matchList = await moListFreeze.value.filter(item => Number(item.moid) === Number(moid));
  if (matchList.length > 0){
    if(event.target.value.trim() !== matchList[0].category.name.trim()){

      let saveAnsw = await saveMoCategory(moid, event.target.value.trim());

      // await console.log("saveMoCategory answer: ", saveAnsw);

      if(saveAnsw['status'] === 'ok'){

        if(saveAnsw['info']){
          if(saveAnsw['info']['category_list']){
            categoryList.value = await saveAnsw['info']['category_list'];
          }
        }

        if(document.getElementById(inputid)){
          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(75 155 55 / 48%)";
        }

      }
      else {
        infoText.value = "При попытке сохранить изменения категории МО произошла ошибка!";
        enableInfoWarnStyle.value = true;

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

const saveShortName = async(event, moid, inputid)=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;
  let matchList = await moListFreeze.value.filter(item => Number(item.moid) === Number(moid));
  if (matchList.length > 0){
    if(event.target.value.trim() !== matchList[0].shortname.trim()){
      let saveAnsw = await saveMoShortName(moid, event.target.value.trim());
      await console.log("saveShortName answer: ", saveAnsw);

      if(saveAnsw['status'] === 'ok'){

        if(document.getElementById(inputid)){
          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(75 155 55 / 48%)";

        }

      }
      else {
        infoText.value = "При попытке изменить краткое название МО произошла ошибка!";
        enableInfoWarnStyle.value = true;

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

const saveMail = async(event, moid, inputid)=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;
  let matchList = await moListFreeze.value.filter(item => Number(item.moid) === Number(moid));
  if (matchList.length > 0){
    if(event.target.value.trim() !== matchList[0].mail.trim()){
      let saveAnsw = await saveMoMail(moid, event.target.value.trim());
      await console.log("saveMoMail answer: ", saveAnsw);
      if(saveAnsw['status'] === 'ok'){

        if(document.getElementById(inputid)){
          document.getElementById(inputid).style.boxShadow = "0 0 0 0.25rem rgb(75 155 55 / 48%)";

        }

      }
      else {
        infoText.value = "При попытке изменить почту МО произошла ошибка!";
        enableInfoWarnStyle.value = true;

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

const emulateClick = (target)=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;
  document.getElementById(target).click();
};

const partsCheckboxClick = async(event, moid)=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;

  let partFlag;
  if (event.target.checked){
    partFlag = 1;
  }
  else {
    partFlag = 0;
  }
  let answer = await processMoPart(projectId.value, moid, partFlag);

  console.log("processMoPart answer: ", answer);

  if (answer['status'] !=='ok') {
    infoText.value = "При попытке изменить параметр участия МО в проекте произошла ошибка!";
    enableInfoWarnStyle.value = true;
  }
};

const activityCheckboxClick = async(event, moid)=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;

  let activityflag;
  if (event.target.checked){
    activityflag = 1;
  }
  else {
    activityflag = 0;
  }
  let answer = await processMoActivity(moid, activityflag);
  console.log("processMoActivity answer: ", answer);

  if(answer['status'] !== 'ok'){

    infoText.value = "При попытке изменить параметр активности МО произошла ошибка!";
    enableInfoWarnStyle.value = true;
  }

};

const processCategoryClick = ()=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;
  getMoList();
};

const emulateCategoryClick = (name)=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;
  if(!filtersList.value.category.includes(name)){
    filtersList.value.category.push(name);
  }
  else {
    let index = filtersList.value.category.indexOf(name);
    if (index !== -1){
      filtersList.value.category.splice(index, 1);
    }
  }
  getMoList();
}

const searchProcess = async()=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;
  if(searchInput.value !== ''){
    await getMoList();
  }
};

const processOpenCategory= ()=>{
  let catDropdown = document.getElementById('table-category-dropdown');

  if(catDropdown){

    if (catDropdown.style.display === 'none'){
      catDropdown.style.display = 'flex';
      openCategoryList.value = true;
    }
    else {
      catDropdown.style.display = 'none';
      openCategoryList.value = false;
    }

  }
};

const getMoList = async()=>{
  noResultsVisible.value = false;
  searchDisableStyle.value = true;
  tableHeaderDisableStyle.value = true;

  if(pageCount.value !== 'все'){
    tableLoadingActive.value = true;
  }
  else {
    tableBodyDisableStyle.value = true;
  }

  let answer = await getMoListInfo(projectPostParams.value);
  await console.log("getMoList answer: ", answer);

  if(answer['status'] === 'ok'){
    tableHeaderDisableStyle.value = false;
    searchDisableStyle.value = false;
    if (answer['info']['mo_list'].length === 0){
      noResultsVisible.value = true;
      tableHeaderDisableStyle.value = true;
      searchDisableStyle.value = true;
    }

    totalItems.value = await answer['info']['total_count'];
    noPaginOffset.value = await Number(answer['info']['nopagin_offset']);
    categoryList.value = await answer['info']['category_list'];
    projectName.value = await answer['info']['project_name'];

    if (pageCount.value === 'все'){
      // if(this.moList.length === 60){
      //   this.moList = await answer['info']['mo_list'];
      // }
      // else {
      moList.value = await moList.value.concat(answer['info']['mo_list']);
      moListFreeze.value = await moListFreeze.value.concat(answer['info']['mo_list']);
      // }
    }
    else {
      moList.value = await answer['info']['mo_list'];
      moListFreeze.value = await JSON.parse(JSON.stringify(moList.value));
    }
  }
  else {
    globalTableInfoText.value = "При попытке получить список МО возникла ошибка! Попробуйте перегрузить страницу или повторите попытку позже!";
    globaltTableInfoWarnStyle.value = true;
  }
  tableLoadingActive.value = false;
  tableBodyDisableStyle.value = false;

};

const fullReset = ()=>{
  activePage.value = 1;

  pageCount.value = '5';

  filters.value.projPart = 'notset';

  filtersList.value.category = [];

  filters.value.moActivity = 'notset';

  sorting.value.moCat = 'notset';

  sorting.value.moDbName = 'notset';

  sorting.value.moShortName = 'notset';

  sorting.value.moDbId = 'notset';

  getMoList();
};

const resetFiltersAndSorting = (exclude)=>{
  if(exclude !== 'projpart'){
    filters.value.projPart = 'notset';
  }
  if(exclude !== 'moactivity'){
    filters.value.moActivity = 'notset';
  }
  if(!['mocat', 'projpart', 'moactivity'].includes(exclude)){
    sorting.value.moCat = 'notset';
  }
  if(!['modbname', 'projpart', 'moactivity'].includes(exclude)){
    sorting.value.moDbName = 'notset';
  }
  if(!['moshortname', 'projpart', 'moactivity'].includes(exclude)){
    sorting.value.moShortName = 'notset';
  }
  if(!['modbid', 'projpart', 'moactivity'].includes(exclude)){
    sorting.value.moDbId = 'notset';
  }
};

const filterProcess = (target)=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;
  activePage.value = 1;

  resetFiltersAndSorting(target);
  if(target === 'projpart'){
    if(filters.value.projPart === 'notset' || filters.value.projPart === '0'){
      filters.value.projPart = '1';
    }
    else {
      filters.value.projPart = '0';
    }
  }
  else if(target === 'moactivity'){
    if(filters.value.moActivity === 'notset' || filters.value.moActivity === '0'){
      filters.value.moActivity = '1';
    }
    else {
      filters.value.moActivity = '0';
    }
  }
  if(pageCount.value === 'все'){
    moList.value = [];
    moListFreeze.value = [];
  }
  getMoList();
};

const sortingProcess = (target)=>{

  activePage.value = 1;
  infoText.value = "";
  enableInfoWarnStyle.value = false;

  resetFiltersAndSorting(target);
  if(target === 'mocat'){
    if(sorting.value.moCat === 'notset' || sorting.value.moCat === 'desc'){
      sorting.value.moCat = 'asc';
    }
    else {
      sorting.value.moCat = 'desc';
    }
  }
  else if(target === 'modbname'){
    if(sorting.value.moDbName === 'notset' || sorting.value.moDbName === 'desc'){
      sorting.value.moDbName = 'asc';
    }
    else {
      sorting.value.moDbName = 'desc';
    }
  }
  else if(target === 'moshortname'){
    if(sorting.value.moShortName === 'notset' || sorting.value.moShortName === 'desc'){
      sorting.value.moShortName = 'asc';
    }
    else {
      sorting.value.moShortName = 'desc';
    }
  }
  else if(target === 'modbid'){
    if(sorting.value.moDbId === 'notset' || sorting.value.moDbId === 'desc'){
      sorting.value.moDbId = 'asc';
    }
    else {
      sorting.value.moDbId = 'desc';
    }
  }

  if(pageCount.value === 'все'){
    moList.value = [];
    moListFreeze.value = [];
  }

  getMoList();
};

const resetSearch = ()=>{
  infoText.value = "";
  enableInfoWarnStyle.value = false;
  noPaginOffset.value = 0;
  searchInput.value = '';
  activePage.value = 1;
  getMoList();
};

const onPageCountChange = ()=>{
  noPaginOffset.value = 0;
  infoText.value = "";
  enableInfoWarnStyle.value = false;
  if (pageCount.value === 'все'){
    moList.value =[];
  }
  else {
    activePage.value = 1;
  }
  getMoList();
};

const handleScroll = (event)=>{
  if(pageCount.value === 'все'){
    if (Number(totalItems.value) > Number(app_config.noPaginOffset)){
      let elScrollTop = event.currentTarget.scrollTop;
      let elClientHeight = event.currentTarget.clientHeight;
      let elScrollHeight = event.currentTarget.scrollHeight;

      if(elScrollTop + elClientHeight >= elScrollHeight){
        // console.log("endOfElem");
        getMoList();
      }
    }
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

const handleOnClick = ()=>{
  let configDropDown = document.getElementById('em-table-config-dropdown');
  let configIcon = document.getElementById('em-table-config-icon');

  let catDropdown = document.getElementById('table-category-dropdown');
  let catText = document.getElementById('table-cat-text');

  if(configDropDown && configIcon){

    if (!configDropDown.contains(event.target) && !configIcon.contains(event.target)) {
      configDropDown.style.display = 'none';
    }

  }

  if(catDropdown && catText){
    if (!catDropdown.contains(event.target) && !catText.contains(event.target)) {
      catDropdown.style.display = 'none';
      openCategoryList.value = false;
    }
  }
};

// COMPUTED
const resetIconVisibility = computed(()=>{
  let reset = false;

  if (filters.value.projPart !== '0' && filters.value.projPart !== 'notset'){
    reset = true;
  }
  if (filters.value.moActivity !== '0' && filters.value.moActivity !== 'notset'){
    reset = true;
  }

  if (filtersList.value.category.length >0){
    reset = true;
  }

  if (sorting.value.moCat !== '0' && sorting.value.moCat !== 'notset'){
    reset = true;
  }

  if (sorting.value.moDbName !== '0' && sorting.value.moDbName !== 'notset'){
    reset = true;
  }

  if (sorting.value.moShortName !== '0' && sorting.value.moShortName !== 'notset'){
    reset = true;
  }

  if (sorting.value.moDbId !== '0' && sorting.value.moDbId !== 'notset'){
    reset = true;
  }
  return reset;

});

const servicePageCount = computed(()=>{
  if(pageCount.value === 'все'){
    return 0;
  }
  else {
    return Number(pageCount.value);
  }
});

const selectArrow = computed(()=>{
  return app_config.apiUrl+"/static/imgs/arrow.svg"
});

const projectPostParams = computed(
    ()=>{

      return {
        apiurl: app_config.apiUrl,
        projectid: projectId.value,
        filters: filters.value,
        filters_list: filtersList.value,
        visibility_filters: visibilityFilters.value,
        sorting: sorting.value,
        pagecount: pageCount.value,
        searchinput: searchInput.value,
        nopaginoffset: noPaginOffset.value,
        activepage: activePage.value

      }
    }
);

const tableContainerWidth = computed(()=>{
  return tablecontainer.value.offsetWidth.toString();
});

const projectStatUrl = computed(()=>{
  return app_config.mainStatUrl + '?projectid=' + projectId.value.toString();
});

// LIFECYCLE
onMounted(()=>{
  checkAccess();
  if(globalTableInfoText.value === ''){
    window.addEventListener('click', handleOnClick);

    filters.value.projPart = 'notset';
    filters.value.moActivity = 'notset';

    sorting.value.moCat = 'notset';
    sorting.value.moDbId = 'notset';
    sorting.value.moDbName = 'notset';
    sorting.value.moShortName = 'notset';
  }
});

onUnmounted(()=>{
  window.removeEventListener('click', handleOnClick);
});

// WATCH
watch(
    searchInput,
    async (newVal, oldVal) => {
      if(newVal === '' && oldVal !==''){
        await getMoList();
      }
    }
);

</script>

<style scoped>
.select-background-position {
  background-position: right 0.75rem center;
}

.em-molist-navigation-item {
  display: inline-block;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px white solid;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  color: white;
  font-weight: bold;
  background-color: #1e8686;
}

.em-molist-navigation-item:hover {
  background-color: #145b5b;
}

.em-molist-navigation-wr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;
}

.em-molist-projectname {

  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;
  color: #1e8686;
  font-weight: bold;
  font-size: 1.5em;

}

.em-globaltable-info-wr {
  display: flex;
  padding-top: 40px;
  padding-bottom: 40px;
  font-weight: bold;
  font-size: 1.4em;
  justify-content: center;
  align-items: center;
  color: #1e8686;
}

.em-table-pagecount-select {
  padding-right: 30px;
}

.em-table-reseticon-wr {
  cursor: pointer;
  padding-left: 20px;
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
}

.em-table-warn-style {
  color: #dc3545 !important;
}

.em-table-info-container {
  color: #1e8686;
  font-weight: bold;
  font-size: 1.3em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.dropdown-item-text {
  padding-left: 20px;
}

.category-dropdown-item {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-category-dropdown {
  box-sizing: border-box;
  background-color: white;
  padding: 10px;
  position: absolute;
  top: 47px;
  flex-direction: column;
  overflow: auto;
  max-height: 300px;
  width: 202px;
  border-left: 1px solid #1e8686;
  border-right: 1px solid #1e8686;
  border-bottom: 1px solid #1e8686;
}

.category-header-tem {
  position: relative;
}

.em-disabled-style {
  pointer-events: none;
  opacity: 0.4;
}
.em-table-noresults-wr {
  font-weight: bold;
  font-size: 1.5em;
  color: #1e8686;
  height: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.em-table-loading-wr {
  font-weight: bold;
  font-size: 1.4em;
  color: #1e8686;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
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

.em-table-pagination-wr {
  display: flex;
  justify-content: center;
}

.table-email-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-emiasid-wr {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-name-wr {
  display: flex;
  align-items: center;
}

.table-shortname-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-category-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-category-wr input {
  max-width: 150px;
}

.table-activity-checkbox-wr {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-parts-checkbox-wr {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-parts-checkbox-wr input {
  margin: unset!important;
}
.table-shortname-wr textarea {
  margin: unset!important;
}
.table-email-wr textarea {
  margin: unset!important;
}

.header-item-text {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}

.em-even-color {
  background-color: rgba(30, 134, 134, 0.46);
}

.em-table-item {
  word-break: break-word;
  box-sizing: border-box;
  padding: 5px !important;
}

.em-body-item-row {
  display: flex;
  justify-content: flex-start;
}

.em-table-pagecount-container select {
  width: inherit !important;
  margin: unset !important;
}
.em-table-pagecount-container {
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.em-table-search-container {
  margin-bottom: 40px;
}
.em-table-search-container .em-search-wr {
  width: 40% !important;
}

.header-item-icon {
  margin-left: 20px;
  display: flex;
  align-items: center;
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

.em-table-wr {
  display: flex;
  flex-direction: column;
  width: inherit;
}

.em-table-wr-scroll {
  height: 900px;
  overflow: scroll;
}

.em-table-wr-scrollauto {
  overflow: auto;
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