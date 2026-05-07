<template>
	<div
					class="qst-question-detail-modal-mode"
	>
    <div class="qst-question-detail-modal-back">
      <div class="qst-detail-modalmode-header">
        <div class="qst-modalmode-header-info">
          <div
            class="modalmode-header-info-text"
            :class="{'modalmode-header-info-text-center': ['newquestion', 'fastquestion'].includes(props.target)}"
          >
            <template v-if="props.target === 'editquestion'">
              <template v-if="isFeedback">
                Обратная связь ( № {{ activeQuestion.$state.order_id.toString() }} )
              </template>
              <template v-else>
                Вопрос № {{ activeQuestion.$state.order_id.toString() }}
              </template>
            </template>

            <template v-if="['newquestion', 'fastquestion'].includes(props.target)">
              Задать вопрос
            </template>

          </div>
          <div v-if="props.target === 'editquestion' && !isFeedback" class="modalmode-header-info-status">
            <status-badge :statusid="activeQuestion.$state.status_id"
                          :badge-height="15"
            />
          </div>
        </div>
        <div @click="closePanel()" class="qst-modalmode-header-icon">
          <app-icon
            name="close"
            :size="15"
          />
        </div>
      </div>
      <div class="qst-detail-modalmode-body">
        <template v-if="props.target === 'editquestion'">
          <question-detail />
        </template>
        <template v-if="['newquestion', 'fastquestion'].includes(props.target)">
          <new-question
            :saving="props.saving"
            @savenewquestion="emits('savenewquestion')"
          />
        </template>
      </div>
    </div>
	</div>
</template>

<script setup>
import NewQuestion from "@/questions/components/NewQuestion/NewQuestion.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import {useAppStore} from "@/questions/store/app";
import QuestionDetail from "@/questions/components/QuestionDetail/QuestionDetail.vue";
import StatusBadge from "@/questions/components/StatusBadge/StatusBadge.vue";
import {computed, ref} from "vue";

// EMITS
const emits = defineEmits(['closedetailmodal', 'savenewquestion']);


// PROPS
const props = defineProps({
  target:
    {
      type: String,
      default: '',
      required: true
    },
  saving:
    {
      type: Boolean,
      default: false
    }
});

// STORE
const activeQuestion = useActiveQuestionStore();
const appStore = useAppStore()

// DATA
const headerStyle = ref('');

// METHODS
const closePanel = ()=>{
  emits('closedetailmodal');
}

// COMPUTED
const isFeedback = computed(()=>{
  let feedBack = false;
  if(activeQuestion.$state.feedback_id !== null && activeQuestion.$state.feedback_id !==0 && activeQuestion.$state.feedback_id.toString() !=='0'){
    feedBack = true;
  }
  return feedBack;
});

</script>

<style scoped>
.qst-question-detail-modal-back {
  background-color: white;
}

.modalmode-header-info-text-center {
  width: 100%;
  text-align: center;
}

.modalmode-header-info-status {
		display: flex;
		align-items: center;
}

.modalmode-header-info-text {
		margin-right: 20px;
		font-size: 19px;
		font-weight: 600;
}

.qst-modalmode-header-info {
		justify-content: flex-start;
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		width: 90%;
}
.qst-modalmode-header-icon {
		cursor: pointer;
		width: 10%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
}

.qst-detail-modalmode-header {
		border-bottom: 1px #00000033 solid;
		margin-bottom: 20px;
		min-height: 45px;
		display: flex;
		padding: 16px;
}

.qst-detail-modalmode-body {
    padding: 16px;
    min-height: 150px;
}
.qst-question-detail-modal-mode {
		display: block;
		position: fixed;
    top: 0;
		left:0;
		background-color: #3333334D;
		opacity: 1;
		z-index: 1100;
		width: 100%;
		height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.qst-question-detail-modal-mode::-webkit-scrollbar{
    display: none;
}

@media (min-width: 992px) {
  .qst-detail-modalmode-header {
    padding: 10px;
  }
  .qst-detail-modalmode-body {
    padding: 10px;
  }

}

</style>