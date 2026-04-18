<template>
  <span
      @mouseenter="onMouseEnter()"
      @mouseleave="color = props.color"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        viewBox="0 0 16 16"
        fill="none"
    >
      <path
          d="M10 4C11.104 4 12 4.896 12 6V14C12 15.104 11.104 16 10 16H2C0.896 16 0 15.104 0 14V6C0 4.896 0.896 4 2 4H10ZM10 6H2V14H10V6ZM14 0C15.104 0 16 0.896 16 2V10C16 11.104 15.104 12 14 12H13V10H14V2H6V3H4V2C4 0.896 4.896 0 6 0H14Z"
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