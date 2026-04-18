<template>
  <span
      @mouseenter="onMouseEnter()"
      @mouseleave="color = props.color"
      @mousedown="onMouseDown()"
      @mouseup="onMouseUp()"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        viewBox="0 0 14 19"
        fill="none">
        <path
            d="M6.37534 13.7809L1.37534 8.78087C0.944079 8.43586 0.874158 7.80657 1.21917 7.37531C1.56418 6.94404 2.19347 6.87412 2.62473 7.21913L6.001 10.692L6.00007 1C6.00007 0.447716 6.44779 0 7.00007 0C7.55236 0 8.00007 0.447716 8.00007 1L8.001 10.691L11.3753 7.21913C11.8066 6.87412 12.4359 6.94404 12.7809 7.37531C13.1259 7.80657 13.056 8.43586 12.6247 8.78087L7.62473 13.7809C7.25951 14.073 6.74056 14.073 6.37534 13.7809ZM1 19C0.447716 19 0 18.5523 0 18C0 17.4477 0.447716 17 1 17H13C13.5523 17 14 17.4477 14 18C14 18.5523 13.5523 19 13 19H1Z"
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
            default: '#757575'
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
const onMouseEnter = ()=>{
  if (props.hoverColor !==''){
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