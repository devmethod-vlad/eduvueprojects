<template>
	<div class="qst-list-wr" :class="{'qst-disable-style': questionsStore.$state.loading}">

    <div
        ref="questionListService"
        class="qst-list-service-wr">
      <template v-if="questionsStore.$state.totalCount > 5">
        <search-panel
            @resetsearch="formQuestionsList(questionsListParams)"
            @searchquestion="formQuestionsList(questionsListParams)"
        />
      </template>

      <div v-if="statusPanelVisible"
           class="qst-list-status-panel"
      >
        <status-panel />
      </div>

      <select-space
          @changespace="changeActiveSpace()"
      />
      <template v-if="questionsStore.$state.renderList.length !== 0">
        <div class="qst-pagecount-and-sort-panel">
          <div
              class="qst-list-pagecount-panel"
          >
            <page-count-panel
                v-if="questionsStore.$state.totalCountByConditions >5"
            />
          </div>

          <div
              v-if="questionsStore.$state.totalCountByConditions >2"
              class="qst-list-sorting-panel"
          >
            <sort-panel />
          </div>

        </div>
      </template>
    </div>


			<template v-if="questionsStore.$state.renderList.length !== 0">

          <question-list-content
              :render-list="questionsStore.$state.renderList"
          />

      </template>

			<template v-else>
          <Transition name="qst-modal">
              <div class="qst-list-no-results">
                  Нет результатов для отображения
              </div>
					</Transition>
			</template>
	</div>
	<div
					v-if="questionsStore.$state.totalCountByConditions > questionsStore.$state.countPerPage"
					class="qst-list-pagination-wr"
          :class="{'qst-disable-style': questionsStore.$state.loading}"
	>
      <vue-awesome-paginate
              :total-items="questionsStore.$state.totalCountByConditions"
              :items-per-page="questionsStore.$state.countPerPage"
              v-model="reactQuestionList.activePage.value"
							:on-click="clickPaginate"
      />

			<div
							class="qst-list-pagination-gotopage-wr"
              :class="{'qst-disable-style': questionsStore.$state.loading}"
			>
					<go-to-page
              @gotopage="formQuestionsList(questionsListParams)"
          />
			</div>
  </div>
</template>

<script setup>
import {processUrlParams} from "@/questions/components/QuestionsList/services/processurlparams";
import SearchPanel from "@/questions/components/SearchPanel/SearchPanel.vue";
import SelectSpace from "@/questions/components/QuestionsList/components/SelectSpace/SelectSpace.vue";
import GoToPage from "@/questions/components/QuestionsList/components/GoToPage/GoToPage.vue";
import SortPanel from "@/questions/components/QuestionsList/components/SortPanel/SortPanel.vue";
import PageCountPanel from "@/questions/components/QuestionsList/components/PageCountPanel/PageCountPanel.vue";
import StatusPanel from "@/questions/components/QuestionsList/components/StatusPanel/StatusPanel.vue";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {app_config} from "@/questions/config/setconfig";
import {useQuestionsStore} from "@/questions/store/questions";
import {useUserStore} from "@/questions/store/user";
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import {useErrorsStore} from "@/questions/store/errors";
import {useSynchroStore} from "@/questions/store/synchronized";
import {useAppStore} from "@/questions/store/app";
import {storeToRefs} from "pinia";
import {formQuestionsList} from "@/questions/services/formquestionslist";
import {compareGlobalState} from "@/questions/services/synchronize/comparestate";
import QuestionListContent from "@/questions/components/QuestionsList/components/QuestionListContent/QuestionListContent.vue";
import {resizeMaket} from "@/questions/components/QuestionsList/services/resizemeasures";

let timer;

// STORE
const questionsStore = useQuestionsStore();
const activeQuestionStore = useActiveQuestionStore();
const errorStore = useErrorsStore();
const userStore = useUserStore();
const synchroStore = useSynchroStore();
const appStore = useAppStore();


const reactQuestionList = storeToRefs(useQuestionsStore());

// DATA
const questionListService = ref(null);

// METHODS

const changeActiveSpace = async ()=>{
    await console.log("changeActiveSpace");
    await formQuestionsList(questionsListParams.value);
}

const clickPaginate = ()=>{
    activeQuestionStore.$reset();
    let copyQuestionsStore = questionsStore.$state;
    copyQuestionsStore.updateFlag = !questionsStore.$state.updateFlag;
    questionsStore.$patch(copyQuestionsStore);
}


// COMPUTED
const questionsListParams = computed(()=>{
    return {
        appStore: appStore,
        listStore: questionsStore,
				userStore: userStore,
        activeQuestionStore: activeQuestionStore,
				errorStore: errorStore,
				synchroStore: synchroStore,
				warnText: 'При формировании списка вопросов возникли проблемы! Обновите страницу или повторите попытку позже'

		}
});

const statusPanelVisible = computed(()=>{
    let flag = false;
    if(questionsStore.$state.availableStatuses.length === 1){

        if (questionsStore.$state.availableStatuses[0].id === app_config.QUESTION_STATUS['trash'].id){
            flag=true;
				}
        if (questionsStore.$state.availableStatuses[0].id === app_config.QUESTION_STATUS['archive'].id){
            flag=true;
        }
		}
    if (questionsStore.$state.availableStatuses.length > 1){
        flag=true;
		}
    return flag;
})


// LIFECYCLE
onMounted(async ()=>{
    await processUrlParams(userStore.$state.userid, questionsStore, appStore);
    await formQuestionsList(questionsListParams.value);
    timer = await setInterval( function() { compareGlobalState(questionsListParams.value); }, app_config.updateCompareStateTimer );
});

onUnmounted(async ()=>{
    if(timer){
        await clearInterval(timer);
		}
});

watch(
    ()=>questionsStore.renderList,
    () => {
      resizeMaket(appStore);
    },
    {
      deep: true,
      immediate: true
    }
);

watch(
    () => questionsStore.updateFlag,
    async () => {
        await activeQuestionStore.$reset();
        await formQuestionsList(questionsListParams.value);
    },
);

watch(
    questionListService,
    () => {
      if(questionListService.value){
        appStore.listServiceElem = questionListService.value;
      }
    },
);

</script>

<style scoped>
@import "@/questions/components/QuestionsList/css/questionslist.css";
@import "@/questions/css/pagination.css";
</style>