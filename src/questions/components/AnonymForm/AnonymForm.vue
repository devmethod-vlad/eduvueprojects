<template>
  <div class="qst-anonymform-wr">
    <form
        class="qst-anonymform"
        method="post"
        @submit.prevent="validateAnonymForm"
    >
      <div class="vue-form-item">
        <label
            for="qst-anonymform-fio-input"
            class="vue-form-label"
        >
          Ваше имя *:
        </label>
        <input
            id="qst-anonymform-fio-input"
            v-model="fioInput"
            :class="{ 'vue-input-error': fioErrorStyle }"
            class="vue-form-control"
            name="qst-anonymform-fio-input"
            placeholder="Иванов Иван Иванович"
            type="text"
            @focus="onFocus('fio')"
        >
      </div>

      <div class="vue-form-item">
        <label
            for="qst-anonymform-muname-input"
            class="vue-form-label"
        >
          Название вашей медицинской организации *:
        </label>
        <input
            id="qst-anonymform-muname-input"
            v-model="munameInput"
            :class="{ 'vue-input-error': munameErrorStyle }"
            class="vue-form-control"
            name="qst-anonymform-muname-input"
            placeholder="ГП 001"
            type="text"
            @focus="onFocus('muname')"
        >
      </div>

      <div class="vue-form-item">
        <label
            for="qst-anonymform-question-input"
            class="vue-form-label"
        >
          Ваш вопрос *:
        </label>
        <textarea
            id="qst-anonymform-question-input"
            v-model="questionInput"
            :class="{ 'vue-input-error': questionErrorStyle }"
            class="vue-form-control"
            name="qst-anonymform-question-input"
            placeholder="Подробно опишите вашу проблему"
            rows="3"
            style="resize: none;"
            type="text"
            @focus="onFocus('question')"
        ></textarea>
      </div>

      <div class="qst-anonymform-contacts-title">
        Укажите контакты для обратной связи:
      </div>

      <div class="qst-anonymform-contacts-wr">
        <div class="vue-form-item qst-anonymform-mail">
          <input
              id="qst-anonymform-mail-input"
              v-model="mailInput"
              :class="{ 'vue-input-error': mailErrorStyle }"
              class="vue-form-control"
              name="qst-anonymform-mail-input"
              placeholder="example@mail.ru"
              type="text"
              @focus="onFocus('mail')"
          >
        </div>

        <div class="vue-form-item qst-anonymform-phone">
          <input
              id="qst-anonymform-phone-input"
              v-model="phoneInput"
              v-maska="maskedObject"
              :class="{ 'vue-input-error': phoneErrorStyle }"
              class="vue-form-control"
              data-maska="8(###)###-##-##"
              name="qst-anonymform-phone-input"
              placeholder="8(___)___-__-__"
              type="text"
              @focus="onFocus('phone')"
          >
        </div>
      </div>

      <template v-if="warningActive || saveError">
        <div class="qst-anonymform-warning-panel">
          <info-text-panel
              :text="warningInfo"
              textmode="warning"
          />
        </div>
      </template>

      <div class="vue-form-item">
        <button
            :disabled="isSubmitting"
            class="vue-btn vue-btn-normal"
            :class="{ 'is-disabled': isSubmitting }"
            type="submit"
        >
          Отправить
        </button>
      </div>
    </form>

    <template v-if="submitText !== ''">
      <submit-message
          :text="submitText"
          @closesubmitmessage="() => { submitText = ''; }"
      />
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { vMaska } from 'maska';

import InfoTextPanel from '@/questions/components/InfoTextPanel/InfoTextPanel.vue';
import SubmitMessage from '@/questions/components/SubmitMessage/SubmitMessage.vue';
import { saveAnonQuest } from '@/questions/components/AnonymForm/services/saveanonymquestion';
import { app_config } from '@/questions/config/setconfig';
import { cleanInputText } from '@/questions/services/cleaninputtext';

const MAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const fioErrorStyle = ref(false);
const munameErrorStyle = ref(false);
const questionErrorStyle = ref(false);
const mailErrorStyle = ref(false);
const phoneErrorStyle = ref(false);

const fioInput = ref('');
const munameInput = ref('');
const questionInput = ref('');
const mailInput = ref('');
const phoneInput = ref('');

const warningInfo = ref('');
const submitText = ref('');
const userfingerprintid = ref('');
const spaceKey = ref('');

const saveError = ref(false);
const isSubmitting = ref(false);

const maskedObject = reactive({});

const resetWarnings = () => {
  saveError.value = false;
  warningInfo.value = '';
  fioErrorStyle.value = false;
  munameErrorStyle.value = false;
  questionErrorStyle.value = false;
  mailErrorStyle.value = false;
  phoneErrorStyle.value = false;
};

const resetInputs = () => {
  fioInput.value = '';
  munameInput.value = '';
  questionInput.value = '';
  mailInput.value = '';
  phoneInput.value = '';
};

const getFingerPrint = async () => {
  const fp = await FingerprintJS.load();
  const resultfp = await fp.get();
  const { canvas, screenResolution, ...components } = resultfp.components;
  const visitorId = FingerprintJS.hashComponents(components);

  userfingerprintid.value = visitorId;
};

const saveAnonymQuestion = async () => {
  try {
    const saveAnswer = await saveAnonQuest(saveParams.value);
    console.log('saveAnswer: ', saveAnswer);

    if (saveAnswer.status === 'ok') {
      submitText.value = 'Ваш вопрос успешно отправлен';
      resetInputs();
      return;
    }

    saveError.value = true;
    warningInfo.value = 'При попытке сохранить вопрос возникла ошибка. Попробуйте обновить страницу или повторить попытку позже';
  } catch (error) {
    console.error(error);
    saveError.value = true;
    warningInfo.value = 'При попытке сохранить вопрос возникла ошибка. Попробуйте обновить страницу или повторить попытку позже';
  }
};

const validateAnonymForm = async () => {
  if (isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;
  resetWarnings();

  let validFlag = true;
  let mailMatchFlag = true;

  if (!mailInput.value.match(MAIL_FORMAT)) {
    mailMatchFlag = false;
  }

  const cleanFio = cleanInputText(fioInput.value);
  if (cleanFio === '') {
    validFlag = false;
    fioErrorStyle.value = true;
  }

  const cleanMuName = cleanInputText(munameInput.value);
  if (cleanMuName === '') {
    validFlag = false;
    munameErrorStyle.value = true;
  }

  const cleanQuestionText = cleanInputText(questionInput.value);
  if (cleanQuestionText === '') {
    validFlag = false;
    questionErrorStyle.value = true;
  }

  if (!maskedObject.completed && !mailMatchFlag) {
    validFlag = false;
    mailErrorStyle.value = true;
    phoneErrorStyle.value = true;
  }

  if (mailInput.value !== '' && !mailMatchFlag) {
    validFlag = false;
    mailErrorStyle.value = true;
  }

  if (
      maskedObject.unmasked
      && maskedObject.unmasked !== ''
      && maskedObject.completed
      && !maskedObject.completed
  ) {
    validFlag = false;
    phoneErrorStyle.value = true;
  }

  if (!validFlag) {
    warningInfo.value = 'Проверьте заполнение формы. Некоторые поля не заполнены или заполнены неверно.';
    isSubmitting.value = false;
    return;
  }

  try {
    await saveAnonymQuestion();
  } finally {
    isSubmitting.value = false;
  }
};

const onFocus = (target) => {
  if (target === 'fio') {
    fioErrorStyle.value = false;
  }

  if (target === 'muname') {
    munameErrorStyle.value = false;
  }

  if (target === 'question') {
    questionErrorStyle.value = false;
  }

  if (target === 'phone') {
    phoneErrorStyle.value = false;
  }

  if (target === 'mail') {
    mailErrorStyle.value = false;
  }
};

const checkSpaceKey = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.get(app_config.getParams.spacekey)) {
    if (urlParams.get(app_config.getParams.spacekey) !== '') {
      spaceKey.value = urlParams.get(app_config.getParams.spacekey);
    }
  }

  if (spaceKey.value === '') {
    const storageSpaceKey = app_config.localStorage.eduQuestionSpaceKey.key;
    const storageValue = localStorage.getItem(storageSpaceKey);

    if (storageValue) {
      const spaceLocalStore = JSON.parse(storageValue);

      if (spaceLocalStore.spaceKey && spaceLocalStore.spaceKey !== '') {
        spaceKey.value = spaceLocalStore.spaceKey;
      }
    }
  }
};

const warningActive = computed(() => {
  return [
    fioErrorStyle.value,
    munameErrorStyle.value,
    questionErrorStyle.value,
    mailErrorStyle.value,
    phoneErrorStyle.value,
  ].some(Boolean);
});

const saveParams = computed(() => {
  return {
    fio: fioInput.value,
    muname: munameInput.value,
    question_text: questionInput.value,
    phone: maskedObject.unmasked,
    mail: mailInput.value,
    userfingerprintid: userfingerprintid.value,
    spacekey: spaceKey.value,
  };
});

onMounted(async () => {
  await getFingerPrint();
  checkSpaceKey();
});
</script>

<style scoped>
.vue-form-item button.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.qst-anonymform-contacts-title {
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
}

.qst-anonymform-warning-panel {
  margin-bottom: 20px;
}

.qst-anonymform-contacts-wr {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.qst-anonymform-wr label {
  font-size: 20px !important;
  font-weight: 400 !important;
}

.qst-anonymform-wr input::placeholder {
  font-size: 20px !important;
  font-weight: 400 !important;
  color: #999999 !important;
}

.qst-anonymform-wr textarea::placeholder {
  font-size: 20px !important;
  font-weight: 400 !important;
  color: #999999 !important;
}

.qst-anonymform-wr .vue-form-control {
  font-size: 19px !important;
  font-weight: 400 !important;
}

@media (min-width: 992px) {
  .qst-anonymform-contacts-wr {
    flex-direction: row;
    justify-content: space-between;
  }

  .qst-anonymform-mail,
  .qst-anonymform-phone {
    width: 47%;
  }
}
</style>
