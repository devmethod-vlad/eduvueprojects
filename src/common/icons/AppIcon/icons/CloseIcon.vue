<template>

  <svg
      @mouseenter="onMouseEnter()"
      @mouseleave="color = props.color"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      viewBox="0 0 16 16"
      fill="none"
  >
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 6.59824L14.3079 0.290314C14.695 -0.0967714 15.3226 -0.0967714 15.7097 0.290314C16.0968 0.6774 16.0968 1.30499 15.7097 1.69208L9.40176 8L15.7097 14.3079C16.0968 14.695 16.0968 15.3226 15.7097 15.7097C15.3226 16.0968 14.695 16.0968 14.3079 15.7097L8 9.40176L1.69208 15.7097C1.30499 16.0968 0.6774 16.0968 0.290314 15.7097C-0.0967714 15.3226 -0.0967714 14.695 0.290314 14.3079L6.59824 8L0.290314 1.69208C-0.0967714 1.30499 -0.0967714 0.6774 0.290314 0.290314C0.6774 -0.0967714 1.30499 -0.0967714 1.69208 0.290314L8 6.59824Z"
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