<template>
  <div class="aisearch-no-results-wr">
    <div class="aisearch-no-results-text">
      <p>1.&nbsp;&nbsp;Сформулируйте свой вопрос по-другому. Четко опишите проблему:</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;Можно ли найти пациента, если номер полиса неизвестен?</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;Как узнать, к какому врачу прикреплен пациент?</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;Каким образом создается программа диспансерного наблюдения?</p>
      <div class="aisearch-no-results-margin-span"></div>
      <p>2.&nbsp;&nbsp;Используйте более официальные аббревиатуры или понятия:</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;Лист нетрудоспособности, ЛН, ЭЛН (вместо “больничный”)</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;КВД, ПНД (вместо “кожвен, псих-диспансер”)</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;Лабораторное исследование, ЛИ (вместо “анализ”)</p>
      <div class="aisearch-no-results-margin-span"></div>
      <p>
        3.&nbsp;&nbsp;Если эти рекомендации не помогают,&nbsp;<a :href="app_config.vioLinkUrl">перешлите вопрос специалисту.</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import {app_config} from "@/aisearch/config/setconfig";

// PROPS
const props = defineProps({

  inlineMode:
      {
        type: Boolean,
        default: true
      }
});

</script>
<style>
.aisearch-no-results-wr p {
  margin: unset !important;
  padding: unset !important;
}

.aisearch-no-results-margin-span {
  margin-bottom: 8px !important;
}

.aisearch-no-results-text p {
  color: #333333 !important;
}

</style>


<style scoped>

.aisearch-no-results-text a {
  text-decoration: none !important;
  color: #1D8585 !important;
  cursor: pointer !important;
}

.aisearch-no-results-text a:hover {
  color: #157171 !important;
}

.aisearch-no-results-wr {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #333333;
}
</style>