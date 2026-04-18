<template>
  <div class="vue-project-item-details">

    <div class="project-item-details-intro">

      <div class="item-details-title">
        {{ props.projectParams.name }}
        <span>
          (ID: {{ props.projectParams.id }})
        </span>
      </div>
      <div class="item-divider-wr">
        <div class="item-divider-left"></div>
        <div class="item-divider-rigth"></div>
      </div>
      <div
          v-if="props.projectParams.description !==''"
          class="item-details-description"
      >
        {{ props.projectParams.description }}
      </div>

    </div>

    <div v-if="projectEnrolInfo.enrolAllWithLogin || projectEnrolInfo.enrolByLoginList"
         class="project-details-enrolinfo-wr"
    >

      <div @click="processOpenEnrolInfo()" class="project-enrolinfo-title-wr">
        <div class="project-enrolinfo-icon">
          <app-icon name="user"
                    :size="20"
                    color="#5ea4cd"
          />
        </div>
        <div class="project-enrolinfo-title">
          Запись на проект
        </div>

        <div class="project-enrolinfo-title-icon">
          <span v-if="enrolInfoOpen" v-tippy="{content: 'Скрыть подробности'}">
            <app-icon name="chevron-up"
                      :size="20"
                      color="#5ea4cd"
            />
          </span>
          <span v-else v-tippy="{content: 'Открыть подробности'}">
            <app-icon name="chevron-down"
                      :size="20"
                      color="#5ea4cd"
            />
          </span>
        </div>

      </div>

      <template v-if="enrolInfoOpen">
        <div v-if="projectEnrolInfo.enrolAllWithLogin" class="project-enrolinfo-type-wr">
          <div class="project-enrolinfo-type-title">
            Проект доступен всем пользователям, имеющим логин ЕМИАС
          </div>
        </div>

        <template v-else>
          <div v-if="projectEnrolInfo.enrolByLoginList" class="project-enrolinfo-type-wr">
            <div class="project-enrolinfo-type-title">
              <span style="margin-right: 15px;">
                <app-icon name="okta"
                          :size="20"
                          color="#1e8686"
                />
              </span>
              Проект доступен для пользователей из разрешенного списка логинов
            </div>
            <div v-if="Number(listStore.$state.activeList[Number(projectParams.id)].totalmembers) !== 0" class="project-enrolinfo-type-logincount">
              <span style="margin-right: 15px;">
                <app-icon name="okta"
                          :size="20"
                          color="#1e8686"
                />
              </span>
              Кол-во пользователей в проекте:&nbsp;&nbsp;<span>{{ listStore.$state.activeList[Number(projectParams.id)].totalmembers.toString() }}</span>
            </div>
            <div v-else class="project-enrolinfo-type-logincount">
              <span style="margin-right: 15px;">
                <app-icon name="okta"
                          :size="20"
                          color="#1e8686"
                />
              </span>
              В проект пока не добавлены пользователи
            </div>

            <div class="project-enrolbyfiltermachine-wr">
              <div class="project-enrolbyfiltermachine-title">
                <span style="margin-right: 15px;">
                  <app-icon name="hunting"
                            :size="25"
                            color="#1e8686"
                  />
                </span>
<!--                <a :href="filterMachineUrl">Отфильтровать пользователей на проект</a>-->
                <a href="#">Отфильтровать пользователей на проект (в разработке)</a>
              </div>
            </div>

            <div class="project-enrolbyloginlist-wr">
              <div v-if="enrolByLoginListLoading" class="project-enrolbyloginlist-loading">
                <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка..." />
              </div>

              <div v-else class="project-enrolbyloginlist-button-wr">
                <div class="project-enrolbyloginlist-button-title">
                  <span style="margin-right: 15px;">
                    <app-icon name="file-download-alt"
                              :size="20"
                              color="#1e8686"
                    />
                  </span>
                  Зачисление пользователей из файла с логинами (файл excel со столбцом ЛОГИН)
                </div>

                <div class="project-enrolbyloginlist-switch">

                  <label class="em-switch">
                    <input type="checkbox" v-model="rewriteSwitch">
                    <span class="em-slider round"></span>
                  </label>

                  <div class="project-rewrite-switch-title">
                    <template v-if="rewriteSwitch">
                      Добавить пользователей к уже имеющимся
                    </template>
                    <template v-else>
                      Перезаписать пользователей полностью
                    </template>
                  </div>

                </div>


                <div v-tippy="{content: 'В файле должен присутствовать столбец с названием ЛОГИН'}" class="project-enrolbyloginlist-button">
                  <label class="vue-btn vue-btn-normal" for="enrolbyloginlist-button">Загрузить</label>
                  <input @change="processEnrolFromFile($event)" type="file"
                         style="display: none;" id="enrolbyloginlist-button"
                         name="enrolbyloginlist-button"
                  />
                </div>
              </div>

              <template v-if="enrolByLoginListInfo !== ''">
                <div v-html="enrolByLoginListInfo" class="project-enrolbyloginlist-infotext"
                     :class="{'enrolfromfile-warn': errorFromFileWarnStyle}"
                >
                </div>
              </template>
            </div>
          </div>
        </template>
      </template>

    </div>

    <div v-if="props.projectParams.project_actions.length > 0" class="project-activity-wr">
      <div @click="processOpenActivityList()" class="project-activity-title-wr">
        <div class="project-activity-title-icon">
          <app-icon name="heart-rate"
                    :size="20"
                    color="#5ea4cd"
          />
        </div>
        <div class="project-activity-title">
          Доступные активности
        </div>
        <div class="project-activity-title-icon">
          <span v-if="activityListOpen" v-tippy="{content: 'Скрыть подробности'}">
            <app-icon name="chevron-up"
                      :size="20"
                      color="#5ea4cd"
            />
          </span>
          <span v-else v-tippy="{content: 'Открыть подробности'}">
            <app-icon name="chevron-down"
                      :size="20"
                      color="#5ea4cd"
            />
          </span>
        </div>
      </div>
      <template v-if="activityListOpen">

        <div v-if="surveyActivityVisible" class="project-item-actionlist-wr">
          <div class="project-item-action-list-title">{{ app_config.actionSurveyName }}</div>
          <template v-for="action in props.projectParams.project_actions" :key="action.name">
            <template v-if="action.action_name === app_config.actionSurveyName">
              <div class="project-item-action-item-wr">
                <div class="project-item-action-item">

                  <div class="project-item-action-item-text">
                    <template v-if="Number(action.is_empty) === 1">
                      &#x2022;&nbsp;&nbsp;{{ action.name }}
                    </template>
                    <template v-else>
                      <a :href="app_config.portalSurveyRedactUrl+'?surveyid='+action.id.toString()">
                        &#x2022;&nbsp;&nbsp;{{ action.name }}
                      </a>
                    </template>
                  </div>

                  <div v-tippy="{ content: 'Перейти к редактированию' }" class="project-item-action-icon-wr">
                    <a :href="app_config.portalSurveyRedactUrl+'?surveyid='+action.id.toString()">
                      <app-icon name="sliders-v"
                                :size="32"
                                color="#1e8686"
                      />
                    </a>
                  </div>

                  <div @click="processOpenStats(action.id)" v-tippy="{ content: 'Открыть статистику' }"
                       v-if="Number(action.show_statistic) === 1" class="project-item-action-icon-wr"
                  >
                    <app-icon name="chart-pie"
                              :size="32"
                              color="#1e8686"
                    />

                  </div>
                  <div v-tippy="{ content: 'Статистика недоступна' }" v-else
                       class="project-item-action-icon-wr"
                  >
                    <app-icon name="chart-pie"
                              :size="32"
                              color="#A9A9A9"
                    />
                  </div>

                  <div v-if="Number(action.is_empty) === 1" v-tippy="{ content: 'Требует редактирования', placement : 'top-start'}"
                       class="project-item-action-button-wr"
                  >
                    <button type="button" class="vue-btn vue-btn-disable">
                      Недоступен
                    </button>
                  </div>

                  <div v-else v-tippy="{ content: 'Пройти', placement : 'top-start'}"
                       class="project-item-action-button-wr"
                  >
                    <a :href="app_config.portalSurveyUrl+'?surveyid='+action.id.toString()">
                      <button type="button" class="vue-btn vue-btn-normal">Начать</button>
                    </a>
                  </div>

                </div>
                <div v-if="Number(activeSurveyId) === Number(action.id)" class="item-action-surveystats-wr">
                  <SurveyStatistic
                      :survey-id="Number(action.id)"
                  />
                </div>
              </div>
            </template>
          </template>
        </div>

      </template>

    </div>

  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {useUserStore} from "@/projects/global/store/user";
import {useListStore} from "@/projects/ProjectsList/store/list";
import SurveyStatistic from "@/projects/ProjectsList/components/SurveyStatistic/SurveyStatistic.vue";
import {computed, ref} from "vue";
import {app_config} from "@/projects/config/setconfig";

// PROPS
const props = defineProps({
  projectParams: {

    type: Object,
    default(){
      return {
        id : 0,
        name : '',
        description : '',
        active : 0,
        totalmembers: 0,
        created_at : '',
        created_at_format : '',
        project_actions : [],
        project_enrols : [],
        cross_project_actions: []
      };
    }
  }
});

// STORES
const userStore = useUserStore();
const listStore = useListStore();


// DATA
const rewriteSwitch = ref(true);
const activeSurveyId = ref(0);
const enrolInfoOpen = ref(false);
const activityListOpen = ref(false);
const enrolByLoginListLoading = ref(false);
const enrolByLoginListInfo = ref('');
const errorFromFileWarnStyle = ref(false);

// METHODS
const processOpenStats = (id) => {
  if (Number(activeSurveyId.value) === Number(id)){
    activeSurveyId.value = 0;
  }
  else {
    activeSurveyId.value = Number(id);
  }
};

const processOpenActivityList = () => {
  if (activityListOpen.value){
    activityListOpen.value  = false;
    activeSurveyId.value = 0;
  }
  else {
    activityListOpen.value = true;
    enrolInfoOpen.value = false;
    enrolByLoginListInfo.value = '';
    errorFromFileWarnStyle.value = false;
  }
};

const processOpenEnrolInfo = () =>{
  if (enrolInfoOpen.value) {
    enrolByLoginListInfo.value = '';
    errorFromFileWarnStyle.value = false;
    enrolInfoOpen.value = false;
  }
  else {
    enrolInfoOpen.value = true;
    activityListOpen.value = false;
  }
};

const handleFilesEnrol = (files) => {
  let uploadFlag = true;
  let filename = files[0].name.split('.');
  let ext = filename[filename.length - 1];
  if ((files[0].size/1000000)>5){
    uploadFlag = false;
    enrolByLoginListInfo.value=enrolByLoginListInfo.value+' Вы пытаетесь загрузить файл размером более 5Мб ! ';
    errorFromFileWarnStyle.value = true;
  }
  if (!['xls','xlsx'].includes(ext.trim().toLowerCase())){
    uploadFlag = false;
    enrolByLoginListInfo.value=enrolByLoginListInfo.value+' Формат файла не соответствует формату excel (xls, xlsx) ! ';
    errorFromFileWarnStyle.value = true;
  }
  if (uploadFlag){
    sendEnrolFile(files);
  }
};

const processEnrolFromFile = (e) =>{
  enrolByLoginListInfo.value = '';
  errorFromFileWarnStyle.value = false;
  let files = e.target.files;
  handleFilesEnrol(files);
};

const sendEnrolFile = async(files)=>{

  enrolByLoginListLoading.value = true;

  let formData = await new FormData();

  let rewriteFlag;

  if (rewriteSwitch.value){
    rewriteFlag = 0;
  }
  else {
    rewriteFlag = 1;
  }

  await formData.append("action", 'enrolfromfile');
  await formData.append("projectid", props.projectParams.id);
  await formData.append("rewriteflag", rewriteFlag);

  await formData.append('enrolfile[]', files[0]);

  try {
    let sendResp = await fetch(app_config.apiUrl + app_config.projectEnrolApiUrl, {
      method: "POST",
      body: formData
    })

    let sendAnswer = await sendResp.json();

    if (sendAnswer['status'] === 'ok'){
      enrolByLoginListLoading.value = false;
      let htmlMess = '<p class="enrol-normal-style">Процесс записи на проект из файла прошел успешно</p>';
      let successEnrol = await sendAnswer['info']['successenrol'];
      let copyListStore = {...listStore.$state};

      if(rewriteFlag){
        copyListStore.activeList[Number(props.projectParams.id)].totalmembers = Number(successEnrol);
      }
      else {
        copyListStore.activeList[Number(props.projectParams.id)].totalmembers = copyListStore.activeList[Number(props.projectParams.id)].totalmembers + Number(successEnrol);

      }
      await listStore.$patch(copyListStore);
      let failEnrol = await  sendAnswer['info']['failenrol'];
      let existEnrol = await  sendAnswer['info']['existenrol'];
      htmlMess = htmlMess +'<p class="enrol-normal-style">Успешно записаны на проект: <span class="enrol-count-style">'+successEnrol.toString()+'</span> </p>';
      if (Number(existEnrol) !== 0){
        htmlMess = htmlMess +'<p class="enrol-normal-style">Уже были предварительно записаны на проект: <span class="enrol-count-style">'+existEnrol.toString()+'</span> </p>';
      }
      if (Number(failEnrol) !== 0){
        htmlMess = htmlMess +'<p class="enrol-normal-style">Не были записаны на проект: <span class="enrol-count-style">'+failEnrol.toString()+'</span> </p>';
      }
      enrolByLoginListInfo.value = htmlMess;

    }
    else {
      enrolByLoginListLoading.value = false;
      errorFromFileWarnStyle.value = true;
      if(sendAnswer['error_mess']){
        await console.log(sendAnswer['error_mess']);
      }
      if(sendAnswer['user_mess']){
        enrolByLoginListInfo.value = await sendAnswer['user_mess'];
      }
      else {
        enrolByLoginListInfo.value = 'Внимание! При обработке произошла ошибка. Текст ошибки:  '+sendAnswer['error_mess'];
      }
    }
  }
  catch (e) {
    await console.log(e);
    enrolByLoginListLoading.value = false;
    enrolByLoginListInfo.value = 'В процессе обработки данных возникла ошибка. Попробуйте повторить позже';
    errorFromFileWarnStyle.value = true;
  }

}

// COMPUTED
const surveyActivityVisible = computed(()=>{
  let flag = false;
  for(let item of props.projectParams.project_actions){
    if (item.action_name === app_config.actionSurveyName){
      flag = true;
    }
  }
  return flag;
});

const projectEnrolInfo = computed(()=>{
  let enrolObj = {
    enrolByLoginList: false,
    enrolAllWithLogin: false
  };
  for (let enItem of props.projectParams.project_enrols){
    if (enItem.name.trim() === app_config.enrolTypeLoginName.trim()){
      enrolObj.enrolByLoginList = true;
    }
  }
  return enrolObj;
});

const filterMachineUrl = computed(()=>{
  return app_config.portalFilterMachineUrl + '?projectid='+props.projectParams.id.toString();
})

</script>

<style scoped>
.project-rewrite-switch-title {
  margin-left: 20px;
  font-weight: bold;
  font-size: 1.2em;
  color: #868889;

}

.project-enrolbyloginlist-switch {

  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 35px;

}

.em-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.em-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.em-slider {
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

.em-slider:before {
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

input:checked + .em-slider {
  background-color: #2196F3;
}

input:focus + .em-slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .em-slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.em-slider.round {
  border-radius: 34px;
}

.em-slider.round:before {
  border-radius: 50%;
}

.project-item-details-intro {
  margin-bottom: 30px;
}
.project-enrolbyfiltermachine-wr {
  padding: 25px;
  background-color: #dfebeb9e;
  border-radius: 9px;
  margin-bottom: 30px;
}

.project-enrolbyloginlist-wr {
  padding: 25px;
  background-color: #dfebeb9e;
  border-radius: 9px;
}

.item-action-surveystats-wr {
  margin-top: 40px;
}

.project-item-action-item-wr {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.project-enrolbyloginlist-loading {
  display: flex;
  justify-content: flex-start;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 40px;
}

.project-enrolbyloginlist-infotext {
  padding: 35px;
  font-weight: bold;
  font-size: 1.2em;
}

.enrolfromfile-warn {
  color: #dc3545 !important;
}

.project-activity-title-icon {
  display: flex;
  align-items: center;
}

.project-activity-title {
  display: flex;
  align-items: center;
  font-size: 1.4em;
  font-weight: bold;
  color: #5ea4cd;
  padding-left: 15px;
  padding-right: 15px;
}

.project-activity-title-wr {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.project-enrolbyloginlist-button {
  padding-left: 35px;
  margin-top: 30px;
}
.project-enrolbyfiltermachine-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.project-enrolbyfiltermachine-title a {
  font-weight: bold;
  font-size: 1.3em;
  color: #868889;
  text-decoration: none;
}

.project-enrolbyloginlist-button-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: 1.3em;
  color: #868889;
  margin-bottom: 30px;
}

.project-enrolbyloginlist-button-wr {
  display: flex;
  flex-direction: column;
}

.project-enrolinfo-type-logincount {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: 1.3em;
  color: #868889;
  margin-top: 20px;
  margin-bottom: 20px;
}

.project-enrolinfo-type-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: 1.3em;
  color: #868889;
}

.project-enrolinfo-type-wr {
  border: 1px dashed rgba(0,0,0,.125);
  padding: 15px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  border-radius: 6px;
}

.project-enrolinfo-title-icon {
  font-weight: bold;
  cursor: pointer;
  padding-left: 20px;
}

.project-enrolinfo-title-wr {
  display: flex;
  justify-content: flex-start;
}
.project-enrolinfo-icon {
  display: flex;
  align-items: center;
  padding-right: 15px;
}

.project-enrolinfo-title {
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;
  font-size: 1.4em;
  font-weight: bold;
  color: #5ea4cd;
}

.project-details-enrolinfo-wr {
  margin-top: 40px;
  margin-bottom: 40px;
}

.project-item-action-icon-wr {
  cursor: pointer;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-item-action-button-wr {
  margin-left: 30px;
}

.project-item-action-item-text {
  font-weight: bold;
  font-size: 1.2em;
  color: #000000;
}
.project-item-action-item-text a {
  text-decoration: none !important;
  color: #000000 !important;
  cursor: pointer;
}

.project-item-action-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.project-item-action-list-title {
  font-weight: bold;
  text-align: left;
  font-size: 1.4em;
  color: #1e8686;
  margin-bottom: 40px;
}

.project-item-actionlist-wr {
  padding: 20px;
  margin-bottom: 30px;
  margin-top: 30px;
  border: 1px dashed rgba(0,0,0,.125);
  border-radius: 6px;
}
.item-details-description {
  font-weight: bold;
  color: #868889;
  font-size: 1.1em;
  line-height: 1.5;
}

.item-divider-wr {
  display: flex;
  margin-bottom: 30px;
}

.item-divider-left {
  border-top: 2px solid rgba(0,0,0,.125);
  flex: 1;
}
.item-divider-rigth {
  flex: 1;
}

.item-details-title {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1.5em;
  color: #1e8686;
}

.vue-project-item-details {
  display: flex;
  flex-direction: column;
  z-index: 90;
  background-color: white;
  padding-top: 30px;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 50px;
  border-right: 1px solid rgba(0,0,0,.125);
  border-left: 1px solid rgba(0,0,0,.125);
  border-bottom: 1px solid rgba(0,0,0,.125);
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

</style>
<style>
.enrol-normal-style {
  font-weight: bold !important;
  font-size: 1.2em !important;
  color: #1e8686 !important;
}

.enrol-count-style {
  font-weight: bold !important;
  font-size: 1.2em !important;
  color: #5ea4cd !important;
}
</style>