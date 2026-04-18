<template>
  <div ref="questionList" class="qst-questions-list"
       id="qst-questions-list"
  >

    <template v-for="question in props.renderList" :key="question.order_id">
      <question-card
          :question="question"
      />
    </template>

  </div>
</template>

<script setup>
import QuestionCard from "@/questions/components/QuestionCard/QuestionCard.vue";
import {ref, watch} from "vue";
import {useAppStore} from "@/questions/store/app";
import {useQuestionsStore} from "@/questions/store/questions";
import {resizeMaket} from "@/questions/components/QuestionsList/services/resizemeasures";

// PROPS
const props = defineProps({
  renderList:
      {
        type: Array,
        default() {
          return [];
        }
      }
});

// STORE
const appStore = useAppStore();
const questions = useQuestionsStore();

// DATA
const questionList = ref(null);


// WATCH
watch(
    ()=> appStore.windowWidth,
    () => {
      if(questionList.value){
        appStore.questionListElem = questionList.value;
      }
      resizeMaket(appStore);
    },
    {immediate: true}
);

watch(
    questionList,
    () => {
      if(questionList.value){
        appStore.questionListElem = questionList.value;
        resizeMaket(appStore);
      }
    },
    {immediate: true}
);

</script>

<style scoped>

</style>