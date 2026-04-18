<template>
    <div class="qst-detail-filezone-files-item">

        <div class="qst-filezone-item-badge">
            <file-badge
                    :filename="props.filename"
            />
        </div>

        <VTooltip theme="qst-standart-tooltip">
        <div class="qst-filezone-files-item-text" :class="{'filezone-item-warnstyle': props.warnstyle}">
            {{ renderFileName }} | <span class="qst-fileitem-filesize">{{ renderFileSize }} Мб</span>
        </div>
            <template #popper>
                {{ props.filename }}
            </template>
        </VTooltip>
        <div @click="deleteFile()" class="qst-filezone-files-item-closeicon">
            <app-icon
              name="close"
              :size="16"
            />
        </div>
    </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import FileBadge from "@/questions/components/QuestionDetail/components/FileBadge/FileBadge.vue";
import { useNewQuestionStore } from "@/questions/store/newquestion";
import {computed} from "vue";
import {useActiveQuestionStore} from "@/questions/store/activequestion";

// EMITS
const emits = defineEmits(['deleteitem']);

// PROPS
const props = defineProps({
    filename:
        {
            type:String,
            default: '',
            required: true
        },

    filesize:
        {
            type:Number,
            default: 0,
            required: true
        },

    warnstyle:
        {
            type: Boolean,
            default: false,
            required: true
        },

		denyreason:
				{
            type: String,
            default: ''
				},

		fileindex:
				{
            type: Number,
            default: null
				},

    target:
      {
          type: String,
          default: '',
          required: true
      }
});

// STORE
const activeStore = useActiveQuestionStore();
const newQuestion = useNewQuestionStore();


// METHODS
const deleteFile = ()=>{

    let copyActiveQuestionStore = {...activeStore.$state};
    let copyNewQuestion = {...newQuestion.$state};

    if(props.warnstyle && props.denyreason !==''){

        if(props.target === 'question'){
            copyActiveQuestionStore.deny_order_upload_files.splice(props.fileindex, 1);
            copyActiveQuestionStore.upload_order_infoarray = [];
        }
        else if(props.target === 'answer'){
            copyActiveQuestionStore.deny_answer_upload_files.splice(props.fileindex, 1);
            copyActiveQuestionStore.upload_answer_infoarray = [];
        }
        else if(props.target === 'newquestion' || props.target === 'fastquestion' || props.target === 'feedback'){
            copyNewQuestion.deny_upload_files.splice(props.fileindex, 1);
            copyNewQuestion.upload_infoarray = [];
        }
        else if(props.target === 'fastquestion_answer'){
          copyNewQuestion.deny_answer_upload_files.splice(props.fileindex, 1);
          copyNewQuestion.upload_answer_infoarray = [];
        }

		}
    else {
        if(props.target === 'question'){
            copyActiveQuestionStore.new_order_upload_files.splice(props.fileindex, 1);
            if(copyActiveQuestionStore.order_simul_files !==0 ){
                copyActiveQuestionStore.order_simul_files = copyActiveQuestionStore.order_simul_files - 1;
            }
        }

        else if(props.target === 'answer'){
            copyActiveQuestionStore.new_answer_upload_files.splice(props.fileindex, 1);
            if(copyActiveQuestionStore.answer_simul_files !==0 ){
                copyActiveQuestionStore.answer_simul_files = copyActiveQuestionStore.answer_simul_files - 1;
            }
        }

        else if(props.target === 'newquestion' || props.target === 'fastquestion' || props.target === 'feedback'){
            copyNewQuestion.new_upload_files.splice(props.fileindex, 1);
            if(copyNewQuestion.simul_new_files !==0 ){
                copyNewQuestion.simul_new_files = copyNewQuestion.simul_new_files - 1;
            }
        }
        else if(props.target === 'fastquestion_answer'){
          copyNewQuestion.new_answer_upload_files.splice(props.fileindex, 1);
          if(copyNewQuestion.simul_answer_new_files !==0 ){
            copyNewQuestion.simul_answer_new_files = copyNewQuestion.simul_answer_new_files - 1;
          }
        }
		}

    activeStore.$patch(copyActiveQuestionStore);
    newQuestion.$patch(copyNewQuestion);
    emits('deleteitem');
}


// COMPUTED
const renderFileName = computed(()=>{
    if(props.filename.length > 40){
        return props.filename.slice(0,40) + '...';
		}
    else {
        return props.filename;
		}
});

const renderFileSize = computed(()=>{
    if(props.filesize < 0.9){
        return props.filesize.toFixed(3).toString();
		}
    else {
        return props.filesize.toFixed(2).toString();
		}
});

</script>

<style scoped>
.filezone-item-warnstyle {
		color: #E04B37 !important;
}

.qst-detail-filezone-files-item {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
}

.qst-filezone-item-badge {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.qst-filezone-files-item-closeicon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    cursor: pointer;
}

.qst-fileitem-filesize {
    color: #66727F;
}

.qst-filezone-files-item-text {
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    padding-left: 20px;
}
@media (min-width: 992px) {
    .qst-filezone-files-item-text {
        font-size: 20px;
    }
}
</style>