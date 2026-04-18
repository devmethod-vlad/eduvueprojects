<template>
  <div class="dispatch-maintable-noresults-info-wr">
    <div class="dispatch-maintable-noresults-info-text">

      <template v-if="dispatches.$state.is_dispatch_exist === 1">
        <p>По вашему запросу ничего не найдено:<br>
          Что можно сделать:</p>
        <ul>
          <li>Проверить, что слова написаны без ошибок</li>
          <li>Использовать другие слова для поиска</li>
          <li>Или <span class="dispatch-maintable-noresults-info-link" @click.stop.prevent="emits('resetfilters')">сбросить фильтры таблицы</span> </li>
        </ul>
      </template>

      <template v-else>
        <p>Еще не было создано ни одной рассылки</p>
      </template>

    </div>
  </div>
</template>

<script setup>
import {useDispatchesStore} from "@/dispatches/store/dispatches";

// STORE
const dispatches = useDispatchesStore();


// EMITS
const emits = defineEmits(['resetfilters'])

</script>

<style scoped>
.dispatch-maintable-noresults-info-link {
  cursor: pointer;
  text-decoration: underline;
  color: #1D8585;
}

.dispatch-maintable-noresults-info-text {
  width: 50%;
  padding-top: 30px;
  font-size: 16px;
  font-weight: 400;
}

.dispatch-maintable-noresults-info-wr {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

</style>