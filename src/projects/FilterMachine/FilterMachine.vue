<template>

  <div v-if="globalInfoText !=='' " class="filter-machine-global-info-wr"
       :style="{'em-warn-style': globalTextWarnStyle}"
  >

    {{ globalInfoText }}

  </div>

  <div v-else class="filter-machine-container">

    <div class="em-fm-navigation-wr">
      <a :href="projectStatUrl" v-if="Number(projectId) !==0">
        <div class="em-fm-navigation-item">
          К статистике проекта
        </div>
      </a>

      <a :href="app_config.projectListUrl">
        <div class="em-fm-navigation-item">
          К списку проектов
        </div>
      </a>
    </div>

    <div class="fm-item-title">
      Информация о состоянии базы данных
    </div>

    <db-state-info
        @updatedb="updateDb()"
        @updateactive="setUpdateActive()"
        @getinfoerror="setGetInfoError()"
    />

    <template v-if="Number(selectActionId) !== 0">

      <div class="fm-item-title">
        Состояние фильтров между сессиями
      </div>

      <filter-state-info
          @resetstate="resetUserList = true"
      />

    </template>


    <div class="fm-item-title">
      Выберите действие
    </div>

    <div class="fm-selectaction-wr">

      <select class="vue-form-select"
              :style="{ backgroundImage: 'url(' + selectArrow + ')'}"
              v-model="selectActionId"
      >
        <template v-for="item in selectData" :key="item.id">
          <option :value="item.id.toString()">
            {{ item.name }}
          </option>
        </template>
      </select>

    </div>

    <div v-if="Number(selectActionId) !== 0" class="fm-workspace-wr">

      <template v-if="Number(selectActionId) === 1">

        <enrol-members-space
            :project-id-props="projectId"

        />

      </template>

      <user-list
          @openrolelist="roleListVisible = true"
          @openmolist="moListVisible=true"
          @openspeclist="specListVisible=true"
          :project-id-props="projectId"
          :global-reset-state="resetUserList"
      />

      <role-list v-if="roleListVisible"
                 @closerolelist="roleListVisible = false"
                 @resetempdata="resetTempData()"
      />

      <mo-list v-if="moListVisible"
               @closemolist="moListVisible = false"
               @resetempdata="resetTempData()"
      />

      <spec-list v-if="specListVisible"
                 @closespeclist="specListVisible=false"
                 @resetempdata="resetTempData()"
      />

    </div>

  </div>


</template>

<script setup>
import DbStateInfo from "@/projects/FilterMachine/components/DbStateInfo.vue";
import FilterStateInfo from "@/projects/FilterMachine/components/FilterStateInfo.vue";
import EnrolMembersSpace from "@/projects/FilterMachine/components/EnrolMembersSpace.vue";
import UserList from "@/projects/FilterMachine/components/UserList.vue";
import RoleList from "@/projects/FilterMachine/components/RoleList.vue";
import MoList from "@/projects/FilterMachine/components/MoList.vue";
import SpecList from "@/projects/FilterMachine/components/SpecList.vue";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/projects/global/store/user";
import {app_config} from "@/projects/config/setconfig";

// PROPS
const props = defineProps({

  projectIdProps: {
    type: Number,
    default: 0
  },

  getParamActive: {
    type: Boolean,
    default: true
  }

});

// STORE
const userStore = useUserStore();


// DATA
const projectId = ref(0);

const resetUserList = ref(false);

const globalInfoText = ref('');

const globalTextWarnStyle = ref(false);

const roleListVisible = ref(false);

const moListVisible = ref(false);

const specListVisible = ref(false);

const selectActionId = ref('0');

const selectData = ref([
  {id: 0, name: 'Не выбрано'},
  {id: 1, name: 'Набор на проект'},

]);

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

    if (projectId.value === 0){
      globalInfoText.value = 'Нет информации для отображения!';
    }

  }
  else {
    globalInfoText.value = 'Нет информации для отображения!';
  }

};

const setGetInfoError = ()=>{

  globalInfoText.value = 'Внимание! При получении необходимых данных возникла ошибка. Перегрузите страницу или попробуйте повторить позже';
  globalTextWarnStyle.value = true;

};

const setUpdateActive = ()=>{
  globalInfoText.value = 'Внимание! Идет обновление базы данных. Функционал временно недоступен';
};

const updateDb = ()=>{

};

const resetTempData = ()=>{
  if (localStorage.getItem('em-fm-userkey')){
    let localStore = {
      userkey: ''
    }
    localStorage.setItem('em-fm-userkey', JSON.stringify(localStore));
  }
};

// COMPUTED
const projectStatUrl = computed(()=>{
  return app_config.mainStatUrl + '?projectid='+projectId.value.toString();
});

const selectArrow = computed(()=>{
  return app_config.apiUrl+"/static/imgs/arrow.svg"
});

// LIFECYCLE
onMounted(()=>{
  checkAccess();
})

</script>


<style scoped>
.em-fm-navigation-item {

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
.em-fm-navigation-item:hover {
  background-color: #145b5b;
}

.em-fm-navigation-wr {

  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;

}

.filter-machine-global-info-wr {
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 1.5em;
  color: #1e8686;
}

.em-warn-style {
  color: #dc3545 !important;
}

.fm-workspace-wr {
  margin-top: 40px;
  transition: box-shadow .2s;
  border: 1px #ced4da solid;
  padding-top: 30px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
}
.fm-workspace-wr:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2);
}

.fm-item-title {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #1e8686;
  font-size: 1.4em;
  font-weight: bold;
}

.filter-machine-container {
  margin-bottom: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.fm-selectaction-wr select {
  width: 50%;
}

</style>