<template>
  <span
      @mouseenter="onMouseEnter()"
      @mouseleave="color = props.color"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        viewBox="0 0 12 10"
        fill="none"
    >
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 2C3.55228 2 4 1.55228 4 1C4 0.447716 3.55228 0 3 0H1C0.447715 0 0 0.447716 0 1C0 1.55228 0.447715 2 1 2H3ZM7 6C7.55228 6 8 5.55228 8 5C8 4.44772 7.55228 4 7 4H1C0.447715 4 0 4.44772 0 5C0 5.55228 0.447715 6 1 6H7ZM11 10C11.5523 10 12 9.55228 12 9C12 8.44772 11.5523 8 11 8H1C0.447715 8 0 8.44772 0 9C0 9.55228 0.447715 10 1 10H11Z"
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