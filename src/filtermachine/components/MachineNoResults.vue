<template>
  <div class="filter-machine-noresults-info-wr">
    <div class="filter-machine-noresults-info-text">
      <p>По вашему запросу ничего не найдено:<br>
        Что можно сделать:</p>
      <ul>
        <li>Сформировать список пользователей</li>
        <li>Проверить, что слова написаны без ошибок</li>
        <li>Использовать другие слова для поиска</li>
        <li>Или <span class="filter-machine-noresults-info-link" @click.stop.prevent="emits('resetFiltersAndSearch')">сбросить фильтры и строку поиска</span> </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// EMITS
const emits = defineEmits(['resetFiltersAndSearch'])

</script>

<style scoped>
.filter-machine-noresults-info-link {
  cursor: pointer;
  text-decoration: underline;
  color: #1D8585;
}

.filter-machine-noresults-info-text {
  width: 50%;
  padding-top: 30px;
  font-size: 16px;
  font-weight: 400;
}

.filter-machine-noresults-info-wr {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

</style>