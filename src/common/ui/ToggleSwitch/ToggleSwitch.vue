<template>
  <div class="edu-switch-container">
    <div class="edu-switch-wr">
      <label class="edu-switch"
             :class="{'edu-switch-small': props.size === 'small', 'edu-switch-middle': props.size === 'middle'}"
      >
        <input
            type="checkbox"
            v-model="checkToggle"
        >
        <span
            class="edu-slider edu-slider-round"
            :class="{'edu-slider-small': props.size === 'small', 'edu-slider-middle': props.size === 'middle'}"
        ></span>
      </label>
    </div>
    <template v-if="props.ontext !== '' || props.offtext !== ''">
      <div
          class="edu-switch-text"
          :class="{'edu-switch-text-small': props.size === 'small', 'edu-switch-text-middle': props.size === 'middle'}"
      >
        <template v-if="checkToggle">
          {{ props.ontext }}
        </template>
        <template v-else>
          {{ props.offtext }}
        </template>
      </div>
    </template>
  </div>
</template>

<script setup>

// EMITS
import {ref, watch} from "vue";

const emits = defineEmits(['emiton', 'emitoff']);

// PROPS
const props = defineProps({
  ontext:
      {
        type: String,
        default: '',
      },
  offtext:
      {
        type: String,
        default: '',
      },
  // small middle large
  // default large
  size:
      {
        type: String,
        default: '',
      }
});

// DATA
const checkToggle = ref(false);

// WATCH
watch(
    checkToggle,
    () => {
      if(checkToggle.value){
        emits('emiton');
      }
      else {
        emits('emitoff');
      }
    },
    {immediate: true}
);

</script>

<style scoped>
.edu-switch-text {
  padding-left: 20px;
  font-size: 20px;
}

.edu-switch-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.edu-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.edu-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.edu-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.edu-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .edu-slider {
  background-color: #269999;
}

input:focus + .edu-slider {
  box-shadow: 0 0 1px #269999;
}

input:checked + .edu-slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.edu-slider.edu-slider-round {
  border-radius: 34px;
}

.edu-slider.edu-slider-round:before {
  border-radius: 50%;
}
</style>