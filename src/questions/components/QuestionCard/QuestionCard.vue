<template>
	<div :id="'qst-question-card-'+props.question.order_id.toString()" class="qst-question-card"
			 :class="{'qst-question-card-active': activeStyle}">
      <template v-if="appStore.$state.questionShowMode === 'panel'">
          <div @click="setActiveQuestion" class="qst-question-card-number-wr">
              {{ props.question.order_id }}
            <template v-if="userRelated">
              <div class="qst-question-card-number-ribbon"></div>
            </template>
          </div>
          <div @click="setActiveQuestion" class="qst-question-card-content-wr">
              <div class="question-card-content-top">
                  <div class="question-card-content-top-text">
                      {{ questionText }}
                  </div>
                  <template v-if="attachmentExist">
                  <div class="question-card-content-top-icon">
                      <VTooltip theme="qst-standart-tooltip">
                          <app-icon
                                  name="clip"
                                  :size="17"
                          />
                          <template #popper>Вопрос имеет вложенные файлы</template>
                      </VTooltip>
                  </div>
                  </template>
              </div>

              <div class="question-card-content-bottom">
                  <div v-if="!isFeedback" class="question-card-status-wr">
                      <status-badge :statusid="props.question.status_id" />
                  </div>
                  <div v-if="appStore.$state.questionShowMode==='modal'" class="question-card-id-wr">
                      <template v-if="isFeedback">
                        номер обращения: {{ props.question.order_id.toString() }}
                      </template>
                      <template>
                        номер вопроса: {{ props.question.order_id.toString() }}
                      </template>
                  </div>
                  <div class="question-card-date-wr">
                      дата обращения: {{ props.question.order_created_at }}
                  </div>
              </div>
          </div>
          <div class="qst-question-card-actions-wr">
              <question-card-actions
                      v-if="!isFeedback"
                      :question="props.question"
                      @execaction="(action, order_id)=>{processAction(action, order_id)}"
              />
          </div>
      </template>

			<template v-if="appStore.$state.questionShowMode === 'modal'">
					<div class="qst-question-card-modal-main">
            <template v-if="userRelated">
              <div class="qst-question-card-number-ribbon"></div>
            </template>
              <div @click="setActiveQuestion" class="qst-question-card-content-wr">
                  <div class="question-card-content-top">
                      <template v-if="attachmentExist">
                      <div class="question-card-content-top-icon">
                              <app-icon
																			name="clip"
																			:size="17"
															/>
                      </div>
                      </template>
                      <div class="question-card-content-top-text">
                          {{ questionText }}
                      </div>
                  </div>

                  <div class="question-card-content-bottom">
                      <div class="question-card-status-wr">
                          <status-badge :statusid="props.question.status_id" />
                      </div>
                      <div v-if="appStore.$state.questionShowMode==='modal'" class="question-card-id-wr">
                          номер вопроса: {{ props.question.order_id.toString() }}
                      </div>
                      <div class="question-card-date-wr">
                          дата обращения: {{ props.question.order_created_at }}
                      </div>
                  </div>
              </div>
					</div>
					<div class="qst-question-card-modal-action">
              <question-card-actions
                      :question="props.question"
                      @execaction="(action, order_id)=>{processAction(action, order_id)}"
              />
					</div>
			</template>

      <template v-if="submitText !=='' && submitAction !=='' && submitOrderid !==0">
          <submit-modal-panel
            :text="submitText"
            :action="submitAction"
            :orderid="submitOrderid"

            @closesubmitaction="()=>{submitText='';submitAction=''; submitOrderid = 0}"
            @submitaction="(action, flag, orderid)=>{submitQuestionAction(action, flag, orderid)}"
          />
      </template>

      <template v-if="modalMessage !==''">
          <submit-message
            :text="modalMessage"
            @closesubmitmessage="modalMessage=''"
          />
      </template>
	</div>
</template>

<script setup>
import SubmitMessage from "@/questions/components/SubmitMessage/SubmitMessage.vue";
import SubmitModalPanel from "@/questions/components/SubmitModalPanel/SubmitModalPanel.vue";
import {execQuestionAction} from "@/questions/services/execaction";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import StatusBadge from "@/questions/components/StatusBadge/StatusBadge.vue";
import QuestionCardActions from "@/questions/components/QuestionCard/components/QuestionCardActions/QuestionCardActions.vue";
import {question_object} from "@/questions/objects/question";
import {computed, ref} from "vue";
import {app_config} from "@/questions/config/setconfig";
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import {useAppStore} from "@/questions/store/app";
import {useUserStore} from "@/questions/store/user";
import {useQuestionsStore} from "@/questions/store/questions";
import {useErrorsStore} from "@/questions/store/errors";
import {getRoleInfo} from "@/questions/services/getrole";

// PROPS
const props = defineProps({
    question:
        {
            type: Object,
            default(){
                return question_object;
						}
        }
});

// STORE
const activeQuestionStore = useActiveQuestionStore();
const appStore = useAppStore();
const userStore = useUserStore();
const questions = useQuestionsStore();
const errorStore = useErrorsStore();


// DATA
const submitText = ref('');
const submitAction = ref('');
const submitOrderid = ref(0);
const modalMessage = ref('');

// METHODS
const forceUpdateQuestionsList = ()=>{
    let copyQuestions = {...questions.$state};
    copyQuestions.updateFlag = !copyQuestions.updateFlag;
    questions.$patch(copyQuestions);
}

const submitQuestionAction = (action, flag, orderid)=>{
    // console.log("submitQuestionAction");
    // console.log("submitQuestionAction flag: ", flag);

    if(flag === 'cancel'){
        submitText.value = '';
        submitAction.value = '';
        submitOrderid.value = 0;
    }
    else if (flag === 'submit'){
        execAction(action, orderid);
    }
}

const processAction = async (action, order_id) =>{
    console.log("processAction action: ", action);
    if (app_config.ACTIONS_NEED_SUBMIT.includes(action)){
        if(action === 'delete'){
            submitText.value = 'Вы точно хотите удалить вопрос окончательно? После данного действия вопрос нельзя восстановить!'
        }
        if(action === 'to_archive'){
            if(role.value === 'admin' || role.value === 'redactor'){
                submitText.value = 'Вы точно хотите отправить вопрос в архив?'
            }
            else {
                submitText.value = 'Вы удовлетворены ответом на вопрос и хотите отправить его в архив?'
            }
        }
        if(action === 'back_in_work'){
            submitText.value = 'Вы действительно хотите вернуть вопрос в работу?';
        }
        submitAction.value = action;
        submitOrderid.value = Number(order_id);
    }
    else {
        await execAction(action, order_id);
    }
}

const prepareParams = () =>{
  if(questions.$state.availableStatuses.length <=2 && questions.$state.renderList.length === 1){
    questions.statusId=0;
  }
}

const execAction = async (action, order_id)=>{
    console.log("execAction");
    let execResp = await execQuestionAction(order_id, userStore.$state.userid, action);

    console.log("execResp: ", execResp);

    submitText.value = '';
    submitAction.value = '';
    submitOrderid.value = 0;

    if (execResp.status === 'ok'){
        await activeQuestionStore.$reset();
        await prepareParams();
        await forceUpdateQuestionsList();
    }
    else {
        if((action === 'public' || action === 'from_public') && execResp.status === 'publicactive'){
            modalMessage.value = 'В данный момент активна процедура публикации вопроса. Повторите попытку позже';
        }
        else {
            let copyErrorStore = {...errorStore.$state};
            copyErrorStore.infoError.message="При попытке произвести действие с вопросом возникла проблема. Попробуйте обновить страницу или повторите попытку позже";
            copyErrorStore.infoError.isActive = true;
            errorStore.$patch(copyErrorStore);
        }
    }


}

const setActiveQuestion = ()=>{
    activeQuestionStore.$reset();
    activeQuestionStore.$patch(props.question);
}


// COMPUTED
const role = computed(()=>{
    let roleInfo = getRoleInfo(userStore.$state.userrole.id);
    if (roleInfo !== null){
        return roleInfo[0];
    }
    else {
        return null;
    }
});


const questionText = computed(()=>{
    if(props.question.order_text.length > 45){
        return props.question.order_text.slice(0, 45)+'..';
		}
    else {
        return props.question.order_text;
		}
});

const attachmentExist = computed(()=>{
    return props.question.order_attachments.length !== 0 || props.question.answer_attachments.length !== 0;
})

const activeStyle = computed(()=>{
    return Number(activeQuestionStore.$state.order_id) === Number(props.question.order_id);
});

// COMPUTED
const isFeedback = computed(()=>{
  let feedBack = false;
  if(props.question.feedback_id !== null && props.question.feedback_id !==0 && props.question.feedback_id.toString() !=='0'){
    feedBack = true;
  }
  return feedBack;
});

const userRelated = computed(()=>{
  let isRelated = false;
  let roleInfo = getRoleInfo(userStore.$state.userrole.id);

  if (roleInfo[0] === 'admin' || roleInfo[0] === 'redactor'){
    if(Number(userStore.$state.userid) === Number(props.question.order_userid)){
      isRelated = true;
    }

    if(Number(userStore.$state.userid) === Number(props.question.inwork_userid)){
      isRelated = true;
    }

    if(Number(userStore.$state.userid) === Number(props.question.answer_userid)){
      isRelated = true;
    }
  }

  return isRelated;

});


</script>

<style scoped>
@import "@/questions/components/QuestionCard/css/questioncard.css";
</style>