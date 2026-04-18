<template>
	<div class="qst-question-detail-container">

			<template v-if="appStore.$state.questionShowMode === 'panel' && !isFeedback">
          <div class="qst-question-detail-status-wr">
              <div class="qst-question-detail-status-text">
                  Статус вопроса:
              </div>
              <div class="qst-question-detail-status-badge">
                  <status-badge
													:statusid="question.$state.status_id"
													:badge-height="14"
									/>
              </div>
          </div>
			</template>

			<user-info target="question" />

      <select-space-role
              v-if="!isFeedback"
              target="editquestion"
							:space-error-style="spaceSelectValidateError"
							:role-error-style="roleSelectValidateError"
							@clickselect="(target)=>{onSelectClick(target)}"
      />

			<question-text-area
							target="question"
							:errorstyle="questionAreaValidateError"
              @textareafocus="onTextAreaFocus('question')"
			/>

			<file-gallery
							target="question"
							:attachments="question.$state.order_attachments"

			/>


			<file-zone
              v-if="!isFeedback"
							:deny-files="question.$state.deny_order_upload_files"
							:new-files="question.$state.new_order_upload_files"
							:info-arr="question.$state.upload_order_infoarray"
							target="question"
							@resetinfoarr="()=>{resetInfoAndFiles('question')}"
			/>

			<upload-file
              v-if="!isFeedback"
							target="question"
							:maxfilesize="appStore.$state.uploadsize"
							:maxsimulcount="appStore.$state.maxuploadfiles"
							:totalfilescount="10"
							@uploadfiles="(uploadQuestionFilesObject)=>{onQuestionUpload(uploadQuestionFilesObject, 'question')}"
							@handledrop="()=>{resetInfoAndFiles('question', true)}"
							@handlebutton="()=>{resetInfoAndFiles('question', true)}"
							:initstore="{new_files:question.$state.new_order_upload_files,
							deny_files: question.$state.deny_order_upload_files,
							info_array: question.$state.upload_order_infoarray
							}"
			/>

			<div v-if="!isFeedback" class="qst-question-detail-divider">

			</div>

			<user-info v-if="!isFeedback" target="answer" />

      <user-info v-if="!isFeedback" target="inwork" />

      <question-text-area v-if="!isFeedback"
							target="answer"
							:errorstyle="answerAreaValidateError"
							@textareafocus="onTextAreaFocus('answer')"
			/>

			<file-gallery v-if="!isFeedback"
							target="answer"
							:attachments="question.$state.answer_attachments"

			/>

      <file-zone
              v-if="!isFeedback"
              :deny-files="question.$state.deny_answer_upload_files"
              :new-files="question.$state.new_answer_upload_files"
              :info-arr="question.$state.upload_answer_infoarray"
              target="answer"
              @resetinfoarr="()=>{resetInfoAndFiles('answer')}"
      />

      <upload-file
              v-if="!isFeedback"
              target="answer"
              :maxfilesize="appStore.$state.uploadsize"
              :maxsimulcount="appStore.$state.maxuploadfiles"
              :totalfilescount="10"
              @uploadfiles="(uploadQuestionFilesObject)=>{onQuestionUpload(uploadQuestionFilesObject, 'answer')}"
              @handledrop="()=>{resetInfoAndFiles('answer', true)}"
              @handlebutton="()=>{resetInfoAndFiles('answer', true)}"
              :initstore="{new_files:question.$state.new_answer_upload_files,
							deny_files: question.$state.deny_answer_upload_files,
							info_array: question.$state.upload_answer_infoarray
							}"
      />


			<template v-if="infoText !==''">
					<info-text-panel
									:text="infoText"
									:textmode="infoTextMode"
					/>
			</template>

			<template v-if="!isFeedback">
        <action-buttons
            target="editquestion"
            @onactionbutton="(action)=>{validateAction(action)}"
        />
      </template>

      <Transition name="qst-modal">
          <template v-if="submitPanelAction!=='' && submitPanelText !==''">
              <submit-modal-panel
                      :text="submitPanelText"
                      :action="submitPanelAction"
                      @submitaction="(action, target)=>{onSubmitActionPanel(action, target)}"
                      @closesubmitaction="()=>{submitPanelAction='';submitPanelText=''}"
              />
          </template>
			</Transition>

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
import {formQuestionsList} from "@/questions/services/formquestionslist";
import {saveOrUpdateQuestion} from "@/questions/services/saveorupdatequestion";
import {execQuestionAction} from "@/questions/services/execaction";
import SubmitModalPanel from "@/questions/components/SubmitModalPanel/SubmitModalPanel.vue";
import InfoTextPanel from "@/questions/components/InfoTextPanel/InfoTextPanel.vue";
import ActionButtons from "@/questions/components/QuestionDetail/components/ActionButtons/ActionButtons.vue";
import SelectSpaceRole from "@/questions/components/QuestionDetail/components/SelectSpaceRole/SelectSpaceRole.vue";
import UserInfo from "@/questions/components/QuestionDetail/components/UserInfo/UserInfo.vue";
import FileGallery from "@/questions/components/QuestionDetail/components/FileGallery/FileGallery.vue";
import StatusBadge from "@/questions/components/StatusBadge/StatusBadge.vue";
import FileZone from "@/questions/components/QuestionDetail/components/FileZone/FileZone.vue";
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import QuestionTextArea from "@/questions/components/QuestionDetail/components/QuestionTextArea/QuestionTextArea.vue";
import UploadFile from "@/questions/components/QuestionDetail/components/UploadFile/UploadFile.vue";
import {useAppStore} from "@/questions/store/app";
import {useUserStore} from "@/questions/store/user";
import {useQuestionsStore} from "@/questions/store/questions";
import {useErrorsStore} from "@/questions/store/errors";
import {validateQuestionAction} from "@/questions/components/QuestionDetail/services/validateaction";
import {useSynchroStore} from "@/questions/store/synchronized";
import {computed, ref, watch} from "vue";

// STORE
const question = useActiveQuestionStore();
const appStore = useAppStore();
const userStore = useUserStore();
const questions = useQuestionsStore();
const errorStore = useErrorsStore();
const synchroStore = useSynchroStore();

// DATA
const infoTextMode = ref('warning');
const infoText = ref('');
const spaceSelectValidateError = ref(false);
const roleSelectValidateError = ref(false);
const questionAreaValidateError = ref(false);
const answerAreaValidateError = ref(false);
const submitPanelText = ref('');
const submitPanelAction = ref('');
const modalMessage = ref('');

const isError = ref(false);

// METHODS

const onSubmitActionPanel = (action, target) =>{
    if(target === 'submit'){
        execAction(action);
		}
    submitPanelText.value = '';
    submitPanelAction.value = '';
}

const onTextAreaFocus = (target) =>{
    infoText.value = '';
    infoTextMode.value = 'warning';
    if (target === 'question'){
        questionAreaValidateError.value = false;
		}
    if (target === 'answer'){
        answerAreaValidateError.value = false;
		}
}
const onSelectClick = (target) =>{
    infoText.value = '';
    infoTextMode.value = 'warning';
    if (target === 'space'){
        spaceSelectValidateError.value = false;
    }
    if (target === 'role'){
        roleSelectValidateError.value = false;
    }
}

const resetValidInfo = () =>{
    infoText.value = '';
    infoTextMode.value = 'warning';
    spaceSelectValidateError.value = false;
    roleSelectValidateError.value = false;
    questionAreaValidateError.value = false;
    answerAreaValidateError.value = false;
}

const onQuestionUpload = (uploadQuestionFilesObject, target)=>{
    infoText.value = '';
    infoTextMode.value = 'warning';
    let copyQuestionStore = question.$state;

    if (target === 'question'){
        copyQuestionStore.new_order_upload_files = uploadQuestionFilesObject.newFiles;
        copyQuestionStore.deny_order_upload_files = uploadQuestionFilesObject.denyFiles;
        copyQuestionStore.upload_order_infoarray = uploadQuestionFilesObject.infoTextArr;
		}
    else if (target === 'answer'){
        copyQuestionStore.new_answer_upload_files = uploadQuestionFilesObject.newFiles;
        copyQuestionStore.deny_answer_upload_files = uploadQuestionFilesObject.denyFiles;
        copyQuestionStore.upload_answer_infoarray = uploadQuestionFilesObject.infoTextArr;
		}
    question.$patch(copyQuestionStore);
}


const resetInfoAndFiles = (target, resetFiles=false) =>{
    infoText.value = '';
    infoTextMode.value = 'warning';
    let copyQuestionStore = question.$state;

    if (target === 'question'){
        copyQuestionStore.upload_order_infoarray = [];
        if(resetFiles){
            copyQuestionStore.deny_order_upload_files = [];
				}
    }
    else if (target === 'answer'){
        copyQuestionStore.upload_answer_infoarray = [];
        if(resetFiles){
            copyQuestionStore.deny_answer_upload_files = [];
				}
    }
    question.$patch(copyQuestionStore);
}

const checkValidateObject = (validateObject)=>{
    if(!validateObject.valid){
        infoText.value = 'Проверьте заполнение формы. Некоторые поля не заполнены или заполнены неверно';
        infoTextMode.value = 'warning';
		}

    if(!validateObject.comp_validators.selectSpace){
        spaceSelectValidateError.value = true;
		}
    if(!validateObject.comp_validators.selectRole){
        roleSelectValidateError.value = true;
    }
    if(!validateObject.comp_validators.questionTextArea){
        questionAreaValidateError.value = true;
    }
    if(!validateObject.comp_validators.answerTextArea){
        answerAreaValidateError.value = true;
    }
}

const validateAction = (action) =>{
    resetValidInfo();
    let validObject = validateQuestionAction(action, question.$state, userStore.$state);
		console.log("validObject: ", validObject);
    if (validObject.valid){
        if(validObject.needSubmit){
            openSubmitActionPanel(action)
				}
        else {
            execAction(action);
				}
		}
    else {
        checkValidateObject(validObject);
		}
}

const openSubmitActionPanel = (action)=>{
  console.log("openSubmitActionPanel action: ", action);
    submitPanelAction.value = action;
    if (action === 'in_work'){
        submitPanelText.value = "Вы точно хотите взять вопрос в работу?";
		}
    else if (action === 'from_work'){
        submitPanelText.value = "Вы точно хотите отказаться от работы над вопросом?";
		}
    else if (action === 'from_work_admin'){
        submitPanelText.value = "Вы точно хотите снять исполнителя с работы над вопросом?";
    }
    else if (action === 'delete'){
        submitPanelText.value = "Вы точно хотите удалить вопрос? Восстановить потом его будет невозможно";
    }
    else if (action === 'to_archive'){
      submitPanelText.value = "Вы удовлетворены ответом и хотите отправить его в архив?";
    }
}

const setUpdateFlag = async (flag)=>{
    question.is_update_active = flag;
}

const prepareParams = () =>{
  if(questions.$state.availableStatuses.length <=2 && questions.$state.renderList.length === 1){
    questions.statusId=0;
  }
}

const execAction = async (action)=>{
    await console.log("execAction action: ", action);
		if(action !=='update'){
            await console.log(" action !=='update'");
            await setUpdateFlag(1);
            let execResp = await execQuestionAction(question.$state.order_id, userStore.$state.userid, action);
            await setUpdateFlag(0);
            if (execResp.status === 'ok'){
                await prepareParams();
                await formQuestionsList(questionsListParams.value);
                if (action === 'delete'){
                    await question.$reset();
								}
						}
            else{
                if((action === 'public' || action === 'from_public') && execResp.status === 'publicactive'){
                    modalMessage.value = 'В данный момент активна процедура публикации вопроса. Повторите попытку позже';
                }
                else{
                    infoText.value = 'При обработке вопроса произошла ошибка. Обновите страницу или повторите попытку позже';
                    infoTextMode.value = "warning";
								}
						}
		}
		else {
        await setUpdateFlag(1);
        let updateResp = await saveOrUpdateQuestion(updateQuestionsParams.value, 'save_combine');
        // await console.log("updateQuestionsParams.value: ", updateQuestionsParams.value);
        // await console.log("updateQuestion resp: ", updateResp);
        await setUpdateFlag(0);
        if (updateResp.status === 'ok'){
            await formQuestionsList(questionsListParams.value);
        }
        else{
            infoText.value = 'При обработке вопроса произошла ошибка. Обновите страницу или повторите попытку позже';
            infoTextMode.value = "warning";
        }
		}
}

// COMPUTED
const isValidWarning = computed(()=>{
    let warn = false;

    if(spaceSelectValidateError.value){
        warn = true;
		}

    if(roleSelectValidateError.value){
        warn = true;
    }

    if(questionAreaValidateError.value){
        warn = true;
    }

    if(answerAreaValidateError.value){
        warn = true;
    }
    return warn;
});

// COMPUTED
const questionsListParams = computed(()=>{
    return {
        listStore: questions,
        userStore: userStore,
        activeQuestionStore: question,
        errorStore: errorStore,
				appStore: appStore,
        warnText: 'При формировании списка вопросов возникли проблемы! Обновите страницу или повторите попытку позже',
        infoText: 'Вопрос был успешно обновлен',
				infoReactive: infoText,
				raiseInfoError: false,
				textMode: infoTextMode
    }
})

const updateQuestionsParams = computed(()=>{
    return {
        orderid: question.$state.order_id,
				userid: userStore.$state.userid,
        spacekey: question.$state.space_key,
        unionroleid: question.$state.order_unionrole_id,
				question_text: question.$state.order_text,
				answer_text: question.$state.answer_text,
				question_files: question.$state.new_order_upload_files,
				answer_files: question.$state.new_answer_upload_files,
        publicorder: 0,
        fastformflag: 0
    }
});

const isFeedback = computed(()=>{
  let feedBack = false;
  if(question.$state.feedback_id !== null && question.$state.feedback_id !==0 && question.$state.feedback_id.toString() !=='0'){
    feedBack = true;
  }
  return feedBack;
});

// WATCH
watch(
    [isValidWarning, isError],
    ([newWarn, newError]) => {
        if (!newWarn && !newError){
            infoText.value = '';
            infoTextMode.value = 'warning';
        }
    },
);

watch(
    ()=>synchroStore.activeQuestionError,
    (newstate) => {
        if (newstate){
            infoText.value = 'В данный момент изменение состояния этого вопроса недоступно. Закройте окно вопроса, обновите страницу или повторите попытку позже';
            infoTextMode.value = 'warning';
        }
    },
);

</script>

<style scoped>
@import "@/questions/components/QuestionDetail/css/questiondetail.css";
</style>