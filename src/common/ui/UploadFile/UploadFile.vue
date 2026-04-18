<template>
      <div class="qst-detail-uploader-container">
          <div class="qst-detail-upload-dpoparea-wr">
              <label ref="dropArea" class="qst-detail-uploader-droparea-label"
										 :for="props.elementId">
									<span class="qst-uploader-droparea-label-icon">
											<app-icon
															name="clip"
															:size="20"
                              color="#269999"
											/>
									</span>
									<span class="qst-uploader-droparea-label-text-wr">
											<template v-if="showMode === 'modal'">
                        <template v-if="props.totalfilescount === 1">
                          <span class="qst-uploader-droparea-label-text-top">
															<span class="qst-uploader-droparea-label-span">Выберите файл для загрузки</span>
													</span>
													<span class="qst-uploader-droparea-label-text-bottom">
															Размер файла - не более {{ props.maxfilesize.toString() }} Мб
													</span>
                        </template>

                        <template v-else>
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

											</template>

											<template v-if="showMode === 'panel'">

                        <template v-if="props.totalfilescount === 1">
                          <span class="qst-uploader-droparea-label-text-top">
															<span class="qst-uploader-droparea-label-span">Выберите файл для загрузки</span>&nbsp;или перетащите его сюда
													</span>
													<span class="qst-uploader-droparea-label-text-bottom">
															Размер файла - не более {{ props.maxfilesize.toString() }} Мб
													</span>
                        </template>

                        <template v-else>
                          <span class="qst-uploader-droparea-label-text-top">
															<span class="qst-uploader-droparea-label-span">Выберите файлы</span>&nbsp;или перетащите их сюда
													</span>
													<span class="qst-uploader-droparea-label-text-bottom">
															Можно добавить до {{ props.maxsimulcount.toString() }} файлов одновременно. Размер каждого не более {{ props.maxfilesize.toString() }} Мб
													</span>
                        </template>

											</template>

									</span>

									</label>
              <input type="file"
                     ref="fileinput"
                     style="display: none;"
										 :id="props.elementId" class="vue-btn vue-btn-normal"
										 multiple
                     @change="(e)=>handleUploadButton(e)"
                     @click="fileinput.value = null"
              >
          </div>
      </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {onMounted, ref} from "vue";

const highlightDropClass = 'qst-drop-highlight';
const emits = defineEmits(['uploadfiles', 'handledrop', 'handlebutton', 'emitsimulattachs']);

// PROPS
const props = defineProps({
    allowExtensions:
      {
        type: Array,
        default(){
          return []
        }
      },

    maxsimulcount:
        {
            type: Number,
            default: 5
        },

		totalfilescount:
				{
            type: Number,
            default: 10
				},

		maxfilesize:
				{
            type: Number,
            default: 2
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
            }
				},

    // question.$state.order_attachments
    currentAttachs:
        {
          type: Array,
          default(){
            return [];
          }
        },
    // question.$state.order_simul_files
    currentSimulAttachs:
      {
        type: Number,
        default: 0
      },

    elementId:
        {
          type: String,
          default: 'edu-upload-droparea'
        }

});

// DATA
const dropArea = ref(null);
const newFiles = ref([]);
const denyFiles = ref([]);
const infoTextArr = ref([]);

const showMode = ref('panel');
const fileinput = ref(null);

// METHODS
const getFilename =(str)=> {
    return str.substring(str.lastIndexOf('/')+1);
}

const getFileExtension = (filename) => {

  let extension = filename.split('.').pop();
  return extension;
}

const getExistFileName = (attach_arr, new_attach_array)=> {
    let exist_arr = [];
    if (attach_arr.length !==0 ){
        attach_arr.forEach((item)=>{
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

    console.log("Files: ", files);

    newFiles.value = props.initstore.new_files;
    denyFiles.value = props.initstore.deny_files;
    infoTextArr.value = props.initstore.info_array;

    let exist_fnames = [];

    exist_fnames = getExistFileName(props.currentAttachs, newFiles.value);

    let iterNewFiles =[];

    let exist_files_count = exist_fnames.length;

    let copyFlag = false;

    let sizeFlag = false;

    let extFlag = false;

    Array.prototype.forEach.call(files, (fItem, index)=>{

        let fileExt = getFileExtension(fItem.name);

        if(exist_fnames.includes(fItem.name)){
            denyFiles.value.push({'filename': fItem.name, 'deny_reason': 'name_copy'});
            copyFlag = true;
        }
        else if((fItem.size/1000000)>Number(props.maxfilesize)){
            denyFiles.value.push({'filename': fItem.name, 'deny_reason': 'file_size', 'size': (fItem.size/1000000)});
            sizeFlag = true;
        }
        else if(props.allowExtensions.length !==0 && !props.allowExtensions.includes(fileExt)){
          denyFiles.value.push({'filename': fItem.name, 'deny_reason': 'file_ext'});
          extFlag = true;
        }

        else {
            iterNewFiles.push(fItem);
				}

		});

    if(copyFlag){
      if(!infoTextArr.value.includes('Файл с подобным название уже добавлен')){
        infoTextArr.value.push('Файл с подобным название уже добавлен');
      }
		}

    if (sizeFlag){
        if(!infoTextArr.value.includes('Превышен допустимый размер файла - '+props.maxfilesize.toString() + ' Мб')){
            infoTextArr.value.push('Превышен допустимый размер файла - '+props.maxfilesize.toString() + ' Мб');
				}
		}

  if (extFlag){
    if(!infoTextArr.value.includes('Недопустимый формат файла')){
      infoTextArr.value.push('Недопустимый формат файла');
    }
  }

    console.log("iterNewFiles.length: ", iterNewFiles.length);

    if(iterNewFiles.length !==0){
        if (iterNewFiles.length> Number(props.maxsimulcount)){
            iterNewFiles = iterNewFiles.slice(0, Number(props.maxsimulcount));
            if(!infoTextArr.value.includes('Нельзя добавлять одновременно более '+props.maxsimulcount.toString()+' файлов')){
                infoTextArr.value.push('Нельзя добавлять одновременно более '+props.maxsimulcount.toString()+' файлов');
						}
        }
		}

    emits('emitsimulattachs', props.currentSimulAttachs + iterNewFiles.length);

    if(iterNewFiles.length !==0){
      if (props.currentSimulAttachs > Number(props.maxsimulcount)){

        let simulDiff = props.currentSimulAttachs - Number(props.maxsimulcount);
        if (iterNewFiles.length === 1){
          iterNewFiles = [];
        }
        else{
          iterNewFiles = iterNewFiles.slice(0, simulDiff);
        }

        emits('emitsimulattachs', props.currentSimulAttachs - simulDiff);

        if(!infoTextArr.value.includes('Нельзя добавлять одновременно более '+props.maxsimulcount.toString()+' файлов')){
          infoTextArr.value.push('Нельзя добавлять одновременно более '+props.maxsimulcount.toString()+' файлов');
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

      if (sum_files > Number(props.totalfilescount)){
        if(!infoTextArr.value.includes('Нельзя добавить более '+props.totalfilescount.toString()+' файлов')){
          infoTextArr.value.push('Нельзя добавить более '+props.totalfilescount.toString()+' файлов');
        }
      }
		}
    if (iterNewFiles.length !==0){
        newFiles.value.push.apply(newFiles.value, iterNewFiles);
		}

    emits('uploadfiles', {newFiles: newFiles.value, denyFiles: denyFiles.value, infoTextArr: infoTextArr.value})
}


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
@import "@/common/ui/UploadFile/css/uploadfile.css";
</style>