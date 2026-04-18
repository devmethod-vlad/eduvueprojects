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
    <circle
        cx="8"
        cy="8"
        r="7.5"
        fill="white"
        :stroke="color"
    />
    <mask
        id="mask0_332_3725"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="5"
        y="3"
        width="6"
        height="10"
    >
      <path
          d="M5.21917 11.3753C4.87416 11.8065 4.94408 12.4358 5.37534 12.7808C5.8066 13.1258 6.4359 13.0559 6.78091 12.6247L10.7809 8.62466C11.0731 8.25944 11.0731 7.74049 10.7809 7.37527L6.78091 3.37527C6.4359 2.94401 5.8066 2.87408 5.37534 3.21909C4.94408 3.5641 4.87416 4.1934 5.21917 4.62466L8.71941 7.99996L5.21917 11.3753Z"
          fill="white"
      />
    </mask>
    <g mask="url(#mask0_332_3725)">
      <path
          d="M4.6247 5.21917C4.19344 4.87416 3.56415 4.94408 3.21914 5.37534C2.87413 5.8066 2.94405 6.4359 3.37531 6.78091L7.37531 10.7809C7.74053 11.0731 8.25948 11.0731 8.6247 10.7809L12.6247 6.78091C13.056 6.4359 13.1259 5.8066 12.7809 5.37534C12.4359 4.94408 11.8066 4.87416 11.3753 5.21917L8.00001 8.71941L4.6247 5.21917Z"
          :fill="color"
      />
      <path
          d="M-11 -11L-11 27L27 27L27 -11L-11 -11Z"
          :fill="color"
      />
    </g>
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