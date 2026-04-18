<template>
  <div class="download-stats-container">
    <div v-if="isLoading" class="downloadstats-loading-wr">
      <img :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка..." />
    </div>

    <template v-else>
      <DownloadItem
          stat-type="completestat"
          :survey-id="props.surveyId"
          :item-disabled="activeStatsType !=='' && activeStatsType !=='completestat'"
          :attach-space-prop="processAttachOpen('completestat')"
          @startactive="(statype)=>{activeStatsType = statype}"
          @stopactive="activeStatsType = ''"
          @open="(statype)=>{openStatType = statype}"
          @close="openStatType = ''"
      />
      <template v-if="Number(props.surveyCheckResult) === 1">
        <DownloadItem
            stat-type="simplestat"
            :survey-id="props.surveyId"
            :item-disabled="activeStatsType !=='' && activeStatsType !=='simplestat'"
            :attach-space-prop="processAttachOpen('simplestat')"
            @startactive="(statype)=>{activeStatsType = statype}"
            @stopactive="activeStatsType = ''"
            @open="(statype)=>{openStatType = statype}"
            @close="openStatType = ''"
        />
        <DownloadItem
            stat-type="simplestatattempts"
            :survey-id="props.surveyId"
            :item-disabled="activeStatsType !=='' && activeStatsType !=='simplestatattempts'"
            :attach-space-prop="processAttachOpen('simplestatattempts')"
            @startactive="(statype)=>{activeStatsType = statype}"
            @stopactive="activeStatsType = ''"
            @open="(statype)=>{openStatType = statype}"
            @close="openStatType = ''"
        />
        <DownloadItem
            stat-type="statpercent"
            :survey-id="props.surveyId"
            :item-disabled="activeStatsType !=='' && activeStatsType !=='statpercent'"
            :attach-space-prop="processAttachOpen('statpercent')"
            @startactive="(statype)=>{activeStatsType = statype}"
            @stopactive="activeStatsType = ''"
            @open="(statype)=>{openStatType = statype}"
            @close="openStatType = ''"
        />
        <DownloadItem
            stat-type="statpercentattempt"
            :survey-id="props.surveyId"
            :item-disabled="activeStatsType !=='' && activeStatsType !== 'statpercentattempt'"
            :attach-space-prop="processAttachOpen('statpercentattempt')"
            @startactive="(statype)=>{activeStatsType = statype}"
            @stopactive="activeStatsType = ''"
            @open="(statype)=>{openStatType = statype}"
            @close="openStatType = ''"
        />
        <DownloadItem
            stat-type="groupstat"
            :survey-id="props.surveyId"
            :item-disabled="activeStatsType !=='' && activeStatsType !== 'groupstat'"
            :attach-space-prop="processAttachOpen('groupstat')"
            @startactive="(statype)=>{activeStatsType = statype}"
            @stopactive="activeStatsType = ''"
            @open="(statype)=>{openStatType = statype}"
            @close="openStatType = ''"
        />
        <DownloadItem
            stat-type="questionstat"
            :survey-id="props.surveyId"
            :item-disabled="activeStatsType !=='' && activeStatsType !== 'questionstat'"
            :attach-space-prop="processAttachOpen('questionstat')"
            @startactive="(statype)=>{activeStatsType = statype}"
            @stopactive="activeStatsType = ''"
            @open="(statype)=>{openStatType = statype}"
            @close="openStatType = ''"
        />
      </template>

    </template>
  </div>

</template>

<script setup>
import DownloadItem from "@/projects/ProjectsList/components/SurveyStatistic/components/DownloadItem.vue";
import {app_config} from "@/projects/config/setconfig";
import {ref} from "vue";

// PROPS
const props = defineProps({
  surveyCheckResult: {
    type: Number,
    default: 0
  },

  surveyId: {
    type: Number,
    default: 0
  }
});

// DATA
const isLoading = ref(false);
const activeStatsType = ref('');
const openStatType = ref('');

// METHODS
const processAttachOpen = (target)=>{
  if (openStatType.value === ''){
    return false;
  }
  else {
    return openStatType.value === target;
  }
}
</script>

<style scoped>
.download-stats-container {
  margin-top: 40px;
}
</style>