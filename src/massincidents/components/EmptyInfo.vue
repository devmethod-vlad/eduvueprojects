<template>
  <div class="edu-incident-empty-info-wr">
    <div class="edu-incident-empty-info-text">
      <p>По вашему запросу ничего не найдено:<br>
      Что можно сделать:</p>
      <ul>
        <li>Проверить, что слова написаны без ошибок</li>
        <li>Использовать другие слова для поиска</li>
        <li>Или <span class="edu-incident-empty-info-link" @click.stop.prevent="emits('resetfilters')">сбросить фильтры таблицы</span> </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

// EMITS
const emits = defineEmits(['resetfilters'])

</script>

<style scoped>
.edu-incident-empty-info-link {
  cursor: pointer;
  text-decoration: underline;
  color: #1D8585;
}

.edu-incident-empty-info-text {
  width: 50%;
  padding-top: 30px;
  font-size: 16px;
  font-weight: 400;
}

.edu-incident-empty-info-wr {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
</style>