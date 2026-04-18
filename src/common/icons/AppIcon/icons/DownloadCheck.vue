<template>
  <span
      @mouseenter="onMouseEnter()"
      @mouseleave="color = props.color"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="props.size"
        :height="props.size"
        viewBox="0 0 32 32"
        fill="none"
    >
    <path
        d="M19.8699 19.7809L14.6525 14.7809C14.2025 14.4359 14.1295 13.8066 14.4895 13.3753C14.8495 12.944 15.5062 12.8741 15.9562 13.2191L19.4793 16.692L19.4783 7C19.4783 6.44772 19.9455 6 20.5218 6C21.0981 6 21.5653 6.44772 21.5653 7L21.5662 16.691L25.0873 13.2191C25.5373 12.8741 26.1939 12.944 26.554 13.3753C26.914 13.8066 26.841 14.4359 26.391 14.7809L21.1736 19.7809C20.7925 20.073 20.251 20.073 19.8699 19.7809ZM14.2608 25C13.6845 25 13.2174 24.5523 13.2174 24C13.2174 23.4477 13.6845 23 14.2608 23H26.7826C27.3589 23 27.826 23.4477 27.826 24C27.826 24.5523 27.3589 25 26.7826 25H14.2608Z"
        :fill="color"
    />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.1316 16.6075C12.3426 16.3151 12.7556 16.2458 13.0539 16.4527C13.3521 16.6596 13.4229 17.0644 13.2118 17.3569L7.4867 24.7262C7.24755 25.0575 6.76024 25.0945 6.47184 24.8033L3.52028 21.7962C3.26575 21.5392 3.27197 21.1285 3.53416 20.879C3.79636 20.6295 4.21525 20.6356 4.46978 20.8926L6.86656 23.3394L12.1316 16.6075Z"
        :fill="color"
        :stroke="color"
        stroke-width="0.2"
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