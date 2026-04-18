<template>

  <svg
      @mouseenter="onMouseEnter()"
      @mouseleave="color=props.color"
      @mousedown="onMouseDown()"
      @mouseup="onMouseUp()"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      :viewBox="'0 0 '+props.size.toString()+' '+props.size.toString()"
      fill="none"
  >
    <rect
        width="32"
        height="32"
        rx="4"
        :fill="color"
    />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.95 18.5352L23.657 22.2422C24.047 22.6332 24.047 23.2672 23.657 23.6572C23.267 24.0472 22.633 24.0472 22.243 23.6572L18.536 19.9492C18.467 19.8822 18.411 19.8062 18.367 19.7262C17.286 20.5262 15.948 21.0002 14.5 21.0002C10.91 21.0002 8 18.0902 8 14.5002C8 10.9102 10.91 8.00018 14.5 8.00018C18.09 8.00018 21 10.9102 21 14.5002C21 15.9482 20.526 17.2862 19.726 18.3662C19.806 18.4112 19.881 18.4672 19.95 18.5352ZM10 14.5002C10 16.9852 12.015 19.0002 14.5 19.0002C16.985 19.0002 19 16.9852 19 14.5002C19 12.0152 16.985 10.0002 14.5 10.0002C12.015 10.0002 10 12.0152 10 14.5002Z"
        fill="white"
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
  pressColor:
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

const onMouseDown = () => {
  if (props.pressColor !== '') {
    color.value = props.pressColor;
  }
}

const onMouseUp = () => {
  if (props.hoverColor !== '') {
    color.value = props.hoverColor;
  }
  else {
    color.value = props.color;
  }
}

</script>

<style scoped>

</style>