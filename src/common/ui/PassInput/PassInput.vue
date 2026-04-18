<template>
  <div class="edu-pass-input-container">
    <template v-if="props.title !==''">
      <div class="edu-pass-input-title">
        {{ props.title }}
      </div>
    </template>

    <div
        class="edu-pass-input-wr"
        :class="{'edu-pass-input-wr-normal':!props.alert && !inputInFocus, 'edu-pass-input-wr-alert': props.alert, 'edu-pass-input-wr-normal-focus': !props.alert && inputInFocus}"
    >
      <input
          :id="props.inputId"
          :type="inputType"
          class="edu-pass-input"
          maxlength="4"
          @keydown="(event)=>{emits('passPressKey', event)}"
          :value="props.modelValue"
          @input="(event)=>{emits('update:modelValue', event.target.value); emits('onInputEvent', event);}"
          :autocomplete="autocompleteInput"
          @focusin="()=>{inputInFocus = true;emits('passFocusIn')}"
          @focusout="()=>{inputInFocus = false;emits('passFocusOut')}"
          :placeholder="props.placeholder"
      />
      <div
          class="edu-pass-input-icon"
          @click.stop.prevent = "changeInputType()"
      >
        <template v-if="inputType === 'password'">
          <app-icon
              name="eyes-on"
              :size="20"
              color="#999999"
              hover-color="#333333"
          />
        </template>
        <template v-else>
          <app-icon
              name="eyes-off"
              :size="20"
              color="#999999"
              hover-color="#333333"
          />
        </template>
      </div>
    </div>
  </div>

</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {ref} from "vue";

// EMITS
const emits = defineEmits(['update:modelValue', 'passFocusIn', 'passFocusOut', 'passPressKey', 'onInputEvent']);

//DATA

const inputInFocus = ref(false);
const autocompleteInput = ref('new-password');
const inputType = ref('password');

// PROPS
const props = defineProps({
  modelValue:
      {
        type: String,
        default: ''
      },

  title:
      {
        type: String,
        default: ''
      },
  alert:
      {
        type: Boolean,
        default: false
      },
  placeholder:
      {
        type: String,
        default: ''
      },
  inputId:
      {
        type: String,
        default: '',
        required: true
      }

});


// METHODS
const changeInputType = ()=>{
  if(inputType.value === 'password'){
    inputType.value = 'text';
    autocompleteInput.value = 'off';
  }
  else {
    inputType.value = 'password';
    autocompleteInput.value = 'new-password';
  }
}


</script>
<style>
.edu-pass-input-wr input {
  padding: 1px 0px;
  height: auto !important;
}
</style>

<style scoped>
.edu-pass-input-container {
  display: flex;
  flex-direction: column;
}

.edu-pass-input-title {
  text-align: left;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #333333;
  margin-bottom: 8px;
}

.edu-pass-input-wr {
  display: flex;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 6px;
  padding-bottom: 6px;
  flex-direction: row;
  align-items: center;
  background-clip: padding-box;
  appearance: none;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
.edu-pass-input-wr-normal-focus {
  border: 2px #3DCFCF solid;
}

.edu-pass-input-wr-normal {
  border: 1px #999999 solid;
}
.edu-pass-input-wr-alert {
  border: 2px #F05C46 solid !important;
}

.edu-pass-input-wr:hover {
  color: #757575;
}

.edu-pass-input:focus {
  outline: none !important;
}


.edu-pass-input {
  width: 95%;
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
  border: none;
}

.edu-pass-input-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5%;
}

</style>