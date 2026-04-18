<template>
	<template v-for="status in questions.$state.availableStatuses" :key="status.id">
		<template v-if="status.id !== app_config.QUESTION_STATUS.feedback.id">
      <div class="qst-list-status-panel-item">
        <status-badge
            :statusid="status.id"
            :forstatuspanel="true"
        />
      </div>
    </template>
	</template>

  <template v-for="status in questions.$state.availableStatuses" :key="status.id">
    <template v-if="status.id === app_config.QUESTION_STATUS.feedback.id">
      <div class="qst-list-status-panel-item">
        <status-badge
            :statusid="status.id"
            :forstatuspanel="true"
        />
      </div>
    </template>
  </template>
</template>

<script setup>
import {app_config} from "@/questions/config/setconfig";
import StatusBadge from "@/questions/components/StatusBadge/StatusBadge.vue";
import {useQuestionsStore} from "@/questions/store/questions";

// STORE

const questions = useQuestionsStore();

</script>

<style scoped>
.qst-list-status-panel-item {
		margin-right: 20px;
		margin-bottom: 10px;
}

</style>