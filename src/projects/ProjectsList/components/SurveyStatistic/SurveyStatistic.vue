<template>
  <div class="survey-statistic-container">
    <div v-if="isloading" class="survey-stats-loading">
      <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка..." />
    </div>

    <template v-else>
      <div v-if="surveyStatsInfoText !== ''" class="survey-stats-info"
           :class="{'stats-warn-style': statsInfoWarnStyle}"
      >
        {{ surveyStatsInfoText }}
      </div>
      <template v-else>
        <div class="survey-stats-workspace">
          <div class="survey-stats-title">
            Статистика
          </div>

          <template v-if="enrolNameList.includes(app_config.enrolTypeAllName)">
            <div class="survey-stats-totalmembers">
              <div class="survey-stats-totalmembers-icon">
                <app-icon name="chart-pie-alt"
                          :size="20"
                          color="#1e8686"
                />
              </div>

              <div class="survey-stats-totalmembers-text">
                Данная активность доступна всем сотрудникам, имеющим логин ЕМИАС
              </div>
            </div>
          </template>

          <template v-else>
            <div class="survey-stats-item">
              <div class="survey-stats-item-icon">
                <app-icon name="chart-pie-alt"
                          :size="20"
                          color="#1e8686"
                />
              </div>

              <div v-if="projectMembers !==0 " class="survey-stats-item-text">
                Всего участников : <span>{{ projectMembers }}</span>
              </div>
              <div v-else class="survey-stats-item-text">
                В проекте пока нет участников
              </div>
            </div>

          </template>

          <div v-if="passStatsChartVisible" class="survey-pass-stats-chart-wr">
            <apexchart type="pie" width="380"
                       :series="passChartSeries.series" :options="passChartOptions"
            >

            </apexchart>
          </div>
          <div v-if="!passStatsChartVisible && membersPass !== 0" class="survey-stats-item">
            <div class="survey-stats-item-icon">
              <app-icon name="chart-pie-alt"
                        :size="20"
                        color="#1e8686"
              />
            </div>
            <div class="survey-stats-item-text">
              Приняли участие: <span>{{ membersPass }}</span>
            </div>
          </div>
        </div>

        <div class="survey-stats-download-wr">
          <div class="survey-stats-title">
            Доступно для скачивания:
          </div>
          <DownloadStats
              :survey-id="surveyId"
              :survey-check-result="checkResultFlag"
          />

        </div>

      </template>
    </template>

  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {getSurveyStatistic} from "@/projects/ProjectsList/components/SurveyStatistic/services/getsurveystatistic";
import DownloadStats from "@/projects/ProjectsList/components/SurveyStatistic/components/DownloadStats.vue";
import {app_config} from "@/projects/config/setconfig";
import {computed, onMounted, ref} from "vue";

// PROPS
const props = defineProps({
  surveyId:{
    type: Number,
    default: 1
  }
});

// DATA
const isloading = ref(false);
const projectMembers = ref(0);
const membersPass = ref(0);
const checkResultFlag = ref(0);
const enrolNameList = ref([]);
const surveyStatsInfoText = ref('');
const statsInfoWarnStyle = ref(false);

// METHODS
const getStatsInfo = async()=>{
  isloading.value = true;
  let answer = await getSurveyStatistic(app_config.apiUrl, props.surveyId);
  await console.log("getStatsInfo answer: ", answer);
  if (answer['status'] === 'ok') {
    isloading.value = false;
    projectMembers.value = Number(answer['info']['project_members']);
    membersPass.value = Number(answer['info']['members_pass']);
    checkResultFlag.value = Number(answer['info']['check_result_flag']);
    enrolNameList.value = answer['info']['enrol_name_list'];
  }
  else {
    isloading.value = false;
    surveyStatsInfoText.value = 'В процессе получения даннных возникла ошибка. Попробуйте повторить позже!';
    statsInfoWarnStyle.value = true;
  }
}

// COMPUTED

const passStatsChartVisible = computed(()=>{
  return projectMembers.value !== 0 && membersPass.value !== 0;
});

const passChartOptions = computed(()=>{
  return {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Не участвовали', 'Приняли участие']
  }
});

const passChartSeries = computed(()=>{
  let memDif = projectMembers.value - membersPass.value;
  return {
    series: [memDif, membersPass.value]
  }
});

// LIFECYCLE
onMounted(async ()=>{
  await getStatsInfo();
})

</script>

<style scoped>
.survey-stats-download-wr {
  margin-top: 40px;
}

.survey-pass-stats-chart-wr {
  display: flex;
  justify-content: center;
}

.survey-stats-item-text {
  padding-left: 15px;
  display: flex;
  align-items: center;
}

.survey-stats-item {
  color: #6c757d;
  margin-top: 30px;
  font-weight: bold;
  font-size: 1.2em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.survey-stats-title {
  font-weight: bold;
  font-size: 1.3em;
}

.survey-stats-workspace {
  display: flex;
  flex-direction: column;
}

.survey-stats-info {
  font-weight: bold;
  font-size: 1.2em;
  color: #1e8686;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stats-warn-style {
  color: #dc3545 !important;
}

.survey-stats-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
}

.survey-statistic-container {
  padding: 15px;
  background-color: #dfebeb9e;
  border-radius: 9px;
}

</style>

<style>
#app-container {
  padding-top: 60px;
  font-family: Helvetica;
  width: 60%;
  margin: auto;
  padding-bottom: 60px;
}
</style>