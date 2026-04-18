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
        d="M10 21L6 17.01H9V10H11V17.01H14L10 21Z"
        :fill="color"
    />
    <path
        d="M15 12C15 11.4477 15.4477 11 16 11H24C24.5523 11 25 11.4477 25 12C25 12.5523 24.5523 13 24 13H16C15.4477 13 15 12.5523 15 12Z"
        :fill="color"
    />
    <path
        d="M15 16C15 15.4477 15.4477 15 16 15H28C28.5523 15 29 15.4477 29 16C29 16.5523 28.5523 17 28 17H16C15.4477 17 15 16.5523 15 16Z"
        :fill="color"
    />
    <path
        d="M16 19C15.4477 19 15 19.4477 15 20C15 20.5523 15.4477 21 16 21H20C20.5523 21 21 20.5523 21 20C21 19.4477 20.5523 19 20 19H16Z"
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
      }
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