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
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM7 6.99984C7 6.44987 7.44994 6 8 6C8.55005 6 9 6.44987 9 6.99984V12.0002C9 12.5501 8.55005 13 8 13C7.44994 13 7 12.5501 7 12.0002V6.99984ZM9 4.00055C9 3.4486 8.55226 3 8 3C7.44774 3 7 3.4486 7 4.00055C7 4.5525 7.44774 5 8 5C8.55226 5 9 4.5525 9 4.00055Z"
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
const onMouseEnter = () => {
  if (props.hoverColor !== '') {
    color.value = props.hoverColor;
  }
}

</script>

<style scoped>

</style>