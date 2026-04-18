<template>

  <svg
      @mouseenter="onMouseEnter()"
      @mouseleave="color = props.color"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      :viewBox="'0 0 '+props.size.toString()+' '+props.size.toString()"
      fill="none"
  >
    <path
        d="M5.2192 4.62467C4.87419 4.19341 4.94411 3.56412 5.37537 3.21911C5.80663 2.8741 6.43593 2.94402 6.78094 3.37528L10.7809 7.37528C11.0731 7.7405 11.0731 8.25945 10.7809 8.62467L6.78094 12.6247C6.43593 13.0559 5.80663 13.1259 5.37537 12.7808C4.94411 12.4358 4.87419 11.8065 5.2192 11.3753L8.71944 7.99998L5.2192 4.62467Z"
        :fill="color"
    />
  </svg>

</template>

<script setup>

// PROPS
import {ref} from "vue";

const props = defineProps({
  size:
      {
        type: Number,
        default: 48
      },
  color:
      {
        type: String,
        default: '#333333'
      },

  hoverColor:
      {
        type: String,
        default: ''
      },
});

// DATA
const color = ref(props.color);

// METHODS
const onMouseEnter = () => {
  if (props.hoverColor !== '') {
    color.value = props.hoverColor;
  }
}

</script>

<style scoped>

</style>