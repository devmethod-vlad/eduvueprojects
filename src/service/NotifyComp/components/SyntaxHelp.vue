<template>
  <div class="vue-syntaxhelp-wr">
    <p>{{boldString1}}</p>
    <p>{{boldString2}}</p>
    <p>{{italicString1}}</p>
    <p>{{italicString2}}</p>
    <p>{{strikeString1}}</p>
    <p>{{strikeString2}}</p>
    <p>{{strikeString3}}</p>
    <p>{{underlineString}}</p>
    <p>{{linkString}}</p>
  </div>
</template>

<script setup>
import {ref} from "vue";

// DATA
const boldString1 = ref('<b>Выделение текста</b>');
const boldString2  = ref('<strong>Выделение текста</strong>');
const italicString1 = ref('<em>Курсив</em>');
const italicString2 = ref('<i>Курсив</i>');
const strikeString1 = ref('<s>Зачеркнутый текст</s>');
const strikeString2 = ref('<strike>Зачеркнутый текст</strike>');
const strikeString3 = ref('<del>Зачеркнутый текст</del>');
const underlineString = ref('<u>Подчеркнутый текст</u>');
const linkString = ref('<a href="ссылка">Текст ссылки</a>');

</script>

<style scoped>
.vue-syntaxhelp-wr {
  padding: 0.375rem 0.75rem;
  font-weight: bold;
  color: #898d91;
  font-size: 1.2em;
  border: 1px dashed #ced4da;
  border-radius: 0.25rem;
  margin-bottom: 40px;
}
</style>