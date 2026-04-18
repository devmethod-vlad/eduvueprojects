<template>
  <div class="download-item-wr" :class="{'disabled-custom':itemDisabled}">
    <div v-if="!attachPortalVisible" @click="openAttachSpace()"
         class="download-item-icon" :class="{'disabled-custom': isDownloadActive || isAttachActive}"
         v-tippy="{ content: 'Прикрепить к странице портала', placement : 'top-start' }"
    >
      <app-icon name="clip"
                :size="20"
                color="#1e8686"
      />
    </div>
    <div v-else @click="openAttachSpace()"
         class="download-item-icon icon-gray-border" :class="{'disabled-custom': isDownloadActive || isAttachActive}"
         v-tippy="{ content: 'Скрыть', placement : 'top-start' }"
    >
      <app-icon name="clip"
                :size="20"
                color="#808080FF"
      />
    </div>
    <div v-if="!isDownloadActive && !isAttachActive && !isDownloadError" @click="downloadStat()"
         class="download-item-icon icon-margin-left" :class="{'disabled-custom': isDownloadActive || isAttachActive}"
    >
      <app-icon name="download-alt"
                :size="20"
                color="#1e8686"
      />
    </div>
    <div v-if="isDownloadError" class="error-item-icon icon-margin-left"
         v-tippy="{ content: downloadInfoText, placement : 'top-start' }"
    >
      <app-icon name="exclamation-circle"
                :size="40"
                color="#dc3545"
      />
    </div>
    <div v-if="isDownloadActive" class="download-process-icon icon-margin-left">
      <img width="40" height="40"
           :src="downloadIconSrc" alt="Загрузка..." />
    </div>
    <div v-if="isAttachActive" class="download-process-icon icon-margin-left">
      <img width="40" height="40"
           :src="app_config.apiUrl+app_config.loadingSrc" alt="Загрузка..." />
    </div>

    <div class="download-item-title" :class="{'disabled-custom': isDownloadActive || isAttachActive}">
      {{ itemTitle }}
    </div>
  </div>
  <div v-if="attachPortalVisible" class="attach-to-portal-wr"
       :class="{'disabled-custom': isDownloadActive || isAttachActive}"
  >
    <div v-if="attachInfoText !== ''" class="attachtoportal-info-text-wr"
         :class="{'infotext-warn-style': infoTextWarnStyle}"
    >
      {{ attachInfoText }}
    </div>
    <div class="vue-form-item attach-to-portal-id-wr">
      <label for="attachtoportal-pageid-input" class="vue-form-label">
        <strong>
          ID страницы портала *:
        </strong>
      </label>
      <input @:focus="processOnFosus('pageid')" type="number"
             class="vue-form-control" :class="{'vue-input-error':errorStylePageId}"
             name="attachtoportal-pageid-input" id="attachtoportal-pageid-input"
             v-model="pageIdInput"
      >
    </div>
    <div class="vue-form-item attach-to-portal-filename-wr">
      <label for="attachtoportal-filename-input" class="vue-form-label">
        <strong>
          Название файла :
        </strong>
      </label>
      <input @:focus="processOnFosus('filename')" :placeholder="defaultFileName"
             class="vue-form-control" :class="{'vue-input-error':errorStyleFileName}"
             name="attachtoportal-filename-input" id="attachtoportal-filename-input"
             v-model="fileNameInput"
      >
    </div>

    <div class="vue-form-item attach-to-portal-button-wr">
      <button v-if="!isDownloadActive" @click="validateAttach()"
              type="button" class="vue-btn vue-btn-normal"
      >
        Прикрепить
      </button>
      <button v-else type="button"
              class="vue-btn vue-btn-normal"
      >
        Прикрепляем файл
      </button>
    </div>

  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {app_config} from "@/projects/config/setconfig";
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";

// EMITS
const emits = defineEmits(['startactive', 'stopactive', 'open', 'close']);

// PROPS
const props = defineProps({
  statType: {
    type: String,
    default: ''
  },

  surveyId: {
    type:Number,
    default: 0
  },
  itemDisabled: {
    type: Boolean,
    default: false
  },
  attachSpaceProp: {
    type: Boolean,
    default: false,
  }
});


// DATA
const isDownloadError = ref(false);
const attachInfoText = ref('');
const downloadInfoText = ref('');
const infoTextWarnStyle = ref(false);
const isDownloadActive = ref(false);
const isAttachActive = ref(false);
const fileNameInput = ref('');
const attachPortalVisible = ref(false);
const pageIdInput = ref(0);
const errorStylePageId = ref(false);
const errorStyleFileName = ref(false);

// METHODS
const openAttachSpace = ()=>{
  isDownloadError.value = false;
  downloadInfoText.value = '';
  infoTextWarnStyle.value = false;
  attachInfoText.value = '';

  if(attachPortalVisible.value){
    attachPortalVisible.value = false;
    emits('close');
  }
  else {
    attachPortalVisible.value = true;
    emits('open', props.statType);
  }

};

const processOnFosus = (target)=>{
  isDownloadError.value = false;
  downloadInfoText.value = '';
  infoTextWarnStyle.value = false;
  attachInfoText.value = '';

  if(target === 'pageid'){
    errorStylePageId.value = false
  }
};

const validateAttach = ()=>{
  isDownloadError.value = false;
  downloadInfoText.value = '';
  infoTextWarnStyle.value = false;
  attachInfoText.value = '';

  let flag = true;

  let digitRegex = /\d$/g;

  let idMatch = pageIdInput.value.toString().match(digitRegex);

  if(pageIdInput.value === 0 || !idMatch){
    flag = false;
    errorStylePageId.value = true;
  }
  if(flag){
    attachFile();
  }

};


const attachFile = async()=>{

  emits('startactive', props.statType);

  isDownloadError.value = false;
  downloadInfoText.value = '';
  isAttachActive.value = true;
  infoTextWarnStyle.value = false;
  attachInfoText.value = '';

  let filename = defaultFileName.value;
  let clearFileInput = await fileNameInput.value.replace(/\s/g, '').replace(/\r?\n|\r/g, '').replace('.','_');
  if (clearFileInput.length < 255 && clearFileInput !== ''){
    filename = clearFileInput;
  }

  try {
    let resp = await fetch(app_config.apiUrl+'/getstat/', {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({"surveyid":this.surveyId, "filename": filename,
        "statskind": props.statType, "action": "surveyattachstat", "edupageid": pageIdInput.value})
    });

    let answer = await resp.json();

    await console.log("sendToEdu answer: ", answer);

    if (answer['status'] ==='ok'){
      isAttachActive.value = false;
      attachInfoText.value = 'Вы успешно прикрепили файл статистики с транице портала';
    }
    else {
      isAttachActive.value = false;
      infoTextWarnStyle.value = true;
      attachInfoText.value = 'При попытке прикрепить файл к порталу произошла ошибка!';
      if (answer['error_mess'] ){
        attachInfoText.value = attachInfoText.value + ' Текст ошибки: '+answer['error_mess'];
      }
    }

  }
  catch (e) {
    isAttachActive.value = false;
    infoTextWarnStyle.value = true;
    attachInfoText.value = 'При попытке прикрепить файл к порталу произошла ошибка! Текст ошибки: '+e;
  }
  emits('stopactive');
};

const downloadStat = async()=>{

  emits('startactive', props.statType);

  isDownloadError.value = false;
  downloadInfoText.value = '';
  isDownloadActive.value = true;
  infoTextWarnStyle.value = false;
  attachInfoText.value = '';

  try {
    let resp = await fetch(app_config.apiUrl+'/getstat/', {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({"surveyid":props.surveyId, "filename": defaultFileName.value,
        "statskind": props.statType, "action": "surveydownloadstat"})
    });
    await console.log("downloadStat resp: ", resp.status)

    if(resp.status.toString() !== '200'){

      isDownloadActive.value = false;
      isDownloadError.value = true;
      downloadInfoText.value = 'В процессе загрузки файла возникла проблема!';
    }
    else{
      let repAnswer = await resp.blob();

      console.log("downloadStats answer: ", repAnswer)

      let fileUrl = await URL.createObjectURL(repAnswer);

      console.log("downloadStats answer fileUrl : ", fileUrl);

      let link = await document.createElement("a");
      link.href = fileUrl;
      link.download = defaultFileName.value + ".xlsx";
      await document.body.appendChild(link);
      await link.click();
      await document.body.removeChild(link);

      isDownloadActive.value = false;
    }

  }
  catch (e) {
    console.log(e);
    isDownloadActive.value = false;
    isDownloadError.value = true;
    downloadInfoText.value = e;
  }
  emits('stopactive');
}

// COMPUTED
const downloadIconSrc = computed(()=>{
  return app_config.apiUrl+"/static/imgs/download-icon.gif"
})

const itemTitle = computed(()=>{
  if (props.statType === 'completestat'){
    return 'Полная подробная статистика';
  }
  else if (props.statType === 'simplestat') {
    return 'Простая статистика (сдал/не сдал, % правильных ответов)';
  }
  else if (props.statType === 'simplestatattempts') {
    return 'Простая статистика (сдал/не сдал, % правильных ответов) по каждой попытке';
  }
  else if (props.statType === 'statpercent') {
    return 'Статистика по каждому человеку с % процентом правильных ответов';
  }
  else if (props.statType === 'statpercentattempt') {
    return 'Статистика по каждому человеку с % процентом ответов по каждой попытке';
  }
  else if (props.statType === 'groupstat') {
    return 'Статистика по группам вопросов';
  }
  else if (props.statType === 'questionstat'){
    return 'Статистика по каждому вопросу';
  }
  else{
    return '';
  }
});

const defaultFileName = computed(()=>{
  if (props.statType === 'completestat'){
    return 'полная_статистика';
  }
  else if (props.statType === 'simplestat') {
    return 'простая_статистика';
  }
  else if (props.statType === 'simplestatattempts') {
    return 'простая_статистика_попытки';
  }
  else if (props.statType === 'statpercent') {
    return 'статистика_процент_по_каждому';
  }
  else if (props.statType === 'statpercentattempt') {
    return 'статистика_процент_по_каждому_попытки';
  }
  else if (props.statType === 'groupstat') {
    return 'статистика_по_группам_вопросов';
  }
  else if (props.statType === 'questionstat'){
    return 'статистика_по_вопросам';
  }
  else{
    return '';
  }
});

// WATCH
watch(
    ()=>props.attachSpaceProp,
    (newValue) => {
      attachPortalVisible.value = newValue;
      isDownloadError.value = false;
      downloadInfoText.value = '';
      infoTextWarnStyle.value = false;
      attachInfoText.value = '';
    },
    {deep: true}
);
</script>

<style>
.unicon {
  display: flex;
}
</style>

<style scoped>
.attach-to-portal-button-wr button{
  width: 30%;
}

.infotext-warn-style {
  color: #dc3545 !important;
}

.attachtoportal-info-text-wr {
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  color: #1e8686;
}

.download-process-icon {
  cursor: pointer;
}

.disabled-custom {
  pointer-events: none !important;
  opacity: 0.4 !important;
}

.icon-margin-left {
  margin-left: 15px;
}
.icon-gray-border {
  border: 2px #808080FF solid !important;
}
.icon-gray-border:hover {
  border: 2px #4D4D4DFF solid !important;
}
.error-item-icon {
  cursor: pointer;
}

.download-item-icon {
  cursor: pointer;
  padding: 5px;
  border: 2px #1e8686 solid;
  border-radius: 50%;
}
.download-item-icon:hover {
  border: 2px #176C6CFF solid;
}

.download-item-title {
  padding-left: 15px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
  color: #1e8686;
}

.download-item-wr {
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

</style>