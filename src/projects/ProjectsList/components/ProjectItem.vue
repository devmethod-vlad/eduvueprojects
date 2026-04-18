<template>
  <div class="vue-project-item-container">
    <div class="vue-project-item-wr" :class="{'project-item-remove-borderradius':removeBorderRadius}">

      <template v-if="[app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)">

        <div v-if="Number(projectParams.active) === 1"
             @click="changeActivityVisible=true"
             class="project-item-activity-wr"
             :id="'project-item-activity-'+props.projectInfo.id.toString()"
        >

          <span v-tippy="{content: 'Доступен пользователям', placement : 'top-start'}">
            <app-icon name="lock-open-alt"
                      :size="32"
                      color="#1e8686"
            />
          </span>

        </div>

        <div v-else
             @click.stop.prevent="changeActivityVisible=true"
             class="project-item-activity-wr"
             :id="'project-item-activity-'+props.projectInfo.id.toString()"
        >
          <span v-tippy="{content: 'Недоступен пользователям', placement : 'top-start'}"><app-icon name="lock-alt"
                      :size="32"
                      color="#9e243b"
            />

          </span>
        </div>

      </template>

      <div @click="onClickDetails()" class="project-item-title-wr"
      :style="[app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name) ? 'width: 59%;': 'width: 67%;'"
      >

          <div class="project-item-title-infoicons">

              <div v-tippy="{ content: 'В проекте есть Тестирование/Опрос/Анкета' }" v-if="surveyIconVisible"
                   class="project-infoicons-item"
              >
                <app-icon name="apps"
                          :size="20"
                          color="#1e8686"
                />
              </div>
              <div v-tippy="{ content: 'Набор на проект' }" v-if="enrolActionIconVisible && [app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)"
                   class="project-infoicons-item">
                <app-icon name="users-alt"
                          :size="20"
                          color="#1e8686"
                />
              </div>
              <div v-tippy="{ content: 'В проекте нет активностей' }" v-if="noActionsIconVisible"
                   class="project-infoicons-item"
              >
                <app-icon name="info-circle"
                          :size="20"
                          color="#5ea4cd"
                />
              </div>

          </div>

        <div v-tippy="{ content: 'Название проекта', placement : 'top-start' }" class="project-item-title">
          {{ projectParams.name }}
        </div>

      </div>

      <div class="project-item-date-wr">
        <span v-tippy="{ content: 'Дата создания', placement : 'top-start'}">
          {{ projectParams.created_at_format }}
        </span>
      </div>

      <div class="project-item-actions-wr">
        <template v-if="[app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)">
          <div v-tippy="{ content: 'Удалить' }" @click.stop.prevent="delModalVisible = true;"
               class="item-actions-delete"
               :id="'item-actions-delete'+props.projectInfo.id.toString()"
          >
            <app-icon name="trash-alt"
                      :size="32"
                      color="#1e8686"
            />
          </div>
          <div v-tippy="{ content: 'Изменить параметры' }" @click="openProjectSettings()"
               class="item-actions-settings"
               :id="'item-settings-'+props.projectInfo.id"
          >
            <app-icon name="cog-icon"
                      :size="32"
                      color="#1e8686"
            />

          </div>
        </template>
      </div>


        <template v-if="noActionsIconVisible">
          <div class="project-item-show-wr">
            <div>
              <div v-tippy="{ content: 'Проект ожидает добавления активностей' }">

                <app-icon name="clock-icon"
                          :size="32"
                          color="#1e8686"
                />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div @click="onClickDetails()" class="project-item-show-wr">
              <div v-if="detailsVisible" v-tippy="{ content: 'Cкрыть подробности' }">
                <app-icon name="chevron-up"
                          :size="20"
                          color="#1e8686"
                />

              </div>
              <div v-else v-tippy="{ content: 'Подробнее' }">
                <app-icon name="chevron-down"
                          :size="20"
                          color="#1e8686"
                />
              </div>
          </div>
        </template>

    </div>

      <template v-if="detailsVisible">
        <Transition name="fade">
          <ProjectDetailsRedactor v-if="[app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)"
                                  :project-params="projectParams"
          />
        </Transition>

        <Transition name="fade">
          <ProjectDetailsUser v-if="![app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)"
                              :project-params="projectParams"
          />
        </Transition>
      </template>

  </div>

  <DeleteProject
      v-if="delModalVisible"

      @closedelmodal="delModalVisible = false"
      @delsuccess="emitRefresh()"

      :project-id="projectParams.id"
  />

  <ProjectForm
      v-if="projectFormVisible"

      @closeprojectformmodal="closeProjectSettings()"
      @formrefreshlist="emitRefresh()"

      form-header="Редактирование параметров"
      form-target="redact"
      :project-info="props.projectInfo"
  />

  <ChangeActivity
      v-if="changeActivityVisible"

      @closechangeactivity="changeActivityVisible=false"
      @changesuccess="emitRefresh()"

      :project-id="Number(projectParams.id)"
  />

</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import DeleteProject from "@/projects/ProjectsList/components/DeleteProject";
import ProjectDetailsUser from "@/projects/ProjectsList/components/ProjectDetailsUser.vue";
import ProjectForm from "@/projects/ProjectsList/components/ProjectForm";
import ChangeActivity from "@/projects/ProjectsList/components/ChangeActivity";
import {useListStore} from "@/projects/ProjectsList/store/list";
import {useUserStore} from "@/projects/global/store/user";
import ProjectDetailsRedactor from "@/projects/ProjectsList/components/ProjectDetailsRedactor.vue";
import {computed, onMounted, ref} from "vue";
import {app_config} from "@/projects/config/setconfig";

// EMITS
const emits = defineEmits(['refreshlist']);

// PROPS
const props = defineProps({
  projectInfo: {
    type: Object,
    default(){
      return {};
    }
  }
});

// STORE
const userStore = useUserStore();
const listStore = useListStore();


// DATA
const detailsVisible = ref(false);
const removeBorderRadius = ref(false);
const delModalVisible = ref(false);
const projectFormVisible = ref(false);
const changeActivityVisible = ref(false);

// METHODS
const emitRefresh = ()=>{
  emits('refreshlist');
};

const onClickDetails = ()=>{
  if (!noActionsIconVisible.value){

    if (detailsVisible.value){
      detailsVisible.value = false;
      emitRefresh();
    }
    else {
      detailsVisible.value = true;
    }
    removeBorderRadius.value = !removeBorderRadius.value;

  }
};

const openProjectSettings = ()=>{
  detailsVisible.value = false;
  projectFormVisible.value = true;
  let copyListStore = {...listStore.$state};
  copyListStore.projIdActiveModal = Number(projectParams.value.id);
  listStore.$patch(copyListStore);
};

const closeProjectSettings = ()=>{
  projectFormVisible.value = false;
  let copyListStore = {...listStore.$state};
  copyListStore.projIdActiveModal = 0;
  listStore.$patch(copyListStore);
};

// COMPUTED
const projectParams = computed(
    ()=>{
      return {
        id : props.projectInfo.id,
        name : props.projectInfo.name,
        description : props.projectInfo.description,
        active : props.projectInfo.active,
        totalmembers: props.projectInfo.totalmembers,
        created_at : props.projectInfo.created_at,
        created_at_format : props.projectInfo.created_at_format,
        project_actions : props.projectInfo.project_actions,
        project_enrols : props.projectInfo.project_enrols,
        cross_project_actions: props.projectInfo.cross_project_actions,
        is_resp_user: props.projectInfo.is_resp_user,
        is_enrol_active: props.projectInfo.is_enrol_active

      }
    }
);

const typpyDescription = computed(()=>{
  if(props.projectInfo.description !== ''){
    return props.projectInfo.description;
  }
  else {
    return 'Название проекта';
  }
});

const surveyIconVisible = computed(()=>{
  let flag = false;
  for(let item of props.projectInfo.project_actions){
    if (item.action_name === app_config.actionSurveyName){
      flag = true;
    }
  }
  return flag;
});

const enrolActionIconVisible = computed(()=>{
  let flag = false;
  for(let item of props.projectInfo.project_actions){
    if (item.action_name === app_config.actionEnrolName){
      flag = true;
    }
  }
  return flag;
});

const noActionsIconVisible = computed(()=>{
  if([app_config.adminRoleName, app_config.redactorRoleName].includes(userStore.$state.userrole.name)){
    return props.projectInfo.project_actions.length === 0;
  }
  else {
    let flag = true;
    for (let item of props.projectInfo.project_actions){
      if(item.action_name === app_config.actionSurveyName){
        flag  = false
      }
    }
    return flag;
  }
});

// LIFECYCLE
onMounted(()=>{
  if (listStore.$state.projIdActiveModal === projectParams.value.id){
    projectFormVisible.value = true;
  }
})

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.project-item-remove-borderradius {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.vue-project-item-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: 0.3s;
  margin-bottom: 20px;
  -webkit-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
}
.vue-project-item-container:hover {
  transform: translate(0, -3px);
}

.project-infoicons-item {
  cursor: pointer;
  padding-right: 10px;
}
.item-actions-delete {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-actions-settings {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vue-project-item-wr {
  min-height: 120px;
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
}


.project-item-title-infoicons {
  height: 10%;
  min-height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.project-item-title {
  cursor: pointer;
  height: 90%;
  font-weight: bold;
  font-size: 1.2em;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.project-item-title-wr {
  padding-top: 15px;
  padding-left: 30px;
  padding-right: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.project-item-date-wr {
  cursor: pointer;
  font-weight: bold;
  font-size: 1.0em;
  color: #000000;
  width: 15%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.project-item-activity-wr {
  cursor: pointer;
  border-right: 1px solid rgba(0,0,0,.125);
  width: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.project-item-show-wr {
  cursor: pointer;
  border-left: 1px solid rgba(0,0,0,.125);
  width: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.project-item-actions-wr {
  cursor: pointer;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>