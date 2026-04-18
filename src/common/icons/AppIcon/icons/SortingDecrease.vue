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
        d="M3 8C3.55228 8 4 8.44772 4 9C4 9.55228 3.55228 10 3 10H1C0.447715 10 0 9.55228 0 9C0 8.44772 0.447715 8 1 8H3ZM7 4C7.55228 4 8 4.44772 8 5C8 5.55228 7.55228 6 7 6H1C0.447715 6 0 5.55228 0 5C0 4.44772 0.447715 4 1 4H7ZM11 0C11.5523 0 12 0.447715 12 1C12 1.55228 11.5523 2 11 2H1C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0H11Z"
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