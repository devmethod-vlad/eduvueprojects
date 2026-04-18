<template>
  <span
      @mouseenter="onMouseEnter()"
      @mouseleave="color = props.color"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        viewBox="0 0 14 14"
        fill="none"
    >
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.52486 8.87739L8.83608 0.56617C9.5787 -0.176449 10.7689 -0.190325 11.4944 0.53518L13.4648 2.50564C14.1903 3.23114 14.1764 4.4213 13.4338 5.16392L5.12261 13.4751L0 14L0.52486 8.87739ZM2.32533 9.7042L2.10039 11.8996L4.29579 11.6747L9.4309 6.53955L7.46046 4.56908L2.32533 9.7042ZM8.80509 3.22445L10.7756 5.19491L12.1202 3.85028L10.1497 1.87981L8.80509 3.22445Z"
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