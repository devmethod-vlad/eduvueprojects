<template>
	<div class="qst-feedback-form-wr">
      <form @submit.prevent="validate()" method="post"
						class="vuestafform"
      >
          <fieldset class="vue-fieldset">
              <div class="vue-form-item">
                  <label for="feedback-form-text-input" class="vue-form-label">Текст</label>
                  <textarea @:focus="onFocus('text')" class="vue-form-control"
                            :class="{'vue-input-error': errorStyleText}" name="feedback-form-text-input"
                            id="feedback-form-text-input" v-model="textInput">
                  </textarea>
              </div>
              <div class="vue-form-item">
                  <button type="submit" class="vue-btn vue-btn-normal">Отправить</button>
              </div>
          </fieldset>
      </form>
	</div>
</template>

<script setup>
import {ref} from "vue";

// DATA
const textInput = ref('');
const errorStyleText = ref(false);

// METHODS
const validate = ()=>{
  let sendFlag = true;
  if (textInput.value ==='' || textInput.value === 'Укажите текст сообщения'){
    textInput.value = 'Укажите текст сообщения';
    errorStyleText.value = true;
    sendFlag=false;
  }

  if (sendFlag){
    sendFeedback();
  }
}

const sendFeedback = ()=>{
  console.log("send feedback");
}

const onFocus = (target)=>{
  if(target === 'text'){
    if(textInput.value === 'Укажите текст сообщения'){
      textInput.value = '';
    }
    errorStyleText.value = false;
  }
}
</script>

<style scoped>
@import "@/questions/components/FeedbackForm/css/feedbackform.css";
</style>