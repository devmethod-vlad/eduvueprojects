<template>
  <span
      @mouseenter="onMouseEnter()"
      @mouseleave="color = props.color"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        :viewBox="'0 0 '+props.size.toString()+' '+props.size.toString()"
        fill="none"
    >
      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14 2H13V0H11V2H5V0H3V2H2C0.89543 2 0 2.89543 0 4V14C0 15.1046 0.89543 16 2 16H14C15.1046 16 16 15.1046 16 14V4C16 2.89543 15.1046 2 14 2ZM14.3 13.3C14.3 13.8523 13.8523 14.3 13.3 14.3H2.7C2.14772 14.3 1.7 13.8523 1.7 13.3V5.7C1.7 5.14772 2.14772 4.7 2.7 4.7H13.3C13.8523 4.7 14.3 5.14772 14.3 5.7V13.3ZM6 10V12H4V10H6ZM6 9V7H4V9H6ZM7 7H9V9H7V7ZM9 10H7V12H9V10ZM12 7V9H10V7H12ZM12 12V10H10V12H12Z"
          :fill="color"
      />
</svg>
  </span>
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
const onMouseEnter = ()=>{
  if (props.hoverColor !==''){
    color.value = props.hoverColor;
  }
}

</script>

<style scoped>

</style>