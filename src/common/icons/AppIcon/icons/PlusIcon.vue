<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      :viewBox="'0 0 '+props.size.toString()+' '+ props.size.toString()"
      fill="none"
  >
    <path
        d="M6 0C6.55228 0 7 0.447715 7 1V5H11C11.5523 5 12 5.44772 12 6C12 6.55228 11.5523 7 11 7H7V11C7 11.5523 6.55228 12 6 12C5.44772 12 5 11.5523 5 11V6.999L1 7C0.447715 7 0 6.55228 0 6C0 5.44772 0.447715 5 1 5L5 4.999V1C5 0.447715 5.44772 0 6 0Z"
        :fill="props.color"
    />
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