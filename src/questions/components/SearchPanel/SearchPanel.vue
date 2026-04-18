<template>
    <div class="em-search-title">
        Поиск по вопросам
    </div>
    <div class="em-search-container" :class="{'em-disabled-style': searchDisableStyle, 'qst-disable-style': questionsStore.$state.loading}">
        <div class="em-search-wr">
            <div class="em-search-input-wr">
                <input @keyup.enter="search()" class="em-search-input"
                       type="text" name="em-search-input"
                       v-model="reactQuestionList.searchInput.value"
                       placeholder="Введите ключевое слово или номер вопроса"
                >
                <template v-if="reactQuestionList.searchInput.value !==''">
                    <div @click="resetSearch()" class="em-search-close-icon">
                        <app-icon
                            name="close"
                            :size="12"
                            color="#1e8686"
                        />
                    </div>
                </template>
            </div>

            <div @click="search()" class="em-search-text">
                Найти
            </div>
        </div>
    </div>
</template>

<script setup>
import {useQuestionsStore} from "@/questions/store/questions";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {ref, watch} from "vue";
import {storeToRefs} from "pinia";

// EMITS
const emits = defineEmits(['searchquestion', 'resetsearch']);

// STORE
const questionsStore = useQuestionsStore();
const reactQuestionList = storeToRefs(useQuestionsStore());

// DATA
const searchDisableStyle = ref(false);

// METHODS
const search = ()=>{
  if(reactQuestionList.searchInput.value !==''){
    let copyQuestionStore = {...questionsStore.$state};
    copyQuestionStore.enableSearch = 1;
    copyQuestionStore.sorting='desc';
    copyQuestionStore.activePage = 1;
    copyQuestionStore.countPerPage = 5;
    questionsStore.$patch(copyQuestionStore);
    emits('searchquestion');
  }
}

const resetSearch = ()=>{
    // console.log("resetSearch");
    let copyQuestionStore = {...questionsStore.$state};
    copyQuestionStore.enableSearch = 0;
    copyQuestionStore.sorting='desc';
    copyQuestionStore.activePage = 1;
    copyQuestionStore.countPerPage = 5;
    copyQuestionStore.searchInput = '';
    questionsStore.$patch(copyQuestionStore);
    emits('resetsearch');
}

// WATCH
watch(
  () => questionsStore.searchInput,
  () => {
      if(questionsStore.searchInput === ''){
          resetSearch();
      }
  },
);

</script>

<style scoped>
@import "@/questions/components/SearchPanel/css/searchpanel.css";
</style>