<template>

  <template v-if="newQuestion.target !=='fastquestion' && role !== 'personal'">
    <div class="qst-newquestion-select-topic-wr">

      <div class="qst-newquestion-select-topic-title">
        Цель обращения
      </div>

      <div class="qst-newquestion-select-topic">
        <select-item
            itemname="name"
            uniqidname="id"
            :data="topicData"
            @emitactiveitem="(item)=>setQuestionTarget(item)"
            placeholder="Выбрать"
        />
      </div>
    </div>
  </template>

    <Transition name="qst-modal">

				<div v-if="newQuestion.$state.target !== ''">
						<Transition name="qst-modal">
            <template v-if="['newquestion', 'fastquestion'].includes(newQuestion.$state.target)">
                <div class="qst-newquestion-select-spacerole-wr">
                    <select-space-role
                            :target="newQuestion.$state.target"
														:role-error-style="selectRoleError"
														:space-error-style="selectSpaceError"
														@clickselect="(target)=>{clickSelect(target)}"
                    />
                </div>
            </template>
            </Transition>

            <div class="qst-newquestion-textarea-wr">
                <question-text-area
												:target="newQuestion.$state.target"
												:errorstyle="textAreaError"
												@textareafocus="onFocusTextArea(newQuestion.$state.target)"
								/>
            </div>

            <div class="qst-newquestion-filezone-wr">
								<file-zone
                        :target="newQuestion.$state.target"
                        :new-files="newQuestion.$state.new_upload_files"
                        :deny-files="newQuestion.$state.deny_upload_files"
                        :info-arr="newQuestion.$state.upload_infoarray"
												@deleteitem="resetInfoAndDeny(newQuestion.$state.target, true)"
												@resetinfoarr="resetInfoAndDeny(newQuestion.$state.target, false)"
                />
            </div>

            <div class="qst-newquestion-upload-wr">
                <upload-file
                        :target="newQuestion.$state.target"
                        :maxfilesize="appStore.$state.uploadsize"
                        :maxsimulcount="5"
                        :totalfilescount="10"
                        @uploadfiles="(uploadQuestionFilesObject)=>{onQuestionUpload(newQuestion.$state.target, uploadQuestionFilesObject)}"
                        @handledrop="resetInfoAndDeny(newQuestion.$state.target, true)"
                        @handlebutton="resetInfoAndDeny(newQuestion.$state.target, true)"
                        :initstore="{
                    new_files:newQuestion.$state.new_upload_files,
                    deny_files: newQuestion.$state.deny_upload_files,
                    info_array: newQuestion.$state.upload_infoarray
                }"
                />
            </div>

            <template v-if="newQuestion.$state.target === 'fastquestion'">

              <div class="qst-newquestion-textarea-wr">
                <question-text-area
                    target="fastquestion_answer"
                    :errorstyle="textAreaAnswerError"
                    @textareafocus="onFocusTextArea('fastquestion_answer')"
                />
              </div>

              <div class="qst-newquestion-filezone-wr">
                <file-zone
                    target="fastquestion_answer"
                    :new-files="newQuestion.$state.new_answer_upload_files"
                    :deny-files="newQuestion.$state.deny_answer_upload_files"
                    :info-arr="newQuestion.$state.upload_answer_infoarray"
                    @deleteitem="resetInfoAndDeny('fastquestion_answer', true)"
                    @resetinfoarr="resetInfoAndDeny('fastquestion_answer', false)"
                />
              </div>

              <div class="qst-newquestion-upload-wr">
                <upload-file
                    target="fastquestion_answer"
                    :maxfilesize="appStore.$state.uploadsize"
                    :maxsimulcount="5"
                    :totalfilescount="10"
                    @uploadfiles="(uploadQuestionFilesObject)=>{onQuestionUpload('fastquestion_answer', uploadQuestionFilesObject)}"
                    @handledrop="resetInfoAndDeny('fastquestion_answer', true)"
                    @handlebutton="resetInfoAndDeny('fastquestion_answer', true)"
                    :initstore="{
                    new_files:newQuestion.$state.new_answer_upload_files,
                    deny_files: newQuestion.$state.deny_answer_upload_files,
                    info_array: newQuestion.$state.upload_answer_infoarray
                }"
                />
              </div>

            </template>

						<Transition name="qst-modal">
                <template v-if="(isValidateError || newQuestion.$state.errorInfo !=='') && warningInfo !==''">
                    <div class="qst-newquestion-warning-panel-container">
												<info-text-panel
																:text="warningInfo"
																textmode="warning"
												/>
                    </div>
                </template>
						</Transition>


					<template v-if="publicSwitchVisibility">
            <div class="edu-newquestion-public-switch">
              <toggle-switch
                  ontext="Опубликовать после сохранения"
                  offtext="Не публиковать"
                  @emiton="newQuestion.public_flag = true;"
                  @emitoff="newQuestion.public_flag = false;"
              />
            </div>
          </template>

          <div class="qst-newquestion-action-buttons-container">
								<action-buttons
												:target="newQuestion.$state.target"
												@submitbutton="validateNewQuestion()"
								/>
						</div>

				</div>

    </Transition>
</template>

<script setup>
import ToggleSwitch from "@/common/ui/ToggleSwitch/ToggleSwitch.vue";
import InfoTextPanel from "@/questions/components/InfoTextPanel/InfoTextPanel.vue";
import ActionButtons from "@/questions/components/QuestionDetail/components/ActionButtons/ActionButtons.vue";
import FileZone from "@/questions/components/QuestionDetail/components/FileZone/FileZone.vue";
import UploadFile from "@/questions/components/QuestionDetail/components/UploadFile/UploadFile.vue";
import QuestionTextArea from "@/questions/components/QuestionDetail/components/QuestionTextArea/QuestionTextArea.vue";
import SelectSpaceRole from "@/questions/components/QuestionDetail/components/SelectSpaceRole/SelectSpaceRole.vue";
import SelectItem from "@/questions/components/SelectItem/SelectItem.vue";
import {useNewQuestionStore} from "@/questions/store/newquestion";
import {useAppStore} from "@/questions/store/app";
import {useUserStore} from "@/questions/store/user";
import {computed, onMounted, ref, watch} from "vue";
import {getRoleInfo} from "@/questions/services/getrole";
import {app_config} from "@/questions/config/setconfig";
import {cleanInputText} from "@/questions/services/cleaninputtext";

// EMITS

const emits = defineEmits(['savenewquestion']);

let topics = [
    {
        'id': 'newquestion',
        'name': 'Задать вопрос'
		},
    {
        'id': 'feedback',
        'name': 'Пожелание или предложение'
		},

    {
        'id': 'fastquestion',
        'name': 'Быстрый вопрос'
    }

]

// STORE

const newQuestion = useNewQuestionStore();
const appStore = useAppStore();
const userStore = useUserStore();

// DATA
const topicData = ref(topics);
const warningInfo = ref('');

const selectRoleError = ref(false);
const selectSpaceError = ref(false);
const textAreaError = ref(false);
const textAreaAnswerError = ref(false);

// METHODS

const onFocusTextArea = (target)=>{
  if (['newquestion', 'feedback', 'fastquestion'].includes(target)){
    textAreaError.value = false;
  }
  else if(target === 'fastquestion_answer'){
    textAreaAnswerError.value = false;
  }
}

const clickSelect = (target)=>{
    if(target === 'space'){
        selectSpaceError.value = false;
		}
    else if (target === 'role'){
        selectRoleError.value = false;
		}
}

const setQuestionTarget = (item)=>{
    newQuestion.target = item['id'];
}

const resetNewQuestionError = ()=>{
    newQuestion.errorInfo = '';
}

const validateNewQuestion = ()=>{
    resetWarnings();
    resetNewQuestionError();
    let validFlag = true;

    if (role.value !== 'personal'){
      if (Number(newQuestion.$state.space_id)!==Number(app_config.NULLSPACE.id)){
        if (newQuestion.$state.union_roles.length>=2){
          if(Number(newQuestion.$state.unionrole_id)===Number(app_config.NULLROLE.id)){
            validFlag = false;
            selectRoleError.value = true;
          }
        }
      }
		}

    let cleanText = cleanInputText(newQuestion.$state.text);

    if (cleanText === ''){
        validFlag = false;
        textAreaError.value = true;
		}
    // console.log("validate validFlag: ", validFlag);
    if(!validFlag){
        warningInfo.value = 'Проверьте заполнение формы. Некоторые поля не заполнены или заполнены неверно';
        // console.log("warningInfo.value: ", warningInfo.value);
		}
    else {
        saveNewQuestion();
		}
}

const saveNewQuestion = ()=>{
    emits('savenewquestion')
}

const resetWarnings = ()=>{
  warningInfo.value = '';
  selectRoleError.value = false;
  selectSpaceError.value = false;
  textAreaError.value = false;
  textAreaAnswerError.value = false;
}

const onQuestionUpload = (target, uploadQuestionFilesObject)=>{
  if(target !== 'fastquestion_answer'){
    newQuestion.new_upload_files = uploadQuestionFilesObject.newFiles;
    newQuestion.deny_upload_files = uploadQuestionFilesObject.denyFiles;
    newQuestion.upload_infoarray = uploadQuestionFilesObject.infoTextArr;
  }
  else {
    newQuestion.new_answer_upload_files = uploadQuestionFilesObject.newFiles;
    newQuestion.deny_answer_upload_files = uploadQuestionFilesObject.denyFiles;
    newQuestion.upload_answer_infoarray = uploadQuestionFilesObject.infoTextArr;
  }
}

const resetInfoAndDeny = (target, resetFiles=false) =>{
    if(target !== 'fastquestion_answer'){
      newQuestion.upload_infoarray = [];
      if(resetFiles){
        newQuestion.deny_upload_files = [];
      }
    }
    else{
      newQuestion.upload_answer_infoarray = [];
      if(resetFiles){
        newQuestion.deny_answer_upload_files = [];
      }
    }
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

const isValidateError = computed(()=>{
    let valid = false;
    if(selectRoleError.value){
        valid = true
		}
    if(selectSpaceError.value){
        valid = true
    }
    if(textAreaError.value){
        valid = true
    }
		return valid;
});

const publicSwitchVisibility = computed(()=>{
  let flag = true;

  if (newQuestion.$state.target !== 'fastquestion'){
    flag = false;
  }
  if (newQuestion.$state.text.trim() === '' || newQuestion.$state.answer_text.trim() === ''){
    flag = false;
  }
  if(newQuestion.$state.space_id === '0' || Number(newQuestion.$state.space_id) === 0){
    flag = false;
  }

  if(Number(newQuestion.$state.space_id) === Number(app_config.NULLSPACE.id)){
    flag = false;
  }

  return flag;
});

// LIFECYCLE
onMounted(()=>{
  if(role.value === 'personal'){
    newQuestion.target = 'newquestion';
  }
});


// WATCH
watch(
    () => newQuestion.errorInfo,
		(info) => {
        if (info !==''){
            warningInfo.value = info;
				}
        else {
            if(!isValidateError.value){
                warningInfo.value = '';
						}
				}
    }
);

</script>

<style scoped>
@import "@/questions/components/NewQuestion/css/newquestion.css";
</style>