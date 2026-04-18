<template>
  <svg
      @mouseenter="onMouseEnter()"
      @mouseleave="color = props.color"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      viewBox="0 0 24 24"
      fill="none"
  >
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.7113 11.812C19.771 11.8946 19.8221 11.9699 19.8654 12.0373C19.8273 12.1022 19.7826 12.1742 19.7304 12.2527C19.432 12.7018 18.9506 13.276 18.2754 13.8394C16.9423 14.9518 14.8854 16 12 16C9.1146 16 7.05765 14.9518 5.72459 13.8394C5.04938 13.276 4.56795 12.7018 4.26958 12.2527C4.21744 12.1742 4.17265 12.1022 4.13455 12.0373C4.17788 11.9699 4.22901 11.8946 4.28867 11.812C4.62296 11.3494 5.15284 10.7596 5.86934 10.1817C7.29705 9.02998 9.367 8 12 8C14.633 8 16.7029 9.02998 18.1307 10.1817C18.8472 10.7596 19.377 11.3494 19.7113 11.812ZM22 12C22 13 18.8182 18 12 18C5.18182 18 2 13 2 12C2 11 5.63636 6 12 6C18.3636 6 22 11 22 12ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        :fill="color"
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