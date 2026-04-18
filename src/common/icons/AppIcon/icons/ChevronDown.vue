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
        d="M4.62473 5.21917C4.19347 4.87416 3.56418 4.94408 3.21917 5.37534C2.87416 5.8066 2.94408 6.4359 3.37534 6.78091L7.37534 10.7809C7.74056 11.0731 8.25951 11.0731 8.62473 10.7809L12.6247 6.78091C13.056 6.4359 13.1259 5.8066 12.7809 5.37534C12.4359 4.94408 11.8066 4.87416 11.3753 5.21917L8.00004 8.71941L4.62473 5.21917Z"
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