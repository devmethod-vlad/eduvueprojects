<template>
      <div v-if="['newquestion', 'fastquestion', 'fastquestion_answer', 'feedback'].includes(props.target) || (compPermissions.visible && isVisible)" class="qst-detail-uploader-container">
          <div class="qst-detail-upload-dpoparea-wr">
              <label ref="dropArea" class="qst-detail-uploader-droparea-label"
										 :for="domIdentifier">
									<span class="qst-uploader-droparea-label-icon">
											<app-icon
															name="clip"
															:size="20"
											/>
									</span>
									<span class="qst-uploader-droparea-label-text-wr">
											<template v-if="appStore.$state.questionShowMode === 'modal'">
													<span class="qst-uploader-droparea-label-text-top">
															<span class="qst-uploader-droparea-label-span">Выберите файлы</span>
													</span>
													<span class="qst-uploader-droparea-label-text-middle">
															Можно добавить до {{ props.maxsimulcount.toString() }} файлов одновременно.
													</span>
													<span class="qst-uploader-droparea-label-text-bottom">
															Размер каждого не более {{ props.maxfilesize.toString() }} Мб
													</span>
											</template>

											<template v-if="appStore.$state.questionShowMode==='panel'">
													<span class="qst-uploader-droparea-label-text-top">
															<span class="qst-uploader-droparea-label-span">Выберите файлы</span> или перетащите их сюда
													</span>
													<span class="qst-uploader-droparea-label-text-bottom">
															Можно добавить до {{ props.maxsimulcount.toString() }} файлов одновременно. Размер каждого не более {{ props.maxfilesize.toString() }} Мб
													</span>
											</template>

									</span>

									</label>
              <input type="file" style="display: none;" 
										 :id="domIdentifier" class="vue-btn vue-btn-normal"
										 multiple @change="(e)=>handleUploadButton(e)">
          </div>
      </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {computed, onMounted, ref} from "vue";
import {useAppStore} from "@/questions/store/app";
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import {setCompPermissions} from "@/questions/components/QuestionDetail/services/setcomppermissions";
import {useUserStore} from "@/questions/store/user";
import {useNewQuestionStore} from "@/questions/store/newquestion";

const highlightDropClass = 'qst-drop-highlight';
const emits = defineEmits(['uploadfiles', 'handledrop', 'handlebutton']);

// PROPS
const props = defineProps({
    maxsimulcount:
        {
            type:Number,
            default: 5,
            required: true
        },

		totalfilescount:
				{
            type:Number,
            default: 10,
            required: true
				},

		maxfilesize:
				{
            type:Number,
            default: 2,
            required: true
				},
		target:
				{
						type: String,
						default: '',
						required: true
				},
		initstore:
				{
						type: Object,
            default(){
                return {
                    new_files:[],
										deny_files: [],
										info_array:[],
								}
            },
				}

});

// DATA
const dropArea = ref(null);
const newFiles = ref([]);
const denyFiles = ref([]);
const infoTextArr = ref([]);
const isVisible = ref(true);

// STORE
const question = useActiveQuestionStore();
const userStore = useUserStore();
const appStore = useAppStore();
const newQuestion = useNewQuestionStore();


// METHODS
const getFilename =(str)=> {
    return str.substring(str.lastIndexOf('/')+1);
}


const getExistFileName = (question_attach_arr, new_attach_array)=> {
    let exist_arr = [];
    if (question_attach_arr.length !==0 ){
        question_attach_arr.forEach((item)=>{
            let filename = getFilename(item.path);
            exist_arr.push(filename);
        });
		}
    if (new_attach_array.length !==0 ){
        new_attach_array.forEach((item)=>{
            exist_arr.push(item.name);
        });
		}

    return exist_arr;
}

const preventDefaults = (e)=>{
    e.preventDefault();
    e.stopPropagation();
}

const handleDrop = (e)=>{
    emits('handledrop');
		dropArea.value.classList.remove(highlightDropClass);
		let dt = e.dataTransfer;
		let files = dt.files;
		handleFiles(files);

}

const handleUploadButton = (e)=>{
    emits('handlebutton');
    let files = e.target.files;
    handleFiles(files);
}

const handleFiles = (files)=>{

    newFiles.value = props.initstore.new_files;
    denyFiles.value = props.initstore.deny_files;
    infoTextArr.value = props.initstore.info_array;

    let exist_fnames = [];

    if (props.target === 'question'){
        exist_fnames = getExistFileName(question.$state.order_attachments, newFiles.value);
		}
    else if (props.target === 'answer'){
        exist_fnames = getExistFileName(question.$state.answer_attachments, newFiles.value);
		}
    else if (props.target === 'newquestion' || props.target === 'feedback' || props.target === 'fastquestion'){
        exist_fnames = getExistFileName(newQuestion.$state.attachments, newFiles.value);
    }
    else if (props.target === 'fastquestion_answer'){
      exist_fnames = getExistFileName(newQuestion.$state.answer_attachments, newFiles.value);
    }

    let iterNewFiles =[];

    let exist_files_count = exist_fnames.length;

    // console.log(exist_fnames);
    // console.log(exist_files_count);

    let copyFlag = false;
    let sizeFlag = false;



    Array.prototype.forEach.call(files, (fItem, index)=>{

        if(exist_fnames.includes(fItem.name)){
            denyFiles.value.push({'filename': fItem.name, 'deny_reason': 'name_copy'});
            copyFlag = true;
        }
        else if((fItem.size/1000000)>Number(props.maxfilesize)){
            denyFiles.value.push({'filename': fItem.name, 'deny_reason': 'file_size', 'size': (fItem.size/1000000)});
            sizeFlag = true;
        }
        else {
            iterNewFiles.push(fItem);
				}

		});

    if(copyFlag){
        if(['question', 'newquestion', 'fastquestion', 'feedback'].includes(props.target)){
            if(!infoTextArr.value.includes('Файл с подобным название уже добавлен к вопросу')){
                infoTextArr.value.push('Файл с подобным название уже добавлен к вопросу');
						}

				}
        else if(['answer', 'fastquestion_answer'].includes(props.target)){
            if(!infoTextArr.value.includes('Файл с подобным название уже добавлен к ответу')){
                infoTextArr.value.push('Файл с подобным название уже добавлен к ответу');
						}
				}
		}

    if (sizeFlag){
        if(!infoTextArr.value.includes('Превышен допустимый размер файла - '+props.maxfilesize.toString() + ' Мб')){
            infoTextArr.value.push('Превышен допустимый размер файла - '+props.maxfilesize.toString() + ' Мб');
				}
		}

    // console.log("iterNewFiles.length: ", iterNewFiles.length);

    if(iterNewFiles.length !==0){
        if (iterNewFiles.length> Number(props.maxsimulcount)){
            iterNewFiles = iterNewFiles.slice(0, Number(props.maxsimulcount));
            if(!infoTextArr.value.includes('Нельзя добавлять одновременно более '+props.maxsimulcount.toString()+' файлов')){
                infoTextArr.value.push('Нельзя добавлять одновременно более '+props.maxsimulcount.toString()+' файлов');
						}
        }
		}

    if(props.target === 'newquestion' || props.target === 'fastquestion' || props.target === 'feedback'){
        newQuestion.simul_new_files = newQuestion.$state.simul_new_files + iterNewFiles.length;
		}
    if(props.target === 'question'){
        question.order_simul_files = question.$state.order_simul_files + iterNewFiles.length;
    }
    if(props.target === 'answer'){
        question.answer_simul_files = question.$state.answer_simul_files + iterNewFiles.length;
    }
    if(props.target === 'fastquestion_answer'){
        newQuestion.simul_answer_new_files = newQuestion.simul_answer_new_files + iterNewFiles.length;
    }

    if(iterNewFiles.length !==0){
      if(props.target === 'newquestion' || props.target === 'fastquestion' || props.target === 'feedback'){
        if (newQuestion.$state.simul_new_files> Number(props.maxsimulcount)){

          let simulDiff = newQuestion.$state.simul_new_files - Number(props.maxsimulcount);
          if (iterNewFiles.length === 1){
            iterNewFiles = [];
          }
          else{
            iterNewFiles = iterNewFiles.slice(0, simulDiff);
          }

          newQuestion.simul_new_files = newQuestion.$state.simul_new_files - simulDiff;

          if(!infoTextArr.value.includes('Нельзя добавлять к вопросу одновременно более '+props.maxsimulcount.toString()+' файлов')){
            infoTextArr.value.push('Нельзя добавлять к вопросу одновременно более '+props.maxsimulcount.toString()+' файлов');
          }
        }
      }
      else if (props.target === 'fastquestion_answer'){
        if (newQuestion.$state.simul_answer_new_files> Number(props.maxsimulcount)){

          let simulAnswerDiff = newQuestion.$state.simul_answer_new_files - Number(props.maxsimulcount);
          if (iterNewFiles.length === 1){
            iterNewFiles = [];
          }
          else{
            iterNewFiles = iterNewFiles.slice(0, simulAnswerDiff);
          }

          newQuestion.simul_answer_new_files = newQuestion.$state.simul_answer_new_files - simulAnswerDiff;

            if(!infoTextArr.value.includes('Нельзя добавлять к ответу одновременно более '+props.maxsimulcount.toString()+' файлов')){
              infoTextArr.value.push('Нельзя добавлять к ответу одновременно более '+props.maxsimulcount.toString()+' файлов');
            }
        }
      }
    }

    let new_files_count = iterNewFiles.length;

    let sum_files = exist_files_count+new_files_count;

    if (sum_files >= Number(props.totalfilescount)){
        let diff = sum_files - Number(props.totalfilescount);
        if (diff === new_files_count){
            iterNewFiles = []
				}
        else {
            iterNewFiles = iterNewFiles.slice(0, new_files_count-diff);
				}

        if (['question', 'newquestion', 'fastquestion', 'feedback'].includes(props.target)){
            if(!infoTextArr.value.includes('К вопросу нельзя добавить более '+props.totalfilescount.toString()+' файлов')){
                infoTextArr.value.push('К вопросу нельзя добавить более '+props.totalfilescount.toString()+' файлов');
						}
				}
        else if (['answer', 'fastquestion_answer'].includes(props.target)){
            if(!infoTextArr.value.includes('К ответу на вопрос нельзя добавить более '+props.totalfilescount.toString()+' файлов')){
                infoTextArr.value.push('К ответу на вопрос нельзя добавить более '+props.totalfilescount.toString()+' файлов');
						}
				}
		}
    if (iterNewFiles.length !==0){
        newFiles.value.push.apply(newFiles.value, iterNewFiles);
		}

    emits('uploadfiles', {newFiles: newFiles.value, denyFiles: denyFiles.value, infoTextArr: infoTextArr.value})
}

// COMPUTED
const compPermissions = computed(()=>{
    if(!['newquestion', 'fastquestion', 'fastquestion_answer', 'feedback'].includes(props.target)){
        return setCompPermissions('fileupload', question.$state,props.target, userStore.$state);
		}
    else {
        return {}
		}
});

const domIdentifier = computed(()=>{
    if(props.target ==='newquestion' || props.target === 'feedback'){
        return 'qst-upload-newquestion-droparea';
    }
    else if(props.target ==='question') {
        return 'qst-upload-question-droparea-'+question.$state.order_id.toString();
    }
    else if (props.target ==='fastquestion'){
      return 'qst-upload-fastquestion-droparea';
    }
    else if (props.target ==='fastquestion_answer'){
      return 'qst-upload-fastquestion-answer-droparea';
    }
    else {
        // answer
        return 'qst-upload-answer-droparea-'+question.$state.order_id.toString();
		}
})


// LIFECYCLE
onMounted(()=>{

    if (dropArea.value) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.value.addEventListener(eventName, preventDefaults, false)
        });
        dropArea.value.addEventListener('dragover', ()=>{
            dropArea.value.classList.add(highlightDropClass);
        });
        dropArea.value.addEventListener('dragenter', ()=>{
            dropArea.value.classList.add(highlightDropClass);
        });
        dropArea.value.addEventListener('dragleave', ()=>{
            dropArea.value.classList.remove(highlightDropClass);
        });
        dropArea.value.addEventListener('drop', handleDrop);
    }
});

</script>

<style scoped>
@import "@/questions/components/QuestionDetail/components/UploadFile/css/uploadfile.css";
</style>