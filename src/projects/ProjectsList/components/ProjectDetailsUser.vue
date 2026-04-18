<template>
  <div class="vue-project-item-details">

    <div class="project-item-details-intro">
      <div v-if="props.projectParams.description !==''" class="item-details-description">
        {{ props.projectParams.description }}
      </div>

    </div>

    <div class="project-item-actionlist-wr">

      <div v-if="Number(props.projectParams.is_resp_user) === 1" class="project-item-action-enrolplugin-title">
        <a :href="app_config.portalEnrolPluginUrl+'?projectid='+props.projectParams.id.toString()">Перейти к плагину набора пользователей в проект</a>
          <span class="enrolplugin-title-span">
          <a :href="app_config.portalEnrolPluginUrl+'?projectid='+props.projectParams.id.toString()">
            <app-icon name="arrow-circle-right"
                      :size="32"
                      color="#1e8686"
            />
          </a>
        </span>

      </div>

      <template v-if="Number(props.projectParams.is_enrol_active) === 1">

        <div class="project-item-action-list-title">
          {{ app_config.actionSurveyName }}
        </div>

        <template v-for="action in props.projectParams.project_actions" :key="action.name">

          <template v-if="action.action_name === app_config.actionSurveyName">

            <div class="project-item-action-item-wr">
              <div class="project-item-action-item">

                <div class="project-item-action-item-text">
                  &#x2022;&nbsp;&nbsp;{{ action.name }}
                </div>

                <div class="project-item-action-item-button">

                  <template v-if="Number(action.is_empty) !== 1">

                    <a :href="app_config.portalSurveyUrl+'?surveyid='+action.id.toString()">
                      <button class="vue-btn vue-btn-normal">Начать</button>
                    </a>

                  </template>

                  <template v-else>

                    <button class="vue-btn vue-btn-disable">
                      Недоступно
                    </button>

                  </template>

                </div>
              </div>
            </div>

          </template>
        </template>

      </template>
    </div>

  </div>
</template>

<script setup>
import {app_config} from "@/projects/config/setconfig";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
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

</script>

<style scoped>
.project-item-action-item-button {
  padding-left: 30px;
}

.project-item-details-intro {
  margin-bottom: 30px;
}

.project-item-action-item-wr {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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
.enrolplugin-title-span {
  margin-left: 20px;
}
.project-item-action-enrolplugin-title a {
  color: #1e8686 !important;
  text-decoration: none !important;
}

.project-item-action-enrolplugin-title {
  display: flex;
  align-items: center;
  font-weight: bold;
  text-align: left;
  font-size: 1.4em;
  color: #1e8686;
  margin-bottom: 80px;
}

.project-item-action-list-title {
  font-weight: bold;
  text-align: left;
  font-size: 1.4em;
  color: #1e8686;
  margin-bottom: 40px;
}

.project-item-actionlist-wr {
  margin-bottom: 30px;
  margin-top: 30px;
}
.item-details-description {
  font-weight: bold;
  color: #868889;
  font-size: 1.1em;
  line-height: 1.5;
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