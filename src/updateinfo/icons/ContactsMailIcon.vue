<template>
    <svg
        @mouseenter="onMouseEnter()"
        @mouseleave="()=>{color = props.color; backColor = props.backgroundColor}"
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        :viewBox="'0 0 '+props.size.toString()+' '+props.size.toString()"
        fill="none"
    >
      <rect
          :width="props.size"
          :height="props.size"
          rx="4"
          :fill="backColor"
      />
      <mask id="mask0_524_3484"
            style="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="8" y="10"
            :width="(Math.round(Number(props.size)*0.6)).toString()"
            :height="(Math.round(Number(props.size)*0.5)).toString()"
      >
        <path
            d="M29.3333 10.6667C30.8061 10.6667 32 11.8606 32 13.3334V26.6667C32 28.1394 30.8061 29.3334 29.3333 29.3334H10.6667C9.19391 29.3334 8 28.1394 8 26.6667V13.3334C8 11.8606 9.19391 10.6667 10.6667 10.6667H29.3333ZM10.6667 15.9987V26.6667H29.3333V16L20.0063 23L10.6667 15.9987ZM28.444 13.3334H11.5573L20.0054 19.6667L28.444 13.3334Z"
            :fill="backColor"
        />
      </mask>
      <g mask="url(#mask0_524_3484)">
        <path
            d="M29.3333 10.6667C30.8061 10.6667 32 11.8606 32 13.3334V26.6667C32 28.1394 30.8061 29.3334 29.3333 29.3334H10.6667C9.19391 29.3334 8 28.1394 8 26.6667V13.3334C8 11.8606 9.19391 10.6667 10.6667 10.6667H29.3333ZM10.6667 15.9987V26.6667H29.3333V16L20.0063 23L10.6667 15.9987ZM28.444 13.3334H11.5573L20.0054 19.6667L28.444 13.3334Z"
            :fill="color"
        />
        <path
            d="M43.9997 -6.66669H-6.66699V44H43.9997V-6.66669Z"
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
        default: 40
      },
  color:
      {
        type: String,
        default: '#333333'
      },

  backgroundColor:
      {
        type: String,
        default: '#F2F2F2'
      },

  hoverColor:
      {
        type: String,
        default: ''
      },

  hoverBackgroundColor:
      {
        type: String,
        default: ''
      },
});

// DATA
const color = ref(props.color);
const backColor = ref(props.backgroundColor);

// METHODS
const onMouseEnter = () => {
  if (props.hoverColor !== '') {
    color.value = props.hoverColor;
  }
  if (props.hoverBackgroundColor !==''){
    backColor.value = props.hoverBackgroundColor;
  }
}

</script>

<style scoped>

</style>