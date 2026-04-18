<template>
		<template v-if="props.target === 'newquestion' || props.target === 'fastquestion' || props.target === 'feedback'">
        <div class="qst-textarea">
            <label :for="attributeName" class="vue-form-label">{{ labelText }}</label>
            <textarea
                      @focus="emits('textareafocus')"
                      rows="3"
                      class="vue-form-control"
                      :class="{'vue-input-error':errorStyle}"
                      :name="attributeName"
                      :id="attributeName"
                      v-model="reactNewQuestion.text.value"
            ></textarea>
				</div>

		</template>

     <template v-else-if="props.target === 'fastquestion_answer'">
       <div class="qst-textarea">
         <label :for="attributeName" class="vue-form-label">{{ labelText }}</label>
         <template v-if="fastQuestionPreviewAnswerOn && props.target === 'fastquestion_answer' && reactNewQuestion.answer_text.value !==''">

           <div class="qst-textarea-preview" v-html="marked.parseInline(reactNewQuestion.answer_text.value)">
           </div>

         </template>
         <template v-else>
           <textarea
               @focus="emits('textareafocus')"
               rows="3"
               class="vue-form-control"
               :class="{'vue-input-error':errorStyle}"
               :name="attributeName"
               :id="attributeName"
               v-model="reactNewQuestion.answer_text.value"
           ></textarea>
         </template>

         <div v-if="props.target === 'fastquestion_answer'" class="qst-textarea-info-wr">
           <div @click.stop ="fastQuestionMarkDownVisible=!fastQuestionMarkDownVisible" class="qst-textarea-info-icon-wr">
             <VTooltip theme="qst-standart-tooltip">
               <app-icon
                   name="info-icon"
                   :size="25"
               />
               <template #popper>
                 Шпаргалка по Markdown
               </template>
             </VTooltip>
           </div>

           <Transition name="qst-fade">
             <div v-if="reactNewQuestion.answer_text.value !==null && reactNewQuestion.answer_text.value !==''"
                  @click.stop="fastQuestionPreviewAnswerOn = !fastQuestionPreviewAnswerOn"
                  class="qst-textarea-info-eye-wr"
             >
               <template v-if="!fastQuestionPreviewAnswerOn">

                 <VTooltip theme="qst-standart-tooltip">
                   <app-icon
                       name="eyes-on"
                       :size="34"
                   />
                   <template #popper>
                     Открыть предпросмотр
                   </template>
                 </VTooltip>
               </template>
               <template v-else>
                 <VTooltip theme="qst-standart-tooltip">
                   <app-icon
                       name="eyes-off"
                       :size="34"
                   />
                   <template #popper>
                     Закрыть предпросмотр
                   </template>
                 </VTooltip>
               </template>
             </div>
           </Transition>
         </div>

         <template v-if="fastQuestionMarkDownVisible">

           <div v-html="helpMarkDown" class="qst-textarea-markdown-info">

           </div>

         </template>


       </div>

     </template>

		<template v-else>
        <div v-if="compPermissions.visible" class="qst-textarea">
            <template v-if="compPermissions.edit">
                <label :for="attributeName" class="vue-form-label">{{ labelText }}</label>
                <textarea v-if="props.target === 'question'"
                          @focus="emits('textareafocus')"
                          rows="3"
                          class="vue-form-control"
                          :class="{'vue-input-error':errorStyle}"
                          :name="attributeName"
                          :id="attributeName"
                          v-model="reactQuestion.order_text.value"
                ></textarea>
              <Transition name="qst-fade">
                <template v-if="previewAnswerOn && props.target === 'answer'">

                      <div class="qst-textarea-preview" v-html="marked.parseInline(reactQuestion.answer_text.value)">
                      </div>

                </template>
                <template v-else>
                    <textarea v-if="props.target === 'answer'"
                              @focus="emits('textareafocus')"
                              rows="3"
                              class="vue-form-control"
                              :class="{'vue-input-error':errorStyle}"
                              :name="attributeName"
                              :id="attributeName"
                              v-model="reactQuestion.answer_text.value"
                    ></textarea>
                </template>
              </Transition>

              <div v-if="props.target === 'answer'" class="qst-textarea-info-wr">
                <div @click.stop ="markDownInfoVisible=!markDownInfoVisible" class="qst-textarea-info-icon-wr">
                  <VTooltip theme="qst-standart-tooltip">
                    <app-icon
                        name="info-icon"
                        :size="25"
                    />
                    <template #popper>
                      Шпаргалка по Markdown
                    </template>
                  </VTooltip>
                </div>

                <Transition name="qst-fade">
                <div v-if="reactQuestion.answer_text.value !==null && reactQuestion.answer_text.value !==''"
                     @click.stop="changePreview()"
                     class="qst-textarea-info-eye-wr"
                >
                  <template v-if="!previewAnswerOn">

                    <VTooltip theme="qst-standart-tooltip">
                      <app-icon
                          name="eyes-on"
                          :size="34"
                      />
                      <template #popper>
                        Открыть предпросмотр
                      </template>
                    </VTooltip>
                  </template>
                  <template v-else>
                    <VTooltip theme="qst-standart-tooltip">
                      <app-icon
                          name="eyes-off"
                          :size="34"
                      />
                      <template #popper>
                        Закрыть предпросмотр
                      </template>
                    </VTooltip>
                  </template>
                </div>
                </Transition>
              </div>

              <template v-if="markDownInfoVisible">

                <div v-html="helpMarkDown" class="qst-textarea-markdown-info">

                </div>

              </template>


            </template>

            <template v-else>
                <div class="qst-detail-text-noedit">

                    <template v-if="props.target === 'question'">
														<span class="qst-detail-text-noedit-span">
														<template v-if="compPermissions.question_author">
                                <template v-if="isFeedback">
                                  Текст вашего обращения:&nbsp;
                                </template>
                                <template v-else>
                                  Ваш вопрос:&nbsp;
                                </template>
														</template>
														<template v-else>
                                <template v-if="isFeedback">
                                  Текст обращения:&nbsp;
                                </template>
                                <template v-else>
                                  Вопрос:&nbsp;
                                </template>
														</template>
														</span>
                        {{ reactQuestion.order_text.value }}
                    </template>

                    <template v-if="props.target === 'answer'">
														<span class="qst-detail-text-noedit-span">
														<template v-if="compPermissions.answer_author">
																Ваш ответ:&nbsp;
														</template>
														<template v-else>
																Ответ:&nbsp;
														</template>
														</span>
                      <span v-html="marked.parseInline(reactQuestion.answer_text.value)">
                      </span>
                    </template>

                </div>
            </template>
        </div>
		</template>
</template>

<script setup>
import {helpMarkDown} from "@/questions/components/QuestionDetail/components/QuestionTextArea/services/helpmarkdown";
import {computed, ref, watch} from "vue";
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import {useNewQuestionStore} from "@/questions/store/newquestion";
import {storeToRefs} from "pinia";
import {setCompPermissions} from "@/questions/components/QuestionDetail/services/setcomppermissions";
import {useUserStore} from "@/questions/store/user";
import { marked } from 'marked';
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";


// EMITS
const emits = defineEmits(['textareafocus']);


// PROPS
const props = defineProps({
    target:
        {
            type:String,
            default: '',
						required: true
        },
		errorstyle:
				{
						type: Boolean,
						default: false
				}
});

// STORE
const question = useActiveQuestionStore();
const reactQuestion = storeToRefs(useActiveQuestionStore());
const reactNewQuestion = storeToRefs(useNewQuestionStore());
const userStore = useUserStore();

// DATA
const errorStyle = ref(false);
const markDownInfoVisible = ref(false);
const fastQuestionMarkDownVisible = ref(false);
const previewAnswerOn = ref(false);
const fastQuestionPreviewAnswerOn = ref(false);


// METHODS
const changePreview = ()=>{
  previewAnswerOn.value = !previewAnswerOn.value;
}

// COMPUTED
const isFeedback = computed(()=>{
  let feedBack = false;
  if(question.$state.feedback_id !== null && question.$state.feedback_id !==0 && question.$state.feedback_id.toString() !=='0'){
    feedBack = true;
  }
  return feedBack;
});

const labelText = computed(()=>{
    if (props.target === 'question' || props.target === 'newquestion' || props.target === 'feedback'){
        return 'Ваш вопрос';
		}
    if (props.target === 'fastquestion'){
        return 'Текст вопроса';
    }
    else if (props.target === 'answer'){
        return 'Ответ на вопрос:';
		}
    else if (props.target === 'fastquestion_answer'){
      return 'Текст ответа:';
    }
    else {
        return '';
		}
});

const attributeName = computed(()=>{
    if (props.target === 'question'){
        return 'qst-question-textarea-'+question.$state.order_id.toString();
    }
    else if (props.target === 'answer'){
        return 'qst-answer-textarea-'+question.$state.order_id.toString();
    }
    else if (props.target === 'newquestion' || props.target === 'feedback'){
        return 'qst-newquestion-textarea';
    }
    else if (props.target === 'fastquestion'){
      return 'qst-fastquestion-textarea';
    }
    else if (props.target === 'fastquestion_answer'){
      return 'qst-fastquestion-answer-textarea';
    }
    else {
        return 'qst-textarea-attr';
    }
});

const compPermissions = computed(()=>{
    if(!['newquestion', 'fastquestion', 'fastquestion_answer', 'feedback'].includes(props.target) ){
      return setCompPermissions('textarea', question.$state,props.target, userStore.$state);
		}
    else {
      return {}
		}
});


// WATCH

watch(
    ()=>props.errorstyle,
		(newstyle) => {
        errorStyle.value = !!newstyle;
    },
    {immediate: true}
);


</script>

<style scoped>

.qst-textarea-preview {
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.qst-textarea-info-icon-wr {
  display: flex;
  align-items: center;
}

.qst-textarea-info-eye-wr {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.qst-textarea-markdown-info {
  padding: 20px;
  font-size: 20px;
}

.qst-textarea-info-wr {
  display: flex;
  margin-top: 20px;
  cursor: pointer;
}

.qst-textarea .vue-form-label{
		font-size: 16px !important;
		font-weight: 600 !important;
}

.qst-detail-text-noedit {
		display: flex;
		flex-direction: column;
		font-size: 16px;
		font-weight: 400;
    line-height: 1.7;
}

.qst-detail-text-noedit-span {
		margin-bottom: 5px;
		font-size: 16px;
		font-weight: 700;

}

.qst-textarea {
		display: flex;
		flex-direction: column;
		margin-bottom: 30px;
}

.qst-textarea label {
		font-size: 20px !important;
		font-weight: 600 !important;
}

.qst-textarea textarea {
		margin-top: 15px;
		border: 1px #99999980 solid;
		font-size: 18px;
		font-weight: 500;
}

@media (min-width: 992px) {
    .qst-textarea textarea {
      font-size: 20px;
    }

    .qst-textarea-preview {
      font-size: 20px;
    }
    .qst-detail-text-noedit {
        font-size: 20px;
				display: block;
    }
    .qst-detail-text-noedit-span {
        font-size: 20px;
        margin-bottom: 0;
    }

    .qst-textarea .vue-form-label{
        font-size: 20px !important;
    }
}

</style>