<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      :viewBox="'0 0 '+props.size.toString()+' '+props.size.toString()"
      fill="none"
  >
    <rect x="2.5" y="2.5"
          :width="(Math.round(Number(props.size)*0.69)).toString()"
          :height="(Math.round(Number(props.size)*0.69)).toString()"
          rx="5.5"
          :fill="props.checkColor"
          :stroke="checkedFillColor"
          stroke-width="5"
    />
  </svg>
</template>

<script setup>
// PROPS
const props = defineProps({
  size:
      {
        type: Number,
        default: 16
      },
  checkedFillColor:
      {
        type: String,
        default: '#269999'
      },
  checkColor:
      {
        type: String,
        default: 'white'
      }
});
</script>

<style scoped>

</style>