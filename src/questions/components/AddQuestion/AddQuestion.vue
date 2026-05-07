<template>
	<div
					ref="addquestion"
          class="qst-addquestion-wr"
					:class="{'qst-disable-style': questions.$state.loading}"
	>
			<div class="qst-addquestion-title">
					Сообщения
			</div>

      <div id="qst-addquestion-button" class="qst-addquestion-button">
					<button type="button" @click.stop="openNewQuestion()"
									class="vue-btn vue-btn-normal">
							<span>
									<app-icon
                          name="plus-circle"
                          :size="20"
                          :color="'#FFFFFF'"
                  />
							</span>
              &nbsp;&nbsp;Добавить сообщение
					</button>
      </div>
	</div>
        <Transition name="qst-modal">
				<div v-if="newQuestionVisible && appStore.questionShowMode === 'panel'">
            <modal-content
                    modalsize="middle"
										header-text="Добавить сообщение"
                    @close-modal="closeNewQuestionModal()"
										:body-min-height="200"
            >
                <new-question
												:saving="isSavingNewQuestion"
												@savenewquestion="onSaveNewQuestion()"
								/>

            </modal-content>
				</div>
        </Transition>

    <template v-if="newQuestionVisible && appStore.questionShowMode === 'modal'">
        <question-detail-modal
								target="newquestion"
								:saving="isSavingNewQuestion"
								@closedetailmodal="closeNewQuestionModal()"
								@savenewquestion="onSaveNewQuestion()"
				/>
    </template>

</template>

<script setup>
import {formQuestionsList} from "@/questions/services/formquestionslist";
import NewQuestion from "@/questions/components/NewQuestion/NewQuestion.vue";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {useAppStore} from "@/questions/store/app";
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import {useNewQuestionStore} from "@/questions/store/newquestion";
import {useSubmitMessageStore} from "@/questions/store/submitmessage";
import {useUserStore} from "@/questions/store/user";
import ModalContent from "@/common/ui/ModalContent/ModalContent.vue";
import QuestionDetailModal from "@/questions/components/QuestionDetailModal/QuestionDetailModal.vue";
import {useQuestionsStore} from "@/questions/store/questions";
import {computed, ref, watch} from "vue";
import {saveOrUpdateQuestion} from "@/questions/services/saveorupdatequestion";
import {useErrorsStore} from "@/questions/store/errors";
import {getRoleInfo} from "@/questions/services/getrole";
import {cleanInputText} from "@/questions/services/cleaninputtext";

// EMITS
const emits = defineEmits(['changeopenprop']);

// PROPS
const props = defineProps({
  open:
      {
        type: Boolean,
        default: false
      }
});

// DATA
const newQuestionVisible = ref(false);
const addquestion = ref(null);
const isSavingNewQuestion = ref(false);

// STORE
const appStore = useAppStore();
const newQuestion = useNewQuestionStore();
const activeQuestion = useActiveQuestionStore();
const submitStore = useSubmitMessageStore();
const questions = useQuestionsStore();
const userStore = useUserStore();
const errorStore = useErrorsStore();


// METHODS
const closeNewQuestionModal = ()=>{
    newQuestionVisible.value =false;
    newQuestion.$reset();
}

const checkActionType = ()=>{
  let action = 'save_question';

  if (newQuestion.$state.target === 'fastquestion'){
    let role = getRoleInfo(userStore.$state.userrole.id);
    if (role[0] === 'admin' || role[0] === 'redactor'){
      if (newQuestion.$state.answer_text !==''){
        if (cleanInputText(newQuestion.$state.answer_text) !==''){
          return 'save_combine';
        }
      }
    }
  }

  return action;

}

const onSaveNewQuestion =async ()=>{
  if (isSavingNewQuestion.value){
    return;
  }

  isSavingNewQuestion.value = true;

  try {
    let action = checkActionType();
    let saveResp = await saveOrUpdateQuestion(saveParams.value, action);

    if (saveResp.status === 'ok'){
      let copyNewQuestion = {...newQuestion.$state};
      closeNewQuestionModal();
      await formQuestionsList(questionsListParams.value);
      if (copyNewQuestion.target === 'feedback'){
        submitStore.message = 'Вы успешно создали сообщение с обратной связью!';
      }
      else {
        submitStore.message = 'Вы успешно создали новый вопрос!';
      }
		}
    else {
      newQuestion.errorInfo = 'При формировании нового вопроса возникла проблема! Повторите попытку позже!';
		}
  } finally {
    isSavingNewQuestion.value = false;
  }

}

const openNewQuestion = ()=>{
    newQuestionVisible.value = true;
    let role = getRoleInfo(userStore.$state.userrole.id);
    if(role[0] !== 'personal'){
      newQuestion.target = 'fastquestion';
    }
    activeQuestion.$reset();
};

// COMPUTED
const saveParams = computed(()=>{
    return {
        userid: userStore.$state.userid,
        spacekey: newQuestion.$state.space_key,
        unionroleid: newQuestion.$state.unionrole_id,
        question_text: newQuestion.$state.text,
        question_files: newQuestion.$state.new_upload_files,
        isfeedback: newQuestion.$state.target === 'feedback' ? 1 : 0,
        fastformflag: newQuestion.$state.target === 'fastquestion' ? 1 : 0,
        publicorder: newQuestion.$state.public_flag ? 1 : 0,
        answer_text: newQuestion.$state.answer_text,
        answer_files: newQuestion.$state.new_answer_upload_files
		}
});

const questionsListParams = computed(()=>{
    return {
        listStore: questions,
        userStore: userStore,
        activeQuestionStore: activeQuestion,
        errorStore: errorStore,
				appStore: appStore,
        warnText: ''
    }
});


// WATCH
watch(
    ()=>props.open,
    (newval) => {
      if(newval){
        openNewQuestion();
        emits('changeopenprop');
      }
    },
    {immediate: true}
);

watch(
    addquestion,
    () => {
      if(addquestion.value){
        appStore.addQuestionElem = addquestion.value;
      }
    },
    {immediate: true}
);

</script>

<style scoped>
@import "@/questions/components/AddQuestion/css/addquestion.css";
</style>
