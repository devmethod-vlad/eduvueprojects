<template>
<div class="em-searchresp-container">
  <div class="em-searchresp-title">
    + добавить ответственного
  </div>
  <div class="em-searchresp-subtitle-wr">
    <div class="em-searchresp-subtitle-text">
      <template v-if="!searchSwitch">
        Поиск ответственного в целевой МО
      </template>
      <template v-else>
        Поиск ответственного в базе
      </template>
    </div>
    <div class="em-searchresp-subtitle-switch">
      <label class="switch">
        <input type="checkbox" @change="onSwitchChange()"
               v-model="searchSwitch"
        >
        <span class="slider round"></span>
      </label>
    </div>
  </div>
  <div class="em-searchresp-input-wr">
    <div class="em-searchresp-search-button">
      <button @click="validSearch()" class="vue-btn vue-btn-normal">
        Найти
      </button>
    </div>
    <div class="em-searchresp-input">
        <div class="em-searchresp-input-lastname">
          <input @focus="processOnFocus()" @keyup.enter="validSearch()"
                 placeholder="Фамилия" class="vue-form-control"
                 :class="{'vue-input-error': errorLastnameStyle}" type="text"
                 v-model="lastnameInput"
          />
        </div>

        <div style="margin-left: 20px;" class="em-searchresp-input-firstname">
          <input @focus="processOnFocus()" @keyup.enter="validSearch()"
                 placeholder="Имя" class="vue-form-control"
                 :class="{'vue-input-error': errorFirstnameStyle}" type="text"
                 v-model="firstnameInput"
          />
        </div>

        <div style="margin-left: 20px;" class="em-searchresp-input-secondname">
          <input @focus="processOnFocus()" @keyup.enter="validSearch()"
                 placeholder="Отчество" class="vue-form-control"
                 :class="{'vue-input-error': errorSecondnameStyle}" type="text"
                 v-model="secondnameInput"
          />
        </div>

        <div style="margin-left: 20px;" class="em-searchresp-input-mail">
          <input @focus="processOnFocus()" @keyup.enter="validSearch()"
                 placeholder="Почта" class="vue-form-control"
                 :class="{'vue-input-error': errorMailStyle}" type="text"
                 v-model="mailInput"
          />
        </div>

    </div>

  </div>

  <div v-if="infoText !==''" class="em-searchresp-infotext-wr"
       :class="{'em-searchresp-warnstyle': enableWarnStyle}"
  >
    {{ infoText }}
  </div>

  <div v-if="searchResults.length>0" class="em-searchresp-results-container">

    <div class="em-table-container">

      <div class="em-table-title">
        Результаты поиска:
      </div>

      <div class="em-table-wr">
        <div class="em-body-item-row">
          <div ref="headeradd" class="em-table-item em-header-item"
               style="flex: 0 0 250px; text-align: center;"
          >
            Добавить
          </div>

          <div @click="searchResults.length>3 ? sortingProcess('login') : null" ref="headerlogin"
               class="em-table-item em-header-item" style="flex: 0 0 200px; text-align: center;"
          >

            <div class="header-item-text">
              Логин
            </div>

            <div  v-if="searchResults.length>3" id="em-sorting-login-ident"
                  class="header-item-icon"
            >
              <template v-if="sorting.login === 'notset'">
                <app-icon name="sorting"
                          :size="20"
                          color="#808080FF"
                />

              </template>

              <template v-else>
                <template v-if="sorting.login === 'desc'">
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

          <div @click="searchResults.length>3 ? sortingProcess('fio') : null" ref="headerfio"
               class="em-table-item em-header-item" style="flex: 0 0 350px; text-align: center;"
          >

            <div class="header-item-text">
              ФИО
            </div>
            <div v-if="searchResults.length>3" id="em-sorting-fio-ident"
                 class="header-item-icon"
            >
              <template v-if="sorting.fio === 'notset'">
                <app-icon name="sorting"
                          :size="20"
                          color="#808080FF"
                />
              </template>

              <template v-else>
                <template v-if="sorting.fio === 'desc'">
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
          <div ref="headermail" class="em-table-item em-header-item"
               style="flex: 0 0 200px; text-align: center;"
          >
            Почта
          </div>
          <div ref="headersnils" class="em-table-item em-header-item"
               style="flex: 0 0 200px; text-align: center;"
          >
            СНИЛС
          </div>

          <template v-if="searchSwitch">
            <div @click="searchResults.length>3 ? sortingProcess('moshortname'): null" ref="headershortname"
                 class="em-table-item em-header-item" style="flex: 0 0 250px; text-align: center;"
            >

              <div class="header-item-text">
                Короткое название МО
              </div>

              <div v-if="searchResults.length>3" class="header-item-icon">
                <template v-if="sorting.moshortname === 'notset'">
                  <app-icon name="sorting"
                            :size="20"
                            color="#808080FF"
                  />
                </template>

                <template v-else>
                  <template v-if="sorting.moshortname === 'desc'">
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
          </template>

          <template v-else>
            <div ref="headershortname" class="em-table-item em-header-item"
                 style="flex: 0 0 250px; text-align: center;"
            >

              <div class="header-item-text">
                Короткое название МО
              </div>

            </div>
          </template>


          <template v-if="searchSwitch">
            <div @click="searchResults.length>3 ? sortingProcess('moname') : null" ref="headermoname"
                 class="em-table-item em-header-item" style="flex: 0 0 400px; text-align: center;"
            >

              <div class="header-item-text">
                Полное название МО
              </div>
              <div v-if="searchResults.length>3" id="em-sorting-moname-ident"
                   class="header-item-icon"
              >
                <template v-if="sorting.moname === 'notset'">
                  <app-icon name="sorting"
                            :size="20"
                            color="#808080FF"
                  />
                </template>

                <template v-else>
                  <template v-if="sorting.moname === 'desc'">
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
          </template>

          <template v-else>
            <div ref="headermoname" class="em-table-item em-header-item"
                 style="flex: 0 0 400px; text-align: center;"
            >

              <div class="header-item-text">
                Полное название МО
              </div>

            </div>
          </template>
        </div>

          <template v-for="(resp, respIndex) in searchResults" :key="resp.userid">
            <div class="em-body-item-row">

              <div class="em-table-item table-add-wr em-td-border" style="flex: 0 0 250px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >

                <div v-if="Number(activeAddSubmitId) !== resp.userid" @click="clickAddToResp(resp.userid)"
                     class="table-add-icon"
                >
                  <app-icon name="plus-circle"
                            :size="30"
                            color="#1e8686"
                  />
                </div>

                <div v-else class="table-add-icon em-disabled-style">
                  <app-icon name="plus-circle"
                            :size="30"
                            color="#808080FF"
                  />
                </div>

                <div v-if="Number(activeAddSubmitId) === resp.userid" class="table-add-submit-wr">
                  <SubmitPanel
                      :user-id="resp.userid"
                      @reject="activeAddSubmitId = 0"
                      @submit="(userid)=>{onSubmitResp(userid)}"
                  />
                </div>

              </div>

              <div class="em-table-item table-login-wr em-td-border" style="flex: 0 0 200px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >
                {{ resp.login }}
              </div>

              <div class="em-table-item table-fio-wr em-td-border" style="flex: 0 0 350px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >
                {{ resp.user_lastname !=='' ? resp.user_lastname : resp.db_lastname }} {{ resp.user_firstname !=='' ? resp.user_firstname : resp.db_firstname }} {{ resp.user_secondname !=='' ? resp.user_secondname : resp.db_secondname }}
              </div>

              <div class="em-table-item table-mail-wr em-td-border" style="flex: 0 0 200px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >
                {{ resp.mail }}
              </div>

              <div class="em-table-item table-snils-wr em-td-border" style="flex: 0 0 200px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >
                {{ resp.snils }}
              </div>

              <div class="em-table-item table-shortname-wr em-td-border" style="flex: 0 0 250px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >
                {{ resp.moshortname }}
              </div>

              <div class="em-table-item table-moname-wr em-td-border" style="flex: 0 0 400px; text-align: center;"
                   :class="{'em-even-color': Number(respIndex) % 2 === 0, 'em-even-td-border': Number(respIndex) % 2 === 0}"
              >
                {{ resp.moname }}
              </div>

            </div>
          </template>

      </div>
    </div>
  </div>


  <div v-if="searchActive" class="em-body-item-row">
    <div class="em-search-loadig-wr">
      <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка" />
    </div>
  </div>

  <div v-if="searchResults.length === 0 && noResults" class="em-body-item-row">
    <div class="em-resptable-noresults">
      Нет результатов
    </div>
  </div>

</div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {searchRespUser} from "@/projects/MainStatsTable/components/RespTable/services/searchrespuser";
import SubmitPanel from "@/projects/MainStatsTable/components/RespTable/components/SubmitPanel.vue";
import {submitRespUser} from "@/projects/MainStatsTable/components/RespTable/services/submitrespuser";
import {computed, onMounted, ref, watch} from "vue";
import {app_config} from "@/projects/config/setconfig";

// EMITS
const emits = defineEmits(['submitrespuser', 'stoprefresh']);

// PROPS
const props = defineProps({
  moId: {
    type: Number,
    default: 0
  },

  refreshSearchResults: {
    type: Boolean,
    default: false
  }
});

// DATA
const activeAddSubmitId = ref(0);

const addRespDisable = ref(false);

const enableWarnStyle = ref(false);

const infoText = ref('');

const lastnameInput = ref('');

const errorLastnameStyle = ref(false);

const firstnameInput = ref('');

const errorFirstnameStyle = ref(false);

const secondnameInput = ref('');

const errorSecondnameStyle = ref(false);

const errorMailStyle = ref(false);

const mailInput = ref('');

const searchResults = ref([]);

const noResults = ref(false);

const searchSwitch = ref(false);

const searchActive = ref(false);

const sorting = ref({
  login:'0',
  fio: '0',
  moshortname: '0',
  moname: '0'
});

// METHODS
const onSubmitResp = async(userid)=>{
  infoText.value = '';
  enableWarnStyle.value = false;
  noResults.value = false;

  activeAddSubmitId.value = 0;

  let answer = await submitRespUser(app_config.apiUrl, userid, props.moId);

  await console.log("onSubmitResp answer: ", answer);

  if (answer['status'] === 'ok'){
    await searchResp();
    await emits('submitrespuser');
  }
};

const processOnFocus = ()=>{
  errorMailStyle.value = false;
  errorLastnameStyle.value = false;
  errorFirstnameStyle.value = false;
  errorSecondnameStyle.value = false;
};

const onSwitchChange = ()=>{
  infoText.value = '';
  enableWarnStyle.value = false;
  noResults.value = false;

  resetFiltersAndSorting('all');
  searchResults.value = [];
};

const clickAddToResp = (userid)=>{
  if(Number(activeAddSubmitId.value) === 0){
    activeAddSubmitId.value = Number(userid);
  }
  else if(Number(activeAddSubmitId.value) === Number(userid)){
    activeAddSubmitId.value = 0;
  }
  else {
    activeAddSubmitId.value = Number(userid);
  }
};

const resetFiltersAndSorting = (exclude)=>{
  if(!['login'].includes(exclude)){
    sorting.value.login = 'notset';
  }
  if(!['fio'].includes(exclude)){
    sorting.value.fio = 'notset';
  }
  if(!['moshortname'].includes(exclude)){
    sorting.value.moshortname = 'notset';
  }
  if(!['moname'].includes(exclude)){
    sorting.value.moname = 'notset';
  }

};

const sortingProcess = (target)=>{

  infoText.value = '';
  enableWarnStyle.value = false;
  noResults.value = false;

  activeAddSubmitId.value = 0;
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
  else if(target === 'moshortname'){
    if(sorting.value.moshortname === 'notset' || sorting.value.moshortname === 'desc'){
      sorting.value.moshortname = 'asc';
    }
    else {
      sorting.value.moshortname = 'desc';
    }
  }
  else if(target === 'moname'){
    if(sorting.value.moname === 'notset' || sorting.value.moname === 'desc'){
      sorting.value.moname = 'asc';
    }
    else {
      sorting.value.moname = 'desc';
    }
  }
  validSearch();
};

const emulateClick = (target)=>{
  infoText.value = '';
  enableWarnStyle.value = false;
  noResults.value = false;

  activeAddSubmitId.value = 0;
  document.getElementById(target).click();
};

const validSearch = ()=>{

  infoText.value = '';
  enableWarnStyle.value = false;
  noResults.value = false;

  activeAddSubmitId.value = 0;
  errorLastnameStyle.value = false;
  errorFirstnameStyle.value = false;
  errorSecondnameStyle.value = false;
  errorMailStyle.value = false;

  if (lastnameInput.value === '' && firstnameInput.value === '' && secondnameInput.value === '' && mailInput.value === ''){
    errorLastnameStyle.value = true;
    errorFirstnameStyle.value = true;
    errorSecondnameStyle.value = true;
    errorMailStyle.value = true;
  }
  else {
    searchResp();
  }
};

const searchResp = async()=>{

  infoText.value = '';
  enableWarnStyle.value = false;
  noResults.value = false;

  searchActive.value = true;

  let answer = await searchRespUser(searchparams.value);

  await console.log("searchResp answer: ", answer);

  if(answer['status'] === 'ok'){
    searchResults.value = await answer['info']['resp_list'];

    if (searchResults.value.length === 0){
      noResults.value = true;
    }

    if (searchResults.value.length === 20){
      infoText.value = 'Для уточнения результатов производите поиск по нескольким полям. Например, фамилия и почта';
    }

  }
  else {
    infoText.value = 'В процессе поиска произошла ошибка. Попробуйте перегрузить страницу или повторите попытку позже'
  }

  searchActive.value = false;

};

// COMPUTED
const searchparams = computed(()=>{
  return {
    apiurl: app_config.apiUrl,
    moid: props.moId,
    searchscope: searchSwitch.value ? 'db' : 'mo',
    searchrespinputs: {
      lastname: lastnameInput.value,
      firstname: firstnameInput.value,
      secondname: secondnameInput.value,
      mail: mailInput.value
    },
    sorting: sorting.value
  }
});

onMounted(()=>{
  sorting.value.fio = 'notset';
  sorting.value.login = 'notset';
  sorting.value.moname = 'notset';
  sorting.value.moshortname = 'notset';
});

// WATCH
watch(
    ()=>props.refreshSearchResults,
    (flag) => {
      if(flag && searchResults.value.length > 0){
        searchResp();
      }
      emits('stoprefresh');
    }
);

</script>

<style scoped>
.em-searchresp-infotext-wr {
  font-size: 1.2em;
  color: #1e8686;
  justify-content: flex-start;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
}

.em-search-loadig-wr {
  justify-content: flex-start;
  display: flex;
  padding-left: 40px;
  padding-top: 40px;
  padding-bottom: 40px;
}

.em-resptable-noresults {
  font-size: 1.3em;
  font-weight: bold;
  color: #1e8686;
  justify-content: flex-start;
  display: flex;
  padding-top: 40px;
  padding-bottom: 40px;
}

.em-disabled-style {
  pointer-events: none;
  opacity: 0.4;
}

.table-add-icon {
  cursor: pointer;
}

.table-add-submit-wr {
  margin-left: 20px;
}

.header-item-icon {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.header-item-text {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}

.table-shortname-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-snils-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-mail-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-fio-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}


.table-login-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-moname-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-add-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.em-even-color {
  background-color: rgba(30, 134, 134, 0.46);
}

.em-even-td-border {
  border-right: 1px solid white !important;
  border-left: 1px solid white !important;
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

.em-table-title {
  margin-bottom: 30px;
  color: #1e8686;
  font-weight: bold;
  font-size:  1.3em;
}

.em-searchresp-results-container {
  margin-top: 30px;
  margin-bottom: 30px;
}

.em-table-item {
  word-break: break-word;
  box-sizing: border-box;
  padding: 10px;
}

.em-body-item-row {
  display: flex;
  justify-content: flex-start;
}

.em-table-wr {
  display: flex;
  flex-direction: column;
  width: inherit;
  overflow: auto;
}

.em-table-container {
  flex-direction: column;
  font-family: Helvetica;
  font-weight: bold;
  display: flex;
  width: 100%;
  position: relative;
  margin-bottom: 40px;
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

.em-searchresp-warnstyle {
  color: #dc3545 !important;
}

.em-searchresp-subtitle-switch {
  margin-left: 30px;
}

.em-searchresp-subtitle-text {
  flex: 0 0 370px;
  display: flex;
  align-items: center;
}

.em-searchresp-subtitle-wr {
  font-size: 1.2em;
  display: flex;
  margin-bottom: 30px;
  color: #1e8686;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #1e8686;
}

input:focus + .slider {
  box-shadow: 0 0 1px #1e8686;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.em-searchresp-title {
  font-size: 1.3em;
  margin-bottom: 30px;
}

.em-searchresp-container {
  margin-bottom: 40px;
}

.em-searchresp-search-button {
  margin-right: 30px;
}

.em-searchresp-input input {
  margin-right: 30px;
  width: 150px;
}

.em-searchresp-input {
  display: flex;
}

.em-searchresp-input-wr {
  display: flex;
  align-items: center;
}

</style>