<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      viewBox="0 0 24 24"
      :fill="props.color"
  >
    <path
        d="M12,2L12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M17,12c0,2.8-2.2,5-5,5c-2.8,0-5-2.2-5-5c0-2.8,2.2-5,5-5C14.8,7,17,9.2,17,12L17,12z"
    >

    </path>
  </svg>
</template>

<script setup>

// PROPS
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
      }
});

</script>

<style scoped>

</style>