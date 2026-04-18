<template>
	<div ref="qstDetailPanel"
			 class="qst-detail-panel"
			 :style="heightStyle"
			 :class="{'qst-detail-scroll-style': scrollStyle}"
			 :id="'qst-detail-panel-'+activeQuestion.$state.order_id.toString()"
	>
			<div class="qst-detail-panel-header">
					<div @click="closePanel()" class="qst-panel-header-icon-wr">
              <app-icon
                  name="chevron-left"
                  :size="24"
              />
					</div>

					<div class="qst-panel-header-text-wr">
            <template v-if="isFeedback">
              Обратная связь ( № {{ activeQuestion.$state.order_id.toString() }} )
            </template>

            <template v-else>
              Вопрос № {{ activeQuestion.$state.order_id.toString() }}
            </template>
					</div>
			</div>

			<div class="qst-detail-panel-body">
					<question-detail />
			</div>
	</div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import QuestionDetail from "@/questions/components/QuestionDetail/QuestionDetail.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useActiveQuestionStore} from "@/questions/store/activequestion";

// STORE

const activeQuestion = useActiveQuestionStore();

// DATA
const qstDetailPanel = ref(null);
const scrollStyle = ref(false);
const heightStyle = ref('');

// METHODS
const closePanel = ()=>{
    activeQuestion.$reset();
}

const scrollToQuestionPanel = () =>{
    // console.log("scrollIntoView");
    qstDetailPanel.value.scrollIntoView({ behavior: "smooth" });
}

// COMPUTED
const isFeedback = computed(()=>{
  let feedBack = false;
  if(activeQuestion.$state.feedback_id !== null && activeQuestion.$state.feedback_id !==0 && activeQuestion.$state.feedback_id.toString() !=='0'){
    feedBack = true;
  }
  return feedBack;
});


// LIFECYCLE
onMounted(()=>{
    let orderDetailHeigth = qstDetailPanel.value.offsetHeight;
    let listContainer = document.getElementById('qst-questions-list-container')
    let questionListHeigth = listContainer.offsetHeight;
    if(orderDetailHeigth > questionListHeigth){
        scrollStyle.value = true;
        heightStyle.value = 'heigth: '+questionListHeigth.toString()+'px;';
		}
});

onMounted(()=>{
    scrollToQuestionPanel();
});

watch(
    () => activeQuestion.order_id,
    (newid) => {
        if(Number(newid) !==0){
            scrollToQuestionPanel();
				}
    }
    );
</script>

<style scoped>
@import "@/questions/components/QuestionDetailPanel/css/questiondetpanel.css";
</style>